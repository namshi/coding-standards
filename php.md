# Coding standards for PHP

> THIS DOCUMENT IS A DRAFT / PROPOSAL.

> DO NOT CONSIDER IT ANYTHING OFFICIAL FOR NOW.

This guide describes the set of rules we apply
on the api, mostly with PHP.


## Formatting

We mostly follow the [PSR-2 standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md)

* Files MUST use only <?php tag at the beginning, no ?> at the end

* Control structure keywords MUST have one space after them; method and function calls MUST NOT.

* Opening braces for control structures MUST go on the same line, and closing braces MUST go on the next line after the body.

* Opening parentheses for control structures MUST NOT have a space after them, and closing parentheses for control structures MUST NOT have a space before.

* Lines SHOULD NOT be longer than 120 characters; lines longer than that SHOULD be split into multiple subsequent lines of no more than 120 characters each.

* There MUST NOT be trailing whitespace at the end of non-blank lines.

* Blank lines MAY be added to improve readability and to indicate related blocks of code.

* There MUST NOT be more than one statement per line.

* Code MUST use an indent of 4 spaces, and MUST NOT use tabs for indenting

* PHP keywords MUST be in lower case. The PHP constants true, false, and null MUST be in lower case.

* Exclamation mark in (negating operator) MUST be prepended and followed with one whitespace

## Class

* Class names MUST be declared in [`StudlyCaps`](http://en.wikipedia.org/wiki/Studly_caps)

* Class constants MUST be declared in all upper case with underscore separators

* Opening braces for classes MUST go on the next line, and closing braces MUST go on the next line after the body.


### Namespace

* When present, there MUST be one blank line after the namespace declaration.

* When present, all use declarations MUST go after the namespace declaration.

* There MUST be one use keyword per declaration.

* There MUST be one blank line after the use block.

* Namespaces and classes MUST follow an ["autoloading" PSR-0](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-0.md)

* Fully qualified class names MUST be used for classes that don't belong to any namespace, no need for `use` statements
    (f.e. \DateTime)

### Methods

* Method names MUST be declared in [`camelCase`](http://en.wikipedia.org/wiki/CamelCase)

* Opening braces for methods MUST go on the next line, and closing braces MUST go on the next line after the body.

* Visibility MUST be declared on all methods.

* Method names SHOULD NOT be prefixed with a single underscore to indicate protected or private visibility.

* Method names MUST NOT be declared with a space after the method name. The opening brace MUST go on its own line, and the closing brace MUST go on the next line following the body. There MUST NOT be a space after the opening parenthesis, and there MUST NOT be a space before the closing parenthesis.

* In the argument list, there MUST NOT be a space before each comma, and there MUST be one space after each comma.

* Method arguments with default values MUST go at the end of the argument list.

* Argument lists MAY be split across multiple lines, where each subsequent line is indented once. When doing so, the first item in the list MUST be on the next line, and there MUST be only one argument per line.

* Chain calls on newline (`->`) SHOULD be aligned at least with one tabulation after the current indentation level or in the most
    readable way:

    ``` php
    $someLongVarName = $object->longMethodNameWithSomeArguments($argumentOne, $argumentTwo, $argumentThree)->fooMethod($fooArgument)
        ->barMethod($barArgument);

    $result = $connection->beginTransaction()
                         ->query("SELECT * FROM foo_table LOCK")
                         ->query("UPDATE foo_table SET bla=bla")
                         ->commit();
    ```

### Variables

* Variables names MUST be declared in [`camelCase`](http://en.wikipedia.org/wiki/CamelCase)

* Variables declared on multiple lines MUST be aligned based on the longer variable name

``` php

$bar              = 'bar';
$foo              = true;
$veryLongVariable = 1;
```

## Logger


should be

$logger->err('message',[

## Structure
tests dirs structure?


## Naming

### Class

* Avoid *List, *Mapping etc, use expressive names

* Even if it could be better from


### constants

how to build a constant name, think about namespace!


do not use constants for services
use constants for error messages


##configuration files

services name in .yml?
no ' or "

empty line between blocks`


## Methods

directory structures


phpdoc

self or static?


bounduaries

composer fixed versions



