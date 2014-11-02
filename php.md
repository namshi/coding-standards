# PHP coding standards @Namshi 

This guide describes the set of rules we apply at Namshi in our PHP codebase.

## Formatting

We mostly follow the [PSR-2 standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md)

* Files MUST use only <?php tag at the beginning, no ?> at the end

* Control structure keywords MUST have one space after them; method and function calls MUST NOT.

```php
if ($item->available()) {
    //whatever
}

foreach ($array as $key => $value) {
    //whatever
}

```

* Opening braces for control structures MUST go on the same line, and closing braces MUST go on the next line after the body.

* Opening parentheses for control structures MUST NOT have a space after them, and closing parentheses for control structures MUST NOT have a space before.

* Lines SHOULD NOT be longer than 120 characters; lines longer than that SHOULD be split into multiple subsequent lines of no more than 120 characters each.

* There MUST NOT be trailing whitespace at the end of non-blank lines.

* Blank lines MAY be added to improve readability and to indicate related blocks of code.

* There MUST NOT be more than one statement per line.

* Code MUST use an indent of 4 spaces, and MUST NOT use tabs for indenting

* PHP keywords MUST be in lower case. The PHP constants true, false, and null MUST be in lower case.

* Exclamation mark in (negating operator) MUST be prepended and followed with one whitespace
```php

if ( ! $item->available()) {
    //whatever
}
```

## Structure
* Add a single space after each comma delimiter;

* Add a single space around operators (==, &&, ...);

```php

if ($item->isAvailable && $item->isAwesome()) {
    //whatever
}

```

* Add a comma after each array item in a multi-line array, even after the last one;

```php

$array = ['a', 'b', 'c' => ['c1', 'c2'],]

```

* Add a blank line before return statements, unless the return is alone inside a statement-group (like an if statement);

```php
if ($item->isAvailable) {
    return $item;
}

public function loadAvailableItems()
{
    $items = $query->('SELECT ...')->execute;

    return $items;
}

```

* Use braces to indicate control structure body regardless of the number of statements it contains;

* Define one class per file - this does not apply to private helper classes that are not intended to be instantiated from the outside and thus are not concerned by the PSR-0 standard;

* Declare class properties before methods;

* Declare public methods first, then protected ones and finally private ones. The exceptions to this rule are the class constructor and the setUp and tearDown methods of PHPUnit tests, which should always be the first methods to increase readability;

* Use parentheses when instantiating classes regardless of the number of arguments the constructor has;

