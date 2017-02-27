# JavaScript

## HTML5 video over WebSocket

Code is minimalistic and represents proof of concept only. 

### Primary applied features are: 

* Work on latest Mozilla browsers.
* Has one single dependency library. The rest methods are node native models.
* Scenario:
  * Retrieve video stream using any web camera browser can reach.
  * Split stream into data chunks and pass to browser's WebSocket
  * Backend WebSocket will send back the received data 
  * Frontend captures the data chunks and merges into 2nd stream's buffer
  * Show video on 2nd embeded player (which will be delayed due to round trip)
* Files:
  * server.js - holds simple HTTP server and WebSocket server
  * html.js - is a single HTML page which is passed to user's browser

### Install project

* Download code 
* `npm install`
* `npm start`
* Load FireFox: localhost:8080

### What is missing?

These bits are essential to have for production version.

* Cross browser compatibility
* Video segmentation 
* Multi devices differentiated stream

More details about good streaming practice: https://www.youtube.com/watch?v=Fm3Bagcf9Oo

