#!/bin/sh
echo "Starting test deploy"

npm install &&
bower install &&
grunt build &&

# TODO: sftp to server
# TODO: unpack tar.gz
# TODO: move to proper directory

echo "Finished build"