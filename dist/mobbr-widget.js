var scripts = document.getElementsByTagName("script");
var thisScript =  scripts[ scripts.length - 1 ];
var arguments = thisScript.innerHTML.split(',');
var widgetName = arguments[0];
var title = arguments[1];

createWidget(widgetName, title);

function createWidget(widgetName, title) {

  var baseUrl = 'https://mobbr.com/widget/#/'
  //var baseUrl = 'http://mobbr-www.dev.handijk.nl:9000/#/'
  var div = document.createElement('div');
  div.setAttribute('id', 'mobbr_div');
  div.setAttribute('name', 'mobbr_div');
  div.style.cssText = 'width: 492px; height: 338px; z-index: 2147483647;';

  var mobbrFrame = document.createElement('iframe');
  mobbrFrame.setAttribute('name', 'mobbr_frame');
  mobbrFrame.setAttribute('frameborder', '0');

  mobbrFrame.src = baseUrl + widgetName;

  if (title) {
    mobbrFrame.src = mobbrFrame.src + '?title=' + title;
  }

  mobbrFrame.style.cssText = 'width: 492px; height: 338px; border-radius: 4px; border: solid 1px #e3e3e3;';

  div.appendChild(mobbrFrame);

  thisScript.parentNode.insertBefore(div, thisScript);
}
