// Establish array of folders to search for components
const componentFolders = [
  '2-elements',
  '3-blocks',
  '4-sections',
  '5-pages',
];

// Dynamically load component assets (i.e. styles & scripts)
document.addEventListener('DOMContentLoaded', async () => {
  // Get an array of all components through their 'data-component' variable
  const components = document.querySelectorAll<HTMLElement>('[data-component]');

  // Go through each collected component
  for (const el of Array.from(components)) {
    const name = el.dataset.component;
    if (!name) continue;

    // Check each component folder for a matching component name
    for (const folder of componentFolders) {
      try {
        const module = await import(
          /* webpackChunkName: "[request]" */
          `./${folder}/${name}/${name}.ts`
        );
        if (module.default && typeof module.default === 'function') {
          module.default(el);
          break;
        }
      } catch (_) {
        // Try next folder
      }
    }
  }
});
