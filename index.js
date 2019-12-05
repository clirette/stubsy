const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const inquirer = require("./lib/inquirer");
const config = require("./config");
const fs = require("fs");

const {
  makeServiceFileName,
  makeServiceFromTemplate
} = require("./lib/template");

clear();
console.log(
  chalk.yellow(figlet.textSync("Stubsy", { horizontalLayout: "full" }))
);

console.log(chalk.green("Quickly stub out services with the Stubsy CLI."));

const run = async () => {
  const credentials = await inquirer.askServiceQuestions();
  const serviceText = makeServiceFromTemplate(credentials);
  fs.writeFileSync(
    `${config.path}/${makeServiceFileName(credentials.name)}`,
    serviceText
  );
};

run();
