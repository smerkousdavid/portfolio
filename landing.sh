#!/bin/bash

echo "building landing page"

cd landing
yarn build
cd ..

rm -r static/reacthome
cp -r landing/build static/reacthome

# now rename main js/css
mv $(ls static/reacthome/static/js/main*.js) static/reacthome/static/js/main.js
mv $(ls static/reacthome/static/css/main*.css) static/reacthome/static/css/main.css

echo "done"