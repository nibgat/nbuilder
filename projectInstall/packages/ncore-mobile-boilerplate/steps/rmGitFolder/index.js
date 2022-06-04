const {
    execute
} = require("../../../../utils/tools");

const rmGitFolder = async (tempDir) => {
    let rmCommand;
    if (process.platform === 'win32') {
        rmCommand = `rmdir /q /s ${tempDir}\\.git`;
    } else {
        rmCommand = `rm -rf ${tempDir}/.git`;
    }
  
    return await execute(rmCommand, {
        successMessage: "✓ Git folder successfully deleted.",
        startMessage: "Git folder deleting..."
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

module.exports = rmGitFolder;
