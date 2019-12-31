const inquirer = require("inquirer");

const getTypeForExampleName = type => {
  switch (type) {
    case "GET":
      return "GET"
    case "PUT":
      return "UPDATE"
    case "POST":
      return "ADD"
    case "DELETE":
      return "DELETE"
    default:
      return "GET"
  }
}

module.exports = {
  askReducerOrServiceQuestion: () => {
    const question = [
      {
        name: "mock",
        type: "list",
        message: "Service or reducer?",
        choices: ["service", "reducer"]
      }
    ]
    return inquirer.prompt(question);
  },
  askReducerFileNameQuestion: () => {
    const question = [
      {
        name: "reducerFileName",
        type: "input",
        message: "What is the file name of the reducer?"
      }
    ];
    return inquirer.prompt(question);
  },
  askServiceTypeQuestion: () => {
    const question = [
      {
        name: "type",
        type: "list",
        message: "What is the service type?",
        choices: ["GET", "PUT", "POST", "DELETE"]
      }
    ];
    return inquirer.prompt(question);
  },
  askServiceNameQuestion: (type = "GET") => {
    const question = [
      {
        name: "serviceName",
        type: "input",
        message: `What is the service name? [ex: ${getTypeForExampleName(type)}_STATES_SERVICE]`
      }
    ];
    return inquirer.prompt(question);
  }
};
