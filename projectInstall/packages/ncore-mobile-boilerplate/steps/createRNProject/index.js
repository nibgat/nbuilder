const {
    execute
} = require("../../../../utils/tools");

const createRNProject = async (projectName) => {
    return await execute(`npx react-native init ${projectName}`, {
        successMessage: "✓ React Native project successfully created.",
        startMessage: "React Native project creating..."
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

module.exports = createRNProject;
