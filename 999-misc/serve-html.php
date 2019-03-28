<?php

/**
 * Serve static html from a directory
 * 
 * $html_map array maps the PATH to the file
 * the URL used should not have a file extension
 * The files should have a .html extension
 * the hook must happen early (e.g, in init)
 * e.g. http://mysite.com/howdy/world/ will serve __DIR__/docs/howdy.html
 */
add_action( 'init', 'sc_vip__serve_file' );

function sc_vip__serve_file() {
        $html_map = [
                'howdy/world' => 'howdy',
        ];
 
        // extract the path and validate it against the $html_map keys
        $current_path = wp_parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH );

        if ( in_array( $current_path, array_keys( $html_map ), true ) ) {
                // serve the contents of the whitelisted file
                $filename = $html_map[ $current_path ];
                $contents = file_get_contents( __DIR__ . '/docs/' . $filename . '.html' );
                echo $contents;
                exit;
        }
}