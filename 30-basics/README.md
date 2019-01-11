WordPress Basics
----------------

Some of the most common things to be aware of when developing for WordPress.

You'll find much more at [developers.wordpress.org](https://developer.wordpress.org/plugins/hooks/)

## Hooks and Filters

WordPress's hooks and filters are the key to extending WordPress without needing to
"hack" the core files.

You can use filters in your own code for the same purpose - allow feature extension
without needing to touch the core files of your theme or plugin.

### Style

Try to avoid using anonymous functions for filters or action hooks.
It's easier to manage and to remove a filter when it references a _callable_

Avoid
```php
add_filter( 'some_filter', function( $arg ) {
    return $arg + 1;
}, 10, 1)
```

Try to use the same style throughout your code for declaring hooks (filters & actions).

This will make it easier for others to maintain your code.

You can:
* declare all hooks in one place, and then define the functions in various files
* in a class, use an init or construct method that defines all applicable hooks
* declare the hook immediately above the function declaration, or
* declare the hook immediately after the function declaration

```php
// declaring a filter hook after the function declaration

// add foo to the body class
function my_filter_body_class( $classes ) {
    $classes[] = 'foo';
    return $classes;
}
add_filter( 'body_class', 'my_filter_body_class', 10, 2 );
```

### Callable

The second argument to the action of filter declaration is of type `Callable`. 
In PHP, that is not just a string that matches a function name, it can also be a
reference to a class method, or a namespace method, or a static method.

### Filters

When using a filter, *always* return something. Remember that there may be other filters hooked
in before and/or after your own filter.


Generally, in a filter:
* examine the arguments or state you need to, if applicable
* often if a condition you need is not met, you'll simply return the first argument
* if you do take action, you'll either modify, or replace, the first argument, and then return it
* it's best to always have a return statement at the end of the function

```php
// ** GOOD **
// filter the title conditionally
function my_fancy_title( $title, $id = null ) {
    // only filter a certain post
    if ( 2345 === $id ) {
        $title = $title + ' :smiley:';
    }
    return $title;
}
add_filter( 'the_title', 'my_fancy_title', 80, 2 );
```

Most common filter mistakes:
* not ensuring all conditions return a valid value
* returning something that the next filter can't handle
* declaring a hook that is not callable when the code runs

```php
// ** BAD **
// this will result in all titles becoming blank!
function my_fancy_title( $title ) {
    if ( 2345 === $id ) {
        return 'The Most Cleverest Title';
    }
}
```

#### Using a filter to turn something on or off

Here, your filter will always return null until someone (maybe you?) creates some code
somewhere that returns `true` which enables the conditional execution.

This is a common pattern in WordPress.

```php
function my_code_doing_stuff( $arg ) {
    if ( apply_filters( 'should_i_really', null ) ) {
        // then do it
    }
}
```


#### pre-defined filter hook

You can use these functions, instead of having to create a function:
* `__return_false` - returns false
* `__return_true` - returns true

There are many more in [wp-includes/functions.php](https://core.trac.wordpress.org/browser/tags/5.0/src/wp-includes/functions.php#L4905)

(The source code for WordPress is a great place to learn more about how WordPress works)

For the example above:
```php
// enable doing stuff
add_filter( 'should_i_really', '__return_true' );
```

### Actions

Actions are pretty much like filters, except they do not return a chained value

There are multiple uses for actions. The most common:
* within a template, to allow some other code to insert HTML
* during a process, such as saving a post, to allow code to modify global state

It's important to understand the use case of the action since it'd be inappropriate to
echo HTML during `pre_get_posts`


Most common mistakes with hooks and filters:
* not handling the correct number of arguments
* mixing up the priority and argument count
* in a class, forgetting to use a valid callable e.g. `[ $this, 'method' ]`
* using a static callable instead of an instance, or vice versa
* failing to return something from a filter hook