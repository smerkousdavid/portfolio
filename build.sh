#!/bin/bash
echo "Building site"
./landing.sh
echo "Done building front page"
hugo
echo "Done. See public folder"