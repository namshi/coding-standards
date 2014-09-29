# Coding standards for JavaScript

> THIS DOCUMENT IS A DRAFT / PROPOSAL.

> DO NOT CONSIDER IT ANYTHING OFFICIAL FOR NOW.

This guide describes the set of rules we apply
on the frontend, mostly with JavaScript.

## Formatting

We follow some very basic rules:

* brackets always open on the same line (`if (...) {`)
* and `else` too (`} else {`)
* multiple assignments don't need a newline
* between a statement and **anything else** we add a newline
* always add a newline before a `return`, unless it's the only code in the block
* function names should be camel-cased (`myFunction`)
* objects intended as blueprints, or constructors, should be in upper-case (`var MyObject = function() {}; var myObject = new MyObject()`)
* members follow the same convention (`a.propertyName`)
* use JsHint as much as possible :)
* avoid global, native variables as much as possible (such as `window`), use proxies instead
* use 2 spaces to indent
* no need to add a space between the `function` keyword and its arguments (`function(a, b)`)
* add a space between function arguments and the opening bracket (`function() {`)
* separate arguments with one space after the columns (`function(a, b, c)`)
* wrap self calling functions in `()` (`(function() {}())`), and don't abuse them (they can be confusing)
* do not add comments inside your code, that's what the jsdoc is for
* cleanup your `console.log`s before committing

Example:

``` javascript
/**
* My Object Definition
*/

var MyObject = function() {
  this.property = 'value';
}

MyObject.prototype.method = function() {
  console.log('Hello, I'm a method');
}

var myObject = new MyObject();
myObject.method();

/**
 * My JsDoc.
 */
var foo = {
  doSomething: function(hello, hella) {
    if (something === somethingElse) {
      return 1;
    } else if (iFellLucky) {
      explode(hello, hella);
    }
    
    return 2;
  }
};

```

## Structure

Projects should contain generic files on their root,
like the `.gitignore` and `gulpfile.js`.

Dependencies should be installed in a directory on the
root of a project (both `node_modules` and `bower_components`).

Our own codebase should live in a `src` directory, where
we will divide things between `scripts` and `templates`: if
a project contains both vanilla js and nodejs we should
create 2 subfolders under `scripts`, `server` and `client`.

The directory structure should be thought as if it was
namespaced: if we have an *api* service it should be located
at `src/scripts/services/api.js`.

We prefer plural names over singular ones, differently from
our API coding standards.

## Scripts

Should have the `.js` extension and contain a single unit,
we should never mix classes under the same file: an exception
is when we nee mixins / helpers, where we declare a bunch of
utility methods, with different conceptual scopes, in the same
file.

``` javascript
var helpers = {
  convertDollarsToEuros: function(amount) {
    // ...
  },
  log: function(what, where) {
    // ...
  }
};
```

## Objects

Avoid aliasing objects with a `self` variable, as
then it could lead to scope issues; prefer aliasing them
with the service "name" instead.
myObjectInstance
``` javascript
/**
 * User service.
 */
funtion User(){
  var User = this;
};
```

We don't use prototypes that much: create them with
caution, as they might lead to unneeded complexity --
generally, we found out that they're not really needed
and using plain old vanilla objects speeds us up.

## Methods

When you need to pass a few arguments to a function,
consider refactoring them as `options`:

``` javascript
// mmmmm
http.request(method, url, headers, cookies);

// much better!
var options = {
  method: method,
  url: url,
  headers: headers,
  cookies: cookies
};

http.request(options);
```

This leads to minimal changes in the function's implementation:

``` javascript
http.request = function(options) {
  // just add some logic that uses a new option
  // and you don't have to change signature, etc...
}
```

## Templates

We prefer using jade as a templating engine, as it saves
a lot of time during coding.
Leverage on `includes` for repeted partials.

## Toolkit

Use [browserify](http://browserify.org/) as much as possible:
node code is usually much more readable, structured and
simpler than usual frontend libraries and browserify lets us
share code between the backend and the frontend.

For dependency management, use [NPM](https://www.npmjs.org/);
if you need libraries that are only written for the client,
install them via [Bower](http://bower.io/).

For building projects and running development environment you
should use [Gulp](http://gulpjs.com/), which offers much less
complexity compared to Grunt, our old build tool.

## Tests

TBD

## Vanilla JS
* avoid `undefined` as much as possible (have a look [here](http://shapeshed.com/the-void-of-undefined-in-javascript/) if you wonder how it might hurt you :))
* do not rely on truthy and falsy values: use `===` and `!==`
* always define all the needed variables at the beginning of a function setting them to their itended type even if empty (`var list = []`, `var fooObj = {}`, `var fooString = ''`, etc)
* always take care of undefined functions parameters setting a default or `null` value (`function (option) { options = options || null;}`)
* forget about `while` statments...
* Do not let a promisses silently fail, always pass and error object to your rejections with a meaningful message (`q.reject(new Error('Bad things happened'))`)

## NodeJS

##### Golden rule: never block!
##### 2nd Golden rule: never block, even if you don't expect to block!
* Beware, you don't block only with cycles: heavily CPU bound operation will make the main thread sit there and wait until is completed. Cloning a big object, or parsing a big JSON (`JSON.parse()`) will block you like crazy!

`require` statements should be on top of each file:

``` javascript
var a = require('b');
```

If your `module.exports` is fairly simple,
declare it straight away:

``` javascript
module.exports = function() {
  console.log("I'm useless!");
}
```

but if you have a bunch of things, consider
splitting the object declaration and the export:

``` javascript
var service = {};

var log = function(what){
  console.log(what);
};

service.doSomething = function() {
  log('doing something');
  
  // ...
};

service.doSomethingElse = function() {
  log('doing something else');

  // ...
};

service.doSomethingFunky = function() {
  log('doing something funky');
  
  // ...
};

module.exports = service.
```

This approach, by the way, lets you declare
"protected" methods.

Prefer recursion to `for` loops and `forEach`:
* it will protect you from the dangers of async calls inside the for loops
* `forEach` blocks and **we do not block!**

Do not tinker with the base api's prototypes (ex: `Array.prototype.myFunction = function() {}`)
Do use callbacks, but avoid nesting more then 3 of them. Keep it short.

When loading files from the filesystem, be sure not to hardcode paths but use the safe `__dirname + path.join(...)` syntax so that the scripts can be launched from wherever directory

Example: (assuming the following dir structure)
```
/appDir/
      |/src/
          |/config/
          |app.js
          |config.js
```

and `config.js` (required by `app.js`) taking care of loading files from the `/appDir/src/config/` directory
```javascript
/*config.js*/

/**
not sure what happens if I run app.js form diff paths if I:
*/
var filePath = './config/' + filename + '.yml');
/* or */
var filePath = '../src/config/' + filename + '.yml');

/**
this will nicely take care of paths
*/
var filePath = path.join(__dirname, './config/' + filename + '.yml');
```

also a little preventive debug output might help out sys admins track eventual problems:
```javascript
console.log('Loading config file: ', filePath);
```

as well as give a hint to your fellow devs if you really need a config file that needs to be created (or user [reconfig](https://github.com/namshi/reconfig)):

Example: (assuming we need a `config/dev.yml` file)
```javascript
try {
  /* your file opening stuff */
} catch(error){
  if (e.path.match(/dev.yml/g).length > 0 ) {
    console.log('!!!NO dev.yml FOUND!!! Please copy dev.example.yml to dev.yml in your config directory!');
  } else {
    console.log('Error loading yaml config: ', e);
    process.exit(1);
  }
}
```
