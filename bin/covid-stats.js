const program = require('commander');
const stats = require('../commands/stats');

program
    .command('allcountries')
    .description('Get the covid info for all the countries')
    .option('--limit <number>','Limit number of displayed records','221')
    .option('--sortbydeath','Get the list of countries sorted by most death rate')
    .action((cmd)=>stats.coronaresult(cmd))


program
    .command('country')
    .description('Get Covid Info of specific Country')
    .action(()=>stats.getspecificResult())    

program
    .command('activecountries')
    .description('Get a list of covid active countries')
    .action(()=>stats.getActive())    

program.parse(process.argv)    