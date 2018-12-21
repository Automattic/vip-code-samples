<?php
/**
 * output escaping examples
 * 
 * These are commonly used for building output in page templates
 */

// Common patterns - simple html
function spit_out_widget( $data ) {

	// esc_attr is for HTML attributes while esc_html is for HTML nodes

	// output a simple div with some content - this is a typical inline method
	// note the PHP close tag, and embedded PHP
	?>
	<div id="example-escaping-1" class="<?php echo esc_attr( $data['class'] ); ?>" data-post-id="<?php echo esc_attr( $data['id'] ); ?>">
		<?php echo esc_html( $data['body'] ); ?>
	</div>
	<?php // and another open tag

	// this is a more typical echo method
	echo '<div id="example-escaping-1" class="' . esc_attr( $data['class'] )
		. ' data-post-id="' . esc_attr( $data['id'] ) . '">'
		. esc_html( $data['body'] ) . '</div>'
		. PHP_EOL; // outputs a line feed

	// same thing, except with printf
	printf( '<div id="example-escaping-2" class="%s" id="%s">%s</div>' . PHP_EOL,
		esc_attr( $data['class'] ),
		esc_attr( $data['id'] ),
		esc_html( $data['body'] )
	);

}

// Special cases and exceptions

// the_title allows for HTML
function my_output_title() {

	// classically found in templates
	?>
	<h3><?php the_title(); ?></h3>
	<?php

	// do not use esc_html( get_the_title() ) - unnecessary and HTML will be escaped
	echo '<h3>' . get_the_title() . '</h3>'; // this is OK, but any HTML in the title will only be run throgh the the_title filter

	// using the_title in an attribute - this is also already escaped
	echo '<h3 alt="' . the_title_attribute() . '">' . get_the_title() . '</h3>';

}