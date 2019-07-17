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
const mainDb = db.vehicle;

const VEHICLETYPE = [{
  name: "vans",
  value: 1
}, {
  name: "Mid large vans",
  value: 2
}, {
  name: "Boats",
  value: 3
}, {
  name: "Fish tanks",
  value: 4
}]
const VEHICLESTATE = [{
  name: "runable",
  value: 1
}, {
  name: "service required",
  value: 2
}, {
  name: "on job",
  value: 3
}]
const logBlue = (text) => log(chalk.blue(text))
const logRed = (text) => log(chalk.red(text))

const log = console.log;

//------- Class instance 

class vehicleCommand extends Command {
  // entry point of the vehicle command 
  async run() {
    const {
      flags
    } = this.parse(vehicleCommand);

    // flag must provided in short or long version Example --add / -a 
    // based on command flag select the action

    if (flags.add) {
      return this.addvehicle();
    }
    if (flags.list) {
      return this.listvehicle();
    }
    if (flags.delete) {
      return this.deletevehicle();
    }
    if (flags.update) {
      return this.updatevehicle();
    }
  }


  async getValues() {
    /*---------------------------------------------------------------------------------------
                     Getting input values from which needed to be used to manage all operations
     .........................................................................................*/

    let vehicleName = await promptText("vehicle name is?");
    let companyName = await promptText("Vehicle company name is");
    let contractorId = await promptText("Contractor id of the vehicel is?");
    let type = await propmptList("Select one of vehicel type from list", VEHICLETYPE);
    let vehicleState = await propmptList("Select one of vehicel state from list", VEHICLESTATE);
    let values = {
      vehicleName,
      companyName,
      contractorId,
      type,
      vehicleState
    }
    return values
  }
  async addvehicle() {
    /*---------------------------------------------------------------------------------------
                    Add new vehicle data in the database after value is inputed
     .........................................................................................*/
    try {
      logBlue("---------------------------------------  adding new vehicle --------------------------------------");
      let values = await this.getValues(); // get input values
      new mainDb(values).save(); // save values in sqlite database
      displayDataInTable(mainDb, [values]) // display the inputed data in table 
    } catch (error) {
      // log the error in case of error 
      console.log(error)
    }
  }

  async listvehicle() {
    /*---------------------------------------------------------------------------------------
                    List all vehicle list from database
     .........................................................................................*/
    logBlue("\n\n-------------------------------------------------- Showing all vehicles -------------------------------------------\n\n")
    // fetch all vehicle rows form database
    let all = await mainDb.findAll({
      raw: true
    });
    // show the vehicle list in table view
    displayDataInTable(mainDb, all)
    console.log("list vehicle");
  }
  deletevehicle() {
    // invoke the util function which can delete a row
    deleteRow(mainDb)
    console.log("delete vehicle");
  }
  updatevehicle() {
    // invoke the util function which can update a row
    updateRow(mainDb, this.getValues)
    console.log("update vehicle")
  }
}

vehicleCommand.description = `Manage all vehicle here
  ...
  Extra documentation goes here
  `;

vehicleCommand.flags = {
  add: flags.boolean({
    char: "a",
    description: "add new vehicle"
  }),
  list: flags.boolean({
    char: "l",
    description: "list vehicle"
  }),
  delete: flags.boolean({
    char: "d",
    description: "delete vehicle"
  }),
  update: flags.boolean({
    char: "u",
    description: "update vehicle"
  }),
};


module.exports = vehicleCommand;
