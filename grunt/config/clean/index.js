module.exports = (grunt) => {
    return {
        options: {
            force: true
        },
        build: {
            src: '<%= buildDir %>'
        },
        dist: {
            src: [
                '<%= assetsOutputDir %>',
                '<%= distDir %>/*.html'
            ]
        }
    };
};