* Custom exception SHOULD NOT BE created if the purpose can be fulfilled by already available exceptions. (for reference: list of [Symfony Exceptions](http://www.forouzani.com/list-of-all-symfony2-exceptions-symfony.html))

* Exception message strings SHOULD BE concatenated using sprintf.

```php

$e = new \Exception(sprintf("Can't find item %s with quantity %d", $itemNumber, $itemQuantity));

```


## Class

* Class names MUST be declared in [`StudlyCaps`](http://en.wikipedia.org/wiki/Studly_caps)
```php

class Foo 
{

}

class FooBar 
{

}

class FooBarWhatever 
{

}
```


* Class constants MUST be declared in all upper case with underscore separators

```php

const DEFAULT_LANGUAGE   = en;
const STATUS_UNAVAILABLE = 3;

```

* Opening braces for classes MUST go on the next line, and closing braces MUST go on the next line after the body.

### Namespace

* When present, there MUST be one blank line after the namespace declaration.

* When present, all use declarations MUST go after the namespace declaration.

* There MUST be one use keyword per declaration.

* There MUST be one blank line after the use block.

* Namespaces and classes MUST follow an ["autoloading" PSR-0](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-0.md)

* Fully qualified class names MUST be used for classes that don't belong to any namespace, no need for `use` statements (f.e. \DateTime)

```php

$e = new \Exception('a bad thing just happened');

$date = new \DateTime();

```

### Methods

* Method names MUST be declared in [`camelCase`](http://en.wikipedia.org/wiki/CamelCase)

```php

public function testItShouldReturnAnItemCollection() 
{

}

public function isAvailable()
{

}
```

* Opening braces for methods MUST go on the next line, and closing braces MUST go on the next line after the body.

* Visibility MUST be declared on all methods.

* Method names MUST NOT be prefixed with a single underscore to indicate protected or private visibility.

* Method names MUST NOT be declared with a space after the method name. The opening brace MUST go on its own line, and the closing brace MUST go on the next line following the body. There MUST NOT be a space after the opening parenthesis, and there MUST NOT be a space before the closing parenthesis.

* In the argument list, there MUST NOT be a space before each comma, and there MUST be one space after each comma.

* Method arguments with default values MUST go at the end of the argument list.

* Argument lists MAY be split across multiple lines, where each subsequent line is indented once. When doing so, the first item in the list MUST be on the next line, and there MUST be only one argument per line.

* Chain calls on newline (`->`) SHOULD be aligned at least at the same level or in the most readable way:

    ``` php
    $someLongVarName = $object->longMethodNameWithSomeArguments($argumentOne, $argumentTwo, $argumentThree)
                              ->fooMethod($fooArgument)
                              ->barMethod($barArgument);

    $result = $connection->beginTransaction()
                            ->query("SELECT * FROM foo_table LOCK")
			                ->query("UPDATE foo_table SET bla=bla")
			             ->commit();
    ```

## Variables

* Variables names MUST be declared in [`camelCase`](http://en.wikipedia.org/wiki/CamelCase)

```php

$isAvailable = true;
$totalUsers  = 10;

```

* Variables declared on multiple lines MUST be aligned based on the longer variable name, that assignments MUST NOT be aligned together 
if they have a blank line in between

``` php

$bar              = 'bar';
$foo              = true;
$veryLongVariable = 1;

$veryLongVariableNames1 = 50;
$veryLongVariableNames2 = 100;
```

## Array

* Arrays SHOULD be declared with short PHP syntax.
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
Let's program to an interface, whenever we need the Logger, just pass the `LoggerInteface`

``` php
namespace Namshi\What\Ever;

use Psr\Log\LoggerInterface;

public function foo($firstArgument, $secondArgument, LoggerInterface $logger)
{

}

```

The logger argument MUST BE the last argument, preceding the first optional argument

When catching an exception and we use the `Logger`, we MUST provide the complete exception message 

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

## Naming

### Class

* Prefix abstract classes with Abstract. Please note some early Symfony classes do not follow this convention and have not been renamed for backward compatibility reasons. However all new abstract classes must follow this naming convention;

* Suffix interfaces with Interface;

* Suffix traits with Trait;

* Suffix exceptions with Exception;

* Avoid *List, *Mapping, *Collection etc suffix, use expressive names

Even if it could be better sometimes to avoid *Interface, *Handler, *Command etc suffix because the namespace is already
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


## Constants

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

## Services

From the [Symfony coding standards:](http://symfony.com/doc/current/contributing/code/standards.html#service-naming-conventions):

* A service name contains groups, separated by dots;
* The DI alias of the bundle is the first group (e.g. fos_user);
* Use lowercase letters for service and parameter names;
* A group name uses the underscore notation;
* Each service has a corresponding parameter containing the class name

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


## Project Structure

* Projects should contain generic files on their root, like the `.gitignore`, `composer.json`.

* Dependencies should be installed in the `src/vendor` directory via composer

* If there is a vagrant machine all the vagrant files should stay in the `vagrant` directory in the root project dir

* Directories should always have a singular name


## Random

### Building string, interpolation vs concatenation vs sprintf

Let's use sprintf if the string contains a variable that is an output of a function or method:

```php

$logger->log(sprintf('Total available stock per %s item is: %d', $item->getSKU(), $stock->getTotalQuantityFor($item));

```

If it's a simple variable let's use string interpolation for simplicity

```php

$logger->log("Total available stock per $sku is: $skuTotalStock");

```

or

```php
$logger->log("Total available stock per {$skus['GE12121212']} is: $skuTotalStock");
```

## PHPDOC
* All public methods should have a PHP Doc

* All classes should have a short description.

* The @package and @subpackage annotations are not used.

* For type-hinting in PHPDocs and casting, use bool (instead of boolean or Boolean), int (instead of integer), float (instead of double or real);

## Getter and Setter

Use getter and setter just when we need them, **when we really need to expose attributes and when
we don't have any logic that manipulates the attributes**.
Having getter and setter everywhere is like having public properties everywhere, breaking encapsulation.
I would like to enforce the concept of "unbreakable domain" and the proper usage of getter and setters is part of it.
There is no need to call a setter in the constructor.
If we need to put any logic in a getter or setter, a specific method should be created for that; the getter will then just forward the call
or we don't expose the getter at all.

A method SHOULD NOT start with `get` ot `set` if it's not related to a class attribute (e.g. use fetch, retrieve, load etc)
Two benefits major benfits with this approach:
- stronger domain
- better readability and less code -> simplicity
