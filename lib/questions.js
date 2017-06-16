const inquirer = require('inquirer');

module.exports = {

    shouldWeRename: function(callback) {
      var questions = [
          {
            name: 'folder',
            type: 'input',
            message: 'Enter the migration path (ex: app/components/):',
            validate: function( value ) {
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
            message: 'Do you want to rename file extensions? (ex: .js -> .es6.js): [y/n]',
            validate: function( value ) {
              if (value.length && (value === 'y' || value === 'n')){
                return true;
              } else {
                return 'Please answer with y/n';
              }
            }
        },
        {
          name: 'camelcase',
          type: 'input',
          message: 'Do you want to camelCase your files? (ex: MyComponent.js -> myComponent.js): [y/n]',
          validate: function( value ) {
            if (value.length && (value === 'y' || value === 'n')){
              return true;
            } else {
              return 'Please answer with y/n';
            }
          }
        }
      ];

      inquirer.prompt(questions).then(callback);
  },

  getRenameExtensions: function(callback) {
    var questions = [
        {
          name: 'from',
          type: 'input',
          message: 'Enter the file extension to be renamed:',
          validate: function( value ) {
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
          message: 'Enter what the new file extension should be:',
          validate: function( value ) {
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
        message: 'Ignore file extensions during rename ? (ex: .es6.js, .es7.js)? Enter comma separated list of extensions:',
        validate: function( value ) {
          return true;
        }
      },
      {
        name: 'globPattern',
        type: 'input',
        message: 'Enter a file glob pattern (default: **/*.js): ',
        validate: function( value ) {
          return true;
        }
      }
    ];

    inquirer.prompt(questions).then(callback);
  }
};
