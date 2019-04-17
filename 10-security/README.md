Security
--------

The examples here are meant to supplement materials in the [developer handbook](https://developer.wordpress.org/plugins/security/data-validation/) and demonstrate current practices.


### [input sanitization and validation](input-sanitization.php)
Input sanitization ensures that code is only handling safe and expected values of input.

### nonces
A nonce ensures that the action being taken in a form came from the form and was intended by the user.

### [output escaping](output-escaping.php)
Output escaping is meant to prevent XSS and similar attacks.

WordPress provides a vast set of helpful escaping tools to avoid this on the server.

### [safe DOM manipulation](js-dom-insertion.js)
Since html inserted in the DOM (typically with JavaScript) is executed by the browser, it's important to insert unknown content in a secure manner.

For example:
```javascript
var myMessage = data[i]['message'];
jQuery('#message').html( myMessage );
```
will generate a PHPCS warning:
`my-bad-code.js#L55 : Any HTML passed to 'html' gets executed. Make sure it's properly escaped.`

and, if myMessage happens to be the string `'<script>alert('hello');</script>'`, that code will be executed.

This can be particularly dangerous if the data being inserted comes from the URL (e.g. a query param) or a data source that is not under your control.

See the code sample for how to overcome this.

### [Escaping Dynamic JavaScript Values](js-dynamic.php)

When it comes to sending dynamic data from PHP for JavaScript, care must be taken to ensure values are properly escaped. All values should be encoded and possibly decoded using variety of functions.

```php
<script type="text/javascript">
    /* ❌ These approaches are incorrect */
    var name  = '<?php echo $name; ?>';
    var title = '<?php echo esc_js( $title ); ?>';
    var url   = '<?php echo esc_url( $url ); ?>';
    var html  = '<?php echo '<h1>' . $title . '</h1>'; ?>';
    var obj   = <?php echo wp_json_encode( $array ); ?>;
</script>
```

In the snippet above:

* if `$name;` had an exploited value like `'; alert(1); //`, our script would be modified and an XSS attack would be possible
* the `esc_js()` function was originally built for inline attributes (like `onclick`) it is not secure enough for uses outside of attributes
* `esc_url()`'ing a value does make it harder to exploit, however the value should still be encoded
* HTML should not be construction or added to the DOM via Javascript as a string, this leaves the site vulnerable to XSS attacks. The `$title` value should be escaped and encoded, then the `<h1>` element should be created in JS, and the title text node added.
* When sending objects, we need to ensure the values are properly encoded

See [the code sample](js-dynamic.php) for how to properly encode and prepare these values.