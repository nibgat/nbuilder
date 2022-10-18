const {
    execute
} = require("../../../../utils/tools");

const rnLink = async (projectName) => {
    let linkCommand;
    if (process.platform === "win32") {
        linkCommand = `cd ${process.cwd()}\\${projectName} && npx react-native-asset`;
    } else {
        linkCommand = `cd ${process.cwd()}/${projectName} && npx react-native-asset`;
    }
  
    return await execute(linkCommand, {
        successMessage: "✓ React Native successfully linked.",
        startMessage: "React Native fonts linking..."
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

module.exports = rnLink;
