const {
  ConfigPlugin,
  WarningAggregator,
  withAppBuildGradle,
} = require('@expo/config-plugins');

/** @type {ConfigPlugin} */
const withUpdateAppBuildGradle = (config) => {
  return withAppBuildGradle(config, (props) => {
    if (props.modResults.language === 'groovy') {
      props.modResults.contents = setBuildscript(props.modResults.contents);
    } else {
      WarningAggregator.addWarningAndroid(
        'react-native-story-view',
        "Cannot automatically configure app build.gradle if it's not groovy.",
      );
    }

    return props;
  });
};

/** @param {string} buildGradle  */
const setBuildscript = (buildGradle) => {
  let newBuildGradle = buildGradle;
  const videoCache = "implementation 'com.danikula:videocache:2.7.1'";
  if (!newBuildGradle.includes(videoCache)) {
    const newEntry = `dependencies {\n\t${videoCache}`;
    newBuildGradle = newBuildGradle.replace(/dependencies\s?{/, newEntry);
  }

  return newBuildGradle;
};

module.exports = withUpdateAppBuildGradle;
