//client/config-overrides.js
module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  // Add allowedHosts configuration
  if (config.devServer) {
    config.devServer.allowedHosts = 'all'; // Allows any host
  }

  return config;
};
