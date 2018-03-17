// ----------------------------------------------------------------------------
// Assets Helper, a Javascript Assets Helper library
// Licensed under the MIT license.
// ----------------------------------------------------------------------------
// Copyright (C) Iftekher Sunny < iftekhersunny@hotmail.com >
// ----------------------------------------------------------------------------
(function ($, _, twig) {

    /////////////////////////////////////////////////////////
    //
    // instance of global object
    //
    /////////////////////////////////////////////////////////
    var root = this;

 

    /////////////////////////////////////////////////////////
    //
    // instance of assets object
    //
    /////////////////////////////////////////////////////////
    var Assets = root.Assets || {
        name: "assets-helper",
        version: "0.0.0"
    };



    /////////////////////////////////////////////////////////
    //
    // an array of loaded element
    //
    /////////////////////////////////////////////////////////
    Assets.loadedElement = [];



    /////////////////////////////////////////////////////////
    //
    // init
    //
    /////////////////////////////////////////////////////////
    Assets.init = function() {
        document.createElement("QuixTemplate");
        document.createElement("QuixHtml");
        document.createElement("QuixStyle");
        document.createElement("QuixScript");

        $(function () {
            $("QuixTemplate").css({ display: "none" })
        });
    }



    /////////////////////////////////////////////////////////
    //
    // get html markup by the given template and data
    //
    /////////////////////////////////////////////////////////
    Assets.html = function (templateID, data, htmlRenderId) {
        data = data || {};

        // check QuixHtml tag existence
        if (!$("QuixTemplate" + templateID + " QuixHtml").html()) return;

        var html = twig({
                data: $("QuixTemplate" + templateID + " QuixHtml").html()
            })
            .render(Object.assign(data, { $: $, _: _, Assets: Assets }));

        if (!htmlRenderId) return html;

        $(htmlRenderId).html(html);
    }



    /////////////////////////////////////////////////////////
    //
    // get css rules by the given template and data
    //
    /////////////////////////////////////////////////////////
    Assets.style = function (templateID, data, mountID) {
        data = data || {};

        // check QuixStyle tag existence
        if (!$("QuixTemplate" + templateID + " QuixStyle").html()) return;

        // making inline script content
        var script = twig({
                data: $("QuixTemplate" + templateID + " QuixStyle").html()
            })
            .render(Object.assign(data, { $: $, _: _, Assets: Assets }));

        // loading inline script
        var inlineScript = document.createElement("script");

        inlineScript.innerHTML = script;

        // if script already exists
        // then remove it
        if (mountID) {
            id = mountID.replace("#", "");
            inlineScript.id = id;
        } else {
            id = templateID.replace("#", "");
            inlineScript.id = id;
        }

        $("script#" + id).remove();
        
        document.body.appendChild(inlineScript); 
        
        Assets.load(templateID, mountID);
    }



    /////////////////////////////////////////////////////////
    //
    // loading script by the given template and data
    //
    /////////////////////////////////////////////////////////
    Assets.script = function (templateID, data, mountID) {
        data = data || {};
      
        // check QuixScript tag existence
        if(! $("QuixTemplate" + templateID + " QuixScript").html() ) return;
       
        // making inline script content
        var script = twig({
                data: $("QuixTemplate" + templateID + " QuixScript").html()
            })
            .render(Object.assign(data, { $: $, _: _, Assets: Assets }));

        // getting dependencies
        var filters = $("QuixTemplate" + templateID + " QuixScript").attr('dependencies')
                        ? $("QuixTemplate" + templateID + " QuixScript").attr('dependencies').split(",")
                        : [];

        // loading all dependencies of the inline script                
        if($.inArray(templateID, Assets.loadedElement) == -1) {
            for (key in filters) {
                var scriptTag = document.createElement("script");
				var src = "";
				
				// if quix loaded
                if(window.QUIX_URL) {
                    src = window.QUIX_URL + filters[key].replace(/\s/g, '');
                }

                scriptTag.src = src;
                document.head.appendChild(scriptTag);
            }
        }

        // loading inline script
        var inlineScript = document.createElement("script");
        
        inlineScript.innerHTML = script;

        // if script already exists
        // then remove it
        if(mountID) {
            id = mountID.replace("#", "");
            inlineScript.id = id;
        } else {
            id = templateID.replace("#", "");
            inlineScript.id = id;
        }

        $("script#" + id).remove();

        document.body.appendChild(inlineScript); 

        // saved loaded element
        Assets.loadedElement.push(templateID);
    }



    /////////////////////////////////////////////////////////
    //
    // rendering html template the given templateId and data
    //
    /////////////////////////////////////////////////////////
    Assets.render = function (templateID, data, mountID) {

        if(templateID.indexOf("#") == -1) {
            return twig({
                    data: templateID
                })
                .render(Object.assign(data, { $: $, _: _, Assets: Assets }));
        }

        var html = Assets.html(templateID, data),
            style = Assets.style(templateID, data, mountID),
            id = Math.random().toFixed(4);
       
        var output = "" +
            "<div id='" + templateID + "-" + id + "'>" +
                "<div>" +
                html +
                "</div>" +
            "</div>";

        if(!mountID) return output;    

        // loading style and html    
        $("div"+mountID).html(output);

        // loading script
        Assets.script(templateID, data);
    }



    /////////////////////////////////////////////////////////
    //
    // calling init
    //
    /////////////////////////////////////////////////////////
    Assets.init();



    /////////////////////////////////////////////////////////
    //
    // assigning Assets object to the Global object
    //
    /////////////////////////////////////////////////////////
    return root.Assets = Assets;

}(

    /////////////////////////////////////////////////////////
    //
    // determine jQuery existence
    //
    /////////////////////////////////////////////////////////
    window.$ ? window.$ : window.jQuery ? window.jQuery : undefined,

    /////////////////////////////////////////////////////////
    //
    // determine lodash existence
    //
    /////////////////////////////////////////////////////////
    window._ ? window._ : undefined,

    /////////////////////////////////////////////////////////
    //
    // determine twigjs existence
    //
    /////////////////////////////////////////////////////////
    window.twig ? window.twig : undefined
    ))
