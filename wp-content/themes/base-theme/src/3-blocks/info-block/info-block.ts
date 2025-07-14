const blocks = require('@wordpress/blocks');
import * as element from '@wordpress/element';
import './info-block.scss';

const { registerBlockType } = blocks;
const { createElement } = element;

registerBlockType('base-theme/info-block', {
  title: 'Info Block',
  icon: 'info',
  category: 'common',
  edit: () => {
    return createElement('p', null, 'Cards block in editor');
  },
  save: () => null, // Dynamic Twig block
});
