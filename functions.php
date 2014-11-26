<?php
/**
 * Load the style sheet from the parent theme.
 *
 */
function thine_parent_styles() {

	// Enqueue the parent stylesheet
	wp_enqueue_style( 'Thine-parent-style', get_template_directory_uri() . '/style.css', array('contact-form-7', 'rs-plugin-settings', 'uxbarn-google-fonts',
		'uxbarn-foundation', 'uxbarn-ionicons', 'uxbarn-flexslider', 'uxbarn-reset'), '0.1', 'all' );

	// Enqueue the parent rtl stylesheet
	if ( is_rtl() ) {
		wp_enqueue_style( 'Thine-parent-style-rtl', get_template_directory_uri() . '/rtl.css', array(), '0.1', 'all' );
	}

}
add_action( 'wp_enqueue_scripts', 'thine_parent_styles', 9 );
/*function load_all_styles() {

	wp_dequeue_style( );
	wp_dequeue_style( );
	wp_dequeue_style( );
	wp_dequeue_style( );
	wp_dequeue_style( );
	wp_dequeue_style( );
	wp_dequeue_style( 'uxbarn-theme-css'); // this is the main stylesheet
	wp_dequeue_style( 'uxbarn-theme-responsive-css');
	wp_dequeue_style( 'uxbarn-fancybox-css');
	wp_dequeue_style( 'uxbarn-fancybox-helpers-thumbs-css');
	wp_dequeue_style( 'uxbarn-isotope-css');
	wp_dequeue_style( 'uxbarn-theme-rev-styles-css');
	wp_dequeue_style( 'js_composer_front-css');
	wp_dequeue_style( 'js_composer_custom_css-css');
	wp_dequeue_style( 'uxbarn-isotope-css');
	wp_dequeue_style( 'uxbarn-isotope-css');
	wp_dequeue_style( 'uxbarn-isotope-css');

	wp_enqueue_style( 'uxbarn-theme-css', get_template_directory_uri() . '/style.css', array(), '0.1', 'all' );


}
add_action( 'wp_enqueue_scripts', 'load_all_styles', 9 );

*/

/**
 * Load the modified javascript for the theme
 *
 */
function thine_script_fix()
{
	//wp_register_script( 'uxbarn-theme', get_template_directory_uri() . '/js/thine.js', array( 'jquery', 'uxbarn-isotope' ), null, true );

    wp_deregister_script( 'uxbarn-theme' );
    wp_register_script( 'uxbarn-theme', get_stylesheet_directory_uri() . '/js/thine.js', array( 'jquery', 'uxbarn-isotope' ), null, true );
}
add_action( 'wp_enqueue_scripts', 'thine_script_fix' );
?>