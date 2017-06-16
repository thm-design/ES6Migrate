const path = require('path');
const cwd = path.resolve(__dirname, '..');
const chalk = require('chalk');
const exec = require('child_process').exec;
const ora = require('ora');

function stripTrailingSlash(str) {
    if (str.endsWith('/')) {
        return str.slice(0, -1);
    }
    return str;
}

async function nostrict (appPath, to) {
    const spinner = ora(`Running ${chalk.yellow('remove no-strict')} codemod...`);
    spinner.start();
    var nostrict = await exec(`jscodeshift -t ${cwd}/node_modules/5to6-codemod/transforms/no-strict.js ${appPath}`, (err, stdout, stderr) => {
        if (err) {
            new Error(err || stderr);
            return;
        }

        spinner.text = `The ${chalk.yellow('remove no-strict')} codemod completed.`;
        spinner.succeed();
        return 'done';
    });
    return nostrict;
}

async function amd (appPath) {
    const spinner = ora(`Running ${chalk.yellow('AMD')} codemod...`);
    spinner.start();
    var amd = await exec(`jscodeshift -t ${cwd}/node_modules/5to6-codemod/transforms/amd.js ${appPath}`, (err, stdout, stderr) => {
        if (err) {
            new Error(err || stderr);
            return;
        }

        spinner.text = `The ${chalk.yellow('AMD')} codemod completed.`;
        spinner.succeed();
        return 'done';
    });
    return amd;
}

async function cjs (appPath) {
    const spinner = ora(`Running ${chalk.yellow('Common JS')} codemod...`);
    spinner.start();
    var cjs = await exec(`jscodeshift -t ${cwd}/node_modules/5to6-codemod/transforms/cjs.js ${appPath}`, (err, stdout, stderr) => {
        if (err) {
            new Error(err || stderr);
            return;
        }

        spinner.text = `The ${chalk.yellow('Common JS')} codemod completed.`;
        spinner.succeed();
        return 'done';
    });
    return cjs;
}

async function varToLet (appPath) {
    const spinner = ora(`Running ${chalk.yellow('var to let')} codemod...`);
    spinner.start();
    var varToLet = await exec(`jscodeshift -t ${cwd}/node_modules/5to6-codemod/transforms/let.js ${appPath}`, (err, stdout, stderr) => {
        if (err) {
            new Error(err || stderr);
            return;
        }

        spinner.text = `The ${chalk.yellow('var to let')} codemod command completed.`;
        spinner.succeed();
        return 'done';
    });
    return varToLet;
}

async function templateLiteral (appPath) {
    const spinner = ora(`Running ${chalk.yellow('Template Literals codemod')}...`);
    spinner.start();
    var templateLiteral = await exec(`jscodeshift -t ${cwd}/lib/codemods/js-codemod/transforms/template-literals.js ${appPath}`, (err, stdout, stderr) => {
        if (err) {
            new Error(err || stderr);
            return;
        }

        spinner.text = `The ${chalk.yellow('Template Literals codemod')} command completed.`;
        spinner.succeed();
        return 'done';
    });
    return templateLiteral;
}

async function eslint (appPath) {
    appPath = stripTrailingSlash(appPath);
    const spinner = ora(`Running ${chalk.yellow('Eslint auto fix')}...`);
    spinner.start();
    await exec(`eslint -c ${cwd}/.eslintrc.json --fix --ext .es6.js --debug ${appPath}`, (err, stdout, stderr) => {
        if (err) {
            new Error("ESLINT ERR");
            new Error(err || stderr);
            return;
        }

        spinner.text = `The ${chalk.yellow('Eslint auto fix')} command completed.`;
        spinner.succeed();
    });
    return 'done';
}


module.exports = function(appPath) {
    amd(appPath)
        .then((done) => cjs(appPath))
        .then((done) => varToLet(appPath))
        .then((done) => templateLiteral(appPath))
        .then((done) => eslint(appPath))
        .then((done) => nostrict(appPath));
}
