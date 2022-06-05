const inquirer = require("inquirer");

const getProjectInformations = () => {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt([
                {
                    name: "projectName",
                    message: "Project Name: ( ncoretest )"
                }
            ])
            .then(answers => {
                resolve({
                    projectName: answers.projectName || "ncoretest"
                });
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

module.exports = getProjectInformations;
