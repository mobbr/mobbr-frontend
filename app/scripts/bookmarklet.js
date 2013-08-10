(function () {

    var api = 'https://api.mobbr.com';
    var s;
    var mobbr_div = document.getElementById('mobbr_div_bookmarklet');
    var html;

    if (typeof mobbr === 'undefined') {
        s = document.createElement('script');
        s.setAttribute('src', 'https://mobbr.com/mobbr-button.js');
        document.body.appendChild(s);
    }

    if (!mobbr_div) {

        mobbr_div = document.createElement('div');
        mobbr_div.id = "mobbr_div_bookmarklet";
        mobbr_div.style.cssText = 'opacity: 0.95; filter: alpha(opacity=95); display: none; position: fixed; border: 4px solid #999; background: none repeat scroll 0% 0% #fff; top: 8px; right: 8px; padding:15px 0px 0px 0px; width: 492px; height: 338px; z-index: 2147483647; border-radius: 10px; -moz-border-radius: 15px; -webkit-border-radius: 15px; -khtml-border-radius: 15px; behavior: url(/style/css/border-radius.htc); /* IE hack */';
        html = '<form id="mobbr_form_bookmarklet" action="'+api+'/gateway/" method="POST" target="mobbr_frame_bookmarklet" onsubmit="return false;" style="display: none;"><input id="bookmarklet_refuri" type="hidden" name="ref_uri" value="" /><input id="bookmarklet_data" type="hidden" name="data" value="" /></form>';
        html += '<a href="#" onclick="this.parentNode.style.display=\'none\'"; return false;" style="float:right; position:relative; top:-17px; right:5px; text-decoration:none; font-size:7pt; color:black;font-family: Arial, Helvetica, sans-serif;">close window <img style="position:relative;top:5px;" src="'+api+'/images/frame_closebutton.png"/></a><iframe id="mobbr_frame_bookmarklet" name="mobbr_frame_bookmarklet" style="position:relative; top:-10px; opacity:1;filter:alpha(opacity=100); width: 100%; height: 315px; padding:0; margin:0;" frameborder="0"></iframe>';
        mobbr_div.innerHTML = html;
        document.body.appendChild(mobbr_div);
    }

    document.getElementById("bookmarklet_refuri").value = document.location.href;
    document.getElementById("bookmarklet_data").value = '{"url":"'+document.location.href+'"}';
    document.getElementById("mobbr_div_bookmarklet").style.display = "block";
    document.getElementById("mobbr_form_bookmarklet").submit();
})();



