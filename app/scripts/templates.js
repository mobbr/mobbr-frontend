angular.module('server').run(['$templateCache', function($templateCache) {

  $templateCache.put('app/views/activate.html',
    "<div class=page-header><h1>Welcome to Mobbr<br><small>We are now activating your account</small></h1></div>"
  );


  $templateCache.put('app/views/buttons.html',
    "<div class=page-header><h1>Developers guide<br><small>Turn all your pages and items into donatable things</small></h1></div><div class=\"well special pull-right span6\"><h4>This is how it works</h4><ul><li>Place Mobbr metadata (containing a JSON script) in the header of your HTML headers so bots, crawlers, plugins and Mobbr know what to do</li><li>Optionally / alternatively mark all pages of your entire domain with a single /participation.txt file (containing a JSON script)</li><li>Optionally place the Mobbr button-javascript in the body of your HTML to show a button</li><li>If the user clicks a button, the Mobbr lightbox will pop up automatically</li><li>Use a plugin for your CMS or platform</li><li>Develop your own Mobbr integration using our REST-API</li></ul></div><p>Whether it is art, music, software or anything else and whether it is created by one person or an entire community, the Mobbr button enables you to let reward any value that was added. Direct, peer-to-peer, no middleman. A totally new payment concept that fits the way your website really works. Just add your business-model to our button.</p><p>Generate the Mobbr script dynamically, based on actual participation ratios, or use static scripts based on predetermined participation ratios.</p><h2>The 1-minute catch-all option</h2><p>If you don't want visible buttons (yet) but you do want your domain to be processable by Mobbr, just place 1 simple script in the root of your domain.</p><p>Use <a href=/participation.txt>this</a> script as example, you'll <a href=\"\"></a>figure it out.</p><div class=row-fluid style=\"margin-top:40px;padding-bottom: 45px\"><div class=\"well special clearfix\" style=\"background-color: #fff\"><div class=span1></div><div class=span7><h3 style=\"margin-top: 0; line-height: 1em\">Integration</h3></div><div class=span4><p><a href=\"#/buttons?scrollTo=domain\" class=btn style=\"width: 168px\" title=\"Place a /participation.txt file to enable Mobbr on all your pages with just a few lines of script. This is the 'just in case' option.\">The 1-minute just-in-case</a></p><p><a href=\"#/buttons?scrollTo=buttonbasics\" class=btn style=\"width: 168px\" title=\"Place invisible metadata that Mobbr can use in your pages. Optionally place buttons to allow user to use Mobbr directly from the pages.\">Mobbrize your pages</a></p><p><a href=\"#/buttons?scrollTo=siteconnector\" class=btn style=\"width: 168px\" title=\"Connect your entire site to Mobbr at once without having to register your users or compromis their privacy.\">Connect your userbase</a></p></div><img src=/img/2013_0706_MOBBR_V4.jpg style=padding-top:50px></div></div><div class=row-fluid style=\"padding-bottom: 45px\"><div class=\"well special clearfix\" style=\"background-color: #fff\"><div class=span6 style=\"height: 180px; overflow: scroll; overflow-y: scroll; overflow-x: hidden\" ng-controller=apiController><table class=apitable width=100% style=\"font-size: .8em\"><tbody><tr ng-repeat=\"apiCall in apiCalls\"><td ng-bind=apiCall.type></td><td ng-bind=apiCall.endpoint></td><td><span ng-repeat=\"param in apiCall.parameter\">{{param.name }}<span ng-show=!$last>,</span></span></td></tr></tbody></table></div><div class=span6><h3 style=\"margin-top: 0; line-height: 1em\">RESTful API</h3><p>Build your own Mobbr client or website using our API. You can use our web application (you're looking at it) to start with, it's open source.</p><p><a href=https://api.mobbr.com target=_blank class=btn title=\"Our API has its own website, visit it for details\">Go to API site</a></p></div></div></div><div id=buttonbasics class=page-header><h1>Buttons, badges, images, labels and icons<br><small>There are several integration options, but in the end you will probably want the button.</small></h1></div><p>We supply several versions of the Mobbr button that you can place on your pages, next to the picture, downloads, artwork, a blogpost, or anything else for which you would like to receive payments. Clicking these buttons opens the payment popin or so called ligthbox.</p><h2>Basic buttons</h2><p>There are five button types. Simply copy-paste the code into your HTML and subsitute the desired URL between the parenthesis.</p><p><mobbrbutton size=medium url={{startLocation}}></mobbrbutton></p><pre class=prettyprint>&lt;script src=\"https://mobbr.com/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.button('https://{{host}}/#/buttons');&lt;/script&gt;</pre><p><mobbrbutton size=large url={{startLocation}}></mobbrbutton></p><pre class=prettyprint>&lt;script src=\"https://mobbr.com/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.buttonLarge('https://{{host}}/#/buttons');&lt;/script&gt;</pre><p><mobbrbutton size=small url={{startLocation}}></mobbrbutton></p><pre class=prettyprint>&lt;script src=\"https://mobbr.com/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.buttonSmall('https://{{host}}/#/buttons');&lt;/script&gt;</pre><p><mobbrbutton size=slim url={{startLocation}}></mobbrbutton></p><pre class=prettyprint>&lt;script src=\"https://mobbr.com/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.buttonSlim('https://{{host}}/#/buttons');&lt;/script&gt;</pre><p>Adding a payment script is done using metadata to your pages, see below for instructions.</p><p>If the button has no URL, it will use the canonical URL from the HTML-header if present or the current URL otherwise. Generate configured buttons <a href=#/generatebutton>here</a>.</p><p>To have a button show amounts in another currency append a <a href=#/exchangerate>currency code</a> to the script.</p><p><mobbrbutton size=slim url={{startLocation}}></mobbrbutton></p><pre class=prettyprint>&lt;script src=\"https://mobbr.com/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.buttonSlim('https://{{host}}/#/buttons','USD');&lt;/script&gt;</pre><p>The button acts on the URL given as their argument, so it is possible to donate URL's different from the URL where the button is located. Every time the button is clicked, our system will do a callback and analyze the script. This is flexible and secure.</p><p><strong>Note: As you can see on this page, it is possible to have many buttons on a single page. In this case you need to include the Javascript <code>https://mobbr.com/mobbr-button.js</code> only once.</strong></p><h2>Badges</h2><p>There are several badges that display the total count of payments on your domain. These look nice on the homepage or communitypage of your site. Clicking these badges opens your website's page on the Mobbr-site.</p><p><a href=\"/#/domain/aHR0cHM6Ly9tb2Jici5jb20=\"><img ng-src=https://api.mobbr.com/badge/https/{{host}}/medium alt=\"\"></a></p><pre class=prettyprint>&lt;script src=\"https://mobbr.com/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.badgeMedium();&lt;/script&gt;</pre><p><a href=\"/#/domain/aHR0cHM6Ly9tb2Jici5jb20=\"><img ng-src=https://api.mobbr.com/badge/https/{{host}}/wide alt=\"\"></a></p><pre class=prettyprint>&lt;script src=\"https://mobbr.com/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.badgeWide();&lt;/script&gt;</pre><p>To have a badge show amounts in another currency append a <a href=#/exchangerate>currency code</a> to the script.</p><p><a href=\"/#/domain/aHR0cHM6Ly9tb2Jici5jb20=\"><img src=https://api.mobbr.com/badge/https/{{host}}/wide/USD alt=\"\"></a></p><pre class=prettyprint>&lt;script src=\"https://mobbr.com/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.badgeWide('EUR');&lt;/script&gt;</pre><p>There is no need to configure the badge. The code above can be used on every site or page. All buttons and badges are dynamically generated on our servers. Badges are regenerated at fixed intervals, buttons at every payment.</p><h2>Configuring the buttons</h2><p>To integrate Mobbr with your site you need to supply 'transaction descriptions' for your products. Depending on how visible or flexible you want the Mobbr-mechanism to be, you can use:</p><ul><li><strong><a ng-click=\"scrollToId('metadata')\">The page &lt;metadata&gt;-tag</a></strong></li><li><strong><a ng-click=\"scrollToId('metalink')\">The page &lt;metalink&gt;-tag</a></strong></li><li><strong><a ng-click=\"scrollToId('domain')\">The /participation.txt domain description</a></strong></li></ul><h3>Script basics</h3><p>Buttons act on webpages. These webpages need to be configured for payments / donations. This is very simple. First some basics. To divide any payment among the participants in the desired ratios, you must use a script.</p><p>Transaction scripts are written in JSON. JSON is a simple and common computer language. With the script it is possible to completely specify every aspect of the transaction (donation or payment) without the need to pre-register your URL or product on our site. You can even donate to persons that are not yet registered with Mobbr. For a complete specification, see the <a href=https://mobbr.com/protocol.html>CPR-protocol</a> where we explain the script language and give you the tools to gain complete control over your donations and payments. Below are some examples.</p><p>Suppose you want to specify yourself as the sole recipient of the payment, no more. Then this code will do the trick:</p><pre class=prettyprint>{\n" +
    "    \"id-base\" : \"https://mobbr.com/id/\",\n" +
    "    \"participants\":\n" +
    "    [\n" +
    "\t    {\"id\": \"your_username\"}\n" +
    "\t]\n" +
    "}</pre><p>We will show you in a moment what you need to do with this script, first lets look at another example.</p><p>Now suppose you want to share the payments among a whole team of creators, each of which added value to the product. Then you can add these to the button. Of have your system (like CMS, collaboration software or Wiki) add them to the script automatically. Here is an example of that:</p><pre class=prettyprint>{\n" +
    "    \"id-base\" : \"https://mobbr.com/id/\",\n" +
    "    \"title\" : \"The button\",\n" +
    "    \"description\" : \"Article about the Mobbr button\",\n" +
    "    \"participants\" :\n" +
    "    [\n" +
    "        {\n" +
    "            \"id\": \"Patrick\",\n" +
    "            \"role\": \"author\",\n" +
    "            \"share\": \"3\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"id\": \"Robbert\",\n" +
    "            \"role\": \"design\",\n" +
    "            \"share\": \"3\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"id\": \"Alexander\",\n" +
    "            \"role\": \"site / platform\",\n" +
    "            \"share\": \"1\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"id\": \"Hartger\",\n" +
    "            \"role\": \"editor\",\n" +
    "            \"share\": \"1\"\n" +
    "        }\n" +
    "    ]\n" +
    "}</pre><p>You can use percentages (absolute shares) and ratios (relative shares). Percentages are added, the remainder is divided according to the ratios.</p><pre class=prettyprint>{\n" +
    "    \"id-base\" : \"https://mobbr.com/id/\",\n" +
    "    \"title\" : \"The button\",\n" +
    "    \"description\" : \"Article about the Mobbr button\",\n" +
    "    \"participants\" :\n" +
    "    [\n" +
    "        {\n" +
    "            \"id\": \"Patrick\",\n" +
    "            \"role\": \"author\",\n" +
    "            \"share\": \"25%\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"id\": \"Robbert\",\n" +
    "            \"role\": \"design\",\n" +
    "            \"share\": \"10%\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"id\": \"Alexander\",\n" +
    "            \"role\": \"site / platform\",\n" +
    "            \"share\": \"1\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"id\": \"Hartger\",\n" +
    "            \"role\": \"editor\",\n" +
    "            \"share\": \"2\"\n" +
    "        }\n" +
    "    ]\n" +
    "}</pre><p>You can also use absolute amounts, this will set a minimum for the donation amount or a fixed price.</p><pre class=prettyprint>{\n" +
    "    \"id-base\" : \"https://mobbr.com/id/\",\n" +
    "    \"title\" : \"The button\",\n" +
    "    \"description\" : \"Article about the Mobbr button\",\n" +
    "    \"participants\" :\n" +
    "    [\n" +
    "        {\n" +
    "            \"id\": \"Patrick\",\n" +
    "            \"share\": \"EUR5\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"id\": \"Robbert\",\n" +
    "            \"share\": \"10%\"\n" +
    "        },\n" +
    "        {\n" +
    "            \"id\": \"Alexander\",\n" +
    "            \"share\": \"1\"\n" +
    "        }\n" +
    "    ]\n" +
    "}</pre><p>Take a look at the <a href=https://mobbr.com/protocol.html>CPR-protocol</a> definition for a complete overview of payment-schema capabilities. <a href=#/generatebutton>You can generate buttons here</a>. To validate your own JSON button-script go <a href=#/validate>here</a>.</p><p>Up to 10000 participants can be specified, with shares ranging from 1 to 1000. A recipient can be mentioned any number of times but must have a different role each time.</p><p>It is possible to use email addresses, twitter-addresses, gravatar-profiles, bitcoin-addresses or custom / external addresses as participants. You can even use the <a href=#/siteconnector>usernames of your own site</a>!</p><h3 id=metadata>Embedding meta-tags in your page's (X)HTML<p>Once you have the script, you need to place it inside a <a target=_blank href=http://www.w3schools.com/html/html_meta.asp>meta-tag</a> in the <a target=_blank href=http://www.w3schools.com/html/html_head.asp>HTML HEAD section</a> of your webpage. Our sytem, but also plugins, search-engines and bots will be able to find, and use this information.</p><pre class=prettyprint>&lt;meta name=\"participation\" content='\n" +
    "    {\n" +
    "         \"title\" : \"The iPhony4\",\n" +
    "         \"description\" : \"Article about some fictious planned obscolescence device\",\n" +
    "         \"participants\" : [\n" +
    "            {\n" +
    "             \"id\": \"your_username\",\n" +
    "             \"role\": \"author\",\n" +
    "             \"share\": \"1\"\n" +
    "            }\n" +
    "         ]\n" +
    "    }'/&gt;</pre><p>On advanced websites this script can be generated dynamically each time the page is generated, based on actual participation levels and an elaborate algorithm.</p><p>Note that JSON needs double quotes which means the data of the tag needs to be enclosed in single quotes, this construction is W3C valid (X)HTML.</p><p>For pages that have the metadata tags, the button is as simple as:</p><pre class=prettyprint>&lt;script src=\"https://mobbr.com/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.button('http://yourdomain.com/product/your_product.html');&lt;/script&gt;</pre><p>You can generate the meta-tag <a href=#/generatebutton>here</a>.</p><h3 id=metalink>Embedding a meta link in your page's (X)HTML</h3><p>Instead of a metatag you can also use a <a target=_blank href=http://www.w3schools.com/tags/tag_link.asp>metalink</a> in the header tag of your page. Then, either link to a text file with the JSON string in it, or link to the JSON on the Mobbr server if you used our button-configurator. Like so:</p><pre class=prettyprint>&lt;link rel=\"participation\" href=\"https://{{host}}/jsonstore/24C0466BF8949FD5BB2518664A98A238\"/&gt;</pre><p>The content of the link is the <a href=https://{{host}}/jsonstore/24C0466BF8949FD5BB2518664A98A238>same JSON</a> otherwise present in a metadata-tag.</p><p>For pages that have the metalink tags, the button is as simple as:</p><pre class=prettyprint>&lt;script src=\"https://mobbr.com/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.button('http://yourdomain.com/product/your_product.html');&lt;/script&gt;</pre><p>You can generate the meta-link <a href=#/generatebutton>here</a>.</p><h3 id=domain>For domain administrators</h3><p>If you own or manage a domain, you have the option to place a /participation.txt file in the root of the domain. With such a file you can describe all or selected URL's on your domain. In its simplest form, you just assign a global recipient for payments on all the domain's URL's. Like this:</p><pre class=prettyprint>[\n" +
    "    {\n" +
    "        \"url-pattern\" : \"*\",\n" +
    "        \"participation-info\":\n" +
    "        {\n" +
    "            \"id-base\" : \"https://{{host}}/id/\",\n" +
    "            \"participants\" :\n" +
    "            [\n" +
    "                {\n" +
    "                    \"id\" : \"your_username\",\n" +
    "                }\n" +
    "            ]\n" +
    "        }\n" +
    "    }\n" +
    "]</pre><p>The URL-pattern uses the * as wildcard, using it you can match many URL's with one pattern. * means: 'any or no char'.</p><p>If you specifiy an email address as recipient, you don't even need to register with Mobbr. If someone donates, you will be mailed. If you specify a Bitcoin address the recipient will receive his money directly without the need to ever register with Mobbr or even know of the existence of Mobbr.</p><p>You don't need to change any pages of your site. This is the 'just-in-case' option.</p><p>On sites / domain that have the MIROPAYMENTS.TXT, adding the button is as simple as:</p><pre class=prettyprint>&lt;script src=\"https://mobbr.com/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.button('http://yourdomain.com/product/your_product.html');&lt;/script&gt;</pre><p>Mobbr will automatically use the participation.txt file.</p><p>Check out our <a href=/participation.txt>participation.txt</a>.</p><p>The server-file can be used to describe different url-groups, each with their own participants and shares. This is done by supplying different 'rules'. Each rule has a pattern against which your URL's will be tested. The participation-info will be applied to every URL that matches. You can make this as elaborate as you need since the info of all patterns that match a specific URL will be cascaded. For example, if you would have the following description:</p><pre class=prettyprint>[\n" +
    "    {\n" +
    "        \"url-pattern\" : \"*\",\n" +
    "        \"participation-info\":\n" +
    "        {\n" +
    "            \"id-base\" : \"https://{{host}}/id/\",\n" +
    "            \"participants\" :\n" +
    "            [\n" +
    "                {\n" +
    "                    \"id\" : \"patrick\",\n" +
    "                    \"role\" : \"website-owner\",\n" +
    "                    \"share\" : \"1\"\n" +
    "                }\n" +
    "            ]\n" +
    "        }\n" +
    "    },\n" +
    "    {\n" +
    "        \"url-pattern\" : \"*/article/*\",\n" +
    "        \"participation-info\" :\n" +
    "        {\n" +
    "            \"id-base\" : \"https://{{host}}/id/\",\n" +
    "            \"participants\" :\n" +
    "            [\n" +
    "                {\n" +
    "                    \"id\" : \"bob\",\n" +
    "                    \"role\" : \"author\",\n" +
    "                    \"share\" : \"4\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"id\" : \"bill\",\n" +
    "                    \"role\" : \"reviewer\",\n" +
    "                    \"share\" : \"1\"\n" +
    "                }\n" +
    "            ]\n" +
    "        }\n" +
    "    },\n" +
    "    {\n" +
    "        \"url-pattern\" : \"*/picture/*\",\n" +
    "        \"participation-info\" :\n" +
    "        {\n" +
    "            \"id-base\" : \"https://{{host}}/id/\",\n" +
    "            \"participants\" :\n" +
    "            [\n" +
    "                {\n" +
    "                    \"id\" : \"james\",\n" +
    "                    \"role\" : \"photographer\",\n" +
    "                    \"share\" : \"1\"\n" +
    "                }\n" +
    "            ]\n" +
    "        }\n" +
    "    }\n" +
    "]</pre><p>If someone would donate to this URL on your site: <code>/article/history/picture/ancient_rome.jpg</code>, the URL would match '*', '*/article/*' and '*/picture/*', and the payment would be shared between Patrick, Bob, Bill and James, with Bob receiving a 4 times larger share then the rest.</p><h2>Icons and labels</h2><p>These are icons you can use if you want to support Mobbr. Please use them freely, the bandwidth is ours!<br></p><p><img src=https://mobbr.com/img/buttons/mobbr16.png alt=\"\"></p><pre>&lt;img src=\"https://mobbr.com/img/buttons/mobbr16.png\" alt=\"\" /&gt;</pre><p><img src=https://mobbr.com/img/buttons/mobbr16gs.png alt=\"\"></p><pre>&lt;img src=\"https://mobbr.com/img/buttons/mobbr16gs.png\" alt=\"\" /&gt;</pre><p><img src=https://mobbr.com/img/buttons/weusemobbr80x15.png alt=\"\"></p><pre>&lt;img src=\"https://mobbr.com/img/buttons/weusemobbr80x15.png\" alt=\"\" /&gt;</pre><p><img src=https://mobbr.com/img/buttons/weusemobbr80x15gs.png alt=\"\"></p><pre>&lt;img src=\"https://mobbr.com/img/buttons/weusemobbr80x15gs.png\" alt=\"\" /&gt;</pre><p><img src=https://mobbr.com/img/buttons/mobbrbol60.png alt=\"\"></p><pre>&lt;img src=\"https://mobbr.com/img/buttons/mobbrbol60.png\" alt=\"\" /&gt;</pre><p><img src=https://mobbr.com/img/buttons/mobbrbol60gs.png alt=\"\"></p><pre>&lt;img src=\"https://mobbr.com/img/buttons/mobbrbol60gs.png\" alt=\"\" /&gt;</pre><p><img src=https://mobbr.com/img/mobbrball400x400.png alt=\"\"></p><pre>&lt;img src=\"https://mobbr.com/img/mobbrball400x400.png\" alt=\"\" /&gt;</pre><p><img src=https://mobbr.com/img/mobbrband.png alt=\"\"></p><pre>&lt;img src=\"https://mobbr.com/img/mobbrband.png\" alt=\"\" /&gt;</pre><p><img src=https://mobbr.com/img/logo-mobbr.png alt=\"\"></p><pre>&lt;img src=\"https://mobbr.com/img/logo-mobbr.png\" alt=\"\" /&gt;</pre><p><img src=https://mobbr.com/img/mobbr-ripple.jpg alt=\"\"></p><pre>&lt;img src=\"https://mobbr.com/img/mobbr-ripple.jpg\" alt=\"\" /&gt;</pre><p><img src=https://mobbr.com/img/mobberlogoloader.gif alt=\"\"></p><pre>&lt;img src=\"https://mobbr.com/img/mobberlogoloader.gif\" alt=\"\" /&gt;</pre><h2>Button specifics</h2><p>Whenever a button is clicked, the Mobbr server will do a callback and analyze the page. The Mobbr server will try several things to get all the data it needs to complete the payment or donation.</p><h3>Which URL does the button act upon?</h3><p>The button can specify an URL. If it doesn't, the button will try to determine the URL by checking the following things:</p><ul><li>If the HTML contains a metadata name=\"canonical\" <a href=http://googlewebmastercentral.blogspot.com/2009/02/specify-your-canonical.html>element</a>, that URL will be followed until a final page is reached, even if they go <a href=http://googlewebmastercentral.blogspot.com/2009/12/handling-legitimate-cross-domain.html>cross domain</a>.</li><li>Else if the HTML contains a metadata property=\"og:url\" <a href=http://ogp.me/>element</a>, that URL will be used</li><li>Else Mobbr will reject the button.</li></ul><h3>Cascading scripts</h3><p>When a payment is received by the server, Mobbr uses the following cascade to complete transaction information:</p><ul><li>If the donated page contains a script in the <a href=#metadata>special metadata-tag</a>, that will be used ('the page script')</li><li>Else if the donated page contains a script behind the <a href=#metalink>special metalink-tag</a>, that will be used (also: 'the page script')</li><li>Else if the donated domain contains a <a href=#domain>MICROPAYMENT.JSON</a>, that will be used ('the domain script')</li><li>Else Mobbr will make an unclaimed payment which can be claimed <a href=#/claim_payment>here</a></li></ul><p>Mobbr will cascade these different types of script. Differing keys are combined and duplicates keys get overwritten where the page script gets priority over the the domain script.</p><p>In all cases Mobbr will visit the page in question to verify its existence and validity.</p><h3>How to design Mobbr-ready web pages</h3><p>On a button click Mobbr will try to gather as much information as possible by analysing the (X)HTML metadata of the indicated page. To help this proces, use the following elements in your HTML pages</p><ul><li>The HTML &lt;title&gt; element.</li><li>A metadata name=\"description\" <a href=http://www.w3schools.com/tags/tag_meta.asp>element</a>.</li><li>A metadata name=\"canonical\" <a href=http://googlewebmastercentral.blogspot.com/2009/02/specify-your-canonical.html>element</a>.</li><li>A metadata name=\"original-source\" <a href=http://googlenewsblog.blogspot.com/2010/11/credit-where-credit-is-due.html>element(s)</a>.</li><li>A metalink rel=\"copyright\" <a href=http://htmlhelp.com/reference/html40/head/link.html>element</a>, defining sharing and derivation rights</li><li>A correct set of <a href=http://ogp.me/>OG-properties</a>, as used by Facebook.</li></ul><p>This is not Mobbr specific though, it is good webdesign practice in general. If possible make your pages W3C valid.</p><div id=siteconnector class=page-header><h1>Connecting your users to Mobbr<br><small>Using your site's usernames in Mobbr scripts.</small></h1></div><p><strong>First make sure your pages have either <a href=/#/buttons>buttons or metadata</a>. Or supply a <a href=/#/buttons#domain>domain script</a>.</strong></p><p>Mobbr has a simple mechanism that allows you to connect your entire weblog, community or site in such a way that you can start receiving payments and share them among all contributors without the neccessity for them to be registered with Mobbr.</p><p><strong>Using this mechanism sites can use their own member names or id's in their scripts.</strong></p><p>You website needs to have a special page / URL that Mobbr can use to resolve your local usernames into email-addresses. Suppose you have a weblog on zaplog.nl, then you could provide an URL like:</p><pre>http://zaplog.nl/id/&lt;local-member-name&gt;</pre><p>The content of this URL should be the email address of your local member. Like this:</p><pre>     REQUEST:\n" +
    "         http://zaplog.nl/id/patrick\n" +
    "\n" +
    "     RESPONSE:\n" +
    "         patman@mobbrr.com</pre><p>If you don't plan to use buttons, but want to rely on the bookmarket or some other tool, you need to place the following script on /PARTICIPATION.TXT, like <a href=http://zaplog.nl/participation.txt>here</a>. This tells our server where to find your special page.</p><pre>[\n" +
    "    {\n" +
    "        url-pattern: \"*\",\n" +
    "        participation-info:\n" +
    "        {\n" +
    "            id-base: \"http://zaplog.nl/id/\",\n" +
    "            description: \"ZapLog - Nederlands beste nieuwssite, Dutch Bloggie winnaar 2008\",\n" +
    "        }\n" +
    "    }\n" +
    "]</pre><h2>Buttons</h2><p>Create or generate your Mobbr scripts using your local member names and use your special URL as \"id-base\". Like this:</p><pre class=prettify>&lt;script src=\"https://{{host}}/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;\n" +
    "mobbr.button({\n" +
    "    <strong>\"id-base\" : \"http://zaplog.nl/id/\"</strong>,\n" +
    "    \"title\" : \"Very special article\",\n" +
    "    \"description\" : \"Article about the Mobbr button\",\n" +
    "    \"participants\" : [\n" +
    "        {\n" +
    "            <strong>\"id\": \"zaplog\"</strong>,\n" +
    "            \"role\": \"platform\",\n" +
    "            \"share\": \"1\"\n" +
    "        },\n" +
    "        {\n" +
    "            <strong>\"id\": \"Patman\"</strong>,\n" +
    "            \"role\": \"webmaster\",\n" +
    "            \"share\": \"1\"\n" +
    "        },\n" +
    "        {\n" +
    "            <strong>\"id\": \"P.Uncia\"</strong>,\n" +
    "            \"role\": \"author\",\n" +
    "            \"share\": \"2\"\n" +
    "        }\n" +
    "    ]\n" +
    "});\n" +
    "&lt;/script&gt;</pre><p>Or this:</p><pre class=prettify>&lt;script src=\"https://{{host}}/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;\n" +
    "mobbr.button({\n" +
    "    \"title\" : \"Very special article\",\n" +
    "    \"description\" : \"Article about the Mobbr button\",\n" +
    "    \"participants\" : [\n" +
    "        {\n" +
    "            <strong>\"id\": \"http://zaplog.nl/id/zaplog\"</strong>,\n" +
    "            \"role\": \"platform\",\n" +
    "            \"share\": \"1\"\n" +
    "        },\n" +
    "        {\n" +
    "            <strong>\"id\": \"http://zaplog.nl/id/Patman\"</strong>,\n" +
    "            \"role\": \"webmaster\",\n" +
    "            \"share\": \"1\"\n" +
    "        },\n" +
    "        {\n" +
    "            <strong>\"id\": \"http://zaplog.nl/id/P.Uncia\"</strong>,\n" +
    "            \"role\": \"author\",\n" +
    "            \"share\": \"2\"\n" +
    "        }\n" +
    "    ]\n" +
    "});\n" +
    "&lt;/script&gt;</pre><p>When someone now uses the Mobbr button, Mobbr will call your special URL 3 times in rapid succession:</p><pre>    http://zaplog.nl/id/zaplog\n" +
    "    http://zaplog.nl/id/patman\n" +
    "    http://zaplog.nl/id/p.uncia</pre><p>Other URL formats are no problem as long as id-base + id form a valid URL, for instance:</p><pre>    http://zaplog.nl?type=id&amp;user=patman</pre><p>If your members are not yet registered with Mobbr, they will receive mail inviting them to register. By registering they automatically claim their payments and will receive all subsequent payments directly into their Mobbr-account. You don't need to change anything on your side (or site).</p><p>Your system will be given 2 seconds and only 3 redirects to reply. So make it quick. Don't be worried about Mobbr overloading your system, we will do some caching / buffering on our side if necessary.</p><p>If your system has throttling or anti-hammering enabled, try to exclude the Mobbr bot from this.</p><h2>Security / privacy</h2><p>To prevent others from accessing your special URL and stealing the email-addresses of your members, protect it by adding the something like the following to your Apache server's <a href=http://httpd.apache.org/docs/2.4/mod/mod_authz_host.html>.htaccess file.</a></p><pre>&lt;Location /zaplog/id/.*$&gt;\n" +
    "Require host mobbr.com\n" +
    "&lt;/Location&gt;</pre><p>Now only the Mobbr-server can access the page. Of course you can use any alternative mechanism. You can also do a referer check. Our calls will always originate from https://mobbr.com.</p><p>You can put the Mobbr payment scripts in metadata, a metalink or a button. See <a href=/#/buttons>here</a> for details, or <a href=/protocol>here</a> for the protocol.</p><h2>Expression Engine example</h2><p>Because you will probably want to integrate the above mechanism into your CMS or publication system, we will give an example. There are many, many CMS-ses and publication systems, but the example for Expression Engine (EE) is representative for a lot of those.</p><p><img src=http://ellislab.com/_user_guide_src_ee/_images/cp_home.png class=thumbnail></p><p>Like many similar blogging systems (Blogger, Drupal, Word Press), EE is template based. For the special URL (in our example: http://zaplog.nl/zaplog/id/) we must create a template. You can do this in <a href=http://ellislab.com/expressionengine/user-guide/cp/design/templates/index.html>the EE backend</a>.</p><p><img src=http://ellislab.com/_user_guide_src_ee/_images/template_new.png alt=\"\"></p><p>The template only needs the following content. It is a tag that generate the email address as page content.</p><pre>{exp:query sql=\"select email from exp_members\n" +
    "where username='{segment_3}'\"}{email}{/exp:query}\n" +
    "</pre><p>Suppose you want to have a button with every article in you weblog and you want to give the platform owner, the webmaster and the author each a fair share. Then you could add a piece of code like this to the template of your articles, it will generate the Mobbr payment description and give the author, the webmaster and the platform owner a share. Place it in the &lt;head&gt; of the HTML. Of course you will have to sue your own usernames and shares, fitted to your situation.</p><pre class=prettify>{exp:query sql=\"select username as authorname from exp_channel_titles where url_title='{segment_3}'\"}\n" +
    "    &lt;meta name=\"participation\" content='\n" +
    "        {\n" +
    "            \"id-base\" : \"http://zaplog.nl/zaplog/id/\",\n" +
    "            \"participants\" : [\n" +
    "                {\n" +
    "                    \"id\": \"Patman\",\n" +
    "                    \"role\": \"Zaplog owner\",\n" +
    "                    \"share\": \"1\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"id\": \"P.Uncia\",\n" +
    "                    \"role\": \"Zaplog webmaster\",\n" +
    "                    \"share\": \"1\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"id\": \"{authorname}\",\n" +
    "                    \"role\": \"Zaplog article author\",\n" +
    "                    \"share\": \"3\"\n" +
    "                }\n" +
    "            ]\n" +
    "        }\n" +
    "    '/&gt;\n" +
    "{/exp:query}</pre><p>For the button itself you will only need to place the following code in the template of the article:</p><pre class=prettify>&lt;script src=\"https://{{host}}/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.button();&lt;/script&gt;</pre></h3>"
  );


  $templateCache.put('app/views/claim_payment.html',
    "<div class=page-header><h1>Claim payment<br><small>Check if someone already rewarded your url or email</small></h1></div><accordion class=claim-payment close-others=false><accordion-group heading=\"1/{{isUrl() && 5 || 3}}: Enter url or email address\" is-open=\"step() >= 1\" is-active=\"step() >= 1\"><form class=input-append ng-submit=retrieveUnclaimedPaynents()><div ng-bind=claimpayment.checkurlresult.message></div><input placeholder=\"http://site.com or your@email.com\" ng-model=claimpayment.url maxlength=2048 id=url name=url><button class=btn ng-click=retrieveUrl()>Check <i class=\"icon-white mobbrloader\" ng-show=workingCheck></i></button></form></accordion-group><accordion-group heading=\"2/{{isUrl() && 5 || 3}}: Select unclaimed payments\" is-open=\"step() >= 2\" is-active=\"step() >= 2\"><div ng-show=\"unclaimedPayments.length > 0\"><form class=form-inline><label for=searchEntries>Search:</label><input type=search class=search-query ng-model=searchEntries id=searchEntries><div class=pull-right><label for=showEntries>Entries:</label><select class=input-small ng-model=showEntries id=showEntries><option value=10>10</option><option value=25>25</option><option value=50>50</option><option value=100>100</option><option value=\"\">All</option></select></div></form><table class=\"unclaimed-payments table\"><thead><tr><th ng-click=\"sortPayments('url')\">URL</th><th ng-click=\"sortPayments('title')\">Title</th></tr></thead><tbody><tr ng-repeat=\"payment in unclaimedPayments | filter:searchEntries | limitTo:showEntries | orderBy:sortEntries:sortOrder\"><td><a href={{payment.url}}>{{payment.url}}</a></td><td ng-bind=payment.title></td></tr></tbody></table><div ng-show=\"unclaimedPayments.length > showEntries\">showing {{showEntries}} from {{unclaimedPayments.length}} unclaimed payments</div></div></accordion-group><div ng-show=isUrl()><accordion-group heading=\"3/5: Place payment information\" is-open=\"step() >= 3\" is-active=\"step() >= 3\"><p>Place a <a href=#/buttons#metadata>metatag</a> or <a href=#/buttons#metalink>metalink</a> in the HTML-header of your page. Or place a <a href=#/buttons/#domain>participation.txt</a> file in the root of your domain. Proceed if / after you did so. You can generate a metatag or metalink <a href=#/generate_button>here</a>. For the full script protocol, look <a href=/protocol.html>here</a></p><button class=\"btn btn-success\" ng-disabled=\"!claimpayment.url || loadingPaymentDescription\" ng-click=retrievePaymentDescription()>Retrieve payment description <i class=\"icon-white mobbrloader\" ng-show=workingCheck></i></button></accordion-group><accordion-group heading=\"4/5: Verify payment information\" is-open=\"step() >= 4\" is-active=\"step() >= 4\"><p>Mobbr found the following payment information on your URL:</p><pre class=\"prettyprint pre-scrollable\" ng-bind=paymentDescription></pre></accordion-group><accordion-group heading=\"5/5: Claim payments\" is-open=\"step() >= 4\" is-active=\"step() >= 4\"><button class=\"btn btn-success\" ng-disabled=\"!paymentDescription || claiming\" ng-click=claim()>Claim my URL's <i class=\"icon-white mobbrloader\" ng-show=claiming></i></button></accordion-group></div><div ng-show=!isUrl()><accordion-group heading=\"3/3: Claim payments\" is-open=\"step() >= 4\" is-active=\"step() >= 4\">To claim these payments, create an account with this same email address.<div class=well ng-include=\"\" src=\"'views/join.html'\"></div></accordion-group></div></accordion>"
  );


  $templateCache.put('app/views/company.html',
    "<script src=//platform.linkedin.com/in.js></script><div class=page-header><h1>About Mobbr<br><small>To boldy start a new economy no one has seen before</small></h1></div><div class=\"use-cases row-fluid\"><div class=\"well span6 special\" style=height:580px><h4>Who are behind Mobbr?</h4><script type=IN/MemberProfile data-id=https://www.linkedin.com/in/patricksavalle data-format=inline data-related=false></script><script type=IN/MemberProfile data-id=https://www.linkedin.com/in/ernestospruyt data-format=inline data-related=false></script><script type=IN/CompanyProfile data-id=2527425 data-format=inline data-related=false></script></div><div class=\"well span6 special\" style=height:580px><h4>Contact</h4><h6><small>Address</small></h6><p><small>Mobbr BV., Valenberg 80, 2716 LS Zoetermeer, Nederland</small></p><h6><small>Email</small></h6><p><small>contact either 'patrick' or 'ernesto' @mobbr.com for business inquiries</small></p><iframe style=\"margin-top:10px;border:1px solid #333\" width=415 height=380 frameborder=0 scrolling=no marginheight=0 marginwidth=0 src=\"https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=rokkeveenseweg%2B44c%2C%2Bzoetermeer&ie=UTF8&z=5&t=m&iwloc=near&output=embed\"></iframe></div></div><div class=\"use-cases row-fluid\"><div class=\"well span6 special\"><h4>Our board of advisors</h4></div><div class=\"well span6 special\" style=height:450px><h4>Legal</h4><h6><small>DNB license</small></h6><p><small>We have permission (exemption from special oversight) from the Dutch National Bank to act as a bank for electronic money. We are however, by nature of this exemption, <b>not</b> under their direct oversight.</small></p><h6><small>Chambers of commerce</small></h6><p><small>We are registered with the chambers of commerce of The Haque under number 550000517</small></p><h6><small>Terms of Use</small></h6><iframe style=margin-left:30px width=380 height=180 frameborder=0 marginheight=0 marginwidth=0 src=https://api.mobbr.com/mobbr-terms-of-use.txt></iframe></div></div><div class=\"use-cases row-fluid\"><div class=\"well span6 special\"><h4>Our army of mercenaries</h4><h6>Full stack development</h6><script type=IN/MemberProfile data-id=https://www.linkedin.com/in/handijk data-format=inline data-related=false></script><script type=IN/MemberProfile data-id=https://www.linkedin.com/in/alexanderhofstede data-format=inline data-related=false></script><h6>Front-end/UI</h6><script type=IN/MemberProfile data-id=https://www.linkedin.com/in/andrepaap data-format=inline data-related=false></script><h6>Server- and tooling</h6><script type=IN/MemberProfile data-id=https://www.linkedin.com/pub/robbert-de-vries/5/5a2/43b data-related=false data-format=inline></script></div><div class=\"well span6 special\"><h4>The Mobbr manifesto</h4><p style=\"padding-bottom: 10px\">Internet changes the way we work and live.</p><p style=\"padding-bottom: 10px\">Old world thinking gave us, more than anything else, the industrialization of creation. Physical manufacturing and digital creation alike. Old world thinking shaped most aspects of our social life. Centralized control, linear value-chains, predefined collaboration. This resulted in the suppression of talent, unsustainable habits and unfair distribution of wealth.</p><p style=\"padding-bottom: 10px\">Internet for the first time in history enables people to organize themselves in global social networks and to start ad hoc collaborations. Online technologies hold the promise of a new world in which any person can participate. Any time, any place. Social computing already turned out to be the next big thing, empowering people to fit work to their unique talents and needs, instead of the other way around.</p><p style=\"padding-bottom: 10px\">There is an economic revolution waiting to happen, offering economic freedom and sustainable ways of work. Only one thing is holding it back: payment systems are based on old world paradigms. Always routed through some ‘middleman’ instead of directly reaching those who actually added value, taking away autonomy.</p><p style=\"padding-bottom: 10px\">Mobbr is about rewarding participation in social collaboration appropriately fair and direct. Decentralized and peer-to-peer. No more middleman. Payments that are routed exactly the way the underlying value-adding social networks are structured.</p><p style=\"padding-bottom: 10px\">To boldly start an economy that no one has seen before.</p></div></div>"
  );


  $templateCache.put('app/views/consumers.html',
    "<div class=page-header><h1>Start rewarding creativity and innovation<br><small>You like, you click! It's rewarding</small></h1></div><div class=\"well special pull-right span6\"><h4>This is how it works</h4><ul><li>You click the button, your clicks are collected, no money involved yet</li><li>Keep on clicking as many buttons as you like, still no money involved</li><li>Finalize them all at once, deciding if and what amount to divide among them</li></ul>Also:<ul><li>On registration we'll give you some free (dummy) money so you can start right away</li><li>You can donate to every URL or email-address you like using our bookmarklet or our payment-box</li><li>Use the social buttons top-right to sign-up or login</li></ul></div><div class=\"well special pull-right span6\"><h4>These are your tools</h4><ul><li>Use the buttons you see on other sites</li><li>Install and use the bookmarklet at the bottom of this site to donate to any URL you like, from your browser</li><li>Enter any URL into the Mobbr box in the header of this site</li><li>Install a plugin for your browser to donate to any URL you like</li></ul></div><p class=lead>In today's industrialized world, there is no place for individual talent. Creation needs to be predictable. Production is preplanned. People are production assets. Is this what we want? Imagine a world where work fits talent and people, instead of the other way around.</p><p>Internet makes such a world possible. On the internet people can go online and add value, share content and collaborate. Any time, any place. You can help this new world by making it profitable to create, collaborate and share. Reward creation! Do this with the Mobbr button wherever you encounter it. It puts your money where your heart is: with creators. One button pays them all, direct, no middle-man. You like, you click! It's rewarding!</p><p>Rewarding creators is simple. If websites place buttons, click those buttons! Click as many as you like without worrying about the money. Every creator gets his fair share. Every payment you make again. And again. Suddenly participating, creating and innovating using becomes business.</p><p>If websites don't have buttons, you can still donate. You can use the bookmarklet at the bottom of our site, or the donato-box in the header of our site. Owners of the websites will receive mail and can claim their payments within a certain period. If they don't we return your payment to you.</p><iframe src=\"https://docs.google.com/presentation/d/1tjkoWfBxRINxkQRrpYrfnoQsvysUbz0raWY1zMqF6XY/embed?start=false&loop=false&delayms=3000\" frameborder=0 width=960 height=749 allowfullscreen mozallowfullscreen=true webkitallowfullscreen=true></iframe><div class=page-header><h1>Use cases<br><small>Mobbr has many uses, for small weblogs to corporate platforms, these are just a very few of them</small></h1></div><div class=\"use-cases row-fluid\"><div class=\"well span6 special\"><h4>The crowdsourced helpdesk</h4><h6><small>When</small></h6><p><small>You notice that on your helpdesk platform (like a forum or wiki), people frequently help eachother.</small></p><h6><small>What</small></h6><p><small>Reroute some of your spendings to reward those people. Participation and quality will increase, ultimately lowering your helpdesk costs.</small></p><h6><small>How</small></h6><p><small>Rank contributions using a simple algorithm and create a page where Mobbr can find this ranking. Use this page to frequently reward all contributors. In addition, people can reward eachother, peer-to-peer, with per-topic Mobbr buttons.</small></p></div><div class=\"well span6 special\"><h4>The corporate social platform</h4><h6><small>When</small></h6><p><small>The social collaboration platform holds the real promise to make many corporate processes much more effective but participation levels stay low.</small></p><h6><small>What</small></h6><p><small>Use bonusses or a % of your monthly salary round to reward participation.</small></p><h6><small>How</small></h6><p><small>Rank contributions using an algorithm and create a page where Mobbr can find this ranking. Pay bottom-up salary through Mobbr. Participation can be steered by tuning the algorithm using a dashboard.</small></p></div></div><div class=\"use-cases row-fluid\"><div class=\"well span6 special\"><h4>The social loyalty program</h4><h6><small>When</small></h6><p><small>You want to attract new customers and keep them with you using your own loyalty currency (e.g. airmiles, freebees).</small></p><h6><small>What</small></h6><p><small>Have customers earn credits (e.g. airmiles) for participation in your campaigns / on the website.</small></p><h6><small>How</small></h6><p><small>Measure their participation, reward them with your special credit points and create a shop where they can spend these points.</small></p></div><div class=\"well span6 special\"><h4>Social / local currencies</h4><h6><small>When</small></h6><p><small>You have a local or social currency and need online payment facilities.</small></p><h6><small>What</small></h6><p><small>Offer local online merchands to accept this local currency for their products and services.</small></p><h6><small>How</small></h6><p><small>Create a custom curreny in Mobbr and instruct merchands on how to integrate Mobbr on their sites.</small></p></div></div><div class=\"use-cases row-fluid\"><div class=\"well span6 special\"><h4>The (multi-author) website</h4><h6><small>When</small></h6><p><small>You have a weblog / wiki / forum etc. that makes money through donations or ads.</small></p><h6><small>What</small></h6><p><small>Share this income among all those who add value: your authors, the webmaster, the owner, the readers that comment, etc.</small></p><h6><small>How</small></h6><p><small>Mention all the contributors in the Mobbr scripts, either a static or a dynamically generated one, and place buttons on relevant pages. Regularly share the ad revenues with top participants.</small></p></div><div class=\"well span6 special\"><h4>Share revenues, boost patricipation</h4><h6><small>When</small></h6><p><small>In general, whenever you reward people, participation and steerability goes up.</small></p><h6><small>What</small></h6><p><small>Take any appropriate income stream and use (part of) it to reward participation.</small></p><h6><small>How</small></h6><p><small>Invent, test and implement a mechanism that ranks contributions and create a page where Mobbr can find this ranking. Use Mobbr to reward all those who added value.</small></p></div></div>"
  );


  $templateCache.put('app/views/creators.html',
    "<div class=page-header><h1>Set out for every contribution you make to be rewarded<br><small>There is a new economy waiting to happen, take your fair share.</small></h1></div><div class=\"well special pull-right span6\"><h4>This is how it works</h4><ul><li><a href=/#/sites>Find</a> a site that uses Mobbr</li><li>Go there and start adding value and content, participate!</li><li>Get your fair share automatically</li></ul>Also...<ul><li>Check if you already recieved payments</li><li><a href=/#/claimpayment>Claim them</a></li></ul>With Mobbr you can send payments to every URL and email address, even those still unknown to Mobbr!</div><div class=\"well special pull-right span6\"><h4>These are your tools</h4><ul><li>Make your content available on a site that is Mobbrified</li><li>Collaborate on platforms that are Mobbrified</li></ul></div><p class=lead>The internet and its social collaboration platforms allow you to bring your specific talents to communities and crowds everywhere. Small contributions, big contributions, they all add up. A new way of working is waiting to happen. Any time, any place. Tailored to your skills and preferences.</p><p>Good ideas, brilliant code, life-saving tips, sublime pictures and artwork. Whether you create alone or in social collaboration, the Mobbr button guarantees each contributor his fair share. One button pays you all, no middleman. Just go online and start adding value.</p><p>With the Mobbr button in place, payments are automatically and instantly divided among all co-creators, including you. Make sure you do your thing on a Mobbrified platform. You can start a new collaboration without the need to do any financial bookkeeping or administration since everything that is earned, is automatically divided. Mobbr makes sure you can concentrate on creation and innovation.</p>"
  );


  $templateCache.put('app/views/dashboard.html',
    "<div class=\"alert alert-info\" ng-hide=userSession.authenticated>The dashboard is empty because you are not logged in. To login or signup, go <a href=#/join>here</a>.</div><tabs><pane heading=Payments><div class=form-inline style=\"margin-bottom: 20px\"><label for=searchEntries{{paymenttype}}>Search:</label><input type=search class=search-query ng-model=searchentries id=searchEntries{{paymenttype}}></div><accordion close-others=false><accordion-group heading=Unfinalized is-open=true><payments nodatatitle=\"No pending/unfinalized payments\" searchentries=searchentries paymenttype=unfinalized_payments showexpiresdate=false editable=true></payments></accordion-group><accordion-group heading=\"Since last logout\" is-open=true><payments nodatatitle=\"No payments since last logout\" paymenttype=new_payments editable=false searchentries=searchentries showexpiresdate=false></payments></accordion-group><accordion-group heading=\"Historic payments\" is-open=true><payments nodatatitle=\"No payments\" searchentries=searchentries paymenttype=payments editable=false showexpiresdate=false></payments></accordion-group></accordion></pane><pane heading=Balances><div class=\"pull-right btn-toolbar\" style=\"margin: 0\"><div class=btn-group><button class=\"btn dropdown-toggle\" data-toggle=dropdown>Receive <span class=caret></span></button><ul class=\"dropdown-menu pull-right\"><li><div class=clearfix><select class=pull-right ng-model=network_method ng-options=\"n.name for n in networks\"></select></div><div ng-switch=network_method.name><ul ng-switch-when=bitcoin><li class=nav-header>Send to one of these Bitcoin addresses</li><li ng-show=\"network_method.addresses.result.length > 0\" class=\"nav-header balancesub\"><ul class=no-style><li ng-repeat=\"address in network_method.addresses.result\"><a style=\"text-transform: none\" href=\"bitcoin:{{ address.address }}\">{{ address.address }}</a></li></ul></li><li ng-show=\"network_method.addresses.result.length == 0\" class=\"nav-header balancesub\"><ul class=no-style><li><span>No addresses yet, click below to generate</span></li></ul></li><li class=nav-header><button class=\"btn btn-primary\" ng-click=newAccountAddress(network_method)>Generate new address</button></li></ul><ul ng-switch-when=paypal><li class=nav-header>Send to paypal address:</li><li ng-show=\"network_method.addresses.result.length > 0\" class=\"nav-header balancesub\"><ul class=no-style><li><span>paypal@mobbr.com</span></li></ul></li><li class=nav-header>Place one of these tokens in the memo/note field of payment</li><li ng-show=\"network_method.addresses.result.length > 0\" class=\"nav-header balancesub\"><ul class=no-style><li ng-repeat=\"address in network_method.addresses.result\"><span>%{{ address.address }}%</span></li></ul></li><li ng-show=\"network_method.addresses.result.length == 0\" class=\"nav-header balancesub\"><ul class=no-style><li><span>No addresses yet, click below to generate</span></li></ul></li><li class=nav-header><button ng-disabled=waitinggenerate class=\"btn btn-primary\" ng-click=newAccountAddress(network_method)><i class=\"icon-white mobbrloader\" ng-show=waitinggenerate></i> Generate new token</button></li></ul></div></li></ul></div><div class=btn-group><button class=\"btn dropdown-toggle\" data-toggle=dropdown>Send <span class=caret></span></button><ul class=\"dropdown-menu pull-right\"><div class=clearfix><select class=pull-right ng-model=network_method ng-options=\"n.name for n in networks\"></select></div><div ng-switch=network_method.name><form name=bitcoinform><ul ng-switch-when=bitcoin><li class=nav-header>Curreny &amp; amount</li><li class=nav-header><select class=input-small ng-model=$parent.$parent.$parent.withdraw_currency ng-options=\"currency for currency in network_method.currencies.result\"></select><input name=withdraw_amount class=input-small ng-model=withdraw_amount required type=number step=any min=0 max=1000000000></li><li class=nav-header>Bitoin address</li><li class=nav-header><input name=withdraw_address ng-model=withdraw_address required class=input-xlarge></li><li class=nav-header>Note</li><li class=nav-header><textarea name=withdraw_note class=input-xlarge ng-model=withdraw_note></textarea></li><li class=nav-header><button class=\"btn btn-success\" ng-click=\"withdraw(this, network_method.name, withdraw_currency, withdraw_amount, withdraw_address, withdraw_note)\"><i class=\"icon-white mobbrloader\" ng-show=waitingwithdraw></i> Send</button></li></ul></form><form name=paypalform><ul ng-switch-when=paypal><li class=nav-header>Curreny &amp; amount</li><li class=nav-header><select class=input-small ng-model=$parent.$parent.$parent.withdraw_currency ng-options=\"currency for currency in network_method.currencies.result\"></select><input name=withdraw_amount class=input-small ng-model=withdraw_amount required type=number step=any min=0 max=1000000000></li><li class=nav-header>Email address</li><li class=nav-header><input name=withdraw_address type=email ng-model=withdraw_address required class=input-xlarge></li><li class=nav-header>Note</li><li class=nav-header><textarea name=withdraw_note class=input-xlarge ng-model=withdraw_note></textarea></li><li class=nav-header><button class=\"btn btn-success\" ng-disabled=waitingwithdraw ng-click=\"withdraw(this, network_method.name, withdraw_currency, withdraw_amount, withdraw_address, withdraw_note)\"><i class=\"icon-white mobbrloader\" ng-show=waitingwithdraw></i> Send</button></li></ul></form></div></ul></div></div><div class=form-inline class=pull-left style=\"margin-bottom: 20px\"><label for=searchBalanceEntries>Search:</label><input type=search class=search-query ng-model=searchBalanceEntries id=searchBalanceEntries></div><accordion close-others=false><accordion-group heading=Totals is-open=true><table class=\"table table-striped\" ng-show=\"balances.length > 0\"><thead><tr><th>Currency description</th><th ng-click=\"sortBalance('currency_iso')\">Currency</th><th ng-click=\"sortBalance('amount')\">Total</th><th ng-click=\"sortBalance('fee')\">Fee</th><th ng-click=\"sortBalance('spendable')\">Spendable</th></tr></thead><tbody><tr ng-repeat=\"balance in balances | orderBy:sortEntries:sortOrderBalance | filter:searchBalanceEntries\" ng-class-odd=\"'odd'\" ng-class-even=\"'even'\"><td ng-bind=currencyDescription(balance.currency_iso)></td><td ng-bind=balance.currency_iso class=currency></td><td ng-bind=balance.amount class=\"amount decorate-amount\"></td><td ng-bind=balance.fee class=\"amount decorate-amount\"></td><td ng-bind=balance.spendable class=\"amount decorate-amount\"></td></tr></tbody></table><div ng-show=\"balances.length == 0\">No balances found</div></accordion-group><accordion-group heading=Payments is-open=true><table class=\"table table-striped\" ng-show=\"mutations.length >0\"><thead><tr><th ng-click=\"sortPayments('paiddatetime')\">date</th><th ng-click=\"sortPayments('payment_service')\">Payment network</th><th ng-click=\"sortPayments('currency_iso')\">Currency</th><th ng-click=\"sortPayments('amount')\" colspan=3>Amount</th></tr></thead><tbody><tr ng-repeat=\"mutation in mutations | orderBy:sortEntries:sortOrderPayments | filter:searchBalanceEntries\" ng-class-odd=\"'odd'\" ng-class-even=\"'even'\"><td ng-bind=\"mutation.paiddatetime || mutation.announceddatetime\" class=\"datetime {{ !mutation.paiddatetime && 'muted' }}\"></td><td ng-bind=mutation.payment_service></td><td ng-bind=mutation.currency_iso class=currency></td><td ng-bind=mutation.amount class=\"amount decorate-amount\"></td><td class=amount></td><td class=amount></td></tr></tbody></table><div ng-show=\"mutations.length == 0\">No transactions found</div></accordion-group></accordion></pane><pane heading=Domains><div ng-controller=SearchDomainController><form ng-submit=searchDomain()><label for=searchDomainInput>Enter domain to administer:</label><div class=input-append><input ng-model=searchDomainInput id=searchDomainInput><button type=submit class=btn>Go</button></div></form></div></pane></tabs>"
  );


  $templateCache.put('app/views/domain.html',
    "<div class=page-header><h1>{{info.meta_data.title}}<br></h1></div><div class=row-fluid><div class=span8><a href={info.meta_data.url}} ng-show=info.meta_data.img_url><img ng-src={{info.meta_data.img_url}}></a><p>{{info.meta_data.description}}</p></div><div class=\"well special pull-right span4 receipt\"><table class=\"table table-striped\"><thead><th colspan=3>Domain earnings</th></thead><tbody><tr ng-repeat=\"balance in balances\" ng-class-odd=\"'odd'\" ng-class-even=\"'even'\"><td ng-bind=currencyDescription(balance.currency_iso)></td><td ng-bind=balance.currency_iso></td><td ng-bind=\"balance.amount | number:4\" class=\"amount decorate-amount\"></td></tr></tbody></table></div></div><tabs><pane heading=\"Payments to this domain\"><div ng-show=owner><paymentsprovided nodatatitle=\"No payments\" searchentries=searchentries payments=payments showexpiresdate=false></paymentsprovided></div><div class=\"alert alert-error\" ng-show=!owner>This information is only viewable by the ownwer of this domain</div></pane><pane heading=\"Where were payments made\"><div class=\"alert alert-error\" ng-show=!owner>This information is only viewable by the ownwer of this domain</div><div ng-show=owner><div ng-show=\"locations.length > 0\"><form class=form-inline ng-show=\"payments.length > 0\"><label for=searchEntriesLocations>Search:</label><input class=search-query type=search ng-model=searchentriesLocations id=searchEntriesLocations></form></div><div class=alert ng-show=\"locations.length == 0\">No referrers found</div><table ng-show=\"locations.length > 0\" class=\"table table-striped\"><thead><tr><th ng-click=\"sortLocations('url')\">Url</th><th></th><th ng-click=\"sortLocations('amount')\">Amount</th></tr></thead><tbody><tr ng-repeat=\"location in locations | orderBy:sortEntriesLocations:sortOrderLocations | filter:searchentriesLocations\"><td><a href={{location.url}} target=_blank>{{location.url}}</a></td><td ng-bind=location.currency_iso></td><td ng-bind=\"location.amount | number:4\" class=\"amount decorate-amount\"></td></tr></tbody></table></div></pane><pane heading=\"How were payments divided\"><div class=alert ng-show=!owner>This information is only viewable by the ownwer of this domain</div><div ng-show=owner><form class=form-inline ng-show=\"persons.length > 0\"><label for=searchEntriesPeople>Search:</label><input class=search-query type=search ng-model=searchentriesPeople id=searchEntriesPeople></form><div class=\"alert alert-info\" ng-show=\"persons.length == 0\">No persons found</div><table ng-show=\"persons.length > 0\" class=\"table table-striped\"><thead><tr><th colspan=2 ng-click=\"sortPeople('username')\">Person</th><th ng-click=\"sortPeople('roles')\">Roles</th><th colspan=2 ng-click=\"sortPeople('amount')\">Amount</th></tr></thead><tbody><tr ng-repeat=\"person in persons | orderBy:sortEntriesPeople:sortOrderPeople | limitTo:showEntries | filter:searchentriesPeople\"><td><img width=20 ng-src=\"https://secure.gravatar.com/avatar/{{person.gravatar}}&default=https://mobbr.com/img/default-gravatar.png\" ng-show=person.gravatar></td><td ng-bind=person.username></td><td ng-bind=person.roles></td><td ng-bind=person.currency_iso></td><td ng-bind=\"person.amount | number:4\" class=\"amount decorate-amount\"></td></tr></tbody></table></div></pane></tabs>"
  );


  $templateCache.put('app/views/exchangerate.html',
    "<div class=page-header><h1>Exchange rates<br><small>Rates are just indications</small></h1></div><table class=\"table table-striped\"><thead><tr><th ng-click=\"sortBy('description')\">Description</th><th colspan=3 ng-click=\"sortBy('currency_iso')\">Rate<sup>*</sup></th><th>Update</th><th ng-click=\"sortBy('exchange_rate_source_url')\">Source</th></tr></thead><tbody><tr ng-repeat=\"exchangerate in exchangerates | orderBy:sortField:sortOrder\"><td ng-bind=exchangerate.description></td><td>{{exchangerate.base_currency_iso}} 1.00</td><td>≈</td><td>{{exchangerate.currency_iso}} {{exchangerate.exchange_rate | number:2}}</td><td ng-bind=exchangerate.exchange_rate_datetime></td><td><a href={{exchangerate.exchange_rate_source_url}}>{{exchangerate.exchange_rate_source_url}}</a></td></tr></tbody></table>"
  );


  $templateCache.put('app/views/generate_button.html',
    "<div class=page-header><h1>Create button &lt;embed&gt; code for your website<br><small>Go <a href=\"#/buttons?scrollTo=domain\">here</a> for the one minute catch-all or <a href=#/buttons>here</a> for advanced options</small></h1></div><accordion class=generate-button close-others=false><accordion-group heading=\"1/6: Choose button\" is-open=\"step() >= 1\" is-active=\"step() >= 1\"><div class=\"span2 button-type\" ng-repeat=\"button in buttons\"><input id={{button.name}} type=radio ng-model=form.button value={{button.function}} name={{button.name}}><label for={{button.name}}><span ng-show=!button.url ng-bind=button.name></span> <img alt=button.name ng-src={{button.url}} ng-show=button.url></label></div></accordion-group><accordion-group heading=\"2/6: Enter URL\" is-open=\"step() >= 2\" is-active=\"step() >= 2\"><form class=\"form-horizontal control-group\" ng-submit=retrieveUrl()><div class=control-label><label for=url>Enter 'mobbr.com' to see an example</label></div><div class=controls><div class=input-append><input id=url placeholder=http:// ng-model=form.url><a class=btn ng-click=retrieveUrl()>Check url <i class=\"icon-white mobbrloader\" ng-show=workingRetrieveUrl></i></a></div></div></form></accordion-group><accordion-group heading=\"3/6: Enter description\" is-open=\"step() >= 3\" is-active=\"step() >= 3\"><form class=form-horizontal><div class=control-group><div class=control-label><label for=title_input>Title</label></div><div class=controls><input class=input-xxlarge id=title_input ng-model=form.title rel=can_hide name=title ng-disabled=detectTitle><span class=help-inline><input type=checkbox ng-model=detectTitle name=title_auto_detect ng-change=detectTitleChanged()>Use page title</span></div></div><div class=control-group><div class=control-label><label for=description_textarea>Description</label></div><div class=controls><textarea class=input-xxlarge id=description_textarea rel=can_hide cols=50 rows=5 name=description ng-model=form.description ng-disabled=detectDescription></textarea><span class=help-inline><input type=checkbox name=description_auto_detect ng-model=detectDescription ng-change=detectDescriptionChanged()>Use page description</span></div></div><div class=control-group><div class=control-label><label for=copyright>License (link to copyright/license definition)</label></div><div class=controls><input class=input-xxlarge id=copyright placeholder=http:// rel=can_hide name=copyright ng-model=form.copyright><span class=help-inline>optional</span></div></div><div class=control-group><div class=control-label><label for=language_select>Language</label></div><div class=controls><select class=input-xxlarge id=language_select rel=can_hide name=language ng-model=form.language ng-options=\"value as key for (value,key ) in languagesMap\"></select><span class=help-inline>optional</span></div></div><div class=control-group><div class=control-label><label for=image_input>Image (link to image file)</label></div><div class=controls><input class=input-xxlarge id=image_input placeholder=http:// rel=can_hide name=image ng-model=form.image><span class=help-inline>optional</span></div></div></form></accordion-group><accordion-group heading=\"4/6: Add participants\" is-open=\"step() >= 3\" is-active=\"step() >= 3\"><form class=form-horizontal><div class=control-group><div class=controls><label for=show_json_box><input id=show_json_box type=checkbox ng-model=form.showScriptWhileEditing>Show Mobbr script while editing (expert-only)</label></div></div><div class=control-group><div class=control-label><label for=id_base>ID-base</label></div><div class=controls><input id=id_base rel=can_hide name=id_base ng-model=form.idBase><span class=help-inline>expert-only, otherwise leave as is</span></div></div><div class=control-group><div class=control-label><label for=id_base>Participants</label></div><div class=controls><table class=\"participants table\"><thead><tr><th title=\"The Mobbr username of the participant, or his/her email, gravatar profile URL or BTC address\">User ID<br><small>Username / email / gravatar profile/ Bitcoin address</small></th><th title=\"Enter free text describing the participants role in the collaboration\">Role / function<br><small>Free text</small></th><th title=\"Enter a percentage or a relative share (an integer)\">Share<br><small>% or positive int.</small></th><th></th></tr></thead><tbody><tr ng-repeat=\"contributor in form.contributors\"><td><input class=input-medium id=user_search ng-model=contributor.id autocomplete=off placeholder=\"e.g. 'Patrick'\"></td><td><input class=input-medium id=user_role ng-model=contributor.role name=user_role placeholder=\"e.g. 'photographer'\"></td><td><input class=input-small id=user_share ng-model=contributor.share name=user_share placeholder=\"e.g. '2'\"></td><td><button id=remove_user class=\"btn btn-danger\" ng-click=remove_contributeur($index);><i class=\"icon-white icon-remove\"></i></button></td></tr></tbody></table><button id=new_user_button class=\"btn btn-success\" ng-click=add_new_contributor();><i class=\"icon-white icon-user\"></i> Add</button></div><div id=json_generator class=\"json-generator control-group\" ng-show=form.showScriptWhileEditing><div class=control-label><label for=id_base>Script that will be generated. Pages are configured using <a href=#/buttons>CPR-scripts</a>, see <a href=/protocol.html target=_blank>defintion</a>, CPR is based on <a href=http://www.json.org/ target=_blank>JSON language</a>)</label></div><div class=controls><pre id=json ng-bind-html-unsafe=generateContributeurJsonFormatted() class=\"prettyprint pre-scrollable\"></pre></div></div></div></form></accordion-group><accordion-group heading=\"5/6: Generate script\" is-open=\"step() >= 5\" is-active=\"step() >= 5\"><form class=form-horizontal><div class=control-group><div class=controls><button class=\"btn btn-success\" ng-click=\"chooseConfiguration('json')\">Generate inline script</button></div></div><div class=control-group><div class=controls><button class=\"btn btn-success\" ng-click=\"chooseConfiguration('mobbr')\" ng-disabled=!userSession.authenticated>Generate script link</button> <span class=help-inline ng-hide=userSession.authenticated>Login to be able to choose Link</span></div></div></form></accordion-group><accordion-group heading=\"6/6: Grab embed script\" is-open=\"step() >= 6\" is-active=\"step() >= 6\"><form class=form-horizontal><div class=control-group ng-show=\"mobbrConfiguration == 'json'\"><div class=control-label>Copy-paste this code in &lt;head&gt; section of HTML-page</div><div id=html_metatag_view class=controls><pre class=\"prettify pre-scrollable\" id=html_metatag_view_area ng-bind=generateMetaScript()></pre></div></div><div class=control-group ng-show=\"mobbrConfiguration == 'mobbr'\"><div class=control-label>Copy-paste this code in &lt;head&gt; section of HTML-page</div><div id=html_header_view class=controls><pre class=prettify id=html_header_view_area ng-bind=generatedHeaderLink></pre></div></div><div class=control-group ng-show=\"form.button != '[NO_BUTTON]'\"><div class=control-label>Copy-paste this code on your HTML-page where the button needs to be visible.</div><div class=controls><pre class=\"prettify pre-scrollable\" ng-bind=generateButtonScript()></pre></div></div></form></accordion-group></accordion>"
  );


  $templateCache.put('app/views/identify-email.html',
    "<form user-register=\"\" name=register class=form-horizontal><h6><small>Use email to identify yourself</small></h6><div class=input-append><input ng-model=email type=email name=email placeholder=\"e.g. patrick@mobbr.com\" required><button class=btn type=submit>Send</button></div></form>"
  );


  $templateCache.put('app/views/join.html',
    "<div class=page-header><h1>Join Mobbr<br><small>Choose your username with care, it can never be changed. Ever.</small></h1></div><iframe style=\"width: 100%\" class=eula src=https://api.mobbr.com/mobbr-terms-of-use.txt></iframe><form user-register=\"\" name=register class=form-horizontal><div style=\"padding-bottom: 25px; margin-bottom: 20px; border-bottom: 1px solid #009ee0\"><label class=checkbox><input type=checkbox ng-model=accept_eula>I accept the terms</label></div><div class=control-group><div class=control-label><label for=username>Username</label></div><div class=controls><input ng-model=username placeholder=username id=username></div></div><div class=control-group><div class=control-label><label for=email>Email</label></div><div class=controls><input ng-model=email type=email name=email placeholder=email required id=email></div></div><div class=control-group><div class=control-label><label for=password>Password</label></div><div class=controls><input ng-model=password id=password type=password required placeholder=password></div></div><div class=control-group><div class=control-label><label for=password_control>Confirm password</label></div><div class=controls><input ng-model=password_control id=password_control type=password required placeholder=\"confirm password\"></div></div><div class=control-group><div class=controls><button ng-click=register() class=\"btn btn-primary\" type=submit ng-disabled=\"!accept_eula || waiting\"><i class=\"icon-white mobbrloader\" ng-show=waiting></i> Join</button></div></div></form>"
  );


  $templateCache.put('app/views/link-login.html',
    "<div class=page-header><h1>Loggin in<br><small>Please wait while we log you in, so you can change your password</small></h1></div>"
  );


  $templateCache.put('app/views/linklogin.html',
    "<div class=\"alert alert-info\" ng-show=loginIn><button class=\"btn btn-link\">Logging in... Please wait <i class=\"icon-white mobbrloader\"></i></button></div>"
  );


  $templateCache.put('app/views/login.html',
    "<div class=page-header><h1>Identify yourself<br><small>Will reconnect if email address matches existing Mobbr account</small></h1></div><div><div class=\"well span6\"><h6><small>Use social network to identify yourself</small></h6><div class=btn-group><a href=/oauth/facebook class=btn><i class=icon-white><img src=/img/facebook_20.gif></i></a> <a href=/oauth/google class=btn><i class=icon-white><img src=/img/google_20.png></i></a> <a href=/oauth/github class=btn><i class=icon-white><img src=/img/github_icon.png></i></a></div></div><div class=\"well span6\" ng-include=\"\" src=\"'views/identify-email.html'\"></div></div>"
  );


  $templateCache.put('app/views/main.html',
    "<div class=row-fluid style=\"margin-bottom: 24px\"><div class=\"container bookmarklet text-right\"><small>Drag this button to your bookmark bar to reward any url&nbsp;&nbsp;</small> <a class=home-button href=\"javascript: (function () { var s = document.createElement('script'); s.setAttribute('src', '/scripts/bookmarklet.js'); document.body.appendChild(s); }());\"><small>Mobbr now!</small></a></div></div><div class=\"row-fluid page-header\" style=\"margin-bottom: 60px; padding-bottom: 30px\"><div class=span8><div class=hero-unit><h1 style=\"margin-top: 130px\">Crowdsourcing needs crowdpayment</h1><p class=lead>Mobbr makes crowdsourcing rewarding</p><p><a href=http://fmt.mobbr.com target=_blank class=\"btn btn-large btn-success join\" title=\"See a Mobbr-plugin in action on this open-source platform\">See live demo</a> <a href=#/join class=\"btn btn-large btn-link\" title=\"Joining is free, you get a free budget of 100 'Mobbrs' so you can try all functionality.\">Open account</a> <a href=#/company class=\"btn btn-large btn-link\" title=\"Mobbr allows people to send money to any URL or email address, also to yours\">Contact us for a free trial</a></p></div></div><div class=span4><div class=\"well special introtext\" style=\"margin-top: 22px\"><p style=\"padding-top: 66px\">Some people think crowdsourcing is a free way to get work done. We think it’s also a great way to let a whole community contribute to success. Success for all that needs rewards for all.</p><p>How to get the crowd to work and reward each member of your community measured by what he or she supplied?</p><p>Simple: use Mobbr. Mobbr is a crowdpayment system that makes crowdsourcing rewarding. For all.</p></div></div></div><div class=\"row-fluid tagline\" style=\"text-align: center; font-style: italic; padding-bottom: 60px\"><p class=lead style=\"padding: 0 50px\">&quot;Rewarding participation takes crowdsourcing to its next level, ultimately creating a reliable and steerable anytime anyplace workforce of billions. Together we start a new economy that benefits everybody.&quot;</p></div><div class=row-fluid style=\"padding-bottom: 30px\"><div class=\"well special clearfix\"><div style=margin-top:40px><div class=span4><h3 style=\"margin-top: 0; line-height: 1em\">1. Plan</h3><ul><li>Define the work you want done</li><li>Set up disciplines and output criteria</li><li>Determine the fee and distribution key</li><li>Include a percentage for your platform</li></ul></div><div class=span4><h3 style=\"margin-top: 0; line-height: 1em\">2. Source</h3><ul><li>Launch a project page</li><li>Include project briefings</li><li>Invite your community to contribute</li><li>Follow your project real time</li></ul></div><div class=span4><h3 style=\"margin-top: 0; line-height: 1em\">3. Pay</h3><ul><li>Click the Mobbr button when ready</li><li>Let Mobbr calculate the fee distribution</li><li>Let Mobbr divide the fee among the participants and your platform</li></ul></div></div></div></div><div class=\"row-fluid tagline\" style=\"text-align: center; font-style: italic; padding-bottom: 100px; line-height: 64px\"><div class=\"span2 button-type\" style=\"margin-left: 80px\"><mobbrbutton size=medium url=https://mobbr.com></mobbrbutton></div><div class=\"span2 button-type\"><mobbrbutton size=large url=https://mobbr.com></mobbrbutton></div><div class=\"span2 button-type\"><mobbrbutton size=slim url=https://mobbr.com></mobbrbutton></div><div class=\"span2 button-type ng-scope\"><mobbrbutton size=small url=https://mobbr.com></mobbrbutton></div><div class=\"span2 button-type ng-scope\" style=\"margin-right: 80px\"><mobbrbutton size=mediumgs url=https://mobbr.com></mobbrbutton></div></div><div class=row-fluid style=\"padding-bottom: 30px\"><div class=\"well special clearfix span12\"><h1 style=\"margin:20px 300px\">Why pay the crowd?</h1><div style=margin-top:40px><div class=span6><h3 style=\"margin-top: 0; line-height: 1em\">You and your client win</h3><ul><li>Work gets done quicker with a rewarded crowd</li><li>Work gets done better with a rewarded crowd</li><li>Work gets done more cost-effectively with a rewarded crowd</li><li>Your platform generates an extra income</li><li>You re-design and optimize business processes for the future</li></ul></div><div class=span6><h3 style=\"margin-top: 0; line-height: 1em\">Your community wins</h3><ul><li>Rewarded crowds attract higher quality contributors that interact</li><li>Rewarded crowds have a higher level of involvement and satisfaction</li><li>Contributors get rewarded measured by their input</li><li>By rewarding, you put yourself and the crowd ahead of the competition</li></ul></div></div></div></div><div class=\"row-fluid tagline\" style=\"text-align: center; font-style: italic; padding-bottom: 55px\"><p class=lead style=\"padding: 0 50px\">&quot;Payment system for network economics.<br>One button pays them all. Any number, any ratio.&quot;</p></div><h1 class=bottomline>Join the anytime anyplace economy</h1><h3 style=\"margin-top: 0; line-height: 1em\">For inquiries <a href=mailto:&#112;&#097;&#116;&#114;&#105;&#099;&#107;&#064;&#109;&#111;&#098;&#098;&#114;&#046;&#099;&#111;&#109;>email</a> us, or call +31629567016</h3>"
  );


  $templateCache.put('app/views/partnering.html',
    ""
  );


  $templateCache.put('app/views/payment.html',
    "<div class=page-header><h1>Payment receipt #{{payment.meta_data.id}} <span ng-hide=payment.meta_data.paiddatetime>(pending)</span><br><small>{{payment.meta_data.title}}</small></h1></div><div class=row-fluid><div class=span8><a href={{payment.meta_data.url}} ng-show=payment.meta_data.img_url><img ng-src={{payment.meta_data.img_url}} class=\"gravatar receipt-thumb\"></a><p>{{payment.meta_data.description}}</p></div><div class=\"well special pull-right span4 receipt\"><h6><small>Amount</small></h6><div class=clearfix>{{payment.meta_data.currency_iso}} <span class=\"amount decorate-amount\">{{payment.meta_data.amount | number:4}}</span></div><h6><small>Clicked</small></h6><div class=clearfix><span ng-bind=payment.meta_data.clickdatetime></span></div><h6><small>Approved</small></h6><div class=clearfix><span ng-bind=payment.meta_data.approveddatetime></span></div><h6><small>Paid</small></h6><div class=clearfix><span ng-bind=payment.meta_data.paiddatetime></span></div></div></div><tabs class=clearfix><pane heading=Receivers><form class=form-inline><label for=searchEntriesDirective>Search:</label><input class=search-query type=search ng-model=searchentries id=searchEntriesDirective></form><peoplepagesearch people=payment.receivers nodatatitle=\"\" persontitle=\"Username / id\" searchentries=searchentries showamount=true ownsearch=false></peoplepagesearch></pane><pane heading=Senders><form class=form-inline><label for=searchEntriesDirective2>Search:</label><input class=search-query type=search ng-model=searchentries id=searchEntriesDirective2></form><peoplepagesearch people=payment.senders nodatatitle=\"\" persontitle=\"Username / id\" searchentries=searchentries showamount=true ownsearch=false></peoplepagesearch></pane></tabs>"
  );


  $templateCache.put('app/views/protocol.html',
    "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=http://www.w3.org/1999/xhtml xmlns:og=http://opengraphprotocol.org/schema/ xmlns:mp=https://dev.mobbr.com/protocol xml:lang=en><head><meta http-equiv=Content-Type content=\"text/html; charset=UTF-8\"><title>Cascaded Participation Ranking (CPR) scripts</title><link rel=\"shortcut icon\" type=image/x-icon href=/images/uploads/icons/oupp_icon.png><meta property=og:locale content=en_US><meta property=og:title content=\"Cascaded Participation Ranking (CPR) scripts\"><meta property=og:type content=website><meta property=og:url content=https://dev.mobbr.com/protocol/><meta property=og:image content=https://dev.mobbr.com/img/openmicropaymentprotocol.jpg><meta property=og:description content=\"The Cascaded Participation Ranking (CPR) scripts enables any web page to specify participation rankings of social collaboration objects associated with the page. \"><meta name=original-source content=https://dev.mobbr.com/protocol><meta name=participation content=\"{\\\"participants\\\" : [{\\\"id\\\":\\\"https://mobbr.com/id/Patrick\\\"}]}\"><style>body\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                background: white;\r" +
    "\n" +
    "                color: black;\r" +
    "\n" +
    "                font-family: Georgia, serif;\r" +
    "\n" +
    "                font-size: 11pt;\r" +
    "\n" +
    "                margin: 10px;\r" +
    "\n" +
    "                margin-top: 15px;\r" +
    "\n" +
    "                margin-bottom: 15px;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        h1, h2, h3, h4\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                font-family: Calibri, sans-serif;\r" +
    "\n" +
    "                margin: 0;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        img\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                border: 0;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        pre, code\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                color: #060;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        a, a code\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                color: #3b5998;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        table\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                border-collapse: collapse;\r" +
    "\n" +
    "                border: 0;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        td\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                border: 0;\r" +
    "\n" +
    "                padding: 0;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        #body\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                margin: auto;\r" +
    "\n" +
    "                max-width: 850px;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        #header\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                margin-bottom: 15px;\r" +
    "\n" +
    "                margin-right: 30px;\r" +
    "\n" +
    "                text-align: center;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        #content, #footer\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                margin-left: 31px;\r" +
    "\n" +
    "                margin-right: 31px;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        #content p, #content li, #footer\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                line-height: 16pt;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        #content pre\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                line-height: 14pt;\r" +
    "\n" +
    "                margin: 17pt;\r" +
    "\n" +
    "                padding-left: 1em;\r" +
    "\n" +
    "                border-left: 1px solid #ccc;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        #footer\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                margin-top: 1em;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        #content h1, #content h2, #content h3\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                color: #666;\r" +
    "\n" +
    "                margin-bottom: 2pt;\r" +
    "\n" +
    "                margin-top: 17pt;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        #content h2\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                font-size: 19pt;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        #content h3\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                font-size: 15pt;\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "\r" +
    "\n" +
    "        #content p\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                margin: 0;\r" +
    "\n" +
    "                margin-bottom: 1em;\r" +
    "\n" +
    "            }</style></head><body><div id=body><div id=header><h1>The Cascaded Participation Ranking protocol (CPR-script)</h1><img src=/img/openmicropaymentprotocol.jpg alt=CPR-protocol></div><div id=content><h2>Introduction</h2><p>The CPR protocol enables any web page to specify its social participation ranking. This is used by services like <a href=https://dev.mobbr.com/>Mobbr</a> to distribute payments and donations. The ranking reflects the value added to the page or associated products by different participants.</p><p>In social collaboration every participant will have his own share of total added value.</p><p>The protocol can be used to describe participation levels using the following types of scripts:</p><ul><li><a href=#button>Button-scripts</a></li><li><a href=#xhtml>Page-scripts</a></li><li><a href=#domain>Domain-scripts</a></li><li><a href=#dns>DNS-scripts</a></li></ul><p>These desciptions types can be combined, or '<a href=#cascading>cascaded</a>' for more flexibility.</p><p>The protocol is based on <a href=http://en.wikipedia.org/wiki/JSON>JSON</a> (Javascript Object Notation). JSON-syntaxis can be checked using a <a href=http://www.jsonlint.com/>online parser</a> and JSON-support is good in every major programming language as well as in Javascript.</p><p>A formal description of valid JSON-specifications can be found at the bottom of this document.</p><ul><li><a href=#specs>Specification</a></li></ul><hr><p><a id=cascading></a></p><h2>Cascading-rules</h2><p>It is possible to supply a button script as well as a page script as well as a domain script as well as a DNS script. In this case the processor will cascade (combine) the values in the following order:</p><ol><li>DNS script</li><li>domain script</li><li>page script</li><li>button script</li></ol><p>The scripts are combined and duplicate values are overwritten in the order given above. Percentage shares are summed. If only percentages are used for shares, the sum of shares should be excactly 100%. Any remaining, not assigment, percentage is shared among the relative shares using the indicated ratios.</p><p>Participants can never be overwritten through cascading scripts, to combine participants with the same ID they need to have different roles.</p><p>Using this logic it is possible to specify global participants in the /PARTICIPATION.TXT that can never be excluded by button or page scripts. For instance the website owner and such. If such a recipient such has a percentage share, his share can never be reduced nor excluded.</p><hr><p><a id=button></a></p><h2>Button scripts</h2><p>If active web-elements such as buttons are used to trigger actions such as payments, they need to send a JSON-structure to the server of the payment-service (using a FORM-POST). This JSON-structure can contain all information needed to fullfill the transaction.</p><p>This is how it is done using the Mobbr-API. This javascript will post a variable called 'data' to the Mobbr gateway. Its contents is the JSON-script enclosed in \"{...}\".</p><pre><code>&lt;script src=\"https://mobbr.com/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\r" +
    "\n" +
    "&lt;script type=\"text/javascript\"&gt;\r" +
    "\n" +
    "mobbr.button(\r" +
    "\n" +
    "    {\r" +
    "\n" +
    "        \"id-base\" : \"https://mobbr.com/id/\",\r" +
    "\n" +
    "        \"title\" : \"iPhony\",\r" +
    "\n" +
    "        \"description\" : \"Planned obscolescence device\",\r" +
    "\n" +
    "        \"participants\" : [\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                \"id\": \"patman\",\r" +
    "\n" +
    "                \"role\": \"author\",\r" +
    "\n" +
    "                \"share\": \"3\"\r" +
    "\n" +
    "            },\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                \"id\": \"johnny\",\r" +
    "\n" +
    "                \"role\": \"author\",\r" +
    "\n" +
    "                \"share\": \"3\"\r" +
    "\n" +
    "            },\r" +
    "\n" +
    "            {\r" +
    "\n" +
    "                \"id\": \"zaplog\",\r" +
    "\n" +
    "                \"role\": \"platform\",\r" +
    "\n" +
    "                \"share\": \"1\"\r" +
    "\n" +
    "            }\r" +
    "\n" +
    "        ]\r" +
    "\n" +
    "    }\r" +
    "\n" +
    ");\r" +
    "\n" +
    "&lt;/script&gt;</code></pre><p><a href=#specs>See below</a> for a full description of the JSON-elements.</p><p>When used together with page- and / or domain-scripts, cascading-rules apply, see below.</p><hr><p><a id=xhtml></a></p><h2>Page-scripts (inline)</h2><p>To turn your web pages into payable objects without buttons or other active elements, you need to add metadata to your page. We've chosen <em>not</em> to base the (initial version of the protocol) on <a href=http://en.wikipedia.org/wiki/RDFa>RDFa</a> syntax like The Facebook open-graph protocol, but to use a more conventionaland scalable approach: just place a <a href=http://www.json.org/>JSON</a> description in the content-part of a <code>&lt;meta&gt;</code> tags in the <code>&lt;head&gt;</code> of your web page. This approach allows for W3C valid (X)HTML <b>and</b> to use the same JSON format other OuPP-elements use.</p><p>As an example, the following is the Open Micropayment Protocol markup for an item associated with a website:</p><pre><code>&lt;?xml version=\"1.0\" encoding=\"utf-8\"?&gt;\r" +
    "\n" +
    "&lt;!DOCTYPE html\r" +
    "\n" +
    "\tPUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\r" +
    "\n" +
    "\t\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"&gt;\r" +
    "\n" +
    "&lt;html\r" +
    "\n" +
    "\txmlns=http://www.w3.org/1999/xhtml\r" +
    "\n" +
    "\txml:lang=\"en\" &gt;\r" +
    "\n" +
    "&lt;head&gt;\r" +
    "\n" +
    "\t<b>&lt;meta name=\"participation\" content='\r" +
    "\n" +
    "\t\t{\r" +
    "\n" +
    "\t\t\t\"id-base\" : \"https://mobbr.com/id/\",\r" +
    "\n" +
    "\t\t\t\"title\" : \"The iPhony4\",\r" +
    "\n" +
    "\t\t\t\"description\" : \"Article about some fictious planned obscolescence device\",\r" +
    "\n" +
    "\t\t\t\"participants\" : [\r" +
    "\n" +
    "\t\t\t    {\r" +
    "\n" +
    "\t\t\t        \"id\": \"patman\",\r" +
    "\n" +
    "\t\t\t        \"role\": \"author\",\r" +
    "\n" +
    "\t\t\t        \"share\": \"3\"\r" +
    "\n" +
    "\t\t\t    },\r" +
    "\n" +
    "\t\t\t    {\r" +
    "\n" +
    "\t\t\t        \"id\": \"johnny\",\r" +
    "\n" +
    "\t\t\t        \"role\": \"author\",\r" +
    "\n" +
    "\t\t\t        \"share\": \"3\"\r" +
    "\n" +
    "\t\t\t    },\r" +
    "\n" +
    "\t\t\t    {\r" +
    "\n" +
    "\t\t\t        \"id\": \"zaplog\",\r" +
    "\n" +
    "\t\t\t        \"role\": \"platform\",\r" +
    "\n" +
    "\t\t\t        \"share\": \"1\"\r" +
    "\n" +
    "\t\t\t    }\r" +
    "\n" +
    "\t\t\t]\r" +
    "\n" +
    "\t\t}\r" +
    "\n" +
    "\t'/&gt;</b></code></pre><p><i><strong><small>Note: because JSON requires double quotes, the entire JSON definition itself (the content-attribute) should be enclosed in single quotes.</small></strong></i></p><p><i><strong><small>Note: this construction is W3C valid.</small></strong></i></p><p>When used together with button- and / or domain-scripts, cascading-rules apply, see below.</p><h2>Page-scripts (external)</h2><p>As an alternative a HTML-LINK can be used, linking to <a href=https://dev.mobbr.com/mobbr-payment_info.json>an external JSON-description</a>. Like below:</p><pre><code>&lt;?xml version=\"1.0\" encoding=\"utf-8\"?&gt;\r" +
    "\n" +
    "&lt;!DOCTYPE html\r" +
    "\n" +
    "    PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\r" +
    "\n" +
    "    \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"&gt;\r" +
    "\n" +
    "&lt;html\r" +
    "\n" +
    "    xmlns=http://www.w3.org/1999/xhtml\r" +
    "\n" +
    "    xml:lang=\"en\" &gt;\r" +
    "\n" +
    "&lt;head&gt;\r" +
    "\n" +
    "    <b>&lt;link rel=\"participation\" type=\"application/json\" href=\"https://dev.mobbr.com/mobbr-payment_info.json\"/&gt;</b></code></pre><h2>Helpfull (X)HTML elements</h2><p>Additional metadata / properties that can help the payments system to make intelligent decisions:</p><ul><li>The HTML &lt;title&gt; element.</li><li>A metadata name=\"description\" <a href=http://www.w3schools.com/tags/tag_meta.asp>element</a>.</li><li>A metadata name=\"canonical\" <a href=http://googlewebmastercentral.blogspot.com/2009/02/specify-your-canonical.html>element</a>.</li><li>A metadata name=\"original-source\" <a href=http://googlenewsblog.blogspot.com/2010/11/credit-where-credit-is-due.html>element(s)</a>.</li><li>A metalink rel=\"copyright\" <a href=http://htmlhelp.com/reference/html40/head/link.html>element</a>, defining sharing and derivation rights</li><li>A correct set of <a href=http://ogp.me/>OG-properties</a>, as used by Facebook.</li></ul><p>This is not OuPP specific though, it is good webdesign practice in general. If possible make your pages W3C valid.</p><hr><p><a id=dns></a></p><h2>DNS scripts</h2><p>A payment script similar to the page-scripts can be placed in a TXT-record of the DNS of a domain. The script should be perpendend with '[CPR]'</p><hr><p><a id=domain></a></p><h2>Domain description (domain script)</h2><p>As an alternative to tagging individual pages with metadata, a domain or website can specify global settings in a PARTICIPATION.TXT file. This file needs to be placed in the root of the domain, like for instance the <a href=http://www.robotstxt.org/>ROBOTS.TXT</a> file.</p><p>In this file the default and/or global participation properties can be defined.</p><p>When used together with button- and / or page-scripts, cascading-rules apply, see below.</p><p>The format is straightforward: the file defines sets of properties that are applied to the URL's that match the wildcard-pattern. The properties will be applied to every URL that matches the pattern in order of declaration. The wildcard character is '*', matching zero, one or many arbitrary characters. Any '*' that occurs naturally in the URL (which is very rare), must be escaped (preceded) with a '\\'.</p><p>The following example describes the properties for a complete website.</p><pre><code>[\r" +
    "\n" +
    "\t{\r" +
    "\n" +
    "\t    \"url-pattern\" : \"*\",\r" +
    "\n" +
    "\t\t\"participation-info\":\r" +
    "\n" +
    "\t\t{\r" +
    "\n" +
    "\t        \"id-base\" : \"https://mobbr.com/id/\",\r" +
    "\n" +
    "\t        \"participants\" :\r" +
    "\n" +
    "\t\t\t[\r" +
    "\n" +
    "\t            {\r" +
    "\n" +
    "\t                \"id\" : \"83495\",\r" +
    "\n" +
    "\t                \"role\" : \"website-owner\",\r" +
    "\n" +
    "\t                \"share\" : \"1\"\r" +
    "\n" +
    "\t            }\r" +
    "\n" +
    "\t        ]\r" +
    "\n" +
    "\t    }\r" +
    "\n" +
    "\t},\r" +
    "\n" +
    "\t{\r" +
    "\n" +
    "\t    \"url-pattern\" : \"/article/*\",\r" +
    "\n" +
    "\t\t\"participation-info\" :\r" +
    "\n" +
    "\t\t{\r" +
    "\n" +
    "\t        \"id-base\" : \"https://mobbr.com/id/\",\r" +
    "\n" +
    "\t        \"type\" : \"fixed-price\",\r" +
    "\n" +
    "\t        \"amount\" : \"1.5\",\r" +
    "\n" +
    "\t        \"currency\" : \"EUR\",\r" +
    "\n" +
    "\t        \"participants\" :\r" +
    "\n" +
    "\t\t\t[\r" +
    "\n" +
    "\t            {\r" +
    "\n" +
    "\t                \"id\" : \"83495\",\r" +
    "\n" +
    "\t                \"role\" : \"distributer\",\r" +
    "\n" +
    "\t                \"share\" : \"1\"\r" +
    "\n" +
    "\t            },\r" +
    "\n" +
    "\t            {\r" +
    "\n" +
    "\t                \"id\" : \"6424\",\r" +
    "\n" +
    "\t                \"role\" : \"author\",\r" +
    "\n" +
    "\t                \"share\" : \"4\"\r" +
    "\n" +
    "\t            },\r" +
    "\n" +
    "\t            {\r" +
    "\n" +
    "\t                \"id\" : \"964242\",\r" +
    "\n" +
    "\t                \"role\" : \"reviewer\",\r" +
    "\n" +
    "\t                \"share\" : \"1\"\r" +
    "\n" +
    "\t            }\r" +
    "\n" +
    "\t        ]\r" +
    "\n" +
    "\t\t}\r" +
    "\n" +
    "\t},\r" +
    "\n" +
    "\t{\r" +
    "\n" +
    "\t    \"url-pattern\" : \"/article/*/picture\",\r" +
    "\n" +
    "\t\t\"participation-info\" :\r" +
    "\n" +
    "\t\t{\r" +
    "\n" +
    "            \"id-base\" : \"https://mobbr.com/id/\",\r" +
    "\n" +
    "\t        \"amount\" : \"1.5\",\r" +
    "\n" +
    "\t        \"participants\" :\r" +
    "\n" +
    "\t\t\t[\r" +
    "\n" +
    "\t            {\r" +
    "\n" +
    "\t                \"id\" : \"83495\",\r" +
    "\n" +
    "\t                \"role\" : \"photographer\",\r" +
    "\n" +
    "\t                \"share\" : \"1\"\r" +
    "\n" +
    "\t            }\r" +
    "\n" +
    "\t        ]\r" +
    "\n" +
    "\t\t}\r" +
    "\n" +
    "\t}\r" +
    "\n" +
    "]</code></pre><p><a href=#specs>See below</a> for a full description of the JSON-elements.</p><p>It is possible that different patterns match the same URL. Properties are then cascaded (if not present) or overwritten (if already present) in top to bottom order, combining all matching rules.This cascading may not lead to duplicate participants being inserted which is allowed as longas the roles differ.</p><hr><p><a id=specs></a></p><h2>Specification</h2><img src=/img/open-micropayment_protocol-OuPP-json-spec.png alt=\"railroad diagram of OuP-protocol JSON\"><p>The required properties for every page are:</p><p>Required for all cases that specify 'relative participants'.</p><ul><li><code>\"id-base\"</code> - URL (-prefix) that, combined with an ID, forms an URL uniquely identifying a person or memberwithin that service. Together, the id-base and an relative ID should forma valid URL. If the id-baseis ommitted, every recipient should be a full URL, identifying the recipient.</li></ul><p>Required if scripts are used for fixed-price payments.</p><ul><li><code>\"type\"</code> - The <a href=#types>type</a> of the requested payment or payment, if none is given, \"payment\" will be assumed. Not all systems support multipe payment-types.</li><li><code>\"amount\"</code> - The requested price, if appropriate for the type.</li><li><code>\"currency\"</code> - The currency in which the price is expressed.</li></ul><p>The optional properties for every page are:</p><ul><li><code>\"url\"</code> - The URL identifying the product if it is not the referrer-URL or URL on which the button is placed. Not allowed / ignored for metatag-version of JSON.</li><li><code>\"image\"</code> - The URL or BASE64 encoded content of an image for this product.</li><li><code>\"callback-url\"</code> - The URL that needs to be called back upon initial acceptance of the transaction. This meansthe customer has accepted the terms. The payment-service will HTTP-POST the transaction-JSON. This URL must be on the same domain as the originating payment.</li><li><code>\"confirm-url\"</code> - The URL that needs to be called back upon final completion of the transaction. This means thecustomer has completed the purchase. The payment-service will HTTP-POST the transaction-JSON. This URLmust be on the same domain as the originating payment. The URL must respond by echoing the POST, indicatingit also agrees to the transaction.</li><li><code>\"forward-url\"</code> - The URL that needs to displayed after initially accepting the transaction (e.g. clicking a button). This URL must be on the same domain as the originating payment.</li><li><code>\"participants\"</code> - A JSON-list of one or more participations. Not all payment-processors support multiple participants.<ul><li><code>\"id\"</code> - The ID with which the payment-processor can identify the recipient. Combinedwith the \"id-base\" is forms a valid URL. Most probably to the profile-page of the user. It canalso be a full, valid URL in which case the contents (response) of the URL must be an email address.</li><li><code>\"role\"</code> - Description of the role or part the recipient played in getting this product to you.</li><li><code>\"share\"</code> - Positive integer or percentage. Integer shares of the payment or payment relative to the other shares. '1' will be used as default.</li></ul></li><li><code>\"title\"</code> - Name of the product. The HTML-tag <code>&lt;title&gt;</code> of the page will be used if no name is given.</li><li><code>\"description\"</code> - Description of the product. If not present, the HTML-metatag <code>&lt;meta name=\"description\" content=\"...\" /&gt;</code> of the page will be used. Else the OG:description tag couldbe used as fallback.</li><li><code>\"mimetype\"</code> - The <a href=http://www.iana.org/assignments/media-types/index.html>mime-type</a> of the object the user can buy.</li><li><code>\"comment\"</code> - As it says: comment. Will be ignored though size limits can be imposed.</li></ul><hr><p><a id=ids></a></p><h2>External ID's</h2><p>It is possible to use ID's that do not belong to the service (id-base) indicated. In that case the ID's must be full URL's. The payment service may choose to ignore / reject those or to offer some kindof fail-over / alternative mechanism to try to get the payments to those persons.</p><p>For practical purposes, email- ('mailto:') or Twitter URL's and such are probably most convenientto use as external URL's since it offers a direct mechanismen to contact and verify a recipient.</p><p>Also possible are bitcoin addresses. These offer good anonimity and are directly payable in bitcoin. Also restricted to bitcoins only.</p><p>Below an example of a JSON transaction description with external ID's.</p><pre><code>\r" +
    "\n" +
    "        {\r" +
    "\n" +
    "            \"id-base\" : \"https://mobbr.com/id/\",\r" +
    "\n" +
    "            \"title\" : \"The iPhony4\",\r" +
    "\n" +
    "            \"description\" : \"Article about some fictious planned obscolescence device\",\r" +
    "\n" +
    "            \"participants\" : [\r" +
    "\n" +
    "                {\r" +
    "\n" +
    "                    \"id\": \"Paramatman\",\r" +
    "\n" +
    "                    \"comment\": \"Relative URL, relative to id-base\",\r" +
    "\n" +
    "                    \"role\": \"author\",\r" +
    "\n" +
    "                    \"share\": \"3\"\r" +
    "\n" +
    "                },\r" +
    "\n" +
    "                {\r" +
    "\n" +
    "                    <b>\"id\": \"mailto:patman@zaplog.nl\",</b>\r" +
    "\n" +
    "                    \"comment\" : \"Straight email-address URL\",\r" +
    "\n" +
    "                    \"role\": \"co-author\",\r" +
    "\n" +
    "                    \"share\": \"3\"\r" +
    "\n" +
    "                },\r" +
    "\n" +
    "                {\r" +
    "\n" +
    "                    <b>\"id\": \"http://gravatar.com/patricksavalle\",</b>\r" +
    "\n" +
    "                    \"comment\": \"This is a URL of a person outside the id-base\",\r" +
    "\n" +
    "                    \"role\": \"co-author\",\r" +
    "\n" +
    "                    \"share\": \"1\"\r" +
    "\n" +
    "                },\r" +
    "\n" +
    "                {\r" +
    "\n" +
    "                    <b>\"id\": \"https://twitter.com/#!/mobbrcom\",</b>\r" +
    "\n" +
    "                    \"comment\": \"The twitter-URL of @mobbrcom\",\r" +
    "\n" +
    "                    \"role\": \"co-author\",\r" +
    "\n" +
    "                    \"share\": \"1\"\r" +
    "\n" +
    "                } ,\r" +
    "\n" +
    "                {\r" +
    "\n" +
    "                    <b>\"id\": \"bitcoin:1NS17iag9jJgTHD1VXjvLCEnZuQ3rJED9L\",</b>\r" +
    "\n" +
    "                    \"comment\": \"The bitcoin address to receive payments\",\r" +
    "\n" +
    "                    \"role\": \"co-author\",\r" +
    "\n" +
    "                    \"share\": \"1\"\r" +
    "\n" +
    "                }\r" +
    "\n" +
    "\r" +
    "\n" +
    "            ]\r" +
    "\n" +
    "        }\r" +
    "\n" +
    "    </code></pre><p>How and if such external ID's are handled, is up to the payment-provider.</p></div><p><a href=\"http://validator.w3.org/check?uri=referer\"><img src=http://www.w3.org/Icons/valid-xhtml10 alt=\"Valid XHTML 1.0 Strict\" height=31 width=88></a></p></div></body></html>"
  );


  $templateCache.put('app/views/recover-password.html',
    "<div class=page-header><h1>Recover/Reset password<br><small>To recover your password enter your username or email address</small></h1></div><form ng-submit=recoverPassword() class=form-horizontal><div class=control-group><div class=control-label><label for=username>Username or email</label></div><div class=controls><input ng-model=username_or_email id=username placeholder=\"username or email\" required><button ng-click=recover() ng-disabled=waiting class=btn type=submit><i class=\"icon-white mobbrloader\" ng-show=waiting></i> Recover</button></div></div></form>"
  );


  $templateCache.put('app/views/reset-password.html',
    "<div class=page-header><h1>Welcome to Mobbr<br><small>Choose your password, make it as safe as you can remember</small></h1></div><h6><small>A password must consist of minimal 8 alfanumerical characters (case sensitive).</small></h6><div class=control-group><div class=control-label><label for=new_password>New password</label></div><div class=controls><input ng-model=new_password id=new_password name=new_password type=password required><span ng-show=security.new_password.$error.required class=help-inline>Required field.</span></div></div><div class=control-group><div class=control-label><label for=new_password2>New password again</label></div><div class=controls><input name=new_password2 id=new_password2 ng-model=new_password_control type=password required><span ng-show=security.new_password2.$error.required class=help-inline>Required field.</span></div></div><div class=control-group><div class=controls><button ng-disabled=waiting ng-click=resetPassword() class=\"btn btn-success\"><i class=\"icon-white mobbrloader\" ng-show=waiting></i> Save</button></div></div>"
  );


  $templateCache.put('app/views/settings.html',
    "<tabs><pane heading=\"Account settings\"><form name=changeemail class=form-horizontal novalidate><div class=control-group><div class=control-label><label>Username</label></div><div class=controls><input ng-model=user.username name=username ng-disabled=true></div></div><div class=control-group><div class=control-label><label>E-mail address</label></div><div class=controls><input ng-model=new_email name=email type=email required><span ng-show=\"changeemail.email.$dirty && changeemail.email.$error.required\" class=help-inline>Enter a email address.</span> <span ng-show=\"changeemail.email.$dirty && changeemail.email.$error.email\" class=help-inline>Enter a valid email address.</span></div></div><div class=control-group><div class=controls><button ng-click=submitEmail(changeemail) ng-disabled=\"waitingemail || !changeemail.$valid || user.email == new_email\" type=submit class=\"btn btn-success\"><i class=\"icon-white mobbrloader\" ng-show=waitingemail></i> Change email address</button></div></div></form><form name=changepassword class=form-horizontal novalidate><div class=control-group><div class=control-label><label for=new_password>New password</label></div><div class=controls><input ng-model=new_password id=new_password name=new_password type=password required ng-pattern=\"/^.*(?=.{8,})(?=.*\\d)(?=.*[a-z]).*$/\"><span ng-show=\"changepassword.new_password.$dirty && changepassword.new_password.$error.required\" class=help-inline>Enter a new password</span> <span ng-show=\"changepassword.new_password.$dirty && changepassword.new_password.$error.pattern\" class=help-inline>Minimal 8 charactes, uppercase, lowercase and numbers</span></div></div><div class=control-group><div class=control-label><label for=new_password2>New password again</label></div><div class=controls><input name=new_password2 id=new_password2 ng-model=new_password_control type=password required pw-check=new_password><span ng-show=\"changepassword.new_password2.$dirty && changepassword.new_password2.$error.pwmatch\" class=help-inline>Passwords do not match</span></div></div><div class=control-group><div class=controls><button ng-click=submitPassword(changepassword) ng-disabled=\"!changepassword.$valid || waitingpassword\" type=submit class=\"btn btn-success\"><i class=\"icon-white mobbrloader\" ng-show=waitingpassword></i> Change password</button></div></div></form></pane><pane heading=\"Payment settings\"><form name=security class=form-horizontal><div class=control-group><div class=control-label><label for=bitcoin_address>Bitcoin address</label></div><div class=controls><input ng-model=user.bitcoin_address name=bitcoin_address id=bitcoin_address placeholder=\"bitcoin hash\"></div></div><div class=control-group><div class=controls><button ng-disabled=waitingsettings ng-click=submitSettings() class=\"btn btn-success\"><i class=\"icon-white mobbrloader\" ng-show=waitingsettings></i> Save</button></div></div></form></pane><pane heading=\"Display settings\"><form name=security class=form-horizontal><div class=control-group><div class=control-label><label>Default currency</label></div><div class=controls><select ng-model=user.currency_iso ng-options=\"value as key for (value,key ) in currenciesMap\" name=currency_iso title=\"the currency to which other currencies are converted when displayed\"></select><span class=help-inline></span></div></div><div class=control-group><div class=control-label><label>Language</label></div><div class=controls><select ng-model=user.language_iso ng-options=\"value as key for (value,key ) in languagesMap\" name=language_iso title=\"the available languages\"></select><span class=help-inline></span></div></div><div class=control-group><div class=control-label><label for=timezone>Timezone</label></div><div class=controls><select ng-model=user.timezone name=timezone id=timezone ng-options=\"value as key for (value,key ) in timezones\"></select></div></div><div class=control-group><div class=controls><button ng-disabled=waitingsettings ng-click=submitSettings() class=\"btn btn-success\"><i class=\"icon-white mobbrloader\" ng-show=waitingsettings></i> Save</button></div></div></form></pane><pane heading=\"Privacy settings\" class=privacy-settings><form name=primary class=form-horizontal><div class=\"special well labelwidth pull-left\"></div><div class=control-group ng-repeat=\"(key, value) in user.setting\"><div class=controls><label for={{key}}><input type=checkbox ng-bind=value id={{key}}>{{key}}</label></div></div><div class=control-group><div class=controls><button ng-disabled=waitingsettings ng-click=submitSettings() class=\"btn btn-success\"><i class=\"icon-white mobbrloader\" ng-show=waitingsettings></i> Save</button></div></div></form></pane><pane heading=\"Public profile\"><form user-settings=\"\" name=profile class=form-horizontal><img class=gravatar ng-src={{userSession.user.thumbnail}}> We use gravatars, linked to your email address. Create your profile <a href=http://gravatar.com>here</a></form></pane></tabs>"
  );


  $templateCache.put('app/views/siteconnector.html',
    "<div class=page-header><h1>Connecting your website<br><small>Using your site's usernames in Mobbr scripts.</small></h1></div><p><strong>First make sure your pages have either <a href=/#/buttons>buttons or metadata</a>. Or supply a <a href=/#/buttons#domain>domain script</a>.</strong></p><p>Mobbr has a simple mechanism that allows you to connect your entire weblog, community or site in such a way that you can start receiving payments and share them among all contributors without the neccessity for them to be registered with Mobbr.</p><p><strong>Using this mechanism sites can use their own member names or id's in their scripts.</strong></p><p>You website needs to have a special page / URL that Mobbr can use to resolve your local usernames into email-addresses. Suppose you have a weblog on zaplog.nl, then you could provide an URL like:</p><pre>http://zaplog.nl/id/&lt;local-member-name&gt;</pre><p>The content of this URL should be the email address of your local member. Like this:</p><pre>     REQUEST:\n" +
    "         http://zaplog.nl/id/patrick\n" +
    "\n" +
    "     RESPONSE:\n" +
    "         patman@mobbrr.com</pre><p>If you don't plan to use buttons, but want to rely on the bookmarket or some other tool, you need to place the following script on /PARTICIPATION.TXT, like <a href=http://zaplog.nl/participation.txt>here</a>. This tells our server where to find your special page.</p><pre>[\n" +
    "    {\n" +
    "        url-pattern: \"*\",\n" +
    "        participation-info:\n" +
    "        {\n" +
    "            id-base: \"http://zaplog.nl/id/\",\n" +
    "            description: \"ZapLog - Nederlands beste nieuwssite, Dutch Bloggie winnaar 2008\",\n" +
    "        }\n" +
    "    }\n" +
    "]</pre><h2>Buttons</h2><p>Create or generate your Mobbr scripts using your local member names and use your special URL as \"id-base\". Like this:</p><pre class=prettify>&lt;script src=\"https://{{host}}/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;\n" +
    "mobbr.button({\n" +
    "    <strong>\"id-base\" : \"http://zaplog.nl/id/\"</strong>,\n" +
    "    \"title\" : \"Very special article\",\n" +
    "    \"description\" : \"Article about the Mobbr button\",\n" +
    "    \"participants\" : [\n" +
    "        {\n" +
    "            <strong>\"id\": \"zaplog\"</strong>,\n" +
    "            \"role\": \"platform\",\n" +
    "            \"share\": \"1\"\n" +
    "        },\n" +
    "        {\n" +
    "            <strong>\"id\": \"Patman\"</strong>,\n" +
    "            \"role\": \"webmaster\",\n" +
    "            \"share\": \"1\"\n" +
    "        },\n" +
    "        {\n" +
    "            <strong>\"id\": \"P.Uncia\"</strong>,\n" +
    "            \"role\": \"author\",\n" +
    "            \"share\": \"2\"\n" +
    "        }\n" +
    "    ]\n" +
    "});\n" +
    "&lt;/script&gt;</pre><p>Or this:</p><pre class=prettify>&lt;script src=\"https://{{host}}/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;\n" +
    "mobbr.button({\n" +
    "    \"title\" : \"Very special article\",\n" +
    "    \"description\" : \"Article about the Mobbr button\",\n" +
    "    \"participants\" : [\n" +
    "        {\n" +
    "            <strong>\"id\": \"http://zaplog.nl/id/zaplog\"</strong>,\n" +
    "            \"role\": \"platform\",\n" +
    "            \"share\": \"1\"\n" +
    "        },\n" +
    "        {\n" +
    "            <strong>\"id\": \"http://zaplog.nl/id/Patman\"</strong>,\n" +
    "            \"role\": \"webmaster\",\n" +
    "            \"share\": \"1\"\n" +
    "        },\n" +
    "        {\n" +
    "            <strong>\"id\": \"http://zaplog.nl/id/P.Uncia\"</strong>,\n" +
    "            \"role\": \"author\",\n" +
    "            \"share\": \"2\"\n" +
    "        }\n" +
    "    ]\n" +
    "});\n" +
    "&lt;/script&gt;</pre><p>When someone now uses the Mobbr button, Mobbr will call your special URL 3 times in rapid succession:</p><pre>    http://zaplog.nl/id/zaplog\n" +
    "    http://zaplog.nl/id/patman\n" +
    "    http://zaplog.nl/id/p.uncia</pre><p>Other URL formats are no problem as long as id-base + id form a valid URL, for instance:</p><pre>    http://zaplog.nl?type=id&amp;user=patman</pre><p>If your members are not yet registered with Mobbr, they will receive mail inviting them to register. By registering they automatically claim their payments and will receive all subsequent payments directly into their Mobbr-account. You don't need to change anything on your side (or site).</p><p>Your system will be given 2 seconds and only 3 redirects to reply. So make it quick. Don't be worried about Mobbr overloading your system, we will do some caching / buffering on our side if necessary.</p><p>If your system has throttling or anti-hammering enabled, try to exclude the Mobbr bot from this.</p><h2>Security / privacy</h2><p>To prevent others from accessing your special URL and stealing the email-addresses of your members, protect it by adding the something like the following to your Apache server's <a href=http://httpd.apache.org/docs/2.4/mod/mod_authz_host.html>.htaccess file.</a></p><pre>&lt;Location /zaplog/id/.*$&gt;\n" +
    "Require host mobbr.com\n" +
    "&lt;/Location&gt;</pre><p>Now only the Mobbr-server can access the page. Of course you can use any alternative mechanism. You can also do a referer check. Our calls will always originate from https://mobbr.com.</p><p>You can put the Mobbr payment scripts in metadata, a metalink or a button. See <a href=/#/buttons>here</a> for details, or <a href=/protocol>here</a> for the protocol.</p><h2>Expression Engine example</h2><p>Because you will probably want to integrate the above mechanism into your CMS or publication system, we will give an example. There are many, many CMS-ses and publication systems, but the example for Expression Engine (EE) is representative for a lot of those.</p><p><img src=http://ellislab.com/_user_guide_src_ee/_images/cp_home.png class=thumbnail></p><p>Like many similar blogging systems (Blogger, Drupal, Word Press), EE is template based. For the special URL (in our example: http://zaplog.nl/zaplog/id/) we must create a template. You can do this in <a href=http://ellislab.com/expressionengine/user-guide/cp/design/templates/index.html>the EE backend</a>.</p><p><img src=http://ellislab.com/_user_guide_src_ee/_images/template_new.png alt=\"\"></p><p>The template only needs the following content. It is a tag that generate the email address as page content.</p><pre>{exp:query sql=\"select email from exp_members\n" +
    "where username='{segment_3}'\"}{email}{/exp:query}\n" +
    "</pre><p>Suppose you want to have a button with every article in you weblog and you want to give the platform owner, the webmaster and the author each a fair share. Then you could add a piece of code like this to the template of your articles, it will generate the Mobbr payment description and give the author, the webmaster and the platform owner a share. Place it in the &lt;head&gt; of the HTML. Of course you will have to sue your own usernames and shares, fitted to your situation.</p><pre class=prettify>{exp:query sql=\"select username as authorname from exp_channel_titles where url_title='{segment_3}'\"}\n" +
    "    &lt;meta name=\"participation\" content='\n" +
    "        {\n" +
    "            \"id-base\" : \"http://zaplog.nl/zaplog/id/\",\n" +
    "            \"participants\" : [\n" +
    "                {\n" +
    "                    \"id\": \"Patman\",\n" +
    "                    \"role\": \"Zaplog owner\",\n" +
    "                    \"share\": \"1\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"id\": \"P.Uncia\",\n" +
    "                    \"role\": \"Zaplog webmaster\",\n" +
    "                    \"share\": \"1\"\n" +
    "                },\n" +
    "                {\n" +
    "                    \"id\": \"{authorname}\",\n" +
    "                    \"role\": \"Zaplog article author\",\n" +
    "                    \"share\": \"3\"\n" +
    "                }\n" +
    "            ]\n" +
    "        }\n" +
    "    '/&gt;\n" +
    "{/exp:query}</pre><p>For the button itself you will only need to place the following code in the template of the article:</p><pre class=prettify>&lt;script src=\"https://{{host}}/mobbr-button.js\" type=\"text/javascript\"&gt;&lt;/script&gt;\n" +
    "&lt;script type=\"text/javascript\"&gt;mobbr.button();&lt;/script&gt;</pre>"
  );


  $templateCache.put('app/views/update-email.html',
    "<div class=page-header><h1>Update email address<br><small>We are now updating your email address</small></h1></div>"
  );


  $templateCache.put('app/views/url.html',
    "<div class=page-header><h1>{{payment.meta_data.title}}<br></h1></div><div class=row-fluid><div class=span8><a href={payment.meta_data.url}} ng-show=payment.meta_data.img_url><img ng-src={{payment.meta_data.img_url}}></a><p>{{payment.meta_data.description}}</p></div><div class=\"well special pull-right span4 receipt\"><table class=\"table table-striped\"><thead><th colspan=3>Domain earnings</th></thead><tbody><tr ng-repeat=\"balance in balances\"><td ng-bind=currencyDescription(balance.currency_iso)></td><td ng-bind=balance.currency_iso></td><td ng-bind=\"balance.amount | number:4\" class=\"amount decorate-amount\"></td></tr></tbody></table></div></div><div class=bigbox><tabs><pane heading=\"Currently listed participants\"><people people=payment.meta_data.participants nodatatitle=\"\" persontitle=\"Participant ID\" showamount=false gravatavailable=false ownsearch=true></people></pane><pane heading=\"Payments made to this URL\"><table ng-show=\"personPayments.length > 0\" class=\"table table-striped\"><thead><tr><th>Date</th><th>Senders</th><th>Receivers</th><th colspan=2>Amount</th></tr></thead><tbody><tr ng-repeat=\"pp in personPayments\"><td ng-bind=pp.datetime></td><td><img ng-repeat=\"person in pp.senders\" width=20 ng-src=\"https://secure.gravatar.com/avatar/{{person.gravatar}}?size=20&default=https://mobbr.com/img/default-gravatar.png\" title={{person.username}}></td><td><img ng-repeat=\"person in pp.receivers\" width=20 ng-src=\"https://secure.gravatar.com/avatar/{{person.gravatar}}?size=20&default=https://mobbr.com/img/default-gravatar.png\" title={{person.username}}></td><td ng-bind=pp.currency_iso></td><td ng-bind=\"pp.amount | number:4\" class=\"amount decorate-amount\"></td></tr></tbody></table></pane><pane heading=\"Where payments where made\"><form class=form-inline ng-show=\"locations.length > 0\"><label for=searchEntriesLocations>Search:</label><input class=search-query type=search ng-model=searchentriesLocations id=searchEntriesLocations></form><div class=alert ng-show=\"locations.length == 0\">No referrers found</div><table ng-show=\"locations.length > 0\" class=\"table table-striped\"><thead><tr><th ng-click=\"sortLocations('url')\">Url</th><th></th><th ng-click=\"sortLocations('amount')\">Amount</th></tr></thead><tbody><tr ng-repeat=\"location in locations | orderBy:sortEntriesLocations:sortOrderLocations | filter:searchentriesLocations\"><td><a href={{location.url}} target=_blank>{{location.url}}</a></td><td ng-bind=location.currency_iso></td><td ng-bind=\"location.amount | number:4\" class=\"amount decorate-amount\"></td></tr></tbody></table></pane><pane heading=\"How payments where divided\"><people people=payment.persons nodatatitle=\"\" gravatavailable=true persontitle=Person showamount=true ownsearch=true></people></pane></tabs></div>"
  );


  $templateCache.put('app/views/validator.html',
    ""
  );

}]);
