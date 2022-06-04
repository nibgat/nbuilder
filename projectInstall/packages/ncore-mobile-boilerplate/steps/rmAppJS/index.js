const {
    execute
} = require("../../../../utils/tools");

const rmAppJS = async (projectName) => {
    let rmCommand;
    if (process.platform === "win32") {
      rmCommand = `del /f ${process.cwd()}\\${projectName}\\App.js`;
    } else {
      rmCommand = `rm -rf ${process.cwd()}/${projectName}/App.js`;
    }
  
    return await execute(rmCommand, {
      successMessage: "✓ App.js successfully removed.",
      startMessage: "App.js removing..."
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

module.exports = rmAppJS;
