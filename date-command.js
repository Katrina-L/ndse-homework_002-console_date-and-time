#!/usr/bin/env node

const yargs = require('yargs');
const currentDate = new Date();
const argArr = process.argv.slice(2);

const argv = require('yargs/yargs')(process.argv.slice(2))
    .option('year', {
        alias: 'y',
        describe: 'Current year',
        type: 'number'
    })
    .option('month', {
        alias: 'm',
        describe: 'Current month',
        type: 'number'
    })
    .option('date', {
        alias: 'd',
        describe: 'Current date',
        type: 'number'
    })
    .command({
        command: 'add [-d | -m | -y]',
        describe: 'Добавление интервала к текущей дате',
        handler: (argv) => {
            if ( argv.d || argv.m || argv.y ) {
                return getNewDate(argv);
            }
        }
    }) 
    .command({
        command: 'sub [-d | -m | -y]',
        describe: 'Decrease number',
        handler: (argv) => {
            if ( argv.d || argv.m || argv.year ) {
                ( (argv.date = -argv.d) || (argv.month = -argv.m) || (argv.year = -argv.y) );
                return getNewDate(argv);
            }
        }
    })
.help()
.parse();

if (argArr[0] !== 'add' && argArr[0] !== 'sub') {
    argArr.forEach( arg => {
        console.log(checkVariable(arg)); 
    } )
} 
if (argArr.length === 0) {
    console.log(`Сегодняшняя дата: ${currentDate}`);
    return console.log(formDate(new Date()));
}

function getNewDate (argv) {
    if ( argv.year ) {
        year = checkVariable(argArr[1], argv.year);
    } else {
        year = currentDate.getFullYear();
    }
    if ( argv.month ) {
        month = checkVariable(argArr[1], argv.month);
    } else {
        month = currentDate.getMonth() + 1;
    }
    if ( argv.date ) {
        date = checkVariable(argArr[1], argv.date);
    } else {
        date = currentDate.getDate();
    }
    return console.log(formDate(new Date(year, month - 1, date)));
}

function checkVariable (arg, interval = 0) {
    if ( arg === '--year' || arg === '-y' ) {
        year = currentDate.getFullYear() + interval;
        return year;
    }
    
    if ( arg === '--month' || arg === '-m' ) {
        month = currentDate.getMonth() + 1 + interval;
        return month;
    }
    
    if ( arg === '--date' || arg === '-d' ) {
        date = currentDate.getDate() + interval;
        return date;
    } else {
        return console.log(formDate(new Date()));
    }
}

function formDate (currentDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();
    const timeZone = currentDate.getTimezoneOffset() / 60 * (-1);
    return new Date(year, month, date, timeZone);
}
