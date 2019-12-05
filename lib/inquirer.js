const inquirer = require("inquirer");

module.exports = {
  askServiceQuestions: () => {
    const questions = [
      {
        name: "type",
        type: "list",
        message: "What is the service type?",
        choices: ["GET", "PUT", "POST", "DELETE"]
      },
      {
        name: "name",
        type: "input",
        message: "What is the service name? [ex: GET_STATES_SERVICE]"
      }
    ];
    return inquirer.prompt(questions);
  }
};
