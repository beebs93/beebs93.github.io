module.exports = (grunt) => {
    const targetFiles = [
        {
            cwd: '<%= viewPagesSrcDir %>',
            dest: '<%= distDir %>',
            expand: true,
            ext: '.html',
            src: '**/*.pug',
        }
    ];
    const buildViewData = (templateName) => {
        const _ = require('lodash');
        const appConfig = require('../../utils/app-config')(grunt).get();
        const chalk = require('chalk');
        const defaultData = require(`./data/default`);
        const pageData = require(`./data/${templateName}`);
        const baseViewData = {
            appConfig
        };
        const viewData = _.merge(baseViewData, defaultData, pageData);

        grunt.verbose.writeln(`View data for template ${chalk.cyan(templateName)}`);
        grunt.verbose.writeln(JSON.stringify(viewData, null, 2));

        return viewData;
    };

    return {
        options: {
            data: (outputFilePath) => {
                const templateName = outputFilePath.split('/')
                    .pop()
                    .split('.')
                    .shift();

                return buildViewData(templateName);
            }
        },
        dev: {
            options: {
                pretty: true
            },
            files: targetFiles
        },
        prod: {
            options: {
                pretty: false
            },
            files: targetFiles
        }
    };
};
