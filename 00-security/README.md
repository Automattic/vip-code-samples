Security
--------

The examples here are meant to supplement materials in the [developer handbook](https://developer.wordpress.org/plugins/security/data-validation/) and demonstrate current practices.


### [input sanitization and validation](input-sanitization.php)
Input sanitization ensures that code is only handling safe and expected values of input.

### output escaping
Output escaping is meant to prevent XSS and similar attacks

### safe DOM manipulation
Since html inserted in the DOM is executed by the browser, it's important to insert unknown content in a secure manner.

For example:
```
var myMessage = data[i]['message'];
jQuery('#message').html( myMessage );
```
will generate a PHPCS warning:
`my-bad-code.js#L55 : Any HTML passed to 'html' gets executed. Make sure it's properly escaped.`

See the code sample for how to overcome this.

### nonces
A nonce ensures that the action being taken in a form came from the form and was intended by the user.
