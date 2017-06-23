const path = require('path');
const cwd = path.resolve(__dirname, '..');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const ora = require('ora');

const tasks = {
    noStrict(appPath) {
        try {
            const spinner = ora(`Running ${chalk.yellow('no-strict')} task...`);
            spinner.start();
            execSync(`jscodeshift -t ${cwd}/node_modules/5to6-codemod/transforms/no-strict.js ${appPath}`);
            spinner.text = `The ${chalk.yellow('no-strict')} task completed.`;
            spinner.succeed();
            return 'done';
        } catch (err) {
            new Error(err);
        }
    },

    amd(appPath) {
        try {
            const spinner = ora(`Running ${chalk.yellow('amd')} task...`);
            spinner.start();
            execSync(`jscodeshift -t ${cwd}/node_modules/5to6-codemod/transforms/amd.js ${appPath}`);
            spinner.text = `The ${chalk.yellow('amd')} task completed.`;
            spinner.succeed();
            return 'done';
        } catch (err) {
            new Error(err);
        }
    },

    cjs(appPath) {
        try {
            const spinner = ora(`Running ${chalk.yellow('common js')} task...`);
            spinner.start();
            execSync(`jscodeshift -t ${cwd}/node_modules/5to6-codemod/transforms/cjs.js ${appPath}`);
            spinner.text = `The ${chalk.yellow('common js')} task completed.`;
            spinner.succeed();
            return 'done';
        } catch (err) {
            new Error(err);
        }
    },

    noVar(appPath) {
        try {
            const spinner = ora(`Running ${chalk.yellow('no var')} task...`);
            spinner.start();
            execSync(`jscodeshift -t ${cwd}/lib/codemods/js-codemod/no-vars.js ${appPath}`);
            spinner.text = `The ${chalk.yellow('no var')} task completed.`;
            spinner.succeed();
            return 'done';
        } catch (err) {
            new Error(err);
        }
    },

    templateLiteral(appPath) {
        try {
            const spinner = ora(`Running ${chalk.yellow('template literals task')}...`);
            spinner.start();
            execSync(`jscodeshift -t ${cwd}/lib/codemods/js-codemod/template-literals.js ${appPath}`);
            spinner.text = `The ${chalk.yellow('template literals task')} completed.`;
            spinner.succeed();
            return 'done';
        } catch (err) {
            new Error(err);
        }
    },

    arrowFunction(appPath) {
        try {
            const spinner = ora(`Running ${chalk.yellow('arrow functions task')}...`);
            spinner.start();
            execSync(`jscodeshift -t ${cwd}/lib/codemods/js-codemod/arrow-function.js ${appPath}`);
            spinner.text = `The ${chalk.yellow('arrow functions task')} completed.`;
            spinner.succeed();
            return 'done';
        } catch (err) {
            new Error(err);
        }
    }
};

module.exports = async function migrate(appPath, taskArray = []) {
    for (const fn of taskArray) {
        await tasks[fn](appPath);
    }
};
