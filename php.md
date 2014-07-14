# Coding standards and recommendations for PHP development

## CS standards

This guide extends [PSR-2] and changes some of the statements in favor of better
  readability (sacrificing some style consistencies).


The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and
  "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](http://www.ietf.org/rfc/rfc2119.txt).

[PSR-2]: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md


Overview
________

- Code MUST follow [PSR-2] guide unless stated otherwise

- There MUST be one blank line before namespace declaration

- There MUST NOT be whitespaces in the empty line

- There SHOULD be doc-block with description for all public methods. Constructor is exception here unless it accepts scalar
  or array parameters

- Double quotes SHOULD NOT be used unless you need its functionality (string interpolation, escape sequences)

- Assignments statements MUST be aligned by equals operator

- Fully qualified class names MUST be used for classes that don't belong to any namespace, no need for `use` statements
  (f.e. \DateTime)

- It is RECOMMENDED to add doc-block typehints in the code where type of the object is not obvious or to make a hint for IDE

- Method arguments MAY be placed on different lines. More than one argument MAY take place in one line in this case
  (one argument per line is not enforced)

- Lines SHOULD be 120 characters or less

- Exclamation mark in (negating operator) MUST be prepended and followed with one whitespace

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


Recommendations
---------------

- Avoid usage of highly-dynamic code, it has such downsides as: it's difficult to understand, it's difficult to debug,
  it's difficult to refactor involved code, and it's very error prone (TODO add an example)

- Use string interpolation instead of concatenation. Don't worry about performance, it's almost the same while interpolation
  is much more readable

- Do not override constants in classes - this is just a joke that PHP has such ability. Constants are not meant to be changed,
  when you override constant you break [LSP](http://en.wikipedia.org/wiki/Liskov_substitution_principle) and possibly kill some
  kittens. If you feel like you need to override constant - you probably need to use [abstract] method in your parent class

- Use xdebug for debugging, you'll spend some time setting it up (or you can ask me for help) but in the end you'll be able to
  debug your app million times faster and the most important thing - you'll be able to quickly understand some complex parts
  of code watching how variables and states change

- Use last stable version of PHPStorm

- If you use PHPStorm (which is very likely) - install a Symfony plugin from plugins repository, configure it to use your
  container, routes, and all that stuff which you can find in `File -> Settings -> Symfony2 Plugin`. In the end you'll be able
  to quickly jump from service definitions to the source class of the service and vice-versa, from actions to routes, etc.
  In the end it will help you a lot

- Turn on all sane inspections for PHP in PHPStorm. Always pay attention to red or yellow highlights - it could be some
  bug. You can think that most of the time it's just annoying and it's not saying anything really important, but if it saves your
  ass once in one hundred of times you better use it. I would suggest to correct any code you see that has any warnings from
  PHPStorm - that way you will get good static analysis tool which will help you in finding some bugs and will prevent
  introducing the new ones

- Love PHPStorm. And - first follow logic, and only then - standards and recommendations
