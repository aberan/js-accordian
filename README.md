Javascript class to handle accordian functionality.

HTML skeleton is available via this [Gist](https://gist.github.com/aberan/9770367).

### Initialization
```javascript
new nxnw.Accordian(args, options);
```

**args** and **options** are expected to be objects

### Arguments
Argument | Explanation
----------- | -----------
el          | jquery DOM object i.e. $('.foo')
callback    | callback function that gets called when a fold's animation completes
post        | callback function that gets called when the accordian initialization finishes


### Options
Option | Default | Explanation
------------ | ------------ | ------------------------------------- |
duration     | 1000         | animation time in ms                  |
ns           | 'accordian'  | namespace for jquery event handler    |

As of now you need to match the duration in the .styl file for modern browsers. In general the .styl file contents should be copied in the main.styl file to be compiled with autoprefixer etc.

### Usage
```javascript
//additional variable you want to keep track of
var foo = {
	a: 1,
	b: 2
};

//object containing various callback functions to pass to the accordian
var functions = ( function( foo ) {
	return {
		callback: function() {
			//do stuff here after accordian fold finishes animating
		},

		post: function() {
			//do stuff here after accordian initializes
		}
	};
})( foo ); //functions

//object containing the arguments for the accordian
var args = {
	el: $( '.accordian' ),
	callback: functions.callback,
	post: functions.post
};

//object containing any options that should be set
var options = {
	duration: 500
};

new nxnw.Accordian( args, options );
```
