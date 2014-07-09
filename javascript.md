# Coding standards for JavaScript

> THIS DOCUMENT IS A DRAFT / PROPOSAL.

> DO NOT CONSIDER IT ANYTHING OFFICIAL FOR NOW.

This guide describes the set of rules we apply
on the frontend, mostly with JavaScript.

## Formatting

We follow some very basic rules:

* brackets always open on the same line (`if (...) {`)
* multiple assignments don't need a newline
* between a statement and **anything else** we add a newline
* always add a newline before a `return`, unless it's the only code in the block
* function names should be camel-cased (`myFunction`)
* members follow the same convention (`a.propertyName`)
* use JsHint as much as possible :)
* avoid global, native variables as much as possible (such as `window`), use proxies instead
* use 2 spaces to indent
* no need to add a space betwee the `function` keyword and its arguments (`function(a, b)`)
* add a space between function arguments and the opening bracket (`function() {`)
* separate arguments with one space after the columns (`function(a, b, c)`)

Example:

``` javascript
/**
 * My JsDoc.
 */
var a = {
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
a lot of time during

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

TBD

## NodeJS

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


















