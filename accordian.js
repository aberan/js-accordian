var nxnw = nxnw || {};

define(function(require){
	var jQuery = require('jquery');
	require('transition.end.min');
	require('throttle-debounce');

	// first we set up our constructor function
	function accordian(args, options){
		//set object options
		this.options = $.extend({}, this.defaults, options);
		this.$el = args.el;
		//set object properties
		this.transitioning = false;
		this.csstransitions = Modernizr.csstransitions;

		//various callbacks..
    this.callback = args.hasOwnProperty('callback') ? args.callback : false;
    this.post = args.hasOwnProperty('post') ? args.post : false;

		//fire init function
		this._init();
	} /* \constructor */

	accordian.prototype = {
		// now we define the prototype for accordian
		defaults: {
			duration: 1000,
			ns: 'accordian'
		}, /* \defaults */

		//define plugin functions below
		_init: function(post){

			//find all fold wrappers and get their height
			this.$el.find('.fold-wrapper').each( $.proxy(function(i, el){
				//get height of fold-inner
				var $this = $(el);
				var $fold_inner = $this.find('.fold-inner');
				var $fold = $this.find('.fold');
				var fold_height = $fold_inner.outerHeight(false);
				var active_fold = false;

				$(window).on('resize.'+this.options.ns, $.throttle( 250, $.proxy(function() {
					fold_height = $fold_inner.outerHeight(false);
					if(active_fold){ //if open, update height of the fold itself
						this._set_height($fold, fold_height);
					}
				}, this)));

				$this.on('update.'+this.options.ns, $.proxy(function() {
					fold_height = $fold_inner.outerHeight(false);
					//if open, update height of the fold itself
					if( active_fold ){
						this._set_height($fold, fold_height);
					}
				}, this));

				$this.on($.support.transition.end, $.proxy(function () {
          if(this.callback) {
						this.callback();
					}
        }, this));


				$this.find('.fold-header').on('click.'+this.options.ns, $.proxy( function(e) {
					var $this = $(e.currentTarget);
					//update active state
					active_fold = active_fold ? false : true;

					if(active_fold){ //active
						$this.addClass('active');
						this._set_height($fold, fold_height);
					}
					else{ //not active
						$this.removeClass('active');
						this._set_height($fold, 0);
					}
				}, this));

			},this));

			if(this.post) {
        this.post();
      }
		}, /* \accordian._init */

		_set_height: function($fold, height){
			if ( !this.csstransitions ) {
				$fold.height(height);
			}
			else {
				$fold.animate({
					height: height,
				}, this.options.duration, $.proxy(function() {
					//execute callback if one exists
					if(this.callback) {
						this.callback();
					}
				}, this));
			}

		}, /* \accordian._set_height */

		_open: function(index){
			$('.fold-wrapper', this.$el).eq(index).find('.fold-header').trigger('click.'+this.options.ns);
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