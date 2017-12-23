module.exports = (grunt) => {
    // Load any Grunt tasks.
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sass');

    // Initialize the Grunt config by defining any important directories.
    grunt.config.init({
        assetsBundledDir: '<%= buildDir %>/bundled',
        assetsOutputDir: '<%= distDir %>/public',
        buildDir: '<%= rootDir %>/build',
        cssAssetsBundledDir: '<%= assetsBundledDir %>/styles',
        cssAssetsOutputDir: '<%= assetsOutputDir %>/styles',
        cssSrcDir: '<%= srcDir %>/styles',
        distDir: '<%= rootDir %>',
        nodeModulesDir: '<%= rootDir %>/node_modules',
        rootDir: '.',
        srcDir: '<%= rootDir %>/src',
        staticAssetsSrcDir: '<%= srcDir %>/static',
        viewSrcDir: '<%= srcDir %>/views',
        viewPagesSrcDir: '<%= viewSrcDir %>/pages'
    });

    // Iterate through the Grunt config directories and load their Grunt tasks
    grunt.file.expand(
        {
            cwd: 'grunt/config',
            filter: 'isDirectory'
        },
        '**'
    ).forEach((task) => {
        // Skip any subdirectories.
        if (task.indexOf('/') !== -1) {
            return true;
        }

        const chalk = require('chalk');

        grunt.verbose.write(`Loading configuration for Grunt task ${chalk.cyan(task)}...`);

        grunt.config(task, require(`./grunt/config/${task}`)(grunt));

        grunt.verbose.ok();
    });

    // Register any build targets.
    grunt.registerTask('set-app-config', () => {
        const crypto = require('crypto');
        const appConfig = require('./grunt/utils/app-config')(grunt);
        const buildHash = crypto.createHash('md5')
            .update(Date.now().toString())
            .digest('hex')
            .slice(0, 6);

        appConfig.set({
            buildHash
        });
    });

    grunt.registerTask('dev', [
        'clean',
        'set-app-config',
        'pug:dev',
        'sass:bundles_dev',
        'postcss:bundles_dev',
        'copy:static_assets'
    ]);

    grunt.registerTask('prod', [
        'clean',
        'set-app-config',
        'pug:prod',
        'sass:bundles_prod',
        'postcss:bundles_prod',
        'copy:static_assets'
    ]);

    grunt.registerTask('release', 'prod');

    grunt.registerTask('server', [
        'dev',
        'browserSync',
        'watch'
    ]);

    // Ensure the default task maps to the release task.
    grunt.registerTask('default', 'release');
};
