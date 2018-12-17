<?php

// This code is from https://developer.wordpress.org/plugins/security/data-validation/#example-1
// TODO clean up the PHPCS warnings and formatting

/**
 * validate a US Zip Code
 * 
 * @param string $zip_code possible ZIP Code for validation
 * @return boolean true if a valid ZIP format, false otherwise
 */

function is_us_zip_code( $zip_code ) {
    // scenario 1: unset etc
    if ( empty( $zip_code ) ) {
        return false;
    }
 
    // scenario 2: more than 10 characters
    if ( strlen( trim( $zip_code ) ) > 10 ) {
        return false;
    }
 
    // scenario 3: incorrect format (USA zip is 5 digits or 5+4)
    if ( !preg_match( '/^\d{5}(\-?\d{4})?$/', $zip_code ) ) {
        return false;
    }
 
    // passed successfully
    return true;
}

if ( isset( $_POST['wporg_zip_code'] ) && is_us_zip_code( sanitize_text_field( $_POST['wporg_zip_code'] ) ) ) {
    // your action
    $zip = sanitize_text_field( $_POST['wporg_zip_code'] );
}
