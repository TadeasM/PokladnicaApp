warchalPokladna.controller('homeController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',
    function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);
        $scope.costTable = true;
        $scope.moneyTable = false;
        $scope.postSelectShow = false;
        $scope.cashMin = false;
        $("#success-alert-home").hide();
        $("#success-alert-cost").hide();

        // HOME
        auth.$onAuth(function(authUser) {
            if (authUser) {
                var penizeRef = new Firebase(FIREBASE_URL + '/penize');
                var penizeInfo = $firebaseArray(penizeRef);
                var nakladyRef = new Firebase(FIREBASE_URL + '/naklady');
                var nakladyInfo = $firebaseArray(nakladyRef);
                var reclamationsRef = new Firebase(FIREBASE_URL + '/reclamations');
                var reclamationsInfo = $firebaseArray(reclamationsRef);
                var returnRef = new Firebase(FIREBASE_URL + '/returnitems');
                var returnInfo = $firebaseArray(returnRef);
                var totalMoney;
                var costsTotal;
                var disponible;

                $scope.penize = penizeInfo;
                $scope.dt = new Date();

                // Count added money
                komplet = function() {
                    var total = 0;
                    for (var i = 0, _len = penizeInfo.length; i < _len; i++) {
                        total += penizeInfo[i].sum;
                    }
                    return total;
                };

                // Count added costs
                kompletCost = function() {
                    var totalCost = 0;
                    for (var k = 0, _len = nakladyInfo.length; k < _len; k++) {
                        totalCost += nakladyInfo[k].sum * 100;
                    }
                    return totalCost;
                };
                //watch changes 
                penizeInfo.$watch(function(data) {
                    var totalMoney = komplet();
                    var costsTotal = kompletCost() / 100;
                    var disponible = totalMoney - costsTotal;
                    $rootScope.howMuchPenez = totalMoney;
                    $rootScope.restOfMoney = disponible;
                });

                nakladyInfo.$watch(function(data) {
                    var totalMoney = komplet();
                    var costsTotal = kompletCost() / 100;
                    var disponible = totalMoney - costsTotal;
                    $rootScope.howMuchCost = costsTotal;
                    $rootScope.restOfMoney = disponible;
                    if (disponible < 300) {
                        $scope.cashMin = true;
                    };
                }); 

                 // data loaded

                reclamationsInfo.$loaded().then(function(data) {
                    $rootScope.howManyRecordsRecl = reclamationsInfo.length;
                }); // data loaded

                returnInfo.$loaded().then(function(data) {
                    $rootScope.howManyRecordsReturns = returnInfo.length;
                }); // data loaded

                // add money to firebase
                
                $scope.addMoney = function() {
                    var onComplete = function(error) {
                      if (error) {
                        alert('Zrejme nemáte oprávnenie pre vklad penazí do kasy. ');
                      } else {
                        $("#success-alert-home").fadeTo(3000, 100).slideUp(100, function(){
                            $("#success-alert-home").hide();
                        });
                      }
                    };


                    var newMoneyRecord = penizeRef.push()
                     newMoneyRecord.set(
                     {
                        sum: $scope.moneysum,
                        usernum: $rootScope.currentUser.$id,
                        date: Firebase.ServerValue.TIMESTAMP,
                        username: $rootScope.currentUser.firstname,
                        info: $scope.infotextmoney || null

                    }, onComplete);
                    //  .then(function() {
                    //     $scope.dt = '';
                    //     $scope.moneysum = '';
                    // }); //promise
                }; // addmoney
                $scope.deleteMoney = function(key) {
                    moneysInfo.$remove(key);
                }; //delete moneys
                $scope.naklady = nakladyInfo;
                $scope.postValues = ["E-shop", "B2B", "Jine"];
                $scope.idValues = ["Posta", "Zeleziarstvo", "Drogerie", "Kancelar", "Ostatni"];

                //overlay open
                
                $scope.posta = function() {
                    $scope.idSelect = "Pošta";
                    $scope.postSelectShow = true;
                    $scope.reqInfo = false;
                };
                $scope.zelezarstvi = function() {
                    $scope.idSelect = "Železiarstvo";
                    $scope.postSelectShow = false;
                    $scope.reqInfo = true;
                };
                $scope.drogerie = function() {
                    $scope.idSelect = "Fa-La-Dro";
                    $scope.postSelectShow = false;
                    $scope.reqInfo = true;
                };
                $scope.kancelar = function() {
                    $scope.idSelect = "Kancelária";
                    $scope.postSelectShow = false;
                    $scope.reqInfo = true;
                };
                $scope.ostatni = function() {
                    $scope.idSelect = "Ostatné";
                    $scope.postSelectShow = false;
                    $scope.reqInfo = true;
                };
                $scope.closeForm = function() {
                    $scope.idSelect = '';
                    $scope.infotext = '';
                    $scope.costsum = '';
                    $scope.moneysum = '';
                };

                $scope.formClear = function() {
                        // $scope.idSelect = '';
                        $scope.infotext = '';
                        $scope.costsum = '';
                        $scope.postSelect = '';
                        console.log('id: ',idSelect);
                        
                 }; //promise
                $scope.addCosts = function() {
                    var onCompleteCost = function(error) {
                      if (error) {
                        console.log('chyba: ', error);
                        alert('A jeje, nastala chyba. Ulozte tuto zpravu a kontaktujte admina: ', error, authData);
                      } else {
                        $("#success-alert-cost").fadeTo(3000, 100).slideUp(100, function(){
                            $("#success-alert-cost").hide();
                        });
                      }
                    };

                    var totalMoney = komplet();
                    var costsTotal = kompletCost() / 100;
                    var disponible = totalMoney - costsTotal;
                    var newCostRecord = nakladyRef.push()
                     newCostRecord.set({
                        nazev: $scope.idSelect,
                        postaSelect: $scope.postSelect || null,
                        info: $scope.infotext || null,
                        sum: $scope.costsum,
                        date: Firebase.ServerValue.TIMESTAMP,
                        usernum: $rootScope.currentUser.$id,
                        username: $rootScope.currentUser.firstname,
                        rest: disponible - $scope.costsum
                    }, onCompleteCost);

                    //  .then(function() {
                    //     $scope.idSelect = '';
                    //     $scope.infotext = '';
                    //     $scope.costsum = '';
                    //     $scope.postSelect = '';
                    // }); //promise
                    // Button disabled on double click
                    // $scope.isDisabled = true;
                    // console.log('druhy zapis', $scope.isDisabled);

                }; // addCosts
                $scope.deleteCost = function(key) {
                    postsInfo.$remove(key);
                }; //delete costs
            } // User Authenticated
        }); // on Auth 
        
        // Prehled 
        $scope.showCost = function() {
            $scope.costTable = true;
            $scope.moneyTable = false;
        };
        $scope.showMoney = function() {
            $scope.costTable = false;
            $scope.moneyTable = true;
        }; //End prehled
    }
]); //Controller


// TODO: Castka vkladu po ulozeni zaznamu zustava. Vyresit