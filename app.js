// app.js
//==============================================================================
//

var dtApp = angular.module('mgApp', []);

dtApp.controller('mainCtrl', function($scope) {
  // TODO: Provision database?
  // TODO: Prevent repeats (needs larger database first?)

  $scope.guessed = [];
  $scope.guessedTotal = 0;
  $scope.guessedCorrect = 0;
  $scope.score = '0/0';
  // titleKey = {image number: map name}
  var titleKey = {1: 'Forms of law',
                  2: 'Largest city in the world at some point in time',
                  3: 'Prevalence of female genital mutilation',
                  4: 'Presence of nuclear weapons',
                  5: 'Driving on the left or right side of the road',
                  6: 'Nobel prize winners',
                  7: 'Countries that have been invaded by the British',
                  8: 'Climates',
                  9: 'Atlantic slave trade',
                  10: 'Trading partners of the European Union',
                  11: 'Index of economic freedom',
                  12: 'Political freedom',
                  13: 'Regional GDP per capita',
                  14: 'GDP per square kilometer',
                  15: 'Annual percent change in GDP',
                  16: 'Cumulative number of patents',
                  17: 'Urbanization rate',
                  18: 'Best ever finish in the FIFA World Cup',
                  19: 'Most popular sport',
                  20: 'Carbon dioxide emissions',
                  21: 'Average regional potato output',
                  22: 'Natural gas production',
                  23: 'Energy consumption'};
  var answer = 0;
  // Set displays
  $scope.gameOn = true;
  $scope.gameOver = false;
  function refresh() {
    // If all maps have been guessed, then end game (change visibility)
    if ($scope.guessed.length >= Object.keys(titleKey).length) {
      console.log('Game over...');
      $scope.gameOver = true;
      $scope.gameOn = false;
      return(false);
    }
    $scope.options = [];
    function pickAnswer() {
      while ($scope.options.length < 1) {
        answer = Math.floor(Math.random()*Object.keys(titleKey).length) + 1;
        if ($scope.guessed.indexOf(answer) == -1) {
          $scope.options.push(answer);
          $scope.guessed.push(answer);
        }
      }
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
  function fade(elem) {
    elem.style.opacity = 1;
    var op = 1;
    var timer = setInterval(function() {
        if (op <= 0.1) {
            clearInterval(timer);
        }
        elem.style.opacity = op;
        op -= 0.1;
    }, 70);
  }
  $scope.submitGuess = function() {
    console.log($scope.options[$scope.userSelection], answer);
    $scope.guessedTotal += 1;
    if ($scope.options[$scope.userSelection] == answer) {
      console.log('correct');
      fade(document.getElementById('correct'));
      $scope.guessedCorrect += 1;
    } else {
      console.log('incorrect');
      fade(document.getElementById('incorrect'));
    }
    $scope.score = String($scope.guessedCorrect) + '/' + String($scope.guessedTotal);
    refresh();
  }
  refresh();
});
