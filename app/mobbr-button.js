/*
 mobbbr::javascript.js
 2012-04-12

 Javascript needed to place the Mobbr-button on your site.
 For usage see: https://mobbr.com/#/buttons
 For specification see: https://mobbr.com/protocol
 */
var mobbr = mobbr || (function() {
    var api_url = 'https://api.mobbr.com';
    var ui_url  = 'https://mobbr.com';
    var mobbrDiv = createMobbrDiv();
    var mobbrFrame;
    var buttons_shown = 0;
    var mobbr_object = new mobbrObject();
    var originalHref = window.location.href;
    var originalHash = window.location.hash;

    function createMobbrDiv() {
        var div = document.createElement('div');
        div.setAttribute('id', 'mobbr_div');
        div.setAttribute('name', 'mobbr_div');
        div.style.cssText = 'opacity:0.95;filter:alpha(opacity=95); display:none; position: fixed; border: 4px solid #999; background: none repeat scroll 0% 0% #fff; top: 8px; right: 8px; padding:15px 0px 0px 0px; width: 492px; height: 338px; z-index: 2147483647; border-radius: 10px; -moz-border-radius: 15px; -webkit-border-radius: 15px; -khtml-border-radius: 15px;';

        var a = document.createElement('a');
        a.style.cssText = 'float:right; position:relative; top:-17px; right:5px; text-decoration:none; font-size:7pt; color:black;font-family: Arial, Helvetica, sans-serif;';
        a.setAttribute('onclick', 'javascript:mobbr.hide_mobbr_div();');
        a.innetText = '[close window] ';

        var img = document.createElement('img');
        img.style.cssText = 'position:relative;top:5px;width: 24px;height: 24px';
        img.src = 'https://mobbr.com/images/frame_closebutton.png';
        img.alt = 'Close button';

        mobbrFrame = document.createElement('iframe');
        mobbrFrame.setAttribute('name', 'mobbr_frame');
        mobbrFrame.setAttribute('frameborder', '0');
        mobbrFrame.style.cssText = 'position:relative;top:-10px;left:0;right:0;bottom:0;opacity:1;filter:alpha(opacity=100); width: 100%; height: 315px; padding:0; margin:0;';
        mobbrFrame.src = 'http://mobbr.dev:9000/lightbox/#/';

        mobbrFrame.onload = function() {
            //mobbrFrame.src = 'http://www.mobbr.com/lightbox/#/';
            /*if (mobbrFrame.src == 'undefined') {
                mobbrFrame.src = 'https://mobbr.com/loader';
            }*/
        }

        a.appendChild(img);
        div.appendChild(a);
        div.appendChild(mobbrFrame);

        return div;
    }

    function is_hash(str)
    {
        var reg = /^[a-fA-F0-9]{32}$/;
        if (typeof(str)!='string') return false;
        if (reg.test(str)) return true;
        return false;
    }

    function is_url(str)
    {
        var reg = /^https?:\/\/.*/;
        if (typeof(str)!='string') return false;
        if (reg.test(str)) return true;
        return false;
    }

    function mobbrObject()
    {
        this.incrementButtonsShown = function()
        {
            buttons_shown++;
            return buttons_shown;
        }

        this.drawButton = function(data, button_type, target, position)
        {
            var buttonTypes=["slim","icon","flat","small","large","medium","icongs","flatgs","smallgs","largegs","mediumgs"];
            if (!in_array(button_type, buttonTypes)) button_type = 'medium';

            var buttonSizes={
                "slim" : {"width" : 110, "height" : 20},
                "icon" : {"width" : 16, "height" : 16},
                "flat" : {"width" : 120, "height" : 21},
                "small" : {"width" : 32, "height" : 32},
                "large" : {"width" : 64, "height" : 64},
                "medium" : {"width" : 50, "height" : 60},
                "icongs" : {"width" : 16, "height" : 16},
                "flatgs" : {"width" : 120, "height" : 21},
                "smallgs" : {"width" : 32, "height" : 32},
                "largegs" : {"width" : 64, "height" : 64},
                "mediumgs" : {"width" : 50, "height" : 60}
            };
            var button_size = buttonSizes[button_type];

            var md5_hash = '';
            if (is_url(data[0]))
            {
                md5_hash = hex_md5(data[0].replace(/\/$/, ""));
            }
            else
            {
                md5_hash = hex_md5(data[0].url.replace(/\/$/, ""));
            }
            var full_image_url = api_url + '/button/' + md5_hash + '/' + button_type;
            this.incrementButtonsShown();

            // Create a temporary form to commit to the iframe
            //var mobbr_frm = this.createMobbrForm();
            //document.body.appendChild(mobbr_frm);
            //this.addFormElement(mobbr_frm, "ref_uri", document.location.href.replace(/\/$/, ""));
            //this.addFormElement(mobbr_frm, "using_lightbox", "true");
            //this.addFormElement(mobbr_frm, "data", "");

            // Add the Mobbr button
            var img = document.createElement('img');
            img.style.cssText = 'cursor: pointer; cursor: hand; width: '+button_size.width+'px !important; height: '+button_size.height+'px !important';
            img.className = 'mobbr_button';
            //img.setAttribute('onclick', 'mobbr.show_mobbr_div(' + buttons_shown + '); return false;');
            img.onclick = function () {
                mobbr.show_mobbr_div(buttons_shown, data);
                return false;
            }
            img.src = full_image_url;
            img.alt = 'Mobbr button';
            img.title = 'Click to see payment info';

            if (typeof(target) != 'undefined') {
                var target_obj = target;
                if (typeof(target) == 'string') {
                    target_obj = document.getElementById(target);
                }
                switch(position) {
                    case 'before':
                        target_obj.parentNode.insertBefore(img, target_obj);
                        break;
                    case 'replace':
                        target_obj.parentNode.replaceChild(img, target_obj);
                        break;
                    case 'append':
                    default:
                        target_obj.appendChild(img);
                        break;
                }
            } else {
                // Add it next to the last script tag (should be current script tag in most cases)
                var scripts = document.getElementsByTagName('script');
                var this_script = scripts[scripts.length - 1];
                this_script.parentNode.insertBefore(img, this_script);
            }

            if (buttons_shown == 1) // only insert iframe for first button
            {
                document.body.appendChild(mobbrDiv);
            }
        }

        this.showButton = function(data, button_type)
        {
            var url = '';
            if (is_url(data[0]))
            {
                url = data[0];
            }
            else if (data[0] && data[0].url)
            {
                url = data[0].url;
            }
            if (url=='')
            {
                var links = document.getElementsByTagName("link");
                for (var i = 0; i < links.length; i ++)
                {
                    if (links[i].getAttribute("rel").toLowerCase().replace(/^\s+|\s+$/g,"") === "canonical")
                    {
                        url = links[i].getAttribute("href").replace(/^\s+|\s+$/g,"").replace(/\/$/, "");
                        break;
                    }
                }
            }
            if (url=='')
            {
                var metas = document.getElementsByTagName("meta");
                for (var i = 0; i < metas.length; i ++)
                {
                    if (metas[i].getAttribute("property").toLowerCase().replace(/^\s+|\s+$/g,'') === "og:url")
                    {
                        url = metas[i].getAttribute("content").replace(/^\s+|\s+$/g,'').replace(/\/$/, "");
                        break;
                    }
                }
            }
            if (!data[0])
            {
                data[0] = url;
            }
            if (is_url(data[0]))
            {
                var draw_array = [ ];
                draw_array[0] = data[0];
                this.drawButton(draw_array, button_type, data[1], data[2]);
                //var mobbr_frm = document.getElementById('mobbr_frm_' + buttons_shown);
                //mobbr_frm.data.value = '{"url":"'+data[0]+'"}';
            }
            else
            {
                if(!data[0].url) data[0].url = url;
                var string_data = JSON.stringify(data[0]);
                this.drawButton(data, button_type, data[1], data[2]);
                //var mobbr_frm = document.getElementById('mobbr_frm_' + buttons_shown);
                //if (mobbr_frm && mobbr_frm.data) mobbr_frm.data.value = string_data;
            }
        }

        /*this.createMobbrForm = function()
        {
            var mobbr_frm = document.createElement("form");
            mobbr_frm.method = "POST";
            mobbr_frm.id = "mobbr_frm_" + buttons_shown;
            mobbr_frm.target = "mobbr_frame";
            mobbr_frm.action = api + "/gateway/";
            mobbr_frm.onsubmit = "return false;";
            mobbr_frm.style.display = "none";
            return mobbr_frm;
        }*/

        //helper function to add elements to the form
        this.addFormElement = function(inputForm, elementName, elementValue)
        {
            var newElement = document.createElement("input");
            newElement.type = "hidden";
            newElement.name = elementName;
            newElement.value = elementValue;
            inputForm.appendChild(newElement);
            return newElement;
        }

    }


    function in_array(obj, array) {
        var i = array.length;
        while (i--) {
            if (array[i] === obj) {
                return true;
            }
        }
        return false;
    }

    /* Minified version of http://www.JSON.org/json2.js */
    var JSON;if(!JSON){JSON={};}
    (function(){"use strict";function f(n){return n<10?'0'+n:n;}
        if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
            f(this.getUTCMonth()+1)+'-'+
            f(this.getUTCDate())+'T'+
            f(this.getUTCHours())+':'+
            f(this.getUTCMinutes())+':'+
            f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
        var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
        function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
            if(typeof rep==='function'){value=rep.call(holder,key,value);}
            switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
                gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
                    v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
                if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
                v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
        if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
            rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
            return str('',{'':value});};}
        if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
            return reviver.call(holder,key,value);}
            text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
                ('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
            if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
            throw new SyntaxError('JSON.parse');};}}());

    /* Minified version of http://pajhome.org.uk/crypt/md5 */
    var hexcase=0;var b64pad="";function hex_md5(s){return rstr2hex(rstr_md5(str2rstr_utf8(s)));}
    function b64_md5(s){return rstr2b64(rstr_md5(str2rstr_utf8(s)));}
    function any_md5(s,e){return rstr2any(rstr_md5(str2rstr_utf8(s)),e);}
    function hex_hmac_md5(k,d)
    {return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)));}
    function b64_hmac_md5(k,d)
    {return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)));}
    function any_hmac_md5(k,d,e)
    {return rstr2any(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)),e);}
    function md5_vm_test()
    {return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72";}
    function rstr_md5(s)
    {return binl2rstr(binl_md5(rstr2binl(s),s.length*8));}
    function rstr_hmac_md5(key,data)
    {var bkey=rstr2binl(key);if(bkey.length>16)bkey=binl_md5(bkey,key.length*8);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++)
    {ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}
        var hash=binl_md5(ipad.concat(rstr2binl(data)),512+data.length*8);return binl2rstr(binl_md5(opad.concat(hash),512+128));}
    function rstr2hex(input)
    {try{hexcase}catch(e){hexcase=0;}
        var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var output="";var x;for(var i=0;i<input.length;i++)
    {x=input.charCodeAt(i);output+=hex_tab.charAt((x>>>4)&0x0F)
        +hex_tab.charAt(x&0x0F);}
        return output;}
    function rstr2b64(input)
    {try{b64pad}catch(e){b64pad='';}
        var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var output="";var len=input.length;for(var i=0;i<len;i+=3)
    {var triplet=(input.charCodeAt(i)<<16)|(i+1<len?input.charCodeAt(i+1)<<8:0)|(i+2<len?input.charCodeAt(i+2):0);for(var j=0;j<4;j++)
    {if(i*8+j*6>input.length*8)output+=b64pad;else output+=tab.charAt((triplet>>>6*(3-j))&0x3F);}}
        return output;}
    function rstr2any(input,encoding)
    {var divisor=encoding.length;var i,j,q,x,quotient;var dividend=Array(Math.ceil(input.length/2));for(i=0;i<dividend.length;i++)
    {dividend[i]=(input.charCodeAt(i*2)<<8)|input.charCodeAt(i*2+1);}
        var full_length=Math.ceil(input.length*8/(Math.log(encoding.length)/Math.log(2)));var remainders=Array(full_length);for(j=0;j<full_length;j++)
    {quotient=Array();x=0;for(i=0;i<dividend.length;i++)
    {x=(x<<16)+dividend[i];q=Math.floor(x/divisor);x-=q*divisor;if(quotient.length>0||q>0)
        quotient[quotient.length]=q;}
        remainders[j]=x;dividend=quotient;}
        var output="";for(i=remainders.length-1;i>=0;i--)
        output+=encoding.charAt(remainders[i]);return output;}
    function str2rstr_utf8(input)
    {var output="";var i=-1;var x,y;while(++i<input.length)
    {x=input.charCodeAt(i);y=i+1<input.length?input.charCodeAt(i+1):0;if(0xD800<=x&&x<=0xDBFF&&0xDC00<=y&&y<=0xDFFF)
    {x=0x10000+((x&0x03FF)<<10)+(y&0x03FF);i++;}
        if(x<=0x7F)
            output+=String.fromCharCode(x);else if(x<=0x7FF)
            output+=String.fromCharCode(0xC0|((x>>>6)&0x1F),0x80|(x&0x3F));else if(x<=0xFFFF)
            output+=String.fromCharCode(0xE0|((x>>>12)&0x0F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));else if(x<=0x1FFFFF)
            output+=String.fromCharCode(0xF0|((x>>>18)&0x07),0x80|((x>>>12)&0x3F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));}
        return output;}
    function str2rstr_utf16le(input)
    {var output="";for(var i=0;i<input.length;i++)
        output+=String.fromCharCode(input.charCodeAt(i)&0xFF,(input.charCodeAt(i)>>>8)&0xFF);return output;}
    function str2rstr_utf16be(input)
    {var output="";for(var i=0;i<input.length;i++)
        output+=String.fromCharCode((input.charCodeAt(i)>>>8)&0xFF,input.charCodeAt(i)&0xFF);return output;}
    function rstr2binl(input)
    {var output=Array(input.length>>2);for(var i=0;i<output.length;i++)
        output[i]=0;for(var i=0;i<input.length*8;i+=8)
        output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(i%32);return output;}
    function binl2rstr(input)
    {var output="";for(var i=0;i<input.length*32;i+=8)
        output+=String.fromCharCode((input[i>>5]>>>(i%32))&0xFF);return output;}
    function binl_md5(x,len)
    {x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16)
    {var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}
        return Array(a,b,c,d);}
    function md5_cmn(q,a,b,x,s,t)
    {return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}
    function md5_ff(a,b,c,d,x,s,t)
    {return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}
    function md5_gg(a,b,c,d,x,s,t)
    {return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}
    function md5_hh(a,b,c,d,x,s,t)
    {return md5_cmn(b^c^d,a,b,x,s,t);}
    function md5_ii(a,b,c,d,x,s,t)
    {return md5_cmn(c^(b|(~d)),a,b,x,s,t);}
    function safe_add(x,y)
    {var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}
    function bit_rol(num,cnt)
    {return(num<<cnt)|(num>>>(32-cnt));}

    return { // public interface

        button: function() { mobbr_object.showButton(arguments, 'medium'); },
        buttonFlat: function() { mobbr_object.showButton(arguments, 'flat'); },
        buttonSmall: function() { mobbr_object.showButton(arguments, 'small'); },
        buttonLarge: function() { mobbr_object.showButton(arguments, 'large'); },
        buttonMedium: function() { mobbr_object.showButton(arguments, 'medium'); },
        buttonFlatGS: function() { mobbr_object.showButton(arguments, 'flatgs'); },
        buttonSmallGS: function() { mobbr_object.showButton(arguments, 'smallgs'); },
        buttonLargeGS: function() { mobbr_object.showButton(arguments, 'largegs'); },
        buttonMediumGS: function() { mobbr_object.showButton(arguments, 'mediumgs'); },
        buttonSlim: function() { mobbr_object.showButton(arguments, 'slim'); },
        buttonIcon: function() { mobbr_object.showButton(arguments, 'icon'); },

        incrementButtonsShown: function()
        {
            return mobbr_object.incrementButtonsShown();
        },

        show_mobbr_div_for_form: function(form_name, data)
        {
            mobbrDiv.style.display = 'block';
            var r = new XMLHttpRequest();
            r.open('POST', api_url + '/api/gateway/analyze_payment', true);
            r.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            r.onreadystatechange = function () {
                if (r.readyState != 4 || r.status != 200) return;
                var jsonResponse = JSON.parse(r.responseText);
                mobbrFrame.src = ui_url + '/lightbox/#/?hash=' + jsonResponse.result;
            };
            r.send(JSON.stringify({ data: data[0] }));
        },

        show_mobbr_div: function(counter, data)
        {
            this.show_mobbr_div_for_form('mobbr_frm_' + counter, data);
        },

        hide_mobbr_div: function()
        {
            mobbrDiv.style.display = 'none';
            /*if (window.location.hash == '#mobbrdone') {
                if (typeof originalHash == 'undefined') delete window.location.hash;
                else window.location.hash = originalHash;
                window.location.href = originalHref;
                //window.location.reload();
            }*/
        },

        getMobbrDiv: function()
        {
            return mobbrDiv;
        }

    };
})();
