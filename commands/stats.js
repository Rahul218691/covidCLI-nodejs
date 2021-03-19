const CovidAPI = require('../lib/CovidAPI');
const inquirer = require('inquirer');
const colors = require('colors');
const {isRequired} = require('../utils/validation');
const ora = require('ora');

const stats = {
    async coronaresult(cmd){
        try {
            const spinner = ora().start()
            const api = new CovidAPI();
            const coviddata = await api.getData(cmd.limit,cmd.sortbydeath)
            if(coviddata !== undefined){
                spinner.stop();
                console.table(coviddata)
            }
            // console.log(cmd.limit)
        } catch (error) {
            console.error(error.message.red)
        }
    },
    async getspecificResult(){
        try {
            const input = await inquirer.prompt([
                {
                    type:'input',
                    name:'country',
                    message:'Enter the country name to search for'.green,
                    validate:isRequired
                }
            ])
            const spinner = ora().start()
            const api = new CovidAPI();
            const covidcountry = await api.getCountryResult(input.country)
            spinner.stop();
            console.table(covidcountry)
        } catch (error) {
            console.error(error.message.red)
        }
    },
    async getActive(){
        try {
            const api = new CovidAPI();
            const spinner = ora().start()
            const activecovid = await api.getActiveCountries()
            spinner.stop();
            console.table(activecovid)
        } catch (error) {
            console.error(error.message.red)
        }
    }
}

module.exports = stats;