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
  const { type } = await inquirer.askServiceTypeQuestion();
  const { name } = await inquirer.askServiceNameQuestion(type)
  const serviceText = makeServiceFromTemplate({ name, type });
  const serviceFileName = makeServiceFileName(name)
  const servicePath = `${config.path}/${serviceFileName}`
  fs.writeFileSync(servicePath, serviceText);
  console.log(chalk.green(`Service ${serviceFileName} created at /c${servicePath}`));
};

run();
