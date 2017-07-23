//HI THIS IS MY CODE I MAKE INTERNET CODES
// (C) 1999-2101AD NINJASE CORP
// PLS DONT HAX THX

var app = angular.module('dmi', ['ui.router']);

app.config(function($stateProvider,$urlRouterProvider) {

  $stateProvider.state('dmi',{
    url: '/dmi?:q',
    templateUrl: 'dmi.html',
    controller: 'dmiCtrl',
    resolve:{
      shareRef: function($stateParams){
        return $stateParams.q;
      }
    }
  });
  $urlRouterProvider.otherwise('/dmi');
});

var app = angular.module('dmi');

app.controller('dmiCtrl', function($scope, $window, shareRef){
  console.log('BY NINJASE!!!!!!!!!!!!!!!!!!!!');

  /*
  http://www.shacknews.com/chatty?id=16068258#itemanchor_16068258
  Answer the following questions, yes or no:
  1) Is there a plot?
  2) Does stuff blow up?
  3) Are there any car crashes?
  4) Are there babies in it?
  5) Does someone get shot/stabbed/kicked/chainsawed/stomped in the face?
  6) Is there a lot of fire?
  7) Are there any hot chicks in it?
  8) Do people get fucked up by some crazy ass creatures/monsters?
  9) Are there any asian people in it?
  10) Is the main character a bad motherfucker?


  Scoring key:
  1) If yes, subtract 10 points. If no, add 5
  2) If no, subtract 20 points. if yes, add 10. If a lot of stuff blows up, add 20
  3) If yes, add 5 points.
  4) If yes, subtract 15 points.
  5) If yes, add 15 points. If no, subtract 5
  6) If yes, add 5 points
  7) If yes, add 10 points
  8) If yes, add 10 points
  9) If yes, add 5 points
  10) If yes, add 15 points. If no, subtract 5

  This should tell you how much dognose likes a movie
  */

    $scope.scoring = [
      {
        id: 0,
        q: 'Is there a plot?',
        yes: -10,
        no: 5
      },
      {
        id: 1,
        q: 'Does stuff blow up?',
        yes: 10,
        yes2: 10,
        no: -20,
        no2: 0
      },
      {
        id: 2,
        q: 'Are there any car crashes?',
        yes: 5,
        no: 0
      },
      {
        id: 3,
        q: 'Are there babies in it? ',
        yes: -15,
        no: 0
      },
      {
        id: 4,
        q: 'Does someone get shot/stabbed/kicked/chainsawed/stomped in the face?',
        yes: 15,
        no: -5
      },
      {
        id: 5,
        q: 'Is there a lot of fire?',
        yes: 5,
        no: 0
      },
      {
        id: 6,
        q: 'Are there any hot chicks in it?',
        yes: 10,
        no: 0
      },
       {
        id: 7,
        q: 'Do people get fucked up by some crazy-ass robots/creatures/monsters?',
        yes: 10,
        no: 0
      },
       {
        id: 8,
        q: 'Are there any Asian people in it?',
        yes: 5,
        no: 0
      },
       {
        id: 9,
        q: 'Is the main character a bad motherfucker?',
        yes: 15,
        no: -5
      }
    ];

  if(shareRef){
    try{
      var o = JSON.parse(shareRef);
      o.forEach(function(e){
        $scope.scoring[e.i].val = e.v? 'true' : 'false';
        if(e.v2){
          $scope.scoring[e.i].val2 = e.v2? 'true' : 'false';
        }
      });
    }catch(e){
      console.log('WTF',e);
    }
  }

  $scope.score = 0;

  $scope.$watch('scoring', function(newVal, oldVal){
    getShare();
    $scope.score = 0;
    newVal.forEach(function(e){
      if (e.val === 'true'){
        $scope.score += e.yes;
        e.score = e.yes;
      }
      if (e.val === 'false'){
        $scope.score += e.no;
        e.score = e.no;
      }
      if(e.val === 'true' && e.val2 === 'true'){
        $scope.score += e.yes2;
        e.score2 = e.yes2;
      }
      if(e.val === 'true' && e.val2 === 'false'){
        $scope.score += e.no2;
        e.score2 = e.no2;
      }
    });
  }, true);

  function getShare(){
    var params = $scope.scoring.map(function(e){
      var val = {
        i: e.id,
        v: e.val === 'true' ? 1 : e.val === 'false' ? 0 : null
      };
      if(e.val2){
        val.v2 = e.val2 === 'true' ? 1 : e.val2 === 'false' ? 0 : null;
      }
      return val;
    }).filter(function(e){
      if(e.v !== null){
        return e;
      }
    });
    var string = JSON.stringify(params);
    return $window.location.href.split('?q=')[0]+'?q='+encodeURIComponent(string);
  }

  $scope.share = function(){
    $scope.shareMe = getShare();
  };

  $scope.reset = function(){
    $scope.shareMe = '';
    $scope.score = 0;
    $scope.scoring.forEach(function(e){
      e.val = null;
      e.score = null;
      if(e.val2){
        e.val2 = null;
      }
    });
  };

});
