<?php
/*
Plugin Name: Custom FAQ Block
Description: Блок часто задаваемых вопросов с аккордеоном.
Version: 1.0
Author: Emma
*/

function custom_faq_block_assets()
{
    wp_enqueue_script(
        'custom-faq-block-js',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
    );

    wp_enqueue_style(
        'custom-faq-block-style',
        plugins_url('build/style-index.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
    );
}

add_action('enqueue_block_assets', 'custom_faq_block_assets');