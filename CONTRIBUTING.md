# Contributing

Thank you for thinking about contributing to Sample Code VIP! Here are some guidelines while getting started.

If you see something that needs improvement or is incorrect, please [open an issue](https://github.com/Automattic/sample-code-vip/issues).

And if you have some example code that helps with something we haven't touched on here, or is a better approach, please open a pull request.

### README vs .PHP File

The README files should explain the subject and possibly demonstrate bad examples. The correct way to approach things, the good stuff, should be placed in a linked to .php file. This allows folks to read the details and see explanations within the READMEs, then use the .php code (and modify it) in their own code. It's best to keep bad examples out of the .php files.

While writing an example, please keep in mind that users will be copy/pasting this code and then adapting it to their theme or plugin. When writing .php files, be sure when possible to write the examples in a way that the code can be copied and pasted into a theme or plugin and actually work with no or minimal adjustments.

## Docblock

Docblock'ing all functions and filters to [WordPress Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/) may make the snippets seem overwhelming. Keep comments single line when possible, but do include Docblocks on the main subject and include relevant `@see` links. For example if our subject was nonces in an options page, we'll comment what we need to help explain, but only Blockdoc the main subject, nonces:

```php
// Create menu page.
add_action( 'admin_menu', function() {
	$page_hook_suffix = add_menu_page(
		'Page Title',
		'Menu Title',
		'publish_posts',
		'page_id',
		'callback'
	);
} );

// Contents for the Ajax Form menu page.
function callback() {
	/**
	 * Create the nonce for our admin page.
	 *
	 * Include the action name for context.
	 *
	 * @see https://codex.wordpress.org/Function_Reference/wp_create_nonce
	 */
	$ajax_nonce = wp_create_nonce( "action_name" );

	// ..
}
```

### Prefixing

In case the user forgets to add their own prefix while implementing the code, all functions and classes should include a prefix to help avoid name collisions. For consistency, avoid `my_`, `your_`, or `awesome_theme_` type prefixes, were possible prefix with `vip__`.

```php
add_action( 'init', 'vip__load_site' );

function vip__load_site() {
    // ...
}
```

### VIPCS

All code included should be compliant with WordPress-VIP-Go sniffs from [VIPCS](https://github.com/Automattic/VIP-Coding-Standards).

Please avoid `// phpcs:ignore` as this encourages silencing instead of fixing.

### ESLint

All JS should comply with [eslint-config-wpvip](https://github.com/Automattic/eslint-config-wpvip) standards.
