<?php

// This code is from https://developer.wordpress.org/plugins/security/data-validation/#example-1
// TODO clean up the PHPCS warnings and formatting

function is_us_zip_code($zip_code) {
    // scenario 1: empty
    if (empty($zip_code)) {
        return false;
    }
 
    // scenario 2: more than 10 characters
    if (strlen(trim($zip_code)) > 10) {
        return false;
    }
 
    // scenario 3: incorrect format
    if (!preg_match('/^\d{5}(\-?\d{4})?$/', $zip_code)) {
        return false;
    }
 
    // passed successfully
    return true;
}

if (isset($_POST['wporg_zip_code']) && is_us_zip_code($_POST['wporg_zip_code'])) {
    // your action
}
