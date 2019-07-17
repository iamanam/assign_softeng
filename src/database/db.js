const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/home/iamanam/projects/assignment/cli/petbuster/src/db'
})


const staffs = require("./staffs")(sequelize, Sequelize)
const departments = require("./departments")(sequelize, Sequelize)
const staff_department = require("./staff_department")(sequelize, Sequelize)
const job_types = require("./job_types")(sequelize, Sequelize)
const salaries = require("./salaries")(sequelize, Sequelize)
const assignedStuff = require("./assigned_stuff")(sequelize, Sequelize)
const chemical = require("./chemical")(sequelize, Sequelize)
const client = require("./client")(sequelize, Sequelize)
const contractor = require("./contractor")(sequelize, Sequelize)
const pestControlJob = require("./pestControlJob")(sequelize, Sequelize)
const pest_control_job_state = require("./pest_control_job_state")(sequelize, Sequelize)
const vehicle = require("./vehicle")(sequelize, Sequelize)



module.exports = {
  sequelize,
  staff_department,
  staffs,
  departments,
  job_types,
  salaries,
  assignedStuff,
  chemical,
  client,
  contractor,
  pest_control_job_state,
  pestControlJob,
  vehicle
};
