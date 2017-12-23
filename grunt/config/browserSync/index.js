module.exports = (grunt) => {
    return {
        bsFiles: [
            '<%= distDir %>/*.html',
            '<%= assetsOutputDir %>/**/*.{css,gif,ico,jpg,jpeg,png}'
        ],
        options: {
            host: grunt.option('server-host') || 'localhost',
            open: 'ui-external',
            port: 9001,
            codeSync: true,
            ghostMode: grunt.option('no-sync') ? false : true,
            server: {
                baseDir: '<%= distDir %>'
            },
            ui: {
                port: grunt.option('server-ui-port') || 3001
            },
            notify: false,
            watchTask: true
        }
    }
};
