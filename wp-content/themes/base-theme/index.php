<?php

use Timber\Timber; 


$context = Timber::context();
$post_type = get_post_type() ?: 'page';

Timber::render(["src/5-pages/{$post_type}/{$post_type}.twig"], $context);

// $html = Timber::compile($templates, $context);
// enqueue_component_styles_from_html($html);
// echo $html;
