#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const figlet = require('figlet');

console.log(figlet.textSync('Covid CLI',{horizontalLayout:'full'}))

program
    .version(pkg.version)
    .command('stats', 'Get the latest covid info')
    .parse(process.argv)


    