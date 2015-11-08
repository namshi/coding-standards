# PHP coding standards @Namshi 

This guide describes the set of rules we apply at Namshi in our PHP codebase.

## Formatting

We follow the [PSR-2 standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md)
In order to automate the formatting process we use the [PHP cs-fixer](http://cs.sensiolabs.org/) with level "symfony" that contains (other than the PSR-2 standard):

- concatenation should be used without spaces
- operator => should not be arounded by multi-line whitespaces
- no duplicated semicolons
- a return statement wishing to return nothing should be simply "return"
- no extra empty lines
- include and file path should be divided with a single space. File path should not be placed under brackets
- PHP multi-line arrays should have a trailing comma
- the namespace declaration line shouldn't contain leading whitespace
- all instances created with new keyword must be followed by braces
- operators should be arounded by at least one space
- all items of the @param phpdoc tags must be aligned vertically
- an empty line feed should precede a return statement
- PHP single-line arrays should not have trailing comma.
- single-line whitespace before closing semicolon are prohibited
- a single space should be between cast and variable
- unused use statements must be removed

For more informations check the [Symfony coding standard](http://symfony.com/doc/current/contributing/code/standards.html)
Other than PSR-2 and the symfony level fixers we follow these conventions:

- align double arrow symbols in consecutive lines
- align consecutive equals
- concatenation should be used with at least one whitespace around
- ordering use statements
- PHP array's should use the PHP 5.4 short-syntax

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

* A method SHOULD NOT start with get or set if it's not related to a class attribute or a service (e.g. getDoctrine, getLogger).
* Use the load or a find prefix (if it's a collection/repository method call) (e.g. loadSalesOrder, findCustomerByName )

Two major benefits with this approach:
- stronger domain
- better readability and less code -> simplicity
