/// <reference types="webpack-env" />
const blocksContext = require.context('./', true, /[a-z-]+\/[a-z-]+\.ts$/);

blocksContext.keys().forEach((key: string) => {
  blocksContext(key);
});
