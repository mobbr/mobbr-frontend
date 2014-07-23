mobbr angular app
=================

Using grunt for running and building the app:

1. install nodejs (see nodejs.org for binaries)
2. cd to project dir and do:
```
npm install -g grunt
npm install -g grunt-cli
npm install -g bower
npm install
bower install
```
3. run the app with ```grunt server```
4. build the app with ```grunt build```. This minifies and concatenates resources and copies them to the ```/dist``` directory.

5. deployment
- deploying user should copy his ssh key to the server
- deploying user should be a member of www-data: ```sudo usermod -a -G www-data <username>```
- run ```grunt deploy``` with optional environment value of 'test' (default) or 'prod': ```grunt deploy --env=<environment>```


6. unit testing
- karma karma.conf.js

7. e2e testing
- First setup your environment. Cd to the project dir and do:

npm install -g protractor
webdriver-manager update

- Run the e2e tests. Cd to the project dir and do:

webdriver-manager start
grunt server (if not already running)
protractor protractor.js

- Add tests in the folder test/e2e. seperate tests by functionality and let the filename end with Spec.js.
protractor api https://github.com/angular/protractor/blob/master/docs/api.md


