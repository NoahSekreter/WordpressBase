const blocks = require('@wordpress/blocks');
import * as element from '@wordpress/element';
import './icon-display.scss';

const { registerBlockType } = blocks;
const { createElement } = element;

registerBlockType('base-theme/icon-display', {
  title: 'Icon Display',
  icon: 'image-filter',
  category: 'common',
  edit: () => {
    return createElement('p', null, 'Icon Display in editor');
  },
  save: () => null, // Dynamic Twig block
});
