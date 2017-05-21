// app.js
//==============================================================================
//

var dtApp = angular.module('mgApp', []);

dtApp.controller('mainCtrl', function($scope) {
  // TODO: Provision database?
  // TODO: Prevent repeats (needs larger database first?)
  
  $scope.guessedTotal = 0;
  $scope.guessedCorrect = 0;
  $scope.score = '0/0';
  // titleKey = {image number: map name}
  var titleKey = {1: 'Forms of law around the world (Common Law, Civil Law, French Civil Law, Sharia Law)',
                  2: 'Largest city in the world (at various points in time)',
                  3: 'Unknown???',
                  4: 'Nuclear weapons (Current stockpile, Former stockpile, Unsanctioned stockpile, Suspected stockpile)',
                  5: 'Driving on the left or right side of the road',
                  6: 'Also Unknown??? HALP ZACH PLZ',
                  7: 'Countries that have been invaded by the British'};
  var answer = 0;
  function refresh() {
    $scope.options = [];
    function pickAnswer() {
      answer = Math.floor(Math.random()*Object.keys(titleKey).length) + 1;
      $scope.options.push(answer);
    }
    function pickOptions() {
      while ($scope.options.length < 4) {
        var nextOption = Math.floor(Math.random()*Object.keys(titleKey).length) + 1;
        if ($scope.options.indexOf(nextOption) == -1) {
          $scope.options.push(nextOption);
        }
      }
    }
    $scope.userSelection = '';
    pickAnswer();
    $scope.imgTitle = padNum(answer) + '.png';
    pickOptions();
    shuffle($scope.options);
  }

  function padNum(num) {
    z = '0';
    num = num + '';
    return num.length >= 4 ? num : new Array(4 - num.length + 1).join(z) + num;
  }
  $scope.getImgTitle = function(num) {
    return titleKey[num];
  }
  function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
  }
  $scope.submitGuess = function() {
    console.log($scope.options[$scope.userSelection], answer);
    $scope.guessedTotal += 1;
    if ($scope.options[$scope.userSelection] == answer) {
      console.log('correct');
      $scope.guessedCorrect += 1;
    } else {
      console.log('incorrect');
    }
    $scope.score = String($scope.guessedCorrect) + '/' + String($scope.guessedTotal);
    refresh();
  }
  refresh();
});
