const welcome = require("cli-welcome");
const pkg = require("./../package.json");
const unhandled = require("cli-handle-unhandled");

module.exports = ({
	clear = true
}) => {
	unhandled();
	welcome({
		title: "nbuilder",
		tagLine: "by nibgat",
		description: pkg.description,
		version: pkg.version,
		bgColor: "#00c2a9",
		color: "#444444",
		bold: true,
		clear
	});
};
