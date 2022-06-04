const {
    execute
} = require("../../../../utils/tools");

const podInstall = async (projectName) => {
    const command = `cd ${process.cwd()}/${projectName}/ios && pod install --repo-update`;

    return await execute(command, {
        successMessage: "✓ Pods successfully installed.",
        startMessage: "Pods installing..."
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

module.exports = podInstall;
