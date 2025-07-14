<?php

require_once ABSPATH . 'vendor/autoload.php';

use Timber\Timber;

Timber::init();
Timber::$dirname = [
  [
    'src',
    'src/2-elements/',
    'src/3-blocks/',
    'src/4-sections/',
    'src/5-pages/',
  ],
];

// Get data from manifest.json & the dist uri
$manifest = json_decode(file_get_contents(get_template_directory() . '/dist/manifest.json'), true);
$dist_uri = get_template_directory_uri() . '/dist';

// Establish global styles
function enqueue_template_assets($template = 'base') {
  global $manifest, $dist_uri;

  if (isset($manifest["$template.js"])) {
    wp_enqueue_script("theme-$template-js", $dist_uri . '/' . $manifest["$template.js"], [], null, true);
  }

  if (isset($manifest["$template-style.css"])) {
    wp_enqueue_style("theme-$template-css", $dist_uri . '/' . $manifest["$template-style.css"]);
  }
}
add_action('wp_enqueue_scripts', function() { enqueue_template_assets(); });

// Establish theme menus
add_action('after_setup_theme', function () {
  register_nav_menus([
    'menu--primary' => 'Primary Menu',
    'menu--footer' => 'Footer Menu'
  ]);
});

// Establish theme contexts
add_filter('timber/context', function ($context) {
  $config_path = get_template_directory() . '/theme-config.json';

  // Get global theme variables
  if (file_exists($config_path)) {
    $json = file_get_contents($config_path);
    $context['theme_settings'] = json_decode($json, true);
  } else {
    $context['theme_settings'] = []; // fallback
  }

  // Add the current post (if it exists)
  if (is_singular()) { $context['post'] = Timber::get_post(); }

  // Add the current post type
  if (get_post_type()) { $context['post_type'] = get_post_type(); }

  $context['site'] = Timber::context()['site']; // Ensure site context is included
  $context['current_user'] = wp_get_current_user();

  $context['menu_primary'] = Timber::get_menu('menu--primary', [ 'depth' => 3 ]);
  $context['menu_footer'] = Timber::get_menu('menu--footer');

  return $context;
});

function base_theme_get_manifest_entry($file) {
  $manifest_path = get_template_directory() . '/dist/manifest.json';
  if (!file_exists($manifest_path)) return false;

  $manifest = json_decode(file_get_contents($manifest_path), true);
  
  return $manifest[$file] ?? false;
}

add_action('enqueue_block_editor_assets', function () {
  $editor_js = base_theme_get_manifest_entry('editor.js');

  if ($editor_js) {
    wp_enqueue_script(
      'base-theme-blocks-editor',
      get_template_directory_uri() . '/dist/' . $editor_js,
      ['wp-blocks', 'wp-element', 'wp-editor'],
      null,
      true
    );
  }
});

add_action('init', function () {
  register_block_type('base-theme/cards', [
    'render_callback' => function ($attributes, $content) {
      return Timber::compile('3-blocks/cards/cards.twig', [
        'attributes' => $attributes,
        'content' => $content,
      ]);
    }
  ]);

  register_block_type('base-theme/icon-display', [
    'render_callback' => function ($attributes, $content) {
      return Timber::compile('3-blocks/icon-display/icon-display.twig', [
        'attributes' => $attributes,
        'content' => $content,
      ]);
    }
  ]);

  register_block_type('base-theme/info-block', [
    'render_callback' => function ($attributes, $content) {
      return Timber::compile('3-blocks/info-block/info-block.twig', [
        'attributes' => $attributes,
        'content' => $content,
      ]);
    }
  ]);
});
