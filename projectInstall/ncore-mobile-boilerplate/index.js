const inquirer = require('inquirer');
const chalk = require('chalk');
const clui = require('clui');
const simpleGit = require('simple-git');

const {
    execute
} = require('./utils');

const {
    NCORE_MOBILE_BOILERPLATE_GIT_URL,
    REQUIREMENT_PACKAGES
} = require('./constants');

const git = simpleGit();

const getProjectInformations = () => {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt([
                {
                    name: 'projectName',
                    message: 'Project Name: ( ncore-test )'
                }
            ])
            .then(answers => {
                resolve({
                    projectName: answers.projectName || 'ncore-test'
                });
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

const createRNProject = async (projectName) => {
    return await execute(`npx react-native init ${projectName}`, {
        successMessage: '✓ React Native project successfully created.',
        startMessage: 'React Native project creating...'
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

const getNCoreTemplate = (tempDir) => {
    return new Promise((resolve, reject) => {
        const status = new clui.Spinner('NCore Template creating...');
        status.start();

        git.clone(NCORE_MOBILE_BOILERPLATE_GIT_URL, `${tempDir}`)
            .then(() => {
                status.stop();
                console.log(
                    chalk.blue(
                        '✓ NCore Template successfully created.'
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

const rmGitFolder = async (tempDir) => {
    let rmCommand;
    if(process.platform === 'win32') {
        rmCommand = `rmdir /q /s ${tempDir}\\.git`;
    } else {
        rmCommand = `rm -rf ${tempDir}/.git`;
    }

    return await execute(rmCommand, {
        successMessage: '✓ Git folder successfully deleted.',
        startMessage: 'Git folder deleting...'
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

const mvNCoreTemplate = async (tempDir, projectName) => {
    let mvCommand;
    if(process.platform === 'win32') {
        mvCommand = `xcopy ${tempDir}\\* ${process.cwd()}\\${projectName}\\ /E/H/C/I/Y`;
    } else {
        mvCommand = `cp ${tempDir}/* ${process.cwd()}/${projectName}/`;
    }

    return await execute(mvCommand, {
        successMessage: '✓ NCore template successfully moved.',
        startMessage: 'Moving NCore Template to the project...'
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

const rmTemplateDir = async (tempDir) => {
    let rmCommand;
    if(process.platform === 'win32') {
        rmCommand = `rmdir /q /s ${tempDir}\\`;
    } else {
        rmCommand = `rm -rf ${tempDir}/`;
    }

    return await execute(rmCommand, {
        successMessage: '✓ Cache successfully cleaned.',
        startMessage: 'Cache cleaning...'
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

const rnLink = async (projectName) => {
    let linkCommand;
    if(process.platform === 'win32') {
        linkCommand = `cd ${process.cwd()}\\${projectName} && npx react-native link`;
    } else {
        linkCommand = `cd ${process.cwd()}/${projectName} && npx react-native link`;
    }

    return await execute(linkCommand, {
        successMessage: '✓ React Native successfully linked.',
        startMessage: 'React Native fonts linking...'
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

const requirementPackagesInstall = async (projectName) => {
    let yarnCommand;
    if(process.platform === 'win32') {
        yarnCommand = `cd ${process.cwd()}\\${projectName} && yarn add ${REQUIREMENT_PACKAGES}`;
    } else {
        yarnCommand = `cd ${process.cwd()}/${projectName} && yarn add ${REQUIREMENT_PACKAGES}`;
    }

    return await execute(yarnCommand, {
        successMessage: '✓ Requirement packages successfully installed.',
        startMessage: 'Requirement packages installing...'
    })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

const createNCoreMobileBP = async () => {
    const {
        projectName
    } = await getProjectInformations();

    console.log(`\n`);

    const rnResponse = await createRNProject(projectName);
    if(!rnResponse) {
        return;
    }

    let tempDir;
    if(process.platform === 'win32') {
        tempDir = `${process.env.LOCALAPPDATA}\\nbuilder\\${projectName}`;
    } else {
        tempDir = `${process.env.LOCALAPPDATA}/nbuilder/${projectName}`;
    }

    const ncoreTemplateResponse = await getNCoreTemplate(tempDir);
    if(!ncoreTemplateResponse) {
        return;
    }

    const removeGitFolderResponse = await rmGitFolder(tempDir);
    if(!removeGitFolderResponse) {
        return;
    }

    const mvNCoreTemplateResponse = await mvNCoreTemplate(tempDir, projectName);
    if(!mvNCoreTemplateResponse) {
        return;
    }

    const rmTemplateDirResponse = await rmTemplateDir(tempDir);
    if(!rmTemplateDirResponse) {
        return;
    }

    const rnLinkResponse = await rnLink(projectName);
    if(!rnLinkResponse) {
        return;
    }

    const requirementPackagesInstallResponse = await requirementPackagesInstall(projectName);
    if(!requirementPackagesInstallResponse) {
        return;
    }

    console.log(
        chalk.green(
            `\n💣💣💣 ncore-mobile-boilerplate successfully created in the ${projectName}.`
        )
    );
    console.log(
        chalk.gray(
            `\nIf you want to start:\ncd ${projectName} && yarn android\n`
        )
    );
};

module.exports = createNCoreMobileBP;
