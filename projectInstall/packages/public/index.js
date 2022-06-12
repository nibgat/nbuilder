const chalk = require("chalk");
const clui = require("clui");
const simpleGit = require("simple-git");

const {
    SOURCES
} = require("../../constants");
const rmGitFolder = require("../ncore-mobile-boilerplate/steps/rmGitFolder");

const git = simpleGit();

const publicInstall = ({
    project,
    source
}) => {
    const status = new clui.Spinner(`${project} building...`);
    status.start();

    const url = `${SOURCES[source]}${project}`;

    let directory;
    if(process.platform === "win32") {
        directory = `${process.cwd()}\\${project.split("/")[1]}`;
    } else {
        directory = `${process.cwd()}/${project.split("/")[1]}`;
    }

    git.clone(url, directory)
        .then(async () => {
            const isRemovedGitFolder = await rmGitFolder(directory);
            if(!isRemovedGitFolder) {
                status.stop();
                console.log(
                    chalk.blue(
                       "Git folder didn't removed."
                    )
                );
                return;
            }

            status.stop();
            console.log(
                chalk.blue(
                    `✓ ${project} successfully builded.`
                )
            );
        })
        .catch((err) => {
            status.stop();
            console.log(
                chalk.red(
                    err
                )
            );
        });
};

module.exports = publicInstall;
