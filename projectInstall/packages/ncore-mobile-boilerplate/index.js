const chalk = require("chalk");

const getProjectInformations = require("../../utils/getProjectInformations");

const createRNProject = require("./steps/createRNProject");
const getNCoreTemplate = require("./steps/getNCoreTemplate");
const rmGitFolder = require("./steps/rmGitFolder");
const mvNCoreTemplate = require("./steps/mvNCoreTemplate");
const rmTemplateDir = require("./steps/rmTemplateDir");
const rnLink = require("./steps/rnLink");
const requirementPackagesInstall = require("./steps/requirementPackagesInstall");
const rmAppJS = require("./steps/rmAppJS");
const podInstall = require("./steps/podInstall");
const rmEslintJS = require("./steps/rmEslintJS");

const createNCoreMobileBP = async () => {
  const {
    projectName
  } = await getProjectInformations();
  console.log(`\n`);

  const rnResponse = await createRNProject(projectName);
  if (!rnResponse) {
    return;
  }

  let tempDir;
  if (process.platform === "win32") {
    tempDir = `${process.env.LOCALAPPDATA}\\nbuilder\\${projectName}`;
  } else {
    tempDir = `${process.env.TMPDIR}nbuilder/${projectName}`;
  }

  const ncoreTemplateResponse = await getNCoreTemplate(tempDir);
  if (!ncoreTemplateResponse) {
    return;
  }

  const removeGitFolderResponse = await rmGitFolder(tempDir);
  if (!removeGitFolderResponse) {
    return;
  }

  const mvNCoreTemplateResponse = await mvNCoreTemplate(tempDir, projectName);
  if (!mvNCoreTemplateResponse) {
    return;
  }

  const rmTemplateDirResponse = await rmTemplateDir(tempDir);
  if (!rmTemplateDirResponse) {
    return;
  }

  const rnLinkResponse = await rnLink(projectName);
  if (!rnLinkResponse) {
    return;
  }

  const requirementPackagesInstallResponse = await requirementPackagesInstall(projectName);
  if (!requirementPackagesInstallResponse) {
    return;
  }

  const rmAppJSResponse = await rmAppJS(projectName);
  if (!rmAppJSResponse) {
    return;
  }

  const rmEslintJSResponse = await rmEslintJS(projectName);
  if (!rmEslintJSResponse) {
    return;
  }

  if (process.platform === "darwin") {
    const podInstallResponse = await podInstall(projectName);
    if (!podInstallResponse) {
      return;
    }
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
