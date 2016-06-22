'use strict';
var generators = require('yeoman-generator');
var glob = require('glob');
var fs = require('fs');

module.exports = generators.Base.extend({
  writing: {
    templatedFiles: function() {
      var templateFiles = glob.sync('templates/**/_*', { nodir: true, cwd: __dirname });
      var self = this;
      templateFiles.forEach(function(filePath) {
        var templatePath = filePath.replace('templates/', '');
        self.fs.copyTpl(
          self.templatePath(templatePath),
          self.destinationPath(templatePath.substring(1)), // strip _
          self.props
        );
      });
    },
    rawFiles: function() {
      var templateFiles = glob.sync('templates/**/[!_]*', { nodir: true, cwd: __dirname, dot: true });
      var self = this;
      templateFiles.forEach(function(filePath) {
        var templatePath = filePath.replace('templates/', '');
        self.fs.copy(
          self.templatePath(templatePath),
          self.destinationPath(templatePath),
          self.props
        );
      });
    },
    assetsDirectory: function(){
      var assetsDir = 'templates/assets/';
      var assetsPath = assetsDir.replace('templates/', '');
      fs.mkdirSync(this.destinationPath(assetsPath));
    },
    depInstall: function(){
      this.npmInstall();
      this.bowerInstall();
    }
  }
});
