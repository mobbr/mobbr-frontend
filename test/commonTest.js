'use strict';

// Common mocks

angular.module('mobbrApi')
    .service('commonTest', function (mobbrConfig) {
        return {
            baseUrl : mobbrConfig.url,
            ping: function (httpBackend) {
                httpBackend.expectGET(mobbrConfig.url + 'user/ping').respond(200, {message: 'ok'});
            },
            response: {message: 'ok', result: {token: '1'}},
            oAuthProviders : [
                {'host': 'bitbucket.com', 'provider': 'bitbucket', 'favicon': '', 'icon': ''},
                {'host': 'github.com', 'provider': 'github', 'favicon': 'https://github.com/favicon.ico', 'icon': 'https://github.com/apple-touch-icon.png'},
                {'host': 'soundcloud.com', 'provider': 'soundcloud', 'icon': ''},
                {'host': 'stackoverflow.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/stackoverflow/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/stackoverflow/img/apple-touch-icon.png'},
                {'host': 'serverfault.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/serverfault/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/serverfault/img/apple-touch-icon.png'},
                {'host': 'superuser.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/superuser/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/superuser/img/apple-touch-icon.png'},
                {'host': 'meta.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/stackexchangemeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/stackexchangemeta/img/apple-touch-icon.png'},
                {'host': 'webapps.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/webapps/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/webapps/img/apple-touch-icon.png'},
                {'host': 'meta.webapps.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/webappsmeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/webappsmeta/img/apple-touch-icon.png'},
                {'host': 'gaming.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/gaming/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/gaming/img/apple-touch-icon.png'},
                {'host': 'meta.gaming.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/gamingmeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/gamingmeta/img/apple-touch-icon.png'},
                {'host': 'webmasters.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/webmasters/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/webmasters/img/apple-touch-icon.png'},
                {'host': 'meta.webmasters.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/webmastersmeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/webmastersmeta/img/apple-touch-icon.png'},
                {'host': 'cooking.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/cooking/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/cooking/img/apple-touch-icon.png'},
                {'host': 'meta.cooking.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/cookingmeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/cookingmeta/img/apple-touch-icon.png'},
                {'host': 'gamedev.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/gamedev/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/gamedev/img/apple-touch-icon.png'},
                {'host': 'meta.gamedev.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/gamedevmeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/gamedevmeta/img/apple-touch-icon.png'},
                {'host': 'photo.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/photo/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/photo/img/apple-touch-icon.png'},
                {'host': 'meta.photo.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/photometa/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/photometa/img/apple-touch-icon.png'},
                {'host': 'stats.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/stats/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/stats/img/apple-touch-icon.png'},
                {'host': 'meta.stats.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/statsmeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/statsmeta/img/apple-touch-icon.png'},
                {'host': 'math.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/math/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/math/img/apple-touch-icon.png'},
                {'host': 'meta.math.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/mathmeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/mathmeta/img/apple-touch-icon.png'},
                {'host': 'diy.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/diy/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/diy/img/apple-touch-icon.png'},
                {'host': 'meta.diy.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/diymeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/diymeta/img/apple-touch-icon.png'},
                {'host': 'meta.superuser.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/superusermeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/superusermeta/img/apple-touch-icon.png'},
                {'host': 'meta.serverfault.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/serverfaultmeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/serverfaultmeta/img/apple-touch-icon.png'},
                {'host': 'gis.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/gis/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/gis/img/apple-touch-icon.png'},
                {'host': 'meta.gis.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/gismeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/gismeta/img/apple-touch-icon.png'},
                {'host': 'tex.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/tex/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/tex/img/apple-touch-icon.png'},
                {'host': 'meta.tex.stackexchange.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/texmeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/texmeta/img/apple-touch-icon.png'},
                {'host': 'askubuntu.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/askubuntu/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/askubuntu/img/apple-touch-icon.png'},
                {'host': 'meta.askubuntu.com', 'provider': 'stackexchange', 'favicon': 'http://cdn.sstatic.net/askubuntumeta/img/favicon.ico', 'icon': 'http://cdn.sstatic.net/askubuntumeta/img/apple-touch-icon.png'},
                {'host': 'vimeo.com', 'provider': 'vimeo', 'favicon': '', 'icon': ''}
            ]


        };
    });
