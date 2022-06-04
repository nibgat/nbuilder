const {
    execute
} = require("../../../../utils/tools");

const mvNCoreTemplate = async (tempDir, projectName) => {
    let mvCommand;
    if (process.platform === "win32") {
        mvCommand = `xcopy ${tempDir}\\* ${process.cwd()}\\${projectName}\\ /E/H/C/I/Y`;
    } else {
        mvCommand = `mv ${tempDir}/* ${process.cwd()}/${projectName}/`;
    }
  
    return await execute(mvCommand, {
        successMessage: "✓ NCore template successfully moved.",
        startMessage: "Moving NCore Template to the project..."
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

module.exports = mvNCoreTemplate;
