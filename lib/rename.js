const chalk = require('chalk');
const ora = require('ora');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const camelCase = require('camelcase');

/**
 * @param {string}  folderPath - The folder path
 * @param {string}  from    - The source extension
 * @param {string}  to      - The target extension
 * @param {string}  globPattern      - The globPattern for batch rename
 * @param {function}  cb      - callback function
 * @return {Promise} Promise object
 */
module.exports = function(folderPath, from, to, globPattern, ignoreArr, camelcase, cb) {

    if (!from || !to)
        return Promise.reject(
            new Error(
                'Unable to run "rename" command because you"ve forgotten to specify ' +
                    'either a "from" or a "to" file extension target for the task. Given args: ' +
                    `from: "${from}", to: "${to}".`
            )
        );

    if (camelcase === 'y') {
        let spinner = ora(`Starting batch rename task: "${from}" --> "${to}" ...`);
        spinner.start();
        return new Promise(resolve => {
            return glob(globPattern, {ignore: ignoreArr}, function(err, files) {
                let processed = 0;
                files.forEach(file => {
                    fs.renameSync(file, file.replace(from, to));
                    processed++;
                });
                spinner.text = `${chalk.yellow(processed)} files processed...`;
                return resolve();
            })
        })
        .then(() => {
            spinner.succeed();
            spinner = ora('Starting batch rename (camelCase)...');
            spinner.start();
            return new Promise(resolve => {
                return glob(globPattern, function(err, files) {
                    let processed = 0;
                    files.forEach(file => {
                        // const filename = path.parse(file).base;
                        const filenameWithoutExtension = path.basename(file, to);
                        fs.renameSync(file, file.replace(filenameWithoutExtension, camelCase(filenameWithoutExtension)));
                        processed++;
                    });
                    spinner.text = `${chalk.yellow(processed)} files processed...`;
                    return resolve();
                });
            })
            .then(() => {
                spinner.succeed();
                cb();
            })
            .catch(err => {
                spinner.text = `Failed to do ${from}" --> "${to} rename task: ${err}.`;
                spinner.fail();
                throw new Error(err);
            });
        })
        .catch(err => {
            spinner.text = `Failed to do camelCase rename task: ${err}.`;
            spinner.fail();
            throw new Error(err);
        });
    } else {
        spinner = ora(`Starting batch rename task: "${from}" --> "${to}" ...`);
        spinner.start();
        return new Promise(resolve => {
            return glob(globPattern, {ignore: ignoreArr}, function(err, files) {
                let processed = 0;
                files.forEach(file => {
                    fs.renameSync(file, file.replace(from, to));
                    processed++;
                });
                spinner.text = `${chalk.yellow(processed)} files processed...`;
                return resolve();
            });
        })
        .then(() => {
            spinner.succeed();
            cb();
        })
        .catch(err => {
            spinner.text = `Failed to do ${from}" --> "${to} rename task: ${err}.`;
            spinner.fail();
            throw new Error(err);
        });
    }
};
