// ----------------------------------------------------------------------------
// Assets Helper, a Javascript Assets Helper library
// Licensed under the MIT license.
// ----------------------------------------------------------------------------
// Copyright (C) Iftekher Sunny < iftekhersunny@hotmail.com >
// ----------------------------------------------------------------------------
(function (_) {


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
    // getting image url
    //
    /////////////////////////////////////////////////////////
    Assets.image = function(path) {
        var hostname = root.location.hostname,
            port = root.location.port == 80 ? "" : ":" + root.location.port,
            protocol = root.location.protocol,
            protocols = ['http', 'https', '//'];

        
        for(key in protocols) {
            if (path.indexOf(protocols[key]) != -1) return path;
        }

       return protocol + "//" + hostname + port + "/" + path;   
    }



    /////////////////////////////////////////////////////////
    //
    // assigning Assets object to the Global object
    //
    /////////////////////////////////////////////////////////
    return root.Assets = Assets;

}())