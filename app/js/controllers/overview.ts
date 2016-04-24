///<reference path="../services/helper.ts" />
module AngularTSApp.controllers {

    interface IOverviewScope extends ng.IScope {
        name: string;
        capitalizeFirstLetter: AngularTSApp.values.ICapitalizeFirstLetter;
    }

    export class OverviewController {
        scope: IOverviewScope  

        static $inject = ['$scope','AngularTSApp.values.capitalizeFirstLetter'];
        constructor($scope: IOverviewScope, capitalizeFirstLetter: AngularTSApp.values.ICapitalizeFirstLetter) {
            this.scope = $scope;
            this.scope.capitalizeFirstLetter = capitalizeFirstLetter;
        }

    }

    angular.module('AngularTSApp').controller('AngularTSApp.controllers.OverviewController', OverviewController);
}