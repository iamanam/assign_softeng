const {
  Command,
  flags
} = require("@oclif/command");

const {
  cli
} = require("cli-ux");
const chalk = require("chalk");
const
  db = require("../database/db");

const log = console.log;


const logBlue = (text) => log(chalk.blue(text))
const logRed = (text) => log(chalk.red(text))

log(Object.keys(db.pestControlJob.tableAttributes))


class pestControlCommand extends Command {
  async run() {
    const {
      flags,
      args
    } = this.parse(pestControlCommand);
    if (flags.add) {
      return this.addpestControl();
    }
    if (flags.list) {
      return this.listpestControl();
    }
    if (flags.delete) {
      return this.deletepestControl();
    }
    if (flags.update) {
      return this.updatepestControl();
    }
  }

  logpestControl(name, adress, business, pestControlType, creditCard) {
    console.log(`
          pestControl name is => ${name}
          pestControl adress is => ${adress}
          pestControl business is => ${business}
          pestControlType is => ${pestControlType}
          creditCard is => ${creditCard}
          `);
  }

  async addpestControl() {
    console.log("adding new pestControl");
    let id = await cli.prompt("Client id of the job?");
    let jobDate = await cli.prompt("date of the job?");
    let finishDate = await cli.prompt("finish date of the job?");
    console.log(chalk.blue("Type - \n 1.Individual \n 2. private"));
    let pestControlType = await cli.prompt("pestControl type?");
    let creditCard = await cli.prompt("pestControl credit card number?");
    this.logpestControl(name, adress, business, pestControlType, creditCard);
  }

  async listpestControl() {
    let jobs = await db.pestControlJob.findAll();
    console.log("list pestControl", jobs);
  }
  deletepestControl() {
    console.log("delete pestControl");
  }
  updatepestControl() {
    console.log("update pestControl")
  }
}

pestControlCommand.description = `Describe the command here
      ...
      Extra documentation goes here
      `;

pestControlCommand.flags = {
  add: flags.boolean({
    char: "a",
    description: "add new pestControl"
  }),
  list: flags.boolean({
    char: "l",
    description: "list pestControl"
  }),
  delete: flags.boolean({
    char: "d",
    description: "delete pestControl"
  }),
  update: flags.boolean({
    char: "u",
    description: "update pestControl"
  }),
};


module.exports = pestControlCommand;
