#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const taskRename = require('./lib/rename');
const questions = require('./lib/questions');
const migrate = require('./lib/migrate');

clear();
console.log(chalk.yellow(figlet.textSync('Migrate ES5 -> ES6 ', {horizontalLayout: 'controlled smushing'})));

const migrationOptions = ['amd', 'cjs', 'noStrict', 'noVar', 'templateLiteral'];

const getMigrationOptionsFromAnswers = (answers = []) => {
    const answersArray = answers.migrate;
    const tasks = [];
    migrationOptions.forEach(option => {
        answersArray.forEach(answerString => {
            if (answerString.indexOf(option) > -1) tasks.push(option);
        });
    });

    return tasks;
};

questions.shouldWeRename(renameAnswers => {
    const shouldWeRename = renameAnswers.rename;
    const camelCase = renameAnswers.camelcase;
    const folderPath = renameAnswers.folder;
    if (shouldWeRename === 'y') {
        questions.getRenameExtensions(extenstionAnswers => {
            const from = extenstionAnswers.from;
            const to = extenstionAnswers.to;
            let ignoreArr = extenstionAnswers.ignoreArr;
            let globPattern = extenstionAnswers.globPattern;

            if (!ignoreArr.length) {
                ignoreArr = '';
            } else {
                ignoreArr = `**/*${ignoreArr}`;
            }

            if (!globPattern.length) globPattern = '**/*.js';
            globPattern = folderPath + globPattern;

            taskRename(folderPath, from, to, globPattern, [ignoreArr], camelCase, () => {
                questions.getMigrationTasks(migrationAnswers => {
                    const taskArray = getMigrationOptionsFromAnswers(migrationAnswers);
                    migrate(folderPath, taskArray);
                });
            });
        });
    } else {
        questions.getMigrationTasks(migrationAnswers => {
            const taskArray = getMigrationOptionsFromAnswers(migrationAnswers);
            migrate(folderPath, taskArray);
        });
    }
});
