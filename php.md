# Coding standards and recommendations for PHP development

## CS standards

This guide extends [PSR-2] and changes some of the statements in favor of better
  readability (sacrificing some style consistencies).


The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and
  "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](http://www.ietf.org/rfc/rfc2119.txt).

[PSR-2]: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md


Overview
________

- Code MUST follow [PSR-2] standard unless stated otherwise

- There MUST be one blank line before namespace declaration

- There MUST NOT be whitespaces in the empty line

- There SHOULD be doc-block with description for all public methods. Constructor is exception here unless it accepts scalar
  or array parameters in which case you need to state what types exactly it expects

- Double quotes SHOULD NOT be used unless you need its functionality (string interpolation, escape sequences)

- Assignment statements MUST be aligned by equals operator if they don't have a blank line in between

- Fully qualified class names MUST be used for classes that don't belong to any namespace, no need for `use` statements
  (f.e. \DateTime)

- It is RECOMMENDED to add doc-block typehints in the code where type of the object is not obvious or to make a hint for IDE

- Method arguments MAY be placed on different lines. More than one argument MAY take place in one line in this case
  (one argument per line is not enforced and often less readable)

- Lines SHOULD NOT be more than 120 characters in width

- Exclamation mark (negating operator) MUST be prepended and followed with one whitespace

- Cast operator (f.e. `(int)`) MUST NOT be followed by whitespace

- Chain calls on newline (`->`) SHOULD be aligned at least with one tabulation after the current indentation level or in the most
  readable way:

  ``` php
  $someLongVarName = $object->longMethodNameWithSomeArguments($argumentOne, $argumentTwo, $argumentThree)->fooMethod($fooArgument)
      ->barMethod($barArgument);

  $result = $connection->beginTransaction()
      ->query("SELECT * FROM foo_table LOCK")
      ->query("UPDATE foo_table SET bla=bla")
  ->commit();
  ```

- Quotes MUST NOT be used in yaml configuration for class names

- ClassName::class SHOULD be used to get FQCN of the ClassName instead of string literal (`'Namespace\ClassName'`)

- Getters or setters SHOULD NOT be created unless you have a real reason for it: hiding some functionality (f.e. lazy getter),
  hiding real fields of the class, or public interfaces for classes, or there's a possibility of adding logic to them in
  derivative classes. In most other cases it's usually redundant to have these methods:

  ``` php
  class SomeServiceClass
  {

      protected $serviceDependency;

      public function __construct($serviceDependency)
      {
          // Your service is immutable and locked on its dependency, that's why
          // you don't need a setter - constructor is the only place where you
          // need to set it.
          // Getter is not needed unless you have a reason to have it: for example
          // to expose it to as a public method (which falls under public interfaces category)
          $this->serviceDependency = $serviceDependency;
      }

  }

  class SomeDataObject
  {

      protected $dataField;

      public function __construct($dataField)
      {
          $this->dataField = $dataField;
      }

      public function getDataField()
      {
          return $this->dataField;
      }

      // You probably don't need setter, if this data should be locked down
      // in this object and never changed [from outside] - f.e. SalesOrder::$orderNr
      // And there's cases when you actually need it - f.e. SalesOrder::$shippingMethod
      [public function setDataField($dataField)
      {
          $this->dataField = $dataField;
      }]

  }
  ```

- There MUST NOT be redundant comments in the code: class name before class definition, @package annotations, etc.

- Protected methods MUST go after public methods. Private methods MUST go after protected methods. The same applies to
  properties. Constructor, if presented, MUST be the first method of the class

- Relationships in Doctrine entities MUST go after regular (scalar type) columns


Recommendations
---------------

- Avoid usage of highly-dynamic code, it has such downsides as: it's difficult to understand, it's difficult to debug,
  it's difficult to refactor involved code, and it's very error prone (TODO add an example)
  ``` php

  // This class will be very hard to refactor or change any logic, because it's hard to find all the codepaths
  class WrongStrategyImplementation extends ClassWithAnotherDozenOfDoSomethingMethods
  {

      public function doSomethingBasedOnTheArgument($argument)
      {
          $methodName = "do$argument";

          if (method_exists($this, $methodName)) {
              return $this->$methodName();
          }
      }

      protected function doThis() { }

      protected function doThat() { }

  }

  // This strategy implementation will be a lot easier to refactor because you just need to find all the
  // implementors of a given interface
  interface Strategy
  {

      public function doSomething();

  }

  class StrategyImplementor implements Strategy { ... }

  class StrategyExecutor
  {

      /**
       * @var Strategy[]
       */
      protected $strategies;

      public function __constructor(array $strategies)
      {
          $this->strategies = $strategies;
      }

      public function executeStrategy($argument)
      {
          // plus some sane checks
          return $this->strategies[$argument]->doSomething();
      }

  }

  ```

- Use string interpolation instead of concatenation. Don't worry about performance, it's almost the same while interpolation
  is much more readable

- Do not override constants in classes - this is just a joke that PHP has such ability. Constants are not meant to be changed,
  when you override constant you can break [LSP](http://en.wikipedia.org/wiki/Liskov_substitution_principle) in some cases.
  If you feel like you need to override constant - you probably need to use [abstract] method instead of constant

- Use xdebug for debugging, you'll spend some time setting it up but in the end you'll be able to
  debug your app million times faster and the most important thing - you'll be able to quickly understand some complex parts
  of code watching how variables and states change

- Use last stable version of PHPStorm and install a Symfony plugin from plugins repository, configure it to use your
  container, routes, and all that stuff which you can find in `File -> Settings -> Symfony2 Plugin`. In the end you'll be able
  to quickly jump from service definitions to the source class of the service and vice-versa, from actions to routes, etc.
  It will help you a lot

- Turn on all sane inspections for PHP in PHPStorm. Always pay attention to red or yellow highlights - it could be some
  bug. You can think that most of the time it's just annoying and it's not saying anything really important, but if it saves your
  ass once in one hundred of times you better use it. I would suggest to correct any code you see that has any warnings from
  PHPStorm - that way you will get good static analysis tool which will help you in finding some bugs and will prevent
  introducing the new ones

- Create two projects in your IDE - one for cerberus only and one for the whole soa. This way it'll be a lot easier to work
  with cerberus, also I would suggest excluding `app/cache` and `app/logs` directories if you're using PHPStorm
  (right click -> Mark Directory As -> Excluded) and to remove the bootstrap file. Caches and logs are excluded so that IDE
  won't need to reindex this stuff when something changes there (and it happens a lot), and without bootstrap file you'll
  find that it's easier to debug some Symfony files - because in case of bootstrap you'll see a mess of combined
  classes in one file
