const chalk = require('chalk');
const clear = require('clear');
const CLI = require('clui');
const figlet = require('figlet');
const inquirer = require('inquirer');
const Preferences = require('preferences');
const Spinner = CLI.Spinner;
const GitHubApi = require('github');
const _ = require('lodash');
const git = require('simple-git')();
const touch = require('touch');
const fs = require('fs');


const taskRename = require('./lib/rename');
const questions = require('./lib/questions');
const migrate = require('./lib/migrate');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('MARIONETTE', { horizontalLayout: 'controlled smushing' })
  )
);
console.log(
  chalk.yellow(
    figlet.textSync('ES6 Migrate', { horizontalLayout: 'controlled smushing' })
  )
);


questions.shouldWeRename(function(){
    const shouldWeRename = arguments[0].rename;
    const camelCase = arguments[0].camelcase;
    const folderPath = arguments[0].folder;
    if (shouldWeRename === 'y') {
        questions.getRenameExtensions(function(){
            const from = arguments[0].from;
            const to = arguments[0].to;
            let ignoreArr = arguments[0].ignoreArr;
            let globPattern = arguments[0].globPattern;

            if (!ignoreArr.length) {
                ignoreArr = '';
            } else {
                ignoreArr = '**/*' + ignoreArr;
            }

            if (!globPattern.length) globPattern = '**/*.js';
            globPattern = folderPath + globPattern

            taskRename(folderPath, from, to, globPattern, [ignoreArr], camelCase, function() {
                return migrate(folderPath);
            });
        });
    } else {
        migrate(folderPath);
    }
});
