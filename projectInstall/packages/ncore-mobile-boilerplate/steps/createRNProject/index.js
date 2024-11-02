const {
    execute
} = require("../../../../utils/tools");

const createRNProject = async (projectName) => {
    return await execute(`npx @react-native-community/cli init ${projectName}`, {
        successMessage: "✓ React Native project successfully created.",
        startMessage: "React Native project creating...",
        isMultipleParameter: true
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

module.exports = createRNProject;
