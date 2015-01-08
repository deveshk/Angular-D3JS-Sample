app.controller('myctrl', ["$scope", "$http", function ($scope, $http) {
        $http.get('app/json/data.json').success(function (data) {
            $scope.data = data;
        })
                .error(function (data) {
                    console.log("Error reading data");
                });
    }]);