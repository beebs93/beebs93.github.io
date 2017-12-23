module.exports = (grunt) => {
    const outputFileExtension = '.bundle.css';
    const addBuildHash = (dest, src) => {
        const appConfig = require('../../utils/app-config')(grunt).get();
        const filePath = `${dest}/${src}`;

        // Do not rename any files that are prefixed with an underscore.
        if (src.indexOf('_') === 0) {
            return filePath;
        }

        return filePath.replace(outputFileExtension, `.${appConfig.buildHash}${outputFileExtension}`);
    }

    return {
        options: {
            functions: {
                buildHash: () => {
                    const sass = require('node-sass');
                    const appConfig = require('../../utils/app-config')(grunt).get();

                    return new sass.types.String(appConfig.buildHash);
                }
            },
            outputStyle: 'expanded',
            precision: 8
        },
        bundles_dev: {
            cwd: '<%= cssSrcDir %>',
            dest: '<%= cssAssetsBundledDir %>',
            expand: true,
            ext: outputFileExtension,
            options: {
                sourceComments: false,
                sourceMap: false,
                sourceMapContents: false,
                sourceMapEmbed: true
            },
            rename: addBuildHash,
            src: '**/*.scss'
        },
        bundles_prod: {
            cwd: '<%= cssSrcDir %>',
            dest: '<%= cssAssetsBundledDir %>',
            expand: true,
            ext: outputFileExtension,
            options: {
                omitSourceMapUrl: true
            },
            rename: addBuildHash,
            src: '**/*.scss'
        }
    };
};
