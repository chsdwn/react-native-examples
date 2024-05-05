const { ConfigPlugin, withPlugins } = require('@expo/config-plugins');

const withUpdateAppBuildGradle = require('./android/withUpdateAppBuildGradle');
const withUpdateProjectBuildGradle = require('./android/withUpdateProjectBuildGradle');

/** @type {ConfigPlugin} */
const withStoryView = (config) => {
  return withPlugins(config, [
    withUpdateProjectBuildGradle,
    withUpdateAppBuildGradle,
  ]);
};

module.exports = withStoryView;
