const {
    execute
} = require("../../../../utils/tools");
const {
    REQUIREMENT_PACKAGES
} = require("../../constants");

const requirementPackagesInstall = async (projectName) => {
    let yarnCommand;
    let packagesText = "yarn add ";
  
    REQUIREMENT_PACKAGES.forEach((item, index) => {
        packagesText += item;
        if(index < REQUIREMENT_PACKAGES.length - 1) {
            packagesText += " ";
        }
    });
  
    if (process.platform === "win32") {
        yarnCommand = `cd ${process.cwd()}\\${projectName} && ${packagesText}`;
    } else {
        yarnCommand = `cd ${process.cwd()}/${projectName} && ${packagesText}`;
    }
  
    return await execute(yarnCommand, {
        successMessage: "✓ Requirement packages successfully installed.",
        startMessage: "Requirement packages installing..."
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

module.exports = requirementPackagesInstall;
