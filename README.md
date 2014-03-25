Javascript class to handle accordian functionality.

HTML skeleton is available via this [Gist](https://gist.github.com/aberan/9770367).

### Initialization
new nxnw.accordian(args, options);

**args** and **options** are expected to be objects



### Options
Option | Default
duration | 1000
ns       | 'accordian'

### Usage
```javascript
var foo = { a: 1, b: 2 };

var functions = (function(foo) {
	return {
		callback: function() {
			//do stuff here after accordian fold finishes animating
		},

		post: function() {
			//do stuff here after accordian initializes
		}
	};
})( foo ); //functions

var args = {
	el: $('.accordian'),
	callback: functions.callback,
	post: functions.post
};

var options = {
	duration: 500
};

new nxnw.accordian(args, options);
```



/*
 * html structure - you would repeat the fold-wrapper div as many times as needed for said accordian
 * the fold-header is the visible 'clickable' part of the accordian to allow the user to open and close its fold
 *
 * to initialize accordian: new nxnw.accordian('.accordian', callback, params, {});
 * pass any options in the options array if necessary
 *
 * adjust any css timining needed in the accordian.css file
*/
