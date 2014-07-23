// A reference configuration file.
exports.config = {

//    seleniumServerJar: 'node_modules/selenium-server/lib/runner/selenium-server-standalone-2.38.0.jar',

    seleniumPort: null,

    chromeOnly: false,

    seleniumArgs: [],

    // The address of a running selenium server. If specified, Protractor will
    // connect to an already running instance of selenium. This usually looks like
    seleniumAddress: 'http://localhost:4444/wd/hub',
//    seleniumAddress: null,

    // ----- What tests to run -----
    //
    // Spec patterns are relative to the location of this config.

    specs: ['test/e2e/*Spec.js'],


    // Patterns to exclude.
    exclude: [],

    // ----- Capabilities to be passed to the webdriver instance ----
    //
    // For a full list of available capabilities, see
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities
    // and
    // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
    capabilities: {
        'browserName': 'chrome'
    },
//    capabilities: {
//        'browserName': 'phantomjs'
//        ,
//        'phantomjs.binary.path':'./node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/phantomjs'
//    },

    // If you would like to run more than one instance of webdriver on the same
    // tests, use multiCapabilities, which takes an array of capabilities.
    // If this is specified, capabilities will be ignored.
    multiCapabilities: [],

    // ----- More information for your tests ----
    //
    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:9000',

    // Selector for the element housing the angular app - this defaults to
    // body, but is necessary if ng-app is on a descendant of <body>
    rootElement: 'body',

    onPrepare: function () {
        // The require statement must be down here, since jasmine-reporters
        // needs jasmine to be in the global and protractor does not guarantee
        // this until inside the onPrepare function.
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('reports', true, true));
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());

    },


    // The params object will be passed directly to the protractor instance,
    // and can be accessed from your test. It is an arbitrary object and can
    // contain anything you may need in your test.
    // This can be changed via the command line as:
    //   --params.login.user 'Joe'
    // ----- The test framework -----
    //
    // Jasmine and Cucumber are fully supported as a test and assertion framework.
    // Mocha has limited beta support. You will need to include your own
    // assertion framework if working with mocha.
    framework: 'jasmine',

    // ----- Options to be passed to minijasminenode -----
    //
    // See the full list at https://github.com/juliemr/minijasminenode
    jasmineNodeOpts: {
        // onComplete will be called just before the driver quits.
        onComplete: null,
        // If true, display spec names.
        isVerbose: false,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 30000
    },

    onCleanUp: function () {
    }
};