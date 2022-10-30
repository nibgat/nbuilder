const {
    SOURCES
} = require("../../../constants");

const REQUIREMENT_PACKAGES = [
    'ncore-mobile',
    'react-native-gesture-handler',
    'react-native-modalize',
    'react-native-portalize',
    'react-native-simple-toast',
    'react-native-svg',
    '@react-navigation/native',
    'react-native-screens',
    'react-native-safe-area-context',
    '@react-navigation/native-stack'
];

const NCORE_MOBILE_BOILERPLATE_GIT_URL = `${SOURCES["github"]}nibgat/ncore-mobile-boilerplate`;

module.exports = {
    NCORE_MOBILE_BOILERPLATE_GIT_URL,
    REQUIREMENT_PACKAGES
};
