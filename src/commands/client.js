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
  displayDataInTable,
  promptText
} = require("../util")
const mainDb = db.client;

const CLIENTTYPE = [{
    name: "individual",
    value: 1
  },
  {
    name: "private company",
    value: 2
  },
  {
    name: "government Company",
    value: 3
  }
]
const BUSTYPE = [{
    name: "Home",
    value: 1
  },
  {
    name: "school",
    value: 2
  },
  {
    name: "governemt office",
    value: 3
  },
  {
    name: "Fishery",
    value: 4
  },
  {
    name: "Private business",
    value: 5
  }
]
const logBlue = text => log(chalk.blue(text));
const logRed = text => log(chalk.red(text));

const log = console.log;

class ClinetCommand extends Command {
  async run() {
    const {
      flags,
      args
    } = this.parse(ClinetCommand);
    if (flags.add) {
      return this.addClient();
    }
    if (flags.list) {
      return this.listClient();
    }
    if (flags.delete) {
      return this.deleteClient();
    }
    if (flags.update) {
      return this.updateClient();
    }
  }


  async getInputValues() {
    let name = await promptText("client name")
    let adress = await promptText("Client adress is?");
    let creditCard = await promptText("Client credit card number?");
    let clientType = await inquirer.prompt([{
      name: "clientType",
      message: "select a client type",
      type: "list",
      choices: CLIENTTYPE
    }]);

    let businessType = await inquirer.prompt([{
      name: "businessType",
      message: "select a work palce type",
      type: "list",
      choices: BUSTYPE
    }]);
    return {
      name,
      adress,
      credit_card_no: creditCard,
      client_type: clientType.clientType,
      business_type: businessType.businessType
    };
  }
  async makeClientListChoice() {
    let allClientChoise = [];
    let all = await mainDb.findAll({
      raw: true
    });

    for (let i in all) {
      allClientChoise.push({
        name: all[i].name,
        value: all[i].id
      });
    }
    return allClientChoise;
  }

  async addClient() {
    // log(Object.keys(mainDb.tableAttributes))
    logBlue("\n\n ----------------------------  adding new client --------------------------------");
    let values = await this.getInputValues();
    new mainDb(values).save();
    logBlue("\n\n ----------------------------  Added client successfully: Result is  --------------------------------");
    displayDataInTable(mainDb, [values], true)

  }

  async listClient() {
    logBlue("\n\n--------------------------------------------------Showing all clients-------------------------------------------\n\n")
    let allClient = await mainDb.findAll({
      raw: true
    });
    displayDataInTable(mainDb, allClient)
  }

  async deleteClient() {
    let allClientChoice = await this.makeClientListChoice();
    let deleteChoice = await inquirer.prompt([{
      name: "deleteId",
      message: "select a client you want to delete ",
      type: "list",
      choices: allClientChoice
    }]);
    let deleteItemValue = await mainDb.findByPk(deleteChoice.deleteId);
    deleteItemValue.destroy();
    console.log("delete client");
  }
  async updateClient() {
    logBlue("\n\n ----------------------------  updating client --------------------------------");
    let allClientChoice = await this.makeClientListChoice();
    let updateChoice = await inquirer.prompt([{
      name: "updateChoice",
      message: "select a client you want to update ",
      type: "list",
      choices: allClientChoice
    }]);
    let updateItemValies = await mainDb.findByPk(updateChoice.updateChoice);
    let upDatedinputValues = await this.getInputValues()
    updateItemValies.update(upDatedinputValues);
    displayDataInTable(mainDb, [upDatedinputValues])
    // await this.addClient(true, updateChoice.updateChoice);
    logblue("\n\n\n --------------------------- client updated");
  }
}

ClinetCommand.description = `Manage clients
...
Extra documentation goes here
`;

ClinetCommand.flags = {
  add: flags.boolean({
    char: "a",
    description: "add new client"
  }),
  list: flags.boolean({
    char: "l",
    description: "list client"
  }),
  delete: flags.boolean({
    char: "d",
    description: "delete client"
  }),
  update: flags.boolean({
    char: "u",
    description: "update client"
  })
};

module.exports = ClinetCommand;
