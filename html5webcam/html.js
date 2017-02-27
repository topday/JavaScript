<!DOCTYPE html>
<html>
  <head>
    <title>Camera capture</title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="utf-8" http-equiv="encoding">
  </head>
  <body>
    <video id="orig" autoplay></video>
    <video id="ws" autoplay></video>

    <script language="javascript" type="text/javascript">
      var video = document.getElementById('orig');
      var videoWS = document.getElementById('ws');
      var streamRecorder;
      var loc = window.location;
      var WSURL = 'ws://' + loc.hostname + ':' + (loc.port * 1 + 1);
      var ws = new WebSocket(WSURL, 'echo-protocol');
      var md2 = new MediaSource();
      function onVideoFail(e) {
        console.log('webcam fail!', e);
      };

      function hasGetUserMedia() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia);
      }

      if (!hasGetUserMedia()) {

        alert('getUserMedia() is not supported in your browser');
      }

      videoWS.src = window.URL.createObjectURL(md2);

      md2.onsourceopen = function(e) {
        var sourceBuffer = md2.addSourceBuffer('video/webm; codecs="vorbis,vp8"');

        ws.onmessage = function(e) {
          let arrayBuffer;
          let fileReader = new FileReader();

          fileReader.onload = function() {

            sourceBuffer.appendBuffer(this.result);
          };

          fileReader.readAsArrayBuffer(e.data);
        };
      };

      window.URL = window.URL || window.webkitURL;
      navigator.getUserMedia  = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                               navigator.msGetUserMedia;

      if (navigator.getUserMedia) {

        navigator.getUserMedia({audio: false, video: true}, function(stream) {
          let recorder = new MediaRecorder(stream, {mimeType : "video/webm"});

          video.src = window.URL.createObjectURL(stream);

          recorder.start(10);

          recorder.ondataavailable = (event) => {

            if (event.data.size) {

              ws.send(event.data);
            }
          };

        }, onVideoFail);
      }
    </script>
</body>
</html>
