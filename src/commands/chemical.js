const {
  Command,
  flags
} = require("@oclif/command");

const {
  cli
} = require("cli-ux");
const chalk = require("chalk");
const inquirer = require("inquirer");
inquirer.registerPrompt('chalk-pipe', require('inquirer-chalk-pipe'));
inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'))

const db = require("../database/db");
const {
  promptDate,
  displayDataInTable,
  promptText,
  getListChoice,
  deleteRow,
  updateRow
} = require("../util")
const mainDb = db.chemical;



const logBlue = (text) => log(chalk.blue(text))
const logRed = (text) => log(chalk.red(text))

const log = console.log;

class chemicalCommand extends Command {
  async run() {
    const {
      flags,
      args
    } = this.parse(chemicalCommand);
    if (flags.add) {
      return this.addchemical();
    }
    if (flags.list) {
      return this.listchemical();
    }
    if (flags.delete) {
      return this.deletechemical();
    }
    if (flags.update) {
      return this.updatechemical();
    }
  }


  async getValues() {
    let chemicalName = await promptText("chemical name is?");
    let buyDate = await promptDate("When chemical was brought?");
    let expoerDate = await promptDate("When chemical will be expired?")
    let totalAmount = await promptText("How much chemical was brought?");
    let amountExist = await promptText("How much chemical exists?");
    let values = {
      chemicalName,
      buyDate: new Date(buyDate).getTime().toString(),
      expoerDate: new Date(expoerDate).getTime().toString(),
      totalAmount: parseInt(totalAmount),
      amountExist: parseInt(amountExist)
    }
    return values
  }
  async addchemical() {
    try {
      logBlue("adding new chemical");
      let values = await this.getValues();
      log(values);
      new mainDb(values).save();
      displayDataInTable(mainDb, [values])
    } catch (error) {
      console.log(error)
    }
  }

  async listchemical() {
    logBlue("\n\n--------------------------------------------------Showing all chemicals -------------------------------------------\n\n")
    let all = await mainDb.findAll({
      raw: true
    });
    displayDataInTable(mainDb, all)
    console.log("list chemical");
  }
  deletechemical() {
    deleteRow(mainDb)
    console.log("delete chemical");
  }
  updatechemical() {
    updateRow(mainDb, this.getValues)
    console.log("update chemical")
  }
}

chemicalCommand.description = `Manage all chemical here
  ...
  Extra documentation goes here
  `;

chemicalCommand.flags = {
  add: flags.boolean({
    char: "a",
    description: "add new chemical"
  }),
  list: flags.boolean({
    char: "l",
    description: "list chemical"
  }),
  delete: flags.boolean({
    char: "d",
    description: "delete chemical"
  }),
  update: flags.boolean({
    char: "u",
    description: "update chemical"
  }),
};


module.exports = chemicalCommand;
