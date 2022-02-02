//= wrapped

angular.module("client.shared")
  .component("mediafilesTable", {
    bindings: {
      data: "<?data",
      view: "@?view"
    },
    templateUrl: "/client/shared/table.html",
    controller: TableCtrl,
    controllerAs: "cm"
  });

TableCtrl.$inject = [ "utilsService", "Api", "$timeout", "$mdDialog", "$log" ];

function TableCtrl( utilsService, Api, $timeout, $mdDialog, $log ) {
  var cm = this;
  cm.mediaApi = Api.MEDIAPI;

  /** methods */
  cm.gotoResourceView = gotoResourceView;
  
  cm.toggleModal = toggleModal;
  cm.openModal = openModal;
  cm.closeModal = closeModal;
  
  cm.openVideoPlayer = openVideoPlayer;
  cm.closeVideoPlayer = closeVideoPlayer;
  cm.checkVideoPlayerStatus = checkVideoPlayerStatus

  cm.openAudioPlayer = openAudioPlayer;
  cm.closeAudioPlayer = closeAudioPlayer;
  cm.checkAudioPlayerStatus = checkAudioPlayerStatus;

  cm.downloadFile = downloadFile;
  cm.onSuccess = onSuccess;
  cm.onError = onError;
  

  function gotoResourceView(type, id) {
    utilsService.goToView(type, id);
  }
  
  function toggleModal(modalId, file) {
    cm.id = file.id;
    cm.label = file.label;
    cm.formatedId = file.id.substring(4);
    cm.mediaFileUrl = Api.MEDIAPI + '/' + file.id;
    openModal(modalId);
  };

  function openModal(modalId) {
    document.getElementById(modalId).classList.toggle("is-active");
    document.querySelector("html").classList.add("is-clipped");
  }

  function closeModal(modalId) {
    document.getElementById(modalId).classList.toggle("is-active");
    document.querySelector("html").classList.remove("is-clipped");
  };

 
  function openAudioPlayer(file) {
      console.log(file);
      openModal('audio-modal');
      cm.audioName = file.label;
      cm.audioFile = Api.MEDIAPI + '/' + file.id;
      console.log(cm.audioFile);
      checkAudioPlayerStatus(file);
  }; 
  
  function checkAudioPlayerStatus(file) {
    if (file.contentType == "audio/x-wav") {
      var audioElement = document.getElementById("audio-player");
      var audioState = audioElement.readyState;

      $log.info( "audio status: " + audioState + " | network state: " + audioElement.networkState);

      audioElement.addEventListener("progress", function (event) {
        if (audioElement.buffered.length > 0) {
          var bufferStatus = parseInt( (audioElement.buffered.end(0) / audioElement.duration) * 100 );
          cm.statusInfo = "Audio duration: " + audioElement.duration + " | Audio loading " + bufferStatus + "%";
        }
      });
    }

    audioElement.addEventListener("waiting", function () {
      var status = document.getElementById("audiostatus");
      status.querySelector(".audiochecker").innerHTML = "Loading...";
    });

    audioElement.addEventListener("canplaythrough", function () {
      var status = document.getElementById("audiostatus");
      status.querySelector(".audiochecker").innerHTML = "";
    });
  };

  function closeAudioPlayer() {
      var audioElement = document.getElementById("audio-player");

      if (audioElement.play) {
        audioElement.pause();
        audioElement.currentTime = 0;
        closeModal('audio-modal');
      } else {
        audioElement.play();
      }
  };

  function openVideoPlayer(file) {
    console.log(file);
    openModal('video-modal');
    cm.videoFile = Api.MEDIAPI + '/' + file.id;
    checkVideoPlayerStatus(file);
  }

  function closeVideoPlayer() {
    var videoElement = document.getElementById("video-player");
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
      cm.closeModal("video-modal");
    } else {
      videoElement.play();
    }
  };

  
  function checkVideoPlayerStatus() {
      var videoElement = document.getElementById("video-player");
      videoElement.addEventListener("waiting", function () {
        var status = document.getElementById("videostatus");
        status.querySelector(".videochecker").innerHTML = "Loading...";
      });
  };

  
  function onSuccess(e) {
    e.clearSelection();
    cm.onSuccessCopied = true;
    cm.textCopied = "successfully copied!";
    $timeout(function () {
      cm.onSuccessCopied = false;
    }, 1000);
  };


  function onError(e) {
    cm.onSuccessCopied = false;
    $log.error("Action:", e.action);
    $log.error("Trigger:", e.trigger);
  };

  
  function downloadFile(id) {
    return utilsService.download(id);
  };

  cm.$onInit = initComponent();
  function initComponent() { 
    
  }
}