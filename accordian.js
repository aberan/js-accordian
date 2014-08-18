var nxnw = nxnw || {};

define(function(require){
	var jQuery = require('jquery');
	require('transition.end.min');
	require('throttle-debounce');

	// first we set up our constructor function
	function Accordian( args, options ){
		//set object options
		this.options = $.extend( {}, this.defaults, options );
		//set object properties
		this.$el = args.el;
		this.transitioning = false;
		this.csstransitions = Modernizr.csstransitions;

		//various callbacks if defined
    this.callback = args.hasOwnProperty( 'callback' ) ? args.callback : false;
    this.post = args.hasOwnProperty( 'post' ) ? args.post : false;

		//fire init function
		this.init();
	} /* \constructor */

	Accordian.prototype = {
		// now we define the prototype for accordian
		defaults: {
			duration: 1000,
			ns: 'accordian'
		},

		//define plugin functions below
		init: function( post ) {

			//find all fold wrappers and get their height
			this.$el.find( '.fold-wrapper' ).each( $.proxy( function( i, el ) {
				//get height of fold-inner
				var $this = $( el ),
					$fold_inner = $this.find( '.fold-inner' ),
					$fold = $this.find( '.fold' ),
					fold_height = $fold_inner.outerHeight( false ),
					active_fold = false;

				$(window).on( 'resize.' + this.options.ns, $.throttle( 250, $.proxy( function() {
					fold_height = $fold_inner.outerHeight( false );

					//if open, update height of the fold itself
					if ( active_fold ) {
						this.setHeight( $fold, fold_height );
					}
				}, this )));

				$this.on( 'update.' + this.options.ns, $.proxy( function() {
					fold_height = $fold_inner.outerHeight( false );

					//if open, update height of the fold itself
					if ( active_fold ) {
						this.setHeight( $fold, fold_height );
					}
				}, this ));

				$this.on( $.support.transition.end, $.proxy( function () {
          if ( this.callback ) {
						this.callback();
					}
        }, this ));


				$this.find( '.fold-header' ).on( 'click.' + this.options.ns, $.proxy( function( e ) {
					var $this = $( e.currentTarget );

					//update active state
					active_fold = active_fold ? false : true;


					if ( active_fold ) {
						$this.addClass( 'active' );
						this.setHeight( $fold, fold_height );
					}
					else {
						$this.removeClass( 'active' );
						this.setHeight( $fold, 0 );
					}
				}, this ));

			},this ));

			if ( this.post ) {
        this.post();
      }
		}, /* \accordian._init */

		setHeight: function( $fold, height ) {
			if ( this.csstransitions ) {
				$fold.height( height );
			}
			else {
				$fold.animate( {
					height: height,
				}, this.options.duration, $.proxy( function() {
					//execute callback if one exists
					if ( this.callback ) {
						this.callback();
					}
				}, this ));
			}

		}, // accordian.setHeight

		open: function( index ){
			$( '.fold-wrapper', this.$el ).eq( index ).find( '.fold-header' ).trigger( 'click.' + this.options.ns );
		}, /* \accordian._open */

		create: function(){

		}, /* \accordian._create */

		destroy: function(callback) {
			//remove all set heights
			this.$el.find( '.fold' ).removeAttr( 'style' );

			//if callback is passed in, execute
			if ( typeof callback !== 'undefined' && typeof callback === 'function' ) {
				callback();
			}
		}  /* \accordian._destroy */
	};  /* \accordian.prototype */

  //add obj to namespace
  nxnw.Accordian = Accordian;

  return nxnw.Accordian;
});
