const {
  cli
} = require("cli-ux");
const chalk = require("chalk");
const inquirer = require("inquirer");
inquirer.registerPrompt('chalk-pipe', require('inquirer-chalk-pipe'));
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))
const log = console.log;
const logRed = text => log(chalk.red(text));
const logBlue = text => log(chalk.blue(text));

async function getListChoice(db, choiceName = "chemicalName") {
  let allChoice = [];
  let all = await db.findAll({
    raw: true
  });

  for (let i in all) {
    allChoice.push({
      name: all[i][choiceName],
      value: all[i].id
    });
  }
  return allChoice;
}

async function updateRow(db, inputValFun, choiceName) {
  logBlue("\n\n ----------------------------  updating row --------------------------------");
  let allClientChoice = await getListChoice(db, choiceName);
  let updateChoice = await inquirer.prompt([{
    name: "updateChoice",
    message: "select a row you want to update ",
    type: "list",
    choices: allClientChoice
  }]);
  let updateItemValies = await db.findByPk(updateChoice.updateChoice);
  let upDatedinputValues = await inputValFun()
  updateItemValies.update(upDatedinputValues);
  displayDataInTable(db, [upDatedinputValues], true)
  // await this.addClient(true, updateChoice.updateChoice);
  logBlue("\n\n\n --------------------------- row updated");
}

async function deleteRow(db) {
  logBlue("\n\n ----------------------------  deleting row --------------------------------");
  let allRowchoice = await getListChoice(db);
  let delChoice = await inquirer.prompt([{
    name: "delChoice",
    message: "select a row you want to delete ",
    type: "list",
    choices: allRowchoice
  }]);

  let delItem = await db.findByPk(delChoice.delChoice);
  delItem.destroy();
  // await this.addClient(true, updateChoice.updateChoice);
  logBlue("\n\n\n --------------------------- row deleted");
}

async function promptText(message) {
  let promptValue = await inquirer
    .prompt([{
        name: "prompt",
        message: message,
        type: "text"
      }
      /* Pass your questions in here */
    ])
  return promptValue.prompt
}

async function propmptList(msg, list) {
  let promptValue = await inquirer.prompt([{
    name: "value",
    message: msg,
    type: "list",
    choices: list
  }]);
  return promptValue.value;
}
async function promptDate(message) {
  let promptValue = await inquirer
    .prompt([{
        type: 'datetime',
        name: 'dt',
        message: message,
        format: ['m', '/', 'd', '/', 'yy', ' ', 'h', ':', 'MM', ' ', 'TT']
      }
      /* Pass your questions in here */
    ])
  return promptValue.dt
}

function displayDataInTable(db, tableValues, hideId) {
  // create column based on table names
  let tableColumn = Object.keys(db.tableAttributes).reduce((p, v) => {
    if (hideId && v === "id") return p;
    return Object.assign(p, {
      [v]: {
        minWidth: 20
      }
    })
  }, {})
  // create tables with values
  cli.table(
    tableValues, tableColumn, {
      printLine: logRed,
    }
  );
}

module.exports = {
  propmptList,
  getListChoice,
  promptDate,
  displayDataInTable,
  updateRow,
  promptText,
  deleteRow
}
