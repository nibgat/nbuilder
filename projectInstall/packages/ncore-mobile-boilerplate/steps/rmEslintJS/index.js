const {
    execute
} = require("../../../../utils/tools");

const rmEslintJS = async (projectName) => {
    let rmCommand;
    if (process.platform === "win32") {
      rmCommand = `del /f ${process.cwd()}\\${projectName}\\.eslintrc.js`;
    } else {
      rmCommand = `rm -rf ${process.cwd()}/${projectName}/.eslintrc.js`;
    }
  
    return await execute(rmCommand, {
      successMessage: "✓ .eslintrc.js successfully removed.",
      startMessage: ".eslintrc.js removing..."
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

module.exports = rmEslintJS;
