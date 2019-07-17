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
const mainDb = db.staffs;

const STAFFJOBTYPE = [{
  name: "part time",
  value: 1
}, {
  name: "Full time",
  value: 2
}]
const STAFFDEPARTMENT = [{
  name: "IT",
  value: 1
}, {
  name: "Driverx",
  value: 2
}, {
  name: "Pest control officers",
  value: 3
}, {
  name: "Admin",
  value: 4
}]
const logBlue = (text) => log(chalk.blue(text))
const logRed = (text) => log(chalk.red(text))

const log = console.log;

//------- Class instance 

class staffCommand extends Command {
  // entry point of the staff command 
  async run() {
    const {
      flags
    } = this.parse(staffCommand);

    // flag must provided in short or long version Example --add / -a 
    // based on command flag select the action

    if (flags.add) {
      return this.addstaff();
    }
    if (flags.list) {
      return this.liststaff();
    }
    if (flags.delete) {
      return this.deletestaff();
    }
    if (flags.update) {
      return this.updatestaff();
    }
    if (flags.assign) {
      return this.assignJob()
    }
  }


  async getValues() {
    /*---------------------------------------------------------------------------------------
                     Getting input values from which needed to be used to manage all operations
     .........................................................................................*/
    let name = await promptText("stuff name is?");
    let contactNo = await promptText("stuff contactNo is?");
    let email = await promptText("stuff email is?");
    logBlue("Type - \n 1.Full time \n 2. part time")
    let JobTypeId = await propmptList("stuff JobType ?", STAFFJOBTYPE);
    let depType = await propmptList("stuff department type?", STAFFDEPARTMENT);
    //  let random = randomInt(0, 1000);
    return {
      name,
      email,
      contactNo,
      JobTypeId,
      depType
    }
  }
  async addstaff() {
    /*---------------------------------------------------------------------------------------
                    Add new staff data in the database after value is inputed
     .........................................................................................*/
    try {
      logBlue("---------------------------------------  adding new staff --------------------------------------");
      let values = await this.getValues(); // get input values
      await new mainDb(values).save(); // save values in sqlite database
      let savedStaff = await mainDb.findOne({
        where: {
          contactNo: values.contactNo
        }
      }, {
        row: true
      });
      //  console.log(savedStaff);
      if (savedStaff && savedStaff.id) {
        new db.staff_department({
          staffId: savedStaff.id,
          departmentId: values.depType
        }).save()
      }
      displayDataInTable(mainDb, [values], true) // display the inputed data in table 
    } catch (error) {
      // log the error in case of error 
      console.log(error)
    }
  }

  async liststaff() {
    /*---------------------------------------------------------------------------------------
                    List all staff list from database
     .........................................................................................*/
    logBlue("\n\n-------------------------------------------------- Showing all staffs -------------------------------------------\n\n")
    // fetch all staff rows form database
    let all = await mainDb.findAll({
      raw: true
    });
    // show the staff list in table view
    displayDataInTable(mainDb, all)
    console.log("list staff");
  }
  deletestaff() {
    // invoke the util function which can delete a row
    deleteRow(mainDb)
    console.log("delete staff");
  }

  updatestaff() {
    // invoke the util function which can update a row
    updateRow(mainDb, this.getValues, 'name')
    console.log("update staff")
  }
  //TODO:assign job
  assignJob() {

  }
}

staffCommand.description = `Manage all staff here
    ...
    Extra documentation goes here
    `;

staffCommand.flags = {
  add: flags.boolean({
    char: "a",
    description: "add new staff"
  }),
  list: flags.boolean({
    char: "l",
    description: "list staff"
  }),
  delete: flags.boolean({
    char: "d",
    description: "delete staff"
  }),
  update: flags.boolean({
    char: "u",
    description: "update staff"
  }),
  assign: flags.boolean({
    char: "w",
    description: "assign staff"
  }),
};


module.exports = staffCommand;
