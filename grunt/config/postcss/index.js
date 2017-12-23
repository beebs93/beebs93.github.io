module.exports = (grunt) => {
    const autoprefixer = require('autoprefixer')({
        // This must match https://github.com/twbs/bootstrap-sass#sass-autoprefixer.
        browsers: [
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
        ]
    });

    return {
        bundles_dev: {
            options: {
                map: true,
                processors: [
                    autoprefixer
                ]
            },
            cwd: '<%= cssAssetsBundledDir %>',
            dest: '<%= cssAssetsOutputDir %>',
            expand: true,
            src: '**/*.bundle.css'
        },
        bundles_prod: {
            options: {
                map: false,
                processors: [
                    autoprefixer,
                    require('cssnano')
                ]
            },
            cwd: '<%= cssAssetsBundledDir %>',
            dest: '<%= cssAssetsOutputDir %>',
            expand: true,
            src: '**/*.bundle.css'
        }
    };
};
