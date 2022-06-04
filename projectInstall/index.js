const chalk = require("chalk");

const createNCoreMobileBP = require("./packages/ncore-mobile-boilerplate");
const publicInstall = require("./packages/public");

const projectInstall = async (project, source) => {
    if(!project || project.trim() === "") {
        console.log(
            chalk.red(
                "You did't choose any package."
            )
        );
        return;
    }

    if(source && !(source === "nibgat" || source === "github")) {
        console.log(
            chalk.red(
                "Unsupported source."
            )
        );
        return;
    }

    console.log(`\n`);

    if(source) {
        publicInstall({
            project,
            source
        });
        return;
    }

    switch(project) {
        case "nibgat/ncore-mobile-boilerplate":
            createNCoreMobileBP();
            break;
        default:
            console.log(
                chalk.red(
                    "Incorrect package selection."
                )
            );
    }
};
module.exports = projectInstall;
