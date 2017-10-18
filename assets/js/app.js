var SERVER_PATH = 'http://localhost:8080/mydash/server/';

var app = angular.module('mydash', ['ui.router'])
    

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/Machine");
    $stateProvider        
        .state('menu', {
        
          templateUrl: "pages/partials/sidebar.html",
          controller: "menuCtrl"
        })          
        .state('menu.home_machine', {
          url: "/Machine",
          templateUrl: "pages/home_machine.html",
          controller: "homeCtrl"
        });
})

app.service("toast", function () {

    this.showToast = function(message, color, time = 1500){

        toastr.options = {
          "newestOnTop": true,
          "positionClass": "toast-top-right",
          "timeOut": time,
          "tapToDismiss": true
        }

        switch(color){
            case 'success':
                toastr.success(message);
                break;
            case 'warning':
                toastr.warning(message);        
                break;
            case 'error':
                toastr.error(message);
                break;
            default:
                toastr.info(message);
        }

    }

});

// app.service("date", function () {

//     this.today = new Date();
//     this.dd = this.today.getDate();
//     this.mm = this.today.getMonth()+1;
//     this.yyyy = this.today.getFullYear();

//     this.dd = this.dd < 10 ? '0' + this.dd : this.dd;
//     this.mm = this.mm < 10 ? '0' + this.mm : this.mm;


//     this.getToday = function(){
//         return this.dd + '/' + this.mm + '/' + this.yyyy;
//     };
// });

app.service("route", function ($rootScope, $location, $state, $stateParams) {

    $rootScope.loading = true;

    this.reloadPage = function(){
        $state.reload();
        $rootScope.loading = false;
    };
    
    this.goRota = function(rota){   
        if (rota) {
            $state.go(rota);    
        }
        $rootScope.loading = false;
    };    

    this.back = function(){        
        window.history.back();
        $rootScope.loading = false;
    };

});    

app.factory('daoFactory', function ($http) {
    return {
        dao: function(tipo, classe, funcao, dados, order, start, limit){         
            switch(tipo){        
                case 'get':                              
                    return $http.get(SERVER_PATH + "redirect.php?classe=classe&funcao=funcao"); 
                break;

                case 'post':
                    return 
                        $http.post(SERVER_PATH + "redirect.php?classe=classe&funcao=funcao", {
                            dados: dados
                        }); 
                break;

                default:
                    console.log("Sem tipo APP.js");
                break;
            }                 
        }
    }
});

app.run(function($rootScope) {
    
    // $rootScope.loading = true;

    // empresaProvider.getConfiguracoes().then(function(data){
    //     $rootScope.empresa = data.data;
    //     $rootScope.loading = false;
    // });

    // user.verificaUser();
});

app.controller("menuCtrl", ['$scope', '$http', '$rootScope','route','toast','$location', function ($s, $http, $rs, route, toast, $location) {
   
}]);


app.controller("homeCtrl", ['$scope', '$http', '$rootScope','route','toast', '$location', 'daoFactory', function ($s, $http, $rs, route, toast, $location, daoFactory) {
    $s.teste = "AQUIE";
    console.log("CHEGUEI TIO");

    daoFactory.dao('get', 'classe1', 'funcao1', 'dados', 'ASC', '0', '10');
}]);

