describe('mobbr.controllers: TasksController', function () {

    'use strict';

    // loading ngmock
    beforeEach(module('ngMockE2E'));
    // load the controller's module
    beforeEach(module('mobbr.controllers'));

    var contr,
        scope,
        rootScope,
        httpBackend,
        common,
        state,
        controller;

    var tasksResult = {'result':[{'url':'https:\/\/github.com\/mobbr\/mobbr-frontend\/issues\/189','title':'Github repository mobbr\/mobbr-frontend, issue #189','description':'Sharing section on TASKS','language_iso':'EN','copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:avatars0.githubusercontent.com%2Fu%2F710804%3Fv%3D3%26s%3D400&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'500','lastpaiddatetime':'2014-11-13 11:05:53','firstpaiddatetime':'2014-11-13 11:05:53','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'1','domain':'github.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=github.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F189','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F189','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F189','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F189'}},{'url':'https:\/\/github.com\/mobbr\/mobbr-frontend\/issues\/248','title':'Github repository mobbr\/mobbr-frontend, issue #248','description':'Tile 4 on TASK yellow while script has participants','language_iso':'EN','copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:avatars0.githubusercontent.com%2Fu%2F710804%3Fv%3D2%26s%3D400&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'25','lastpaiddatetime':'2014-10-30 11:57:13','firstpaiddatetime':'2014-10-30 11:57:13','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'1','domain':'github.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=github.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F248','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F248','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F248','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F248'}},{'url':'https:\/\/github.com\/mobbr\/mobbr-frontend\/milestones\/wrap-up%20sprint%20v1.3','title':'Milestone #4 \'wrap-up sprint v1.3\' in Github repository mobbr\/mobbr-frontend','description':'All things left :)','language_iso':'EN','copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:avatars0.githubusercontent.com%2Fu%2F710804%3Fv%3D2%26s%3D400&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'326.1449993285225','lastpaiddatetime':'2014-10-27 13:49:06','firstpaiddatetime':'2014-10-27 13:49:06','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['BTC'],'is_pledge':'1','domain':'github.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=github.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fmilestones%2Fwrap-up%2520sprint%2520v1.3','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fmilestones%2Fwrap-up%2520sprint%2520v1.3','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fmilestones%2Fwrap-up%2520sprint%2520v1.3','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fmilestones%2Fwrap-up%2520sprint%2520v1.3'}},{'url':'https:\/\/test-www.mobbr.com','title':'MOBBR Crowdpayment System','description':'Welcome to MOBBR, the worlds first crowdpayment system. Start sharing rewards and donations in bitcoin, XRP, social currencies and FIAT currencies.','language_iso':null,'copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:mobbr.com%2Fimg%2Fmobbr-ripple.jpg&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'1','lastpaiddatetime':'2014-11-29 14:00:12','firstpaiddatetime':'2014-11-29 14:00:12','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'0','domain':'test-www.mobbr.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=test-www.mobbr.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Ftest-www.mobbr.com','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Ftest-www.mobbr.com','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Ftest-www.mobbr.com','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Ftest-www.mobbr.com'}},{'url':'https:\/\/github.com\/Bit-Nation\/toxcore','title':'Github repository Bit-Nation\/toxcore','description':'The future of online communications.','language_iso':'EN','copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:avatars0.githubusercontent.com%2Fu%2F8449745%3Fv%3D3%26s%3D400&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'3.021449993285225','lastpaiddatetime':'2014-11-28 16:05:51','firstpaiddatetime':'2014-11-28 16:05:51','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['BTC'],'is_pledge':'0','domain':'github.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=github.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fgithub.com%2FBit-Nation%2Ftoxcore','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fgithub.com%2FBit-Nation%2Ftoxcore','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fgithub.com%2FBit-Nation%2Ftoxcore','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fgithub.com%2FBit-Nation%2Ftoxcore'}},{'url':'https:\/\/mobbr.com','title':'MOBBR Crowdpayment System','description':'Welcome to MOBBR, the worlds first crowdpayment system. Start sharing rewards and donations in bitcoin, XRP, social currencies and FIAT currencies.','language_iso':null,'copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:mobbr.com%2Fimg%2Fmobbr-ripple.jpg&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'12','lastpaiddatetime':'2014-11-28 11:28:40','firstpaiddatetime':'2014-11-28 11:28:40','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'0','domain':'mobbr.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=mobbr.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fmobbr.com','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fmobbr.com','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fmobbr.com','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fmobbr.com'}},{'url':'https:\/\/github.com\/identifi\/identifi','title':'Github repository identifi\/identifi','description':'Identifi implementation built on Bitcoin code','language_iso':'EN','copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:avatars3.githubusercontent.com%2Fu%2F3898718%3Fv%3D3%26s%3D400&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'1','lastpaiddatetime':'2014-11-20 13:36:22','firstpaiddatetime':'2014-11-20 13:36:22','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'0','domain':'github.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=github.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fgithub.com%2Fidentifi%2Fidentifi','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fgithub.com%2Fidentifi%2Fidentifi','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fgithub.com%2Fidentifi%2Fidentifi','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fgithub.com%2Fidentifi%2Fidentifi'}},{'url':'http:\/\/ask.mobbr.com\/187\/where-is-the-add-payment-button','title':'Where is the add payment button? - Mobbr Q&A','description':'Im really interested in mobbr and its functionality. My vision is that people can simply add  ... put money on this question.  Thanks in advance.','language_iso':'EN','copyright':null,'img_url':'','currency_iso':'EUR','amount_total':'3.3021449993285223','lastpaiddatetime':'2014-11-14 15:31:02','firstpaiddatetime':'2014-11-14 15:31:00','num_payments':'2','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'0','domain':'ask.mobbr.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=ask.mobbr.com','link':{'info':'\/api_v1\/uris\/info?url=http%3A%2F%2Fask.mobbr.com%2F187%2Fwhere-is-the-add-payment-button','payments':'\/api_v1\/payments\/uri?url=http%3A%2F%2Fask.mobbr.com%2F187%2Fwhere-is-the-add-payment-button','persons':'\/api_v1\/persons\/uri?url=http%3A%2F%2Fask.mobbr.com%2F187%2Fwhere-is-the-add-payment-button','notification':'\/api_v1\/notifications\/uri?url=http%3A%2F%2Fask.mobbr.com%2F187%2Fwhere-is-the-add-payment-button'}},{'url':'https:\/\/github.com\/mobbr\/mobbr-frontend\/issues\/258','title':'Github repository mobbr\/mobbr-frontend, issue #258','description':'my birthday has disappeared again in settings\/identity','language_iso':'EN','copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:avatars0.githubusercontent.com%2Fu%2F710804%3Fv%3D3%26s%3D400&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'3.021449993285225','lastpaiddatetime':'2014-11-14 13:59:07','firstpaiddatetime':'2014-11-14 13:59:07','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['BTC'],'is_pledge':'0','domain':'github.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=github.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F258','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F258','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F258','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F258'}},{'url':'https:\/\/bitcoin.stackexchange.com\/questions\/5735\/can-i-use-bitcoin-as-a-means-of-bypassing-argentine-dollar-restrictions','title':'bitcoin.stackexchange.com question 5735','description':'Can I use bitcoin as a means of bypassing Argentine Dollar restrictions?','language_iso':null,'copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:cdn.sstatic.net%2Fbitcoin%2Fimg%2Fapple-touch-icon.png%3Fv%3Da43e5a337e6b&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'51','lastpaiddatetime':'2014-11-14 12:26:26','firstpaiddatetime':'2014-11-14 12:22:34','num_payments':'2','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'0','domain':'bitcoin.stackexchange.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=bitcoin.stackexchange.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fbitcoin.stackexchange.com%2Fquestions%2F5735%2Fcan-i-use-bitcoin-as-a-means-of-bypassing-argentine-dollar-restrictions','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fbitcoin.stackexchange.com%2Fquestions%2F5735%2Fcan-i-use-bitcoin-as-a-means-of-bypassing-argentine-dollar-restrictions','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fbitcoin.stackexchange.com%2Fquestions%2F5735%2Fcan-i-use-bitcoin-as-a-means-of-bypassing-argentine-dollar-restrictions','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fbitcoin.stackexchange.com%2Fquestions%2F5735%2Fcan-i-use-bitcoin-as-a-means-of-bypassing-argentine-dollar-restrictions'}},{'url':'http:\/\/ask.mobbr.com\/197\/who-benefits-from-using-mobbr','title':'Who benefits from using Mobbr? - Mobbr Q&A','description':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ...  officia deserunt mollit anim id est laborum.','language_iso':'EN','copyright':null,'img_url':'','currency_iso':'EUR','amount_total':'110','lastpaiddatetime':'2014-11-14 12:11:34','firstpaiddatetime':'2014-11-14 12:11:30','num_payments':'2','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'0','domain':'ask.mobbr.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=ask.mobbr.com','link':{'info':'\/api_v1\/uris\/info?url=http%3A%2F%2Fask.mobbr.com%2F197%2Fwho-benefits-from-using-mobbr','payments':'\/api_v1\/payments\/uri?url=http%3A%2F%2Fask.mobbr.com%2F197%2Fwho-benefits-from-using-mobbr','persons':'\/api_v1\/persons\/uri?url=http%3A%2F%2Fask.mobbr.com%2F197%2Fwho-benefits-from-using-mobbr','notification':'\/api_v1\/notifications\/uri?url=http%3A%2F%2Fask.mobbr.com%2F197%2Fwho-benefits-from-using-mobbr'}},{'url':'https:\/\/github.com\/blocktrail\/bitcore','title':'Github repository blocktrail\/bitcore','description':'Bitcore is a complete, native interface to the Bitcoin network, and provides the core functionality needed to develop apps for bitcoin. #bitcore on Freenode.','language_iso':'EN','copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:avatars1.githubusercontent.com%2Fu%2F7208343%3Fv%3D2%26s%3D400&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'0.1','lastpaiddatetime':'2014-10-31 18:44:20','firstpaiddatetime':'2014-10-31 18:44:20','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'0','domain':'github.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=github.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fgithub.com%2Fblocktrail%2Fbitcore','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fgithub.com%2Fblocktrail%2Fbitcore','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fgithub.com%2Fblocktrail%2Fbitcore','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fgithub.com%2Fblocktrail%2Fbitcore'}},{'url':'https:\/\/github.com\/blocktrail\/blocktrail-sdk-php','title':'Github repository blocktrail\/blocktrail-sdk-php','description':'BlockTrails Developer Friendly PHP SDK for the BlockTrail API','language_iso':'EN','copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:avatars1.githubusercontent.com%2Fu%2F7208343%3Fv%3D2%26s%3D400&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'3.021449993285225','lastpaiddatetime':'2014-10-31 18:37:17','firstpaiddatetime':'2014-10-31 18:37:17','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['BTC'],'is_pledge':'0','domain':'github.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=github.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fgithub.com%2Fblocktrail%2Fblocktrail-sdk-php','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fgithub.com%2Fblocktrail%2Fblocktrail-sdk-php','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fgithub.com%2Fblocktrail%2Fblocktrail-sdk-php','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fgithub.com%2Fblocktrail%2Fblocktrail-sdk-php'}},{'url':'https:\/\/github.com\/mobbr\/mobbr-frontend\/issues\/249','title':'Github repository mobbr\/mobbr-frontend, issue #249','description':'Show the BTC address on the PAY section of the TASK page.','language_iso':'EN','copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:avatars0.githubusercontent.com%2Fu%2F710804%3Fv%3D2%26s%3D400&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'100','lastpaiddatetime':'2014-10-31 17:33:33','firstpaiddatetime':'2014-10-31 17:33:33','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'0','domain':'github.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=github.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F249','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F249','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F249','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F249'}},{'url':'http:\/\/fastmovingtargets.nl\/workforce','title':'FMT Workforce','description':'Donation to all community members, based on the points the earned.','language_iso':'NL','copyright':null,'img_url':'','currency_iso':'EUR','amount_total':'510','lastpaiddatetime':'2014-10-31 13:50:06','firstpaiddatetime':'2014-10-31 13:50:06','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'0','domain':'fastmovingtargets.nl','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=fastmovingtargets.nl','link':{'info':'\/api_v1\/uris\/info?url=http%3A%2F%2Ffastmovingtargets.nl%2Fworkforce','payments':'\/api_v1\/payments\/uri?url=http%3A%2F%2Ffastmovingtargets.nl%2Fworkforce','persons':'\/api_v1\/persons\/uri?url=http%3A%2F%2Ffastmovingtargets.nl%2Fworkforce','notification':'\/api_v1\/notifications\/uri?url=http%3A%2F%2Ffastmovingtargets.nl%2Fworkforce'}},{'url':'https:\/\/github.com\/mobbr\/mobbr-frontend\/issues\/84','title':'Github repository mobbr\/mobbr-frontend, issue #84','description':'Spinner and blinking cursor on search box','language_iso':'EN','copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:avatars0.githubusercontent.com%2Fu%2F710804%3Fv%3D2%26s%3D400&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'200','lastpaiddatetime':'2014-10-31 12:14:14','firstpaiddatetime':'2014-10-31 12:14:13','num_payments':'3','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'0','domain':'github.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=github.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F84','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F84','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F84','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F84'}},{'url':'https:\/\/github.com\/mobbr\/mobbr-frontend\/issues\/211','title':'Github repository mobbr\/mobbr-frontend, issue #211','description':'Icons on homepage (.mobbricon) are outside of button on FF32.0.3','language_iso':'EN','copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:avatars0.githubusercontent.com%2Fu%2F710804%3Fv%3D2%26s%3D400&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'1','lastpaiddatetime':'2014-10-28 15:02:50','firstpaiddatetime':'2014-10-28 15:02:50','num_payments':'1','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'0','domain':'github.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=github.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F211','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F211','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F211','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fissues%2F211'}},{'url':'https:\/\/github.com\/mobbr\/mobbr-frontend\/milestones\/1.3%20UX%20redesign%20-%20functionality','title':'Milestone #1 \'1.3 UX redesign - functionality\' in Github repository mobbr\/mobbr-frontend','description':'mobbr-frontend - The angularjs based frontend app for Mobbr','language_iso':'EN','copyright':null,'img_url':'https:\/\/images.weserv.nl?url=ssl:avatars0.githubusercontent.com%2Fu%2F710804%3Fv%3D2%26s%3D400&h=150&w=150&t=square&trim=20','currency_iso':'EUR','amount_total':'7010','lastpaiddatetime':'2014-10-28 14:51:51','firstpaiddatetime':'2014-10-28 14:24:26','num_payments':'2','match_percentage':'0','num_keywords':'0','num_currencies':'1','currencies':['EUR'],'is_pledge':'0','domain':'github.com','favicon':'https:\/\/www.google.com\/s2\/favicons?domain=github.com','link':{'info':'\/api_v1\/uris\/info?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fmilestones%2F1.3%2520UX%2520redesign%2520-%2520functionality','payments':'\/api_v1\/payments\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fmilestones%2F1.3%2520UX%2520redesign%2520-%2520functionality','persons':'\/api_v1\/persons\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fmilestones%2F1.3%2520UX%2520redesign%2520-%2520functionality','notification':'\/api_v1\/notifications\/uri?url=https%3A%2F%2Fgithub.com%2Fmobbr%2Fmobbr-frontend%2Fmilestones%2F1.3%2520UX%2520redesign%2520-%2520functionality'}}],'message':null};

    var userKeywordsResult = {'result':[{'language_iso':'EN','keyword':'coding','currency_iso':'EUR','amount':'10654.63','num_urls':'16','num_domains':'1','my_task':'1'},{'language_iso':'EN','keyword':'git','currency_iso':'EUR','amount':'10654.63','num_urls':'16','num_domains':'1','my_task':'1'},{'language_iso':'EN','keyword':'github','currency_iso':'EUR','amount':'10654.63','num_urls':'16','num_domains':'1','my_task':'1'},{'language_iso':'','keyword':'github.com','currency_iso':'EUR','amount':'10667.64','num_urls':'16','num_domains':'1','my_task':'1'},{'language_iso':'EN','keyword':'programming','currency_iso':'EUR','amount':'10654.63','num_urls':'16','num_domains':'1','my_task':'1'},{'language_iso':'EN','keyword':'javascript programming','currency_iso':'EUR','amount':'10653.61','num_urls':'13','num_domains':'1','my_task':'1'},{'language_iso':'EN','keyword':'mobbr','currency_iso':'EUR','amount':'10763.51','num_urls':'13','num_domains':'2','my_task':'1'},{'language_iso':'EN','keyword':'css programming','currency_iso':'EUR','amount':'10403.61','num_urls':'12','num_domains':'1','my_task':'1'},{'language_iso':'EN','keyword':'mobbr-frontend','currency_iso':'EUR','amount':'10003.51','num_urls':'10','num_domains':'1','my_task':'1'}],'message':null};

    var keywordsResult = {'result': [
        {'language_iso': 'EN', 'keyword': 'coding', 'currency_iso': 'EUR', 'amount': '10641.62', 'num_urls': '14', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'git', 'currency_iso': 'EUR', 'amount': '10641.62', 'num_urls': '14', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'github', 'currency_iso': 'EUR', 'amount': '10641.62', 'num_urls': '14', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': '', 'keyword': 'github.com', 'currency_iso': 'EUR', 'amount': '10641.62', 'num_urls': '14', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'programming', 'currency_iso': 'EUR', 'amount': '10641.62', 'num_urls': '14', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'software development', 'currency_iso': 'EUR', 'amount': '10641.62', 'num_urls': '14', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'javascript programming', 'currency_iso': 'EUR', 'amount': '10641.61', 'num_urls': '13', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'mobbr', 'currency_iso': 'EUR', 'amount': '10751.51', 'num_urls': '13', 'num_domains': '2', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'css programming', 'currency_iso': 'EUR', 'amount': '10391.61', 'num_urls': '12', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'mobbr-frontend', 'currency_iso': 'EUR', 'amount': '3087846.1208879407', 'num_urls': '10', 'num_domains': '1', 'my_task': '0'}
    ], 'message': null}

    var keywordsMoreResult = {'result': [
        {'language_iso': 'EN', 'keyword': 'coding', 'currency_iso': 'EUR', 'amount': '10641.62', 'num_urls': '14', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'git', 'currency_iso': 'EUR', 'amount': '10641.62', 'num_urls': '14', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'github', 'currency_iso': 'EUR', 'amount': '10641.62', 'num_urls': '14', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': '', 'keyword': 'github.com', 'currency_iso': 'EUR', 'amount': '10641.62', 'num_urls': '14', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'programming', 'currency_iso': 'EUR', 'amount': '10641.62', 'num_urls': '14', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'software development', 'currency_iso': 'EUR', 'amount': '10641.62', 'num_urls': '14', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'javascript programming', 'currency_iso': 'EUR', 'amount': '10641.61', 'num_urls': '13', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'mobbr', 'currency_iso': 'EUR', 'amount': '10751.51', 'num_urls': '13', 'num_domains': '2', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'css programming', 'currency_iso': 'EUR', 'amount': '10391.61', 'num_urls': '12', 'num_domains': '1', 'my_task': '0'},
        {'language_iso': 'EN', 'keyword': 'mobbr-frontend', 'currency_iso': 'EUR', 'amount': '3087846.1208879407', 'num_urls': '10', 'num_domains': '1', 'my_task': '0'}
    ], 'message': null}

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, mobbrSession, commonTest, mobbrMsg, $localStorage) {
        controller = undefined;
        contr = $controller;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        common = commonTest;
        httpBackend = $httpBackend;
        state = {};

        $localStorage.token = undefined;
        // dummy login
        mobbrSession.setUser({ email: 'jan@work.com', id: [ 'http://github.com/test' ], username: 'Handijk', token: 'testtoken' });
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/user/ping').respond(200, {});
        httpBackend.flush();

    }));

    function expectTasksMoreRequest() {
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/uris?limit=20&offset=20').respond(200, tasksResult);
    }

    function expectTasksRequest() {
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/uris?limit=20&offset=0').respond(200, tasksResult);
    }

    function expectUserTasksRequest() {
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/uris?limit=20&offset=0&username=Handijk').respond(200, tasksResult);
    }

    function expectUserTasksNLRequest() {
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/uris?language=NL&limit=20&offset=0&username=Handijk').respond(200, tasksResult);
    }

    function expectKeywordsRequest() {
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/keywords?limit=10&offset=0').respond(200, keywordsResult);
    }

    function expectUserKeywordsRequest() {
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/keywords?limit=10&offset=0&username=Handijk').respond(200, userKeywordsResult);
    }

    function expectKeywordsMoreRequest() {
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/keywords?limit=10&offset=10').respond(200, keywordsMoreResult);
    }

    function createController(withHash) {

        if (withHash) {
            state.params = {
                username: 'Handijk'
            };
        } else {
            state.params = {};
        }

        contr('TasksController', {
            $scope: scope,
            $state: state,
            tasks: tasksResult
        });

        if (withHash) {
            expectUserKeywordsRequest();
            expectUserTasksRequest();
        } else {
            expectKeywordsRequest();
            expectTasksRequest();
        }
    }

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should show a list of API defined tasks and suggested keywords when it is called without an username', function () {

        createController();
        httpBackend.flush();

        expect(scope.tasks.length).toBe(18);
        expect(scope.suggestedTags.length).toBe(10);
    });

    it('should show user tasks and tags when it is called with an username', function () {

        createController(true);
        httpBackend.flush();

        expect(scope.tasks.length).toBe(18);
        expect(scope.suggestedTags.length).toBe(9);
    });

    it('should change the language of the displayed results', function () {

        createController(true);
        httpBackend.flush();

        scope.$broadcast('language-update', 'NL');

        expectUserTasksNLRequest();
        httpBackend.flush();

        expect(scope.tasks.length).toBe(18);
        expect(scope.suggestedTags.length).toBe(9);
    });

    it('should show more tasks', function () {

        createController();
        httpBackend.flush();

        scope.queryTasks(scope.limiter + 20);

        expectTasksMoreRequest();
        httpBackend.flush();

        expect(scope.tasks.length).toBe(36);
    });

    it('should show more tags', function () {

        createController();
        httpBackend.flush();

        scope.queryTags(scope.tagsLimiter + 10);

        expectKeywordsMoreRequest();
        httpBackend.flush();

        expect(scope.suggestedTags.length).toBe(20);
    });

    it('should select the first suggested tag and then deselect it with a selected user', function(){

        createController(true);
        httpBackend.flush();

        scope.filteredTags.push(scope.suggestedTags[0].keyword);

        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/uris?keywords=coding&limit=20&offset=0&username=Handijk').respond(200, tasksResult);
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/keywords?limit=10&offset=0&related_to=coding&username=Handijk').respond(200, keywordsResult);
        httpBackend.flush();

        expect(scope.tasks.length).toBe(18);
        expect(scope.suggestedTags.length).toBe(10);

        scope.filteredTags.pop();

        expectUserTasksRequest();
        expectUserKeywordsRequest();
        httpBackend.flush();

        expect(scope.tasks.length).toBe(18);
        expect(scope.suggestedTags.length).toBe(9);
    });

    it('should select the first suggested tag and then deselect it without a selected user', function(){

        createController();
        httpBackend.flush();

        scope.filteredTags.push(scope.suggestedTags[0].keyword);

        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/uris?keywords=coding&limit=20&offset=0').respond(200, tasksResult);
        httpBackend.expectGET('https://test-api.mobbr.com/api_v1/keywords?limit=10&offset=0&related_to=coding').respond(200, keywordsResult);
        httpBackend.flush();

        expect(scope.tasks.length).toBe(18);
        expect(scope.suggestedTags.length).toBe(10);

        scope.filteredTags.pop();

        expectTasksRequest();
        expectKeywordsRequest();
        httpBackend.flush();

        expect(scope.tasks.length).toBe(18);
        expect(scope.suggestedTags.length).toBe(10);
    });
});
