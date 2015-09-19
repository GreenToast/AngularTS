/// <reference path="../../../typings/jquery/jquery.d.ts" />
///<reference path="../../../typings/angularjs/angular.d.ts" />
///<reference path="../../../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../app.ts" />

//helperFunctions

module AngularTSApp.values {
    export interface ICapitalizeFirstLetter {
        (element: string): string
    }


    function capitalizeFirstLetter
        (element: string): string{
            if(element) {
                return element.charAt(0).toUpperCase() + element.slice(1);
            }
            else {
                return '';
        }
    }

    angular.module('AngularTSApp').value('AngularTSApp.values.capitalizeFirstLetter', capitalizeFirstLetter);
}


