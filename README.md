# Setup for MJPG-streamer
```
$ sudo apt update
$ sudo apt install subversion libjpeg-dev imagemagick
$ cd /path/to/raspi-usbcam-monitor
$ svn co http://svn.code.sf.net/p/mjpg-streamer/code/mjpg-streamer
$ cd mjpg-streamer 
$ make 
```

# Setup for raspi-usbcam-monitor
```
$ cd /path/to/raspi-usbcam-monitor
$ npm install
$ node index.js
```

# Blog post
http://tarukosu.hatenablog.com/entry/2017/01/08/200449
