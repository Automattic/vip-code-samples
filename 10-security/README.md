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
```
var myMessage = data[i]['message'];
jQuery('#message').html( myMessage );
```
will generate a PHPCS warning:
`my-bad-code.js#L55 : Any HTML passed to 'html' gets executed. Make sure it's properly escaped.`

and, if myMessage happens to be the string `'<script>alert('hello');</script>'`, that code will be executed.

This can be particularly dangerous if the data being inserted comes from the URL (e.g. a query param) or a data source that is not under your control.

See the code sample for how to overcome this.
