#!/bin/sh
while getopts p: OPT
do
    case $OPT in
	p)  PORT=$OPTARG
	    ;;
    esac
done

shift $((OPTIND - 1))

cd ../mjpg-streamer
export LD_LIBRARY_PATH="$(pwd)"

../mjpg-streamer/mjpg_streamer -i "./input_uvc.so -f 10 -r 320x240 -d /dev/video0 -y -n" -o "./output_http.so -w ./www -p ${PORT:-8080}"
exit 0
