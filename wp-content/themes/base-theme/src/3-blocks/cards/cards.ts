const blocks = require('@wordpress/blocks');
import './cards.scss'; // Import editor+frontend styles if needed

const { registerBlockType } = blocks;

registerBlockType('base-theme/cards', {
  title: 'Cards',
  icon: 'grid-view',
  category: 'common',
  edit: () => null,
  save: () => null, // Dynamic Twig block
});

