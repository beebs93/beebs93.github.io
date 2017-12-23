module.exports = (grunt) => {
    return {
        options: {
            event: 'all',
            interrupt: true,
            spawn: true
        },
        html: {
            files: [
                '<%= viewSrcDir %>/**/*.pug'
            ],
            tasks: [
                'pug:dev'
            ]
        },
        scss: {
            files: [
                '<%= cssSrcDir %>/**/*.scss'
            ],
            tasks: [
                'sass:bundles_dev',
                'postcss:bundles_dev'
            ]
        },
        static_assets: {
            files: [
                '<%= staticAssetsSrcDir %>/**/*.*'
            ],
            tasks: [
                'copy:static_assets'
            ]
        }
    };
};
