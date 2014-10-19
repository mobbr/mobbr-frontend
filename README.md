MOBBR front-end app
===================

Using grunt for running and building the app:

- install nodejs (see nodejs.org for binaries)
- cd to project dir and do:
```
npm install -g grunt
npm install -g grunt-cli
npm install -g bower
npm install
bower install
```
- run the app with ```grunt server```
- build the app with ```grunt build```. This minifies and concatenates resources and copies them to the ```/dist``` directory.
- deployment
  - deploying user should copy his ssh key to the server
  - deploying user should be a member of www-data: ```sudo usermod -a -G www-data <username>```
  - run ```grunt deploy``` with optional environment value of 'test' (default) or 'prod': ```grunt deploy --env=<environment>``` 

The production API is at https://api.mobbr.com and the test API is at https://test-api.mobbr.com .  


Submitting bug-reports
======================

Please check our latest version at https://test-www.mobbr.com first!

Contributing
============

Feel free to contribute. We will be pledging money and rewarding issues using the Mobbr system. Check this out at https://mobbr.com

Artwork and materials
=====================

- Our colour palette: http://www.colourlovers.com/palette/3522874/Mobbr
- Our initial design PNG's, incl. fontset, icons: https://drive.google.com/folderview?id=0B9SEhDYgR2G6MVpGUTNPNFktVkU&usp=sharing
