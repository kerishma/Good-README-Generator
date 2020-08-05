var inquirer = require("inquirer");
var fs = require("fs");

// array of questions for user
const questions = [
  {
    type: "input",
    name: "title",
    message: "Please enter your project title",
  },
  {
    type: "input",
    name: "description",
    message: "Please enter a description of the project",
  },
  {
    type: "input",
    name: "installDetails",
    message: "Please enter the installation instructions",
  },
  {
    type: "input",
    name: "usageInformation",
    message: "Please enter the usage information",
  },
  {
    type: "input",
    name: "contribution",
    message: "Please enter the contributing information",
  },
  {
    type: "input",
    name: "testInformation",
    message: "Please enter test information",
  },
  {
    type: "list",
    name: "license",
    message: "Choose a license for your project",
    choices: ["MIT License", "Apache License", "The Unlicense", "GNU AGPLv3"],
    filter: function (val) {
      return val.toLowerCase();
    },
  },
  {
    type: "input",
    name: "username",
    message: "Please enter your GitHub username",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter your email address",
  },
];

// function to write README file
function writeToFile(fileName, data) {
  let readMe = `
  # ${data.title}

  ### Description

  ${data.description}
  
  
  ### Installation
  
  ${data.installDetails}

  ### Usage

  ${data.usageInformation}
  
  ### Contributing
  
  ${data.contribution}

  ### Tests
  
  ${data.testInformation}
  
  ## Author
  
  Github Repository - [${data.username}](https://github.com/${data.username})

  Email - ${data.email}
  
  ## License
  
  This project is licensed under the ${data.license}
  `;

  fs.writeFile(`${fileName}.md`, readMe, function (err) {
    if (err) throw err;
    console.log("File has been saved to your current project directory!");
  });
}

// function to initialize program
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      writeToFile("README", answers);
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(error);
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
}

// function call to initialize program
init();
