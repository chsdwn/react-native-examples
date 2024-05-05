const {
  ConfigPlugin,
  WarningAggregator,
  withProjectBuildGradle,
} = require('@expo/config-plugins');

/** @type {ConfigPlugin} */
const withUpdateProjectBuildGradle = (config) => {
  return withProjectBuildGradle(config, (props) => {
    if (props.modResults.language === 'groovy') {
      props.modResults.contents = setBuildscript(props.modResults.contents);
    } else {
      WarningAggregator.addWarningAndroid(
        'react-native-story-view',
        "Cannot automatically configure build.gradle if it's not groovy.",
      );
    }

    return props;
  });
};

/** @param {string} buildGradle */
const setBuildscript = (buildGradle) => {
  let newBuildGradle = buildGradle;
  const cacheControlUrl = `url(new File(['node', '--print', "require.resolve('react-native-video-cache-control/package.json', { paths: [require.resolve('react-native/package.json')] })"].execute(null, rootDir).text.trim(), '../android/libs'))`;
  if (!newBuildGradle.includes(cacheControlUrl)) {
    newBuildGradle = newBuildGradle.replace(
      /allprojects *{\n.*repositories\s?{/,
      `allprojects {\n\trepositories {\n\t\tmaven {\n\t\t\t${cacheControlUrl}\n\t\t}`,
    );
  }

  const jcenter = 'jcenter()';
  if (!newBuildGradle.includes(jcenter)) {
    newBuildGradle = newBuildGradle.replace(
      /allprojects *{\n.*repositories\s?{/,
      `allprojects {\n\trepositories {\n\t\t${jcenter}`,
    );
  }

  return newBuildGradle;
};

module.exports = withUpdateProjectBuildGradle;
