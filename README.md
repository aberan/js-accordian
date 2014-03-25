Javascript class to handle accordian functionality.

HTML skeleton is available via this [Gist](https://gist.github.com/aberan/9770367).

### Initialization
```javascript
new nxnw.accordian(args, options);
```

**args** and **options** are expected to be objects



### Options
Option | Default
__________ | __________
duration   | 1000
ns         | 'accordian'

### Usage
```javascript
//additional variable you want to keep track of
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
