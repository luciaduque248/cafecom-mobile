const upstreamTransformer = require('@expo/metro-config/babel-transformer');

module.exports.transform = async ({ src, filename, options }) => {
  if (filename.endsWith('.svg')) {
    src = `export default ${JSON.stringify(src)};`;
  }

  return upstreamTransformer.transform({ src, filename, options });
};
