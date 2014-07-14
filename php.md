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

### Array

* Use the short syntax
``` php

$array = [1, 2, 'foo' => 'bar',]

```

* The last array argument should end with a comma

* Long nested array MUST follow this format, indenting one tab:
``` php

$array = [
	'first',
	'second',
	'third' => [
		'nested' => [
			'deepNested',
		],
	],
]

```


## Logger

We use `Monolo\Logger` in our codebase. It implements the [PSR-3 standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md).
Let's "code against interfaces", whenever we need the Logger, just declare the `LoggerInteface`

``` php
namespace Namshi\What\Ever;

use Psr\Log\LoggerInterface;

public function foo($firstArgument, $secondArgument, LoggerInterface $logger)
{

}

```

The logger argument SHOULD BE always the last argument.

When catching an exception and we use the `Logger`, we SHOULD always provide the complete exception message

``` php

try {
	//doSomething()
} catch(\Exception $e) {
	$logger->log('message',
		[
			'exception'  => $e,
			'otherStuff' => 'bla bla',
		]
	);

}

```


## Structure
tests dirs structure?


## Naming

### Class

* Avoid *List, *Mapping, *Collection etc suffic, use expressive names

* Even if it could be better sometimes to avoid *Interface, *Handler, *Command etc suffix because the namespace is already
providing that information, it could lead to a mess when you're using many class with the same name but different
namespace, for example:

``` php

use Namshi\Inteface\Product as ProductInterface;
use Namshi\Importer\Product as ProductImporter;
use Namshi\Handler\Product as ProductHandler;
use Namshi\Manager\Product as ProductManager;
use Namshi\Model\Product;
```

better:

``` php

use Namshi\Inteface\ProductInterface;
use Namshi\Importer\ProductImporter;
use Namshi\Handler\ProductHandler;
use Namshi\Manager\ProductManager;
use Namshi\Model\Product;
```


### Constants

* When you create constants name, think about namespaces:

``` php

const MESSAGE_STATUS_SENT     = 'message sent';
const MESSAGE_STATUS_REJECTED = 'message rejected';

const PAYMENT_SUCCESSFUL    = 'Payment Successful';
const PAYMENT_ON_HOLD       = 'Payment On Hold';
const PAYMENT_FAILED        = 'Payment Failed';
```

* **Do not** use constants for services defined in the container

* Use constants for messages


## Yaml configuration files

* Do not use single `'` or double quotes `"` for string if the string doesn't contain a special character (like `%`)

* Prepend the service name with the **vendor** name and the **bundle name**

``` yml

namshi_rose.search.client:
	class: Namshi\RoseBundle\Search\SolrSearch
	arguments:
	    searchClient  :  @solarium.client
	    avilableFacets:  '%namshi_rose.available_facets%'
	    shops         :  @shops
	    locale        :  @namshi.locale
	    availableSorts:  '%namshi_rose.solr_sort_options%'
	    logger         : @logger.solr

```

* Align the values on the same level

* Use camelCase to define keys

* Use a blank line between block definitions



