const clui = require('clui');
const chalk = require('chalk');
const cp = require('child_process');

const execute = (comm, {
    isMultipleParameter = false,
    isWithLoading = true,
    successMessage,
    startMessage,
}) => {
    return new Promise((resolve, reject) => {
        const status = new clui.Spinner(startMessage);
        if(isWithLoading) {
            status.start();
        }

        if(isMultipleParameter) {
            const parameters = comm.split(" ");

            const commandProcessing = cp.spawn(parameters[0], parameters.slice(1), {
                shell: process.platform === "win32" ? true : undefined,
                stdio: ["inherit", "pipe"],
                cwd: process.cwd()
            });

            commandProcessing.stdout.on("data", (data) => {
                if(process.platform === "win32" && data.toString().indexOf("y/N") !== -1) {
                    if(isWithLoading) status.stop();
                }
                console.log(data.toString());
            });

            commandProcessing.on("close", () => {
                if(isWithLoading) status.stop();
                console.log(
                    chalk.blue(
                        successMessage
                    )
                );
                resolve(true);
            });

            commandProcessing.on("error", (err) => {
                if(isWithLoading) status.stop();
                console.log(
                    chalk.red(
                        err.toString()
                    )
                );
                reject(false);
            });

            commandProcessing.on("disconnect", (err) => {
                if(isWithLoading) status.stop();
                console.log(
                    chalk.red(
                        err.toString()
                    )
                );
                reject(false);
            });
        } else {
            cp.exec(comm, (err) => {
                if(err) {
                    if(isWithLoading) status.stop();
                    console.log(
                        chalk.red(
                            err.message
                        )
                    );
                    reject(false);
                }
    
                if(isWithLoading) status.stop();
                console.log(
                    chalk.blue(
                        successMessage
                    )
                );
                resolve(true);
            });
        }
    });
};

module.exports = {
    execute
};
