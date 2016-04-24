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


