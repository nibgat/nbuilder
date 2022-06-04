const inquirer = require("inquirer");

const getProjectInformations = () => {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt([
                {
                    name: "projectName",
                    message: "Project Name: ( ncore-test )"
                }
            ])
            .then(answers => {
                resolve({
                    projectName: answers.projectName || "ncore-test"
                });
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

module.exports = getProjectInformations;
