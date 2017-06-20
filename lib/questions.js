const inquirer = require('inquirer');

module.exports = {
    shouldWeRename(callback) {
        const questions = [
            {
                name: 'folder',
                type: 'input',
                message: 'Enter the migration path (ex: app/components/):',
                validate(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter the folder path';
                    }
                }
            },
            {
                name: 'rename',
                type: 'input',
                message: 'Rename file extensions? (ex: .js -> .es6.js): (y/n)',
                validate(value) {
                    if (value.length && (value === 'y' || value === 'n')) {
                        return true;
                    } else {
                        return 'Please answer with y/n';
                    }
                }
            },
            {
                name: 'camelcase',
                type: 'input',
                message: 'camelCase file names? (ex: MyComponent.js -> myComponent.js): (y/n)',
                validate(value) {
                    if (value.length && (value === 'y' || value === 'n')) {
                        return true;
                    } else {
                        return 'Please answer with y/n';
                    }
                }
            }
        ];

        inquirer.prompt(questions).then(callback);
    },

    getRenameExtensions(callback) {
        const questions = [
            {
                name: 'from',
                type: 'input',
                message: 'Enter the file extension to be renamed:',
                validate(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter the file extension you want to rename';
                    }
                }
            },
            {
                name: 'to',
                type: 'input',
                message: 'Enter the new file extension:',
                validate(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter what the new file extension should be';
                    }
                }
            },
            {
                name: 'ignoreArr',
                type: 'input',
                message: 'Ignore file extensions during rename ? (ex: .es6.js, .es7.js)? Enter a comma separated list:',
                validate() {
                    return true;
                }
            },
            {
                name: 'globPattern',
                type: 'input',
                message: 'Enter a file glob pattern (default: **/*.js): ',
                validate() {
                    return true;
                }
            }
        ];

        inquirer.prompt(questions).then(callback);
    },

    getMigrationTasks(callback) {
        const questions = [
            {
                type: 'checkbox',
                message: 'Select migration tasks',
                name: 'migrate',
                choices: [
                    new inquirer.Separator('Migration Options: '),
                    {
                        name: ' (amd) Transform AMD style modules to ES6 import/export.'
                    },
                    {
                        name: ' (cjs) Transform CommonJS style require() calls to ES6 import statements.'
                    },
                    {
                        name: ' (noStrict) Remove "use strict" statements.'
                    },
                    {
                        name: ' (noVar) Replace all var calls to use let or const.'
                    },
                    {
                        name: ' (templateLiteral) Replaces string concatenation with template literals.'
                    },
                    {
                        name:
                            ' (arrowFunction) Transforms callbacks only when it can guarentee not breaking this context in the function'
                    },
                    {
                        name: ' (eslint) Run eslint auto fix.'
                    },
                    {
                        name: ' (prettier) Run prettier.'
                    }
                ]
            }
        ];

        inquirer.prompt(questions).then(callback);
    }
};
