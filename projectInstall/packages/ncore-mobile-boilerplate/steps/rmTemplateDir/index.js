const {
    execute
} = require("../../../../utils/tools");

const rmTemplateDir = async (tempDir) => {
    let rmCommand;
    if (process.platform === "win32") {
        rmCommand = `rmdir /q /s ${tempDir}\\`;
    } else {
        rmCommand = `rm -rf ${tempDir}/`;
    }
  
    return await execute(rmCommand, {
        successMessage: "✓ Cache successfully cleaned.",
        startMessage: "Cache cleaning..."
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

module.exports = rmTemplateDir;
