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
  askServiceNameQuestion: type => {
    const question = [
      {
        name: "name",
        type: "input",
        message: `What is the service name? [ex: ${getTypeForExampleName(type)}_STATES_SERVICE]`
      }
    ];
    return inquirer.prompt(question);
  }
};
