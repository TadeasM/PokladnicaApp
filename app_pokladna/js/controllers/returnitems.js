warchalPokladna.controller('ReturnController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',
    function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        $scope.returnTable = true;
        $scope.backupTable = false;

        // REKLAMACE ***********************************************************
        auth.$onAuth(function(authUser) {
            if (authUser) {
                var returnRef = new Firebase(FIREBASE_URL + '/returnitems');
                var returnInfo = $firebaseArray(returnRef);
                var returnRefBackup = new Firebase(FIREBASE_URL + '/returnitemsBackup');
                var returnInfoBackup = $firebaseArray(returnRefBackup);
                var returnRefDeleted = new Firebase(FIREBASE_URL + '/returnitemsDeleted');
                var returnInfoDeleted = $firebaseArray(returnRefDeleted);
                var d = new Date();

                $scope.returns = returnInfo;
                $scope.done = returnInfoBackup;
                // $scope.addFormShow = false;
                $scope.returnValues = ["Neprevzal", "Adresa nekompletna", "Adresat neznamy", "Ziaden dovod"];
                $scope.countryvalues = [
                    "Afghanistan",
                    "Åland Islands",
                    "Albania",
                    "Algeria",
                    "American Samoa",
                    "AndorrA",
                    "Angola",
                    "Anguilla",
                    "Antarctica",
                    "Antigua and Barbuda",
                    "Argentina",
                    "Armenia",
                    "Aruba",
                    "Australia",
                    "Austria",
                    "Azerbaijan",
                    "Bahamas",
                    "Bahrain",
                    "Bangladesh",
                    "Barbados",
                    "Belarus",
                    "Belgium",
                    "Belize",
                    "Benin",
                    "Bermuda",
                    "Bhutan",
                    "Bolivia",
                    "Bosnia and Herzegovina",
                    "Botswana",
                    "Bouvet Island",
                    "Brazil",
                    "British Indian Ocean Territory",
                    "Brunei Darussalam",
                    "Bulgaria",
                    "Burkina Faso",
                    "Burundi",
                    "Cambodia",
                    "Cameroon",
                    "Canada",
                    "Cape Verde",
                    "Cayman Islands",
                    "Central African Republic",
                    "Chad",
                    "Chile",
                    "China",
                    "Christmas Island",
                    "Cocos (Keeling) Islands",
                    "Colombia",
                    "Comoros",
                    "Congo",
                    "Congo,The Democratic Republic of the",
                    "Cook Islands",
                    "Costa Rica",
                    "Cote D\"Ivoire",
                    "Croatia",
                    "Cuba",
                    "Cyprus",
                    "Czech Republic",
                    "Denmark",
                    "Djibouti",
                    "Dominica",
                    "Dominican Republic",
                    "Ecuador",
                    "Egypt",
                    "El Salvador",
                    "Equatorial Guinea",
                    "Eritrea",
                    "Estonia",
                    "Ethiopia",
                    "Falkland Islands (Malvinas)",
                    "Faroe Islands",
                    "Fiji",
                    "Finland",
                    "France",
                    "French Guiana",
                    "French Polynesia",
                    "French Southern Territories",
                    "Gabon",
                    "Gambia",
                    "Georgia",
                    "Germany",
                    "Ghana",
                    "Gibraltar",
                    "Greece",
                    "Greenland",
                    "Grenada",
                    "Guadeloupe",
                    "Guam",
                    "Guatemala",
                    "Guernsey",
                    "Guinea",
                    "Guinea-Bissau",
                    "Guyana",
                    "Haiti",
                    "Heard Island and Mcdonald Islands",
                    "Holy See (Vatican City State)",
                    "Honduras",
                    "Hong Kong",
                    "Hungary",
                    "Iceland",
                    "India",
                    "Indonesia",
                    "Iran,Islamic Republic Of",
                    "Iraq",
                    "Ireland",
                    "Isle of Man",
                    "Israel",
                    "Italy",
                    "Jamaica",
                    "Japan",
                    "Jersey",
                    "Jordan",
                    "Kazakhstan",
                    "Kenya",
                    "Kiribati",
                    "Korea,Democratic People\"S Republic of",
                    "Korea,Republic of",
                    "Kuwait",
                    "Kyrgyzstan",
                    "Lao People\"S Democratic Republic",
                    "Latvia",
                    "Lebanon",
                    "Lesotho",
                    "Liberia",
                    "Libyan Arab Jamahiriya",
                    "Liechtenstein",
                    "Lithuania",
                    "Luxembourg",
                    "Macao",
                    "Macedonia,The Former Yugoslav Republic of",
                    "Madagascar",
                    "Malawi",
                    "Malaysia",
                    "Maldives",
                    "Mali",
                    "Malta",
                    "Marshall Islands",
                    "Martinique",
                    "Mauritania",
                    "Mauritius",
                    "Mayotte",
                    "Mexico",
                    "Micronesia,Federated States of",
                    "Moldova,Republic of",
                    "Monaco",
                    "Mongolia",
                    "Montserrat",
                    "Morocco",
                    "Mozambique",
                    "Myanmar",
                    "Namibia",
                    "Nauru",
                    "Nepal",
                    "Netherlands",
                    "Netherlands Antilles",
                    "New Caledonia",
                    "New Zealand",
                    "Nicaragua",
                    "Niger",
                    "Nigeria",
                    "Niue",
                    "Norfolk Island",
                    "Northern Mariana Islands",
                    "Norway",
                    "Oman",
                    "Pakistan",
                    "Palau",
                    "Palestinian Territory,Occupied",
                    "Panama",
                    "Papua New Guinea",
                    "Paraguay",
                    "Peru",
                    "Philippines",
                    "Pitcairn",
                    "Poland",
                    "Portugal",
                    "Puerto Rico",
                    "Qatar",
                    "Reunion",
                    "Romania",
                    "Russian Federation",
                    "RWANDA",
                    "Saint Helena",
                    "Saint Kitts and Nevis",
                    "Saint Lucia",
                    "Saint Pierre and Miquelon",
                    "Saint Vincent and the Grenadines",
                    "Samoa",
                    "San Marino",
                    "Sao Tome and Principe",
                    "Saudi Arabia",
                    "Senegal",
                    "Serbia and Montenegro",
                    "Seychelles",
                    "Sierra Leone",
                    "Singapore",
                    "Slovakia",
                    "Slovenia",
                    "Solomon Islands",
                    "Somalia",
                    "South Africa",
                    "South Georgia and the South Sandwich Islands",
                    "Spain",
                    "Sri Lanka",
                    "Sudan",
                    "Suriname",
                    "Svalbard and Jan Mayen",
                    "Swaziland",
                    "Sweden",
                    "Switzerland",
                    "Syrian Arab Republic",
                    "Taiwan,Province of China",
                    "Tajikistan",
                    "Tanzania,United Republic of",
                    "Thailand",
                    "Timor-Leste",
                    "Togo",
                    "Tokelau",
                    "Tonga",
                    "Trinidad and Tobago",
                    "Tunisia",
                    "Turkey",
                    "Turkmenistan",
                    "Turks and Caicos Islands",
                    "Tuvalu",
                    "Uganda",
                    "Ukraine",
                    "United Arab Emirates",
                    "United Kingdom",
                    "United States",
                    "United States Minor Outlying Islands",
                    "Uruguay",
                    "Uzbekistan",
                    "Vanuatu",
                    "Venezuela",
                    "Viet Nam",
                    "Virgin Islands,British",
                    "Virgin Islands,U.S.",
                    "Wallis and Futuna",
                    "Western Sahara",
                    "Yemen",
                    "Zambia",
                    "Zimbabwe"
                ];
                $scope.FormShow = function() {
                    $scope.addFormShow = true;
                };
                $scope.FormHide = function() {
                    $scope.fistname = '';
                    $scope.lastname = '';
                    $scope.country = '';
                    $scope.nextinfoname = '';
                    $scope.addFormShow = false;
                };

                $scope.addReturnItem = function() {
                    returnInfo.$add({
                        firstname: $scope.fistname,
                        lastname: $scope.lastname,
                        country: $scope.country,
                        date: d.toISOString(),
                        reason: $scope.returnselect,
                        info: $scope.nextinfoname || null,
                        // date: Firebase.ServerValue.TIMESTAMP,
                        username: $rootScope.currentUser.firstname,
                        usernum: $rootScope.currentUser.$id
                    }).then(function(ref) {
                        var id = ref.key();
                        console.log('Return....' + id);
                        $scope.fistname = '';
                        $scope.lastname = '';
                        $scope.country = '';
                        $scope.nextinfoname = '';
                        $scope.addFormShow = false;
                    }); //promise
                }; // addReclamation


                $scope.editReturnItem = function(mod, recl) {
                    var id = recl.$id;
                    var mojeRef = returnRef.child(id);
                    mojeRef.update({
                        info: mod
                    });

                };

                $scope.showEdit = function(r) {
                	$scope.newNextInfo = r.info;
                    if ($scope.active != r) {
                        $scope.active = r;
                    } else {
                        $scope.active = null;
                    }

                };
                // backup others
                $scope.backupReturnItems = function(key) {
                    console.log(key.firstname);
                    if (confirm("Ulozit jako vyrizene?") == true) {

                        returnInfoBackup.$add(key);

                        returnInfo.$remove(key);
                    } else {

                    }
                }; //backup others
                $scope.deleteReturnItems = function(key) {
                    console.log(key.firstname);
                    if (confirm("Smazat zaznam?") == true) {

                        returnInfoDeleted.$add(key);

                        returnInfo.$remove(key);
                    } else {

                    }
                }; //delete others

                // Prehled 
                $scope.showCost = function() {
                    $scope.returnTable = true;
                    $scope.backupTable = false;
                };
                $scope.showMoney = function() {
                    $scope.returnTable = false;
                    $scope.backupTable = true;
                }; //End prehled

            } // User Authenticated
        }); // on Auth END REKLAMACE

    }
]); //Controller
