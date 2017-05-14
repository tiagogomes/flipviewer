var documents = [
    { title: 'Catalogue 2016', id: 0, pages: 68, prefix: "file-page", ratio: 2, path: "catalogue-2016" },
    { title: 'Catalogue 2014', id: 1, pages: 43, prefix: "PLADEC 2014", ratio: 2, path: "catalogue-2014" },
    { title: 'Newspaper 2014', id: 2, pages: 8, prefix: "Flyer Pladec 2014", ratio: 1.44, path: "newspaper-2014" },
    { title: 'Catalogue 2013', id: 3, pages: 64, prefix: "PLADEC - 2013 CATALOG", ratio: 2.42, path: "catalogue-2013" }
  ];

angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaSocialSharing) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.share = function () {
    $cordovaSocialSharing
    .share("Estou a usar a aplicação para ver os catálogos", "", null, "http://www.pladec.pt/") // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

})

.controller('GalleryCtrl', function($scope) {
  for (let doc of documents) {
    doc.thumb = '<img height="56" width="56" src="img/pages/' + doc.path + "/" + doc.prefix + '.jpg" alt="" />';
  }

  $scope.documents = documents;
})

.controller('DocumentCtrl', function($scope, $stateParams) {
  var index = $stateParams.documentId;
  var document = documents[index];

  /*var path = document.title.toLowerCase().trim();
 
  // replace invalid chars with spaces
  path = path.replace(/[^a-z0-9\s-]/g, ' ');
 
  // replace multiple spaces or hyphens with a single hyphen
  path = path.replace(/[\s-]+/g, '-');

  function listDir(path){
    window.resolveLocalFileSystemURL(path,
      function (fileSystem) {
        var reader = fileSystem.createReader();
        reader.readEntries(
          function (entries) {
            alert("ent:" + entries);
            for (let value of entries) {
              document.images.push('<img src="' + value.nativeURL + '" alt="" />');
              console.log(value);
            }
          },
          function (err) {
            alert("err1:" + err);
          }
        );
      }, function (err) {
        alert("err2:" + err);
      }
    );
  }

  //$cordovaFile
  listDir(cordova.file.applicationDirectory +"img/pages/" + path + "/");*/

  images = [];

  images.push('<img src="img/pages/' + document.path + "/" + document.prefix + '.jpg" alt="" />');

  for (var i = 1; i < document.pages; i++) {
    images.push('<img src="img/pages/' + document.path + "/" + document.prefix + i + '.jpg" alt="" />');
  }

  document.images = images;

  $scope.document = document;
});
