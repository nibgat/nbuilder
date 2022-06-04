const clui = require('clui');
const chalk = require('chalk');
const cp = require('child_process');

const execute = (comm, {
    successMessage,
    startMessage
}) => {
    return new Promise((resolve, reject) => {
        const status = new clui.Spinner(startMessage);
        status.start();

        cp.exec(comm, (err) => {
            if(err) {
                status.stop();
                console.log(
                    chalk.red(
                        err.message
                    )
                );
                reject(false);
            }

            status.stop();
            console.log(
                chalk.blue(
                    successMessage
                )
            );
            resolve(true);
        });
    });
};

module.exports = {
    execute
};
