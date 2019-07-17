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
  propmptList,
  promptDate,
  displayDataInTable,
  promptText,
  getListChoice,
  deleteRow,
  updateRow
} = require("../util")
const mainDb = db.contractor;


const logBlue = (text) => log(chalk.blue(text))
const logRed = (text) => log(chalk.red(text))

const log = console.log;

//------- Class instance 

class contractorCommand extends Command {
  // entry point of the contractor command 
  async run() {
    const {
      flags
    } = this.parse(contractorCommand);

    // flag must provided in short or long version Example --add / -a 
    // based on command flag select the action

    if (flags.add) {
      return this.addcontractor();
    }
    if (flags.list) {
      return this.listcontractor();
    }
    if (flags.delete) {
      return this.deletecontractor();
    }
    if (flags.update) {
      return this.updatecontractor();
    }
  }


  async getValues() {
    /*---------------------------------------------------------------------------------------
                     Getting input values from which needed to be used to manage all operations
     .........................................................................................*/

    let companyName = await promptText("contractor company name is");
    let adress = await promptText("contractor adress is?");
    let mobileNo = await promptText("Contractor mobile number is?");

    let values = {
      adress,
      companyName,
      mobileNo,

    }
    return values
  }
  async addcontractor() {
    /*---------------------------------------------------------------------------------------
                    Add new contractor data in the database after value is inputed
     .........................................................................................*/
    try {
      logBlue("---------------------------------------  adding new contractor --------------------------------------");
      let values = await this.getValues(); // get input values
      new mainDb(values).save(); // save values in sqlite database
      displayDataInTable(mainDb, [values]) // display the inputed data in table 
    } catch (error) {
      // log the error in case of error 
      console.log(error)
    }
  }

  async listcontractor() {
    /*---------------------------------------------------------------------------------------
                    List all contractor list from database
     .........................................................................................*/
    logBlue("\n\n-------------------------------------------------- Showing all contractors -------------------------------------------\n\n")
    // fetch all contractor rows form database
    let all = await mainDb.findAll({
      raw: true
    });
    // show the contractor list in table view
    displayDataInTable(mainDb, all)
    console.log("list contractor");
  }
  deletecontractor() {
    // invoke the util function which can delete a row
    deleteRow(mainDb)
    console.log("delete contractor");
  }
  updatecontractor() {
    // invoke the util function which can update a row
    updateRow(mainDb, this.getValues, 'companyName')
    console.log("update contractor")
  }
}

contractorCommand.description = `Manage all contractor here
    ...
    Extra documentation goes here
    `;

contractorCommand.flags = {
  add: flags.boolean({
    char: "a",
    description: "add new contractor"
  }),
  list: flags.boolean({
    char: "l",
    description: "list contractor"
  }),
  delete: flags.boolean({
    char: "d",
    description: "delete contractor"
  }),
  update: flags.boolean({
    char: "u",
    description: "update contractor"
  }),
};


module.exports = contractorCommand;
