/// <reference types="webpack-env" />
const blocksContext = require.context('./', true, /[a-z-]+\/[a-z-]+\.ts$/);

blocksContext.keys().forEach((key: string) => {
  blocksContext(key);
});

const { registerBlockType } = require('@wordpress/blocks');
const { createElement, Fragment } = require('@wordpress/element');
const { InspectorControls } = require('@wordpress/block-editor');
const { PanelBody, TextControl } = require('@wordpress/components');

registerBlockType('base-theme/cards', {
  title: 'Cards',
  description: 'Displays up to 3 cards in a row.',
  category: 'widgets',
  attributes: {
    title: { type: 'string', default: 'Default Title' },
    subtitle: { type: 'string', default: '' },
  },
  edit: ({
    attributes,
    setAttributes,
  }: {
    attributes: { title: string; subtitle: string };
    setAttributes: (attrs: Partial<{ title: string; subtitle: string }>) => void;
  }) => {
    return createElement(Fragment, {},
      createElement(InspectorControls, {},
        createElement(PanelBody, { title: 'Card Settings', initialOpen: true },
          createElement(TextControl, {
            label: 'Title',
            value: attributes.title,
            onChange: (value: string) => setAttributes({ title: value }),
          }),
          createElement(TextControl, {
            label: 'Subtitle',
            value: attributes.subtitle,
            onChange: (value: string) => setAttributes({ subtitle: value }),
          })
        )
      ),
      createElement('div', {}, `Preview: ${attributes.title}`)
    );
  },
  save: () => null, // Dynamic: rendered in PHP/Twig
});
