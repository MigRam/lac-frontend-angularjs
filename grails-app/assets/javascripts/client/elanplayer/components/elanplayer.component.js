angular
  .module("client.elanplayer")
  .component("elanplayer", {
    templateUrl: "/client/elanplayer/elan-player.html",
    controller: ElanPlayerCtrl,
    controllerAs: "vm"
  });
  
  ElanPlayerCtrl.$inject = ['$scope', '$window', '$interval', '$http'];
  
  function ElanPlayerCtrl($scope, $window, $interval, $http) {

    var vm = this;

    $scope.audioPlayer = document.getElementById("AudioElement");
    $scope.audiofile = $window.audiofile;
    $scope.waveForm = $window.waveForm;
    $scope.spectrogram= $window.spectrogram;

    /** Annotations laden */
    $http.get().success(function(data) {
        $scope.jsonfile = data;
        console.log($scope.jsonfile);
    }); 

// Play / Pause 
    // Verhalten von Play-Button
    $scope.togglePlay = function() { 
        // if($scope.audioPlayer.paused){
        //     $scope.audioPlayer.play();
        // }else{
        //     $scope.audioPlayer.pause();
        // }
    }   

// Seeken (Springen mit Klick auf Waveform u/o Spectrogram)
    $scope.mediaSeek = function($event) {
    var w = document.getElementById('rightBar').offsetWidth;
    var d = $scope.audioPlayer.duration;
    var f = $event.pageX-(document.getElementById('leftBar').offsetWidth);
    var s = Math.round(f / w * d); // Position von links aus // $event.pageX / w * d
    //console.log($event.pageX);
    $scope.audioPlayer.currentTime = s; 
    }

// Tier Layer: Position + bgColor
$scope.tierPosition = function(index) { 
    //console.log(index);
        $('.tier'+index).css("top", (380+index*20)+"px");
        // white ist als standard im css gesetzt
            if (index %2 == 0) { $('.tier'+index).css("background-color", "lightgrey"); }
            if (index %3 == 0) { $('.tier'+index).css("background-color", "grey"); }
}   

// Annotation Position + Ausgabe
    $scope.annotationPosition = function(i,start,end,tier) {

        var totaltime = ($scope.audioPlayer.duration)*1000; // Total time in ms
        var screenwidth = document.getElementById('rightBar').offsetWidth;
        var pxstart = Math.round(screenwidth / totaltime * start);
        var pxstartright = pxstart+document.getElementById('leftBar').offsetWidth;
        var pxend = Math.round(screenwidth / totaltime * end);
        var pxwidth = pxend - pxstart;

        $('.annotation'+i).css("left", pxstartright);
        $('.annotation'+i).css("width", pxwidth);
                 // tier: Y-Ausrichtung
                    data = $scope.jsonfile[0];
                       j = 1;
                         angular.forEach(data.tiers, function(v, k) {
                             if (tier == v) { //console.log('annotationID:'+i+ 'TierID:'+j);
                                // if (j ==1) { $('.annotation'+i).css("top", "300px"); }
                               $('.annotation'+i).css("top", (380+j*20)+"px"); 
                              }   
                       j++;
                         }) 
    }

// Filter Annotation 
$scope.filterAnnotation = function(items) {
    var result = {};
    angular.forEach(items, function(value, key) {
        if (key == 'time_slot_start') {
            result[key] = value;
            $scope.ts_start = value;
        }
        if (key == 'time_slot_end') {
            $scope.ts_end = value;
        }
        if (key == 'tier') { // for each jsonfile.tiers: if match Tier(index)
            $scope.a_tier = value;           
        }  
        if (key == 'annotation_value') {
            $scope.a_value = value;
        } 
    });
    return result;
}    

 // Interval-Funktion: re-rendering unabhängig von currentTime!    
$interval(function(){

        var t = $scope.audioPlayer.currentTime;
        var d = $scope.audioPlayer.duration;
        //var w = t / d * 100;
    $scope.currentTime = t;
    $scope.duration = d;
        // Play Indicator Darstellung
        //var p = document.getElementById('rightBar').offsetLeft + document.getElementById('rightBar').offsetWidth;
        var p = document.getElementById('rightBar').offsetWidth;
        $scope.scrubLeft = (t / d * p); // $scope.scrubLeft = (t / d * p) - 7;
        $scope.updateLayout();

},100);  


    $scope.updateLayout = function() {
    $scope.scrubTop = document.getElementById('rightBar').offsetTop-2;
//    $scope.vidHeightCenter =  $scope.videoDisplay.offsetHeight/2 - 50; // -50, da Play Button 100px breit
//    $scope.vidWidthCenter = $scope.videoDisplay.offsetWidth/2 - 50;
    if(!$scope.$$phase) {
        $scope.$apply();
        }
    }    
  }