const chalk = require('chalk');
const createNCoreMobileBP = require('./ncore-mobile-boilerplate');

const projectInstall = (input) => {
    if(!input[0]) {
        console.log(
            chalk.red(
                `You did't choose any package.`
            )
        );
        return;
    }

    switch(input[0]) {
        case 'ncore-mobile-boilerplate':
            createNCoreMobileBP();
            break;
        default:
            console.log(
                chalk.red(
                    'Incorrect package selection.'
                )
            );
    }
};
module.exports = projectInstall;
