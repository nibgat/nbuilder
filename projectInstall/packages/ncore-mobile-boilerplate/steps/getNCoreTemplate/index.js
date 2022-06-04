const chalk = require("chalk");
const clui = require("clui");
const simpleGit = require("simple-git");

const git = simpleGit();

const {
    NCORE_MOBILE_BOILERPLATE_GIT_URL
} = require("../../constants");

const getNCoreTemplate = (tempDir) => {
    return new Promise((resolve, reject) => {
        const status = new clui.Spinner("NCore Template creating...");
        status.start();
    
        git.clone(NCORE_MOBILE_BOILERPLATE_GIT_URL, tempDir)
            .then(() => {
                status.stop();
                console.log(
                    chalk.blue(
                        "✓ NCore Template successfully created."
                    )
                );
                resolve(true);
            })
            .catch((err) => {
                status.stop();
                console.log(
                    chalk.red(
                        err
                    )
                );
                reject(false);
            });
    });
};

module.exports = getNCoreTemplate;
