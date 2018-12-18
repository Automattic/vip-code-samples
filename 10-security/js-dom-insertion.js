/**
 * Sample code for safer DOM manipulation with JavaScript and jQuery
 * 
 * 
 */

// obtain a value from a user form; this is potentially dangerous
var unsafeInput = $('#user-form').val();

var saferHtml = $('div');
// attach an id attribute and a text node
saferHtml.attr( 'id', 'user-input-safer' )
    .text( unsafeInput );
// the text node will have any HTML stripped

// attach the new div to the user-area div
$('#user-area').prepend( saferHtml );

// obtain a value from the query parameters - potentially unsafe and may be exploited in a bad way
var urlParams = new URLSearchParams( window.location.search );
console.log( urlParams.get( 's' ) );  // search input, e.g. "Thelonious Monk"

var js_user_area = document.getElementById( 'user-area' );
js_user_area.textContent = urlParams.get( 's' );