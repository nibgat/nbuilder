#!/usr/bin/env node

/**
 * nbuilder
 * Project or structure builder for NİBGAT® and NİBGAT® | Community.
 *
 * @author nibgat <https://www.nibgat.com>
 */

const init = require("./utils/init");
const cli = require("./utils/cli");
const log = require("./utils/log");
const chalk = require("chalk");
const figlet = require("figlet");
const projectInstall = require('./projectInstall');

const input = cli.input;
const flags = cli.flags;
const {
    project,
    source,
    clear,
    debug
} = flags;

(async () => {
	init({
        clear
    });
	console.log(
        chalk.cyan(
            figlet.textSync("NİBGAT® | Builder", {
                horizontalLayout: "full"
            })
        )
    );

	input.includes("help") && cli.showHelp(0);
	debug && log(flags);

    console.log(`\n\n`);
	if(project) {
        project && await projectInstall(
            project,
            source
        );
        return;
    }

    console.log(
        chalk.red(
            "You did't choose any package."
        )
    );
})();
