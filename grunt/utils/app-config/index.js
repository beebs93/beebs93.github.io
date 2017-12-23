module.exports = (grunt) => {
    const appConfigFilePath = `${grunt.config.get('buildDir')}/config/app.json`;

    return {
        set: (configData) => {
            grunt.file.write(appConfigFilePath, JSON.stringify(configData, null, 4));
        },

        get: () => {
            return grunt.file.readJSON(appConfigFilePath);
        }
    };
};
