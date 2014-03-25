var nxnw = nxnw || {};

define(function(require){
	var jQuery = require('jquery');
	require('transition.end.min');
	require('throttle-debounce');

	// first we set up our constructor function
	function accordian(el, callback, params, options){
		//set object options
		this.options = $.extend({}, this.defaults, options);
		this.$el = $(el);
		//set object properties
		//this.property = value;

		//fire init function
		this._init(callback, params);
	}; /* \constructor */

	accordian.prototype = {
		// now we define the prototype for slideShow
		defaults: {
			//property: value
		}, /* \defaults */

		//define plugin functions below
		_init: function(callback, params){
			var self = this;
			//find all fold wrappers and get their height
			self.$el.find('.fold-wrapper').each(function(){
					//get height of fold-inner
					var $this = $(this);
					var $fold_inner = $this.find('.fold-inner');
					var $fold = $this.find('.fold');
					var fold_height = $fold_inner.outerHeight(false);
					var active_fold = false;

					$(window).on('resize', $.throttle( 250, function() {
						fold_height = $fold_inner.outerHeight(false);
						if(active_fold){ //if open, update height of the fold itself
							self._set_height($fold, fold_height);
						}
					}));

					$this.on('accordian_update', function() {
						fold_height = $fold_inner.outerHeight(false);
						if(active_fold){ //if open, update height of the fold itself
							self._set_height($fold, fold_height);
						}
					});


					$this.find('.fold-header').on('click', function(e){
						var $this = $(this);
						//update active state
						active_fold = active_fold ? false : true;

						if(active_fold){ //active
							$this.addClass('active');
							self._set_height($fold, fold_height);
							//$fold.height(fold_height);
						}
						else{ //not active
							$this.removeClass('active');
							self._set_height($fold, 0);
							//$fold.height(0);
						}


					}); /* \$this.find('.fold-header') */

				}); /* \this.$el.find('.fold-wrapper').each() */

			if(callback !== "" && self[callback] && typeof self[callback] == "function"){
				self[callback](params);
			}
		}, /* \accordian._init */

		_set_height: function($fold, height){
			//test for csstransitions. If not supported do jquery animate instead.
			$fold.height(height);
		}, /* \accordian._set_height */

		_open: function(index){
			$('.fold-wrapper', this.$el).eq(index).find('.fold-header').trigger('click');
		}, /* \accordian._open */

		_create: function(){

		}, /* \accordian._create */

		_destroy: function(){

		}  /* \accordian._destroy */
	};  /* \accordian.prototype */

  //add obj to namespace
  nxnw.accordian = accordian;

  return nxnw.accordian;
});