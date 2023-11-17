//Imports required packages
const inquirer = require('inquirer')
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
const fs = require('fs')

//Adds the max length requirement to inquirer prompts
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)

//Imports required classes
const Circle = require('./lib/circle.js');
const Square = require('./lib/square.js');
const Triangle = require('./lib/triangle'); 

//Purpose: To ask the user questions and accept inputs to generate a logo.svg file using the information they provide
//Parameters: Inputs from user
//Returns: logo.svg
inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: 'maxlength-input',
        message: 'Characters for logo (up to four characters):',
        name: 'text',
        maxLength: 4,
      },
      {
        type: 'input',
        message: 'Text color',
        name: 'textColor',
      },
      {
        type: 'list',
        message: 'Select the desired shape for the logo:',
        choices: [new inquirer.Separator(), "Circle", "Triangle", "Square"],
        name: 'shape',
      },
      {
        type: 'input',
        message: 'Shape color (keyword or hexadecimal format):',
        name: 'shapeColor',
      },
  ])
  .then((answers) => {
    // Initilizes variables corresponding to each of the input responses for readability sake
    var text = answers.text;
    var textColor = answers.textColor;
    var shape = answers.shape;
    var shapeColor = answers.shapeColor;

    // a switch statement that determines which shape was selected and adjusts it for the svg text
    switch(shape){
    case "Circle":
        var shapeObj = new Circle()
        shapeObj.setColor(shapeColor);
        var textHeight = "100px";
        break;
    case "Triangle":
        var shapeObj = new Triangle()
        shapeObj.setColor(shapeColor);
        var textHeight = "125px";
        break;
    case "Square":
        var shapeObj = new Square()
        shapeObj.setColor(shapeColor);
        var textHeight = "100px";
        break;
    }


//Content of the svg file with object rendered in and variables added to adjust the text
var svgContent = `
  ${shapeObj.render()}
  <text x="150px" y="${textHeight}" text-anchor="middle" dy="0.3em" style="font-size: 50px" fill="${textColor}">${text}</text>
  </svg>
`;

//Function that actually writes the information to a file
    fs.writeFile('./logo.svg', svgContent, err => {
        if (err) {
        console.error(err);
        }
        // file written successfully
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
