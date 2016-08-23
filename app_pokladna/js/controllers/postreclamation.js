 warchalPokladna.controller('PostreclamationController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',
	 function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $filter) {

		 var ref = new Firebase(FIREBASE_URL);
		 var auth = $firebaseAuth(ref);
		var newItems = false;

		$scope.reclTable = true;
		$scope.backupTable = false;
		$scope.reclAdded = false;
		$("#success-alert").hide();

		 // REKLAMACE ***********************************************************
		 auth.$onAuth(function(authUser) {
			 if (authUser) {
				 var reclamationsRef = new Firebase(FIREBASE_URL + '/reclamations');
				 var reclamationsInfo = $firebaseArray(reclamationsRef);
				 var reclamationsRefBackup = new Firebase(FIREBASE_URL + '/reclamationsBackup');
				 var reclamationsInfoBackup = $firebaseArray(reclamationsRefBackup);
				 var reclamationsRefDeleted = new Firebase(FIREBASE_URL + '/reclamationsDeleted');
				 var reclamationsInfoDeleted = $firebaseArray(reclamationsRefDeleted);

				 $scope.reclamations = reclamationsInfo;
				 $scope.reclamationDone = reclamationsInfoBackup;

				 $scope.FormHide = function() {
					 $scope.postnumname = '';
					 $scope.ordername = '';
					 $scope.nextinfoname = '';
				 };

				 //Add reclamation
				$scope.formClear = function() {
					 $scope.postnumname = '';
					 $scope.ordername = '';
					 $scope.nextinfoname = '';
					 $scope.addFormShow = false;
				 }; //formClear
				 $scope.addReclamation = function() {
				 	var onComplete = function(error) {
					  if (error) {
					    alert('A jeje, nastala chyba. Zkontrolujte pripojeni. Pokud potize pretrvaji, kontaktujte admina');
					  } else {
					    $("#success-alert").fadeTo(3000, 100).slideUp(100, function(){
						    $("#success-alert").hide();
						});
					  }
					};

					
					 var newReclamationRecord = reclamationsRef.push()
					 newReclamationRecord.set(
					 {
						reclnumber: $scope.postnumname,
						ordernum: $scope.ordername,
						nextinfo: $scope.nextinfoname || null,
						date: Firebase.ServerValue.TIMESTAMP,
						usernum: $rootScope.currentUser.$id
							 // console.log('hotovson');
					 }, onComplete);
					 
				 }; // add Reclamation
				 

				 // Edit reclamation info
				 $scope.editReclamation = function(mod, recl) {
					 var id = recl.$id;
					 var mojeRef = reclamationsRef.child(id);
					 mojeRef.update({
						 nextinfo: mod
					 }, 
					 function(error) {
					  if (error) {
					    alert("Data could not be saved." + error);
					  } else {
					    alert("Data saved successfully.");
					  }
					});
				 };

				 $scope.showEdit = function(r) {
				 	
				 	$scope.newNextInfo = r.nextinfo;
					 if ($scope.active != r) {
						 $scope.active = r;
					 } else {
						 $scope.active = null;
					 }
				 };

				 // delete reclamation
				 $scope.deleteRecl = function(key) {
					 if (confirm("Skutočne chcete záznam vymazať?") == true) {
						 reclamationsInfoDeleted.$add(key);
						 reclamationsInfo.$remove(key);
						 
					 } 
				 }; //delete
				 // delete reclamation
				 $scope.backupRecl = function(key) {
					 if (confirm("Uložiť do vybavených?") == true) {
						 reclamationsInfoBackup.$add(key);
						 reclamationsInfo.$remove(key);
						 
					 }

					 // console.log('smazano', key, deleteItem);
				 }; //delete 

				$scope.showCost = function() {
            	$scope.reclTable = true;
            	$scope.backupTable = false;
        		};
        		$scope.showMoney = function() {
            	$scope.reclTable = false;
            	$scope.backupTable = true;
        		}; //End prehled 
			 } // User Authenticated
		 }); // on Auth END REKLAMACE

	 }
 ]); //Controller
