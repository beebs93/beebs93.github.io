module.exports = (grunt) => {
    const addBuildHash = (dest, src) => {
        const appConfig = require('../../utils/app-config')(grunt).get();
        const filePath = `${dest}/${src}`;

        return filePath.replace(/(\.(gif|ico|jpg|jpeg|png))$/i, `.${appConfig.buildHash}$1`);
    };

    return {
        options: {
            mode: true
        },
        static_assets: {
            cwd: '<%= staticAssetsSrcDir %>',
            dest: '<%= assetsOutputDir %>',
            expand: true,
            rename: addBuildHash,
            src: [
                '**/*',
                '!**/.*'
            ]
        }
    };
};
