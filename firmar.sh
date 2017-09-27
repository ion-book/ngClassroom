#!/bin/bash

ionic cordova build android --prod --release

#clave es: ngclassroom123$

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks platforms/android/build/outputs/apk/android-release-unsigned.apk my-alias

zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk ngclassroom.apk
