<?php

// If the Timber plugin isn't activated, print a notice in the admin.
if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		} );
	return;
}


// Create our version of the TimberSite object
class StarterSite extends TimberSite {

	// This function applies some fundamental WordPress setup, as well as our functions to include custom post types and taxonomies.
	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'init', array( $this, 'register_menus' ) );
		add_action( 'init', array( $this, 'register_widgets' ) );
		parent::__construct();
	}



	// Access data site-wide.

	// This function adds data to the global context of your site. In less-jargon-y terms, any values in this function are available on any view of your website. Anything that occurs on every page should be added here.

	function add_to_context( $context ) {

		// Our menu occurs on every page, so we add it to the global context.
		$context['menu'] = new TimberMenu('main-navigation');

		// This 'site' context below allows you to access main site information like the site title or description.
		$context['site'] = $this;
		return $context;
	}

	// Here you can add your own fuctions to Twig. Don't worry about this section if you don't come across a need for it.
	// See more here: http://twig.sensiolabs.org/doc/advanced.html
	function add_to_twig( $twig ) {
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter( 'myfoo', new Twig_Filter_Function( 'myfoo' ) );
		return $twig;
	}

}

new StarterSite();


/*
 *
 * My Functions (not from Timber)
 *
 */

// Enqueue scripts
function my_scripts() {

	// Use jQuery from a CDN
	wp_deregister_script('jquery');
	wp_register_script('jquery', 'https://code.jquery.com/jquery-3.3.1.min.js', array(), null, true);

	// Enqueue our stylesheet and JS file with a jQuery dependency.
	// Note that we aren't using WordPress' default style.css, and instead enqueueing the file of compiled Sass.
	wp_enqueue_style( 'my-styles', get_template_directory_uri() . '/assets/css/main.css', 1.0);
	
	wp_enqueue_script ( 'jquery-ui', get_template_directory_uri() . '/assets/js/jquery-ui.min.js', array('jquery'), '1.0.0', true);
	wp_enqueue_script( 'main', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0.0', true );
	wp_enqueue_script( 'theme', get_template_directory_uri() . '/assets/js/theme.js', '1.0', true);
	wp_localize_script( 'ajax-pagination', 'ajaxpagination', array(
		'ajaxurl' => admin_url( 'admin-ajax.php' )
	));

}

add_action( 'wp_enqueue_scripts', 'my_scripts' );




add_filter( 'timber_context', 'mytheme_timber_context'  );

function mytheme_timber_context( $context ) {
    $context['options'] = get_fields('option');
    return $context;
}


if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page(array(
		'page_title' 	=> 'Homepage Content',
		'menu_title'	=> 'Homepage Content',
		'menu_slug' 	=> 'homepage-content',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
}

// REMOVE WP EMOJI
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );