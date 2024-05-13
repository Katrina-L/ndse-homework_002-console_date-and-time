#!/usr/bin/env node

const yargs = require('yargs');
const currentDate = new Date();
const argArr = process.argv.slice(2);
// const argv = yargs
//     .command({
//         command: 'add',
//         describe: 'Добавление интервала к текущей дате',
//         handler: function (argArr) {
//             if ( argArr[0] === 'add' && Number.isInteger(+argArr[2]) ) {
//                 console.log('зашел в условие по add');    //  delete
//                 argArr[2] = Number(argArr[2]);
//                 getNewDate(argArr);
//             }
//         }
//     }) 
//     .command({
//         command: 'sub',
//         describe: 'Decrease number',
//         handler: function (argArr) {
//             if ( argArr[0] === 'sub' && Number.isInteger(+argArr[2]) ) {
//                 console.log('зашел в условие по sub');    //  delete
//                 argArr[2] = -argArr[2];
//                 getNewDate(argArr);
//             }
//         }
//     })
//     .option('year', {
//         alias: 'y',
//         describe: 'Current year'
//     })
//     .option('month', {
//         alias: 'm',
//         describe: 'Current month'
//     })
//     .option('date', {
//         alias: 'd',
//         describe: 'Current date'
//     })
// .help()
// .argv;

const argv = yargs
    .command('add', 'Add number')
    .command('sub', 'Decrease number',)
    .option('year', {
        alias: 'y',
        describe: 'Current year'
    })
    .option('month', {
        alias: 'm',
        describe: 'Current month'
    })
    .option('date', {
        alias: 'd',
        describe: 'Current date'
    })
    .help()
    .argv;

if ( argArr[0] === 'add' && Number.isInteger(+argArr[2]) ) {
    argArr[2] = Number(argArr[2]);
    return getNewDate(argArr);
}
if ( argArr[0] === 'sub' && Number.isInteger(+argArr[2]) ) {
    argArr[2] = -argArr[2];
    return getNewDate(argArr);
} 
if (argArr[0] !== 'add' && argArr[0] !== 'sub') {
    argArr.forEach( arg => {
        console.log(checkVariable(arg)); 
    } )
} 
if (argArr.length === 0) {
    console.log(`Сегодняшняя дата: ${currentDate}`);
    return console.log(formDate(new Date()));
}

function getNewDate (argArr) {
    if ( argv.year ) {  //  if ( argArr[1] === 'year' ) {
        year = checkVariable(argArr[1], argArr[2]);
    } else {
        year = currentDate.getFullYear();
    }
    if ( argv.month ) { //  if ( argArr[1] === 'month' ) {
        month = checkVariable(argArr[1], argArr[2]);
    } else {
        month = currentDate.getMonth() + 1;
    }
    if ( argv.date ) {    //  if ( argArr[1] === '-d' ) {
        date = checkVariable(argArr[1], argArr[2]);
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
