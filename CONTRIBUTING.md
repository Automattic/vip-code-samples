# Contributing

Thank you for thinking about contributing to Sample Code VIP! Here are some guidelines while getting started.

If you see something that needs improvement or is incorrect, please open an issue.

And if you have some example code that helps with something we haven't touched on here, or is a better approach, please open a pull request.

While writing an example, please keep in mind that users will be copy/pasting this code and then adapting it to their theme or plugin, the code is the main focus, but please consider:

## Docblock

Docblock'ing all functions and filters to [WordPress Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/) may make the snippets seem overwhelming. Keep comments single line when possible, but do include Docblocks on the main subject and include relevant `@see` links. For example if our subject was nonces in an options page, we'll comment everything, but only Blockdoc the nonces:

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

For consistency, avoid `my_*`, `your_`, or `awesome_theme_` type prefixes.

The user should replace the prefix when implementing the code, but without including a prefix we increase the risk of name collisions from a user who forgets to add their own. To that end, when possible always prefix with `sc_vip__`

```php
add_action( 'init', 'sc_vip__load_site' );

function sc_vip__load_site() {
    // ...
}
```

### VIPCS

All code included should be compliment with WordPress-VIP-Go sniffs from [VIPCS](https://github.com/Automattic/VIP-Coding-Standards),

Avoid `// phpcs:ignore` as this encourages silencing instead of fixing.

### ESLint

All JS should comply with [eslint-config-wpvip](https://github.com/Automattic/eslint-config-wpvip) standards.