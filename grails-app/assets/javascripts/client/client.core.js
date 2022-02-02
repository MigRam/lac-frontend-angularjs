//= wrapped

// Angular Dependencies
//= require /angular/angular
//= require /angular/angular-storage
//= require /angular/angular-ui-router
//= require /angular/angular-sanitize
//= require /angular/angular-cookies
//= require /angular/angular-resource
//= require /angular/angular-animate.min
//= require /angular/angular-aria.min
//= require /angular/angular-messages.min
//= require /angular/angular-material
//= require /angular/angular-resource

// third party libraries
//= require /underscore/underscore
//= require /rxjs/rx-all
//= require /rxjs/rx-angular
//= require /leaflet/leaflet
//= require /leaflet/angular-leaflet-directive
//= require /leaflet/leaflet.markercluster
//= require /angular/clipboard.min
//= require /angular/ngclipboard.min
//= require /angular/dirPagination
//= require /angular/ng-text-truncate

//= require_self
//= require_tree services
//= require_tree components
//= require_tree directives
//= require_tree domain
//= require_tree templates

angular
    .module("client.core", [
        "ui.router",
        "ngSanitize",
        "ngCookies",
        "leaflet-directive",
        "ngclipboard",
        "angularUtils.directives.dirPagination",
        "ngResource",
        "ngStorage",
        "ngTextTruncate",
        "rx",
        "ngMaterial",
        "ngMessages"
    ])
    .constant('urls', {
        CLIENT_ID: 'APP-RF247QTDN0JLF4I6',
        CLIENT_SECRET: '1766cae2-1237-4819-b313-81bcc5e1cfd9',
        AUTH: 'https://orcid.org/oauth/authorize',
        AUTH_EXCHANGE: 'https://orcid.org/oauth/token',
        GRAILS_DEV: 'https://grails-dev.rrz.uni-koeln.de/ka3',
        REDIRECT_URI: 'https://grails-dev.rrz.uni-koeln.de/ka3/login',
        SERVER_DEV: 'https://grails-dev.rrz.uni-koeln.de/ka3-a5-core/api/',
        SERVER_PROD: 'https://grails-prod.rrz.uni-koeln.de/ka3-a5-core/api/'
    })
    .config(function(paginationTemplateProvider) {
        paginationTemplateProvider.setPath("/client/shared/pagination.html");
    });
