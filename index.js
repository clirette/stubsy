const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const inquirer = require("./lib/inquirer");
const config = require("./config");
const fs = require("fs");

const {
  makeServiceFileName,
  makeServiceFromTemplate,
  makeReducerFromTemplate
} = require("./lib/template");

const SERVICE = 'service'
const REDUCER = 'reducer'

clear();
console.log(
  chalk.yellow(figlet.textSync("Stubsy", { horizontalLayout: "full" }))
);

console.log(chalk.green("Quickly stub out services and reducers with the Stubsy CLI."));

const run = async () => {
  const { mock } = await inquirer.askReducerOrServiceQuestion();
  const { serviceName } = await inquirer.askServiceNameQuestion();
  const serviceFileName = makeServiceFileName(serviceName)
  if (mock === SERVICE) {
    const { type } = await inquirer.askServiceTypeQuestion();
    const serviceText = makeServiceFromTemplate(serviceName, type);
    const servicePath = `${config.servicePath}/${serviceFileName}`
    fs.writeFileSync(servicePath, serviceText);
    console.log(chalk.green(`Service ${serviceFileName} created at /c${servicePath}`));
  } else if (mock === REDUCER) {
    const { reducerFileName } = await inquirer.askReducerFileNameQuestion();
    const reducerText = makeReducerFromTemplate(serviceName, serviceFileName);
    const reducerPath = `${config.reducerPath}/${reducerFileName}.js`
    fs.writeFileSync(reducerPath, reducerText);
    console.log(chalk.green(`Reducer ${reducerFileName} created at /c${reducerPath}`));
  }
};

run();
