///<reference path="../../typings/browser.d.ts" />

//using Route

module AngularTSApp {
    'use strict';

    export class Routes {
        static $inject = ["$routeProvider", "$locationProvider"];
        static configureRoutes($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {

            //use locationProvider with != for SEO and Deeplinking support
            $locationProvider.html5Mode(false);
            $locationProvider.hashPrefix("!");

            //define routings
            $routeProvider.when('/', { templateUrl: '../templates/overview.html' })
                .otherwise({ redirectTo: '/' }); //Default
        }
    }

   /* export class AppBuilder {


        app: ng.IModule;

        constructor(name: string) {
            this.app = angular.module(name, [
                "ngRoute",
            ]);
        }

        public start() {
            $(document).ready(() => {
                console.log("booting " + this.app.name);
                angular.bootstrap(document, [this.app.name]);
            });
        }
    }*/

    var app = angular.module('AngularTSApp', ['ngRoute']);
    app.config(AngularTSApp.Routes.configureRoutes);
}
/*
((): void=> {
    var app = angular.module('AngularTSApp', ['ngRoute']);
    app.config(AngularTSApp.Routes.configureRoutes);
})() */