Prevention
----------

Fatal errors can bring down an entire site. One can't be too cautious.

Here are some examples that can result in unwanted outages.

The accompanying code examples show how to avoid them.

## [Fatal Errors](prevention-fatal.php)

### Functions colliding

PHP will throw a fatal error if you declare a function that already exists.

A function might exist in PHP, WordPress core, or in a plugin or theme.

This function already exists in WordPress and an error will be thrown when this is declared:

```php
// this will cause a fatal
function get_permalink( $url ) {
    // do something
}
```

The best way to protect against collisions is to wrap their declaration with `function_exists`

Anothe technique that works is to use a namespace, although this tends to introduce complexity.
Using a class object and declaring methods is another way to avoid collisions.

### Functions that do not exist

PHP will also throw a fatal error if you try to access a function that hasn't been declared.

One way this can happen is when the function is declared in a plugin, but the plugin is not installed
or active.

```php
// this will cause a fatal if Safe Redirect Manager is not active
$redirect = srm_create_redirect( '/old/', '/new/', 301);
```

It's especially important, when creating a plugin that relies on another plugin, to check for and avoid this.

Also, because WordPress doesn't load certain (wp-admin) files for the front end, it's sometimes worth checking
for that function and manually loading the file if necessary.

Another cause is from typos - hard to avoid, so some "smoke testing" is always useful.
And the more unlikely causes of undeclared functions are caused by not using a namespace prefix where necessary

## [Warnings](prevention-warnings.php)

PHP warnings and noticed won't necessarily cause problems for a site, but their presence suggests there's something
that needs attention. Eliminating all warnings and notices is Good Practice and makes it easy to spot new issues
in the PHP error_log. Having a lot of unnecessary warnings in the log will get in the way, clog your logs, use
disk space, and make it hard to find and address new problems.

Using `WP_DEBUG` in development and displaying warnings and notices is a good development practice - warning
conditions should be immediately obvious and can be quickly addressed and corrected.

Here are some of the most common warnings or notices, and example code that causes them:

### Not checking return values

Accessing an array without making sure it is an array
```php
// expecting an array
$stuff = getStuff( $args );
// unless getStuff is guaranteed to always return an array, this is not good...
foreach ( $stuff as $thing ) { // Invalid argument supplied for foreach()
    // actions
}
// this is common and also not good without checking $stuff:
$thing1 = $stuff[0];
// even worse
$thing_name = $stuff[0]->getName();
```

Using anything that is not a scalar as an index
```php
$redirect_to = [ 'foo' => 'foo.com', 'bar' => 'bar.com' ];
$c = get_categories(); // returns an array

// (other code that fails to convert $c to a single string)

// this will fail because $c is an array
$redirect_url = $redirect_to[ $c ];
```

Accessing objects that may not be what was expected
```php
// expecting an object
$something = getSomething( $id );
// if $something is null, this is not going to work
$something->doIt();
```

Certain functions return WP_Error when they fail. It's important to check that condition.

```php
$categories = get_the_terms( $post->ID, 'category' );
// if the result is WP_Error, this next line will throw warnings
foreach ( $categories as $category ) {
    $cats[] = $category->name;
}
```

