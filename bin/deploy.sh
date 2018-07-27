#!/bin/bash
SVN_DIR=/usr/local/meetup/trunk
TOMCAT_DIR=/usr/local/tomcat
cd $SVN_DIR
rm -f ROOT.war
svn up && cd deploy
node pub/release/src/release.js -c=release.conf && node pub/release/src/release.js -c=release.mobile.conf && cd ..
grails test war ROOT.war && cd $TOMCAT_DIR/bin
./shutdown.sh
sleep 5
cd ../webapps
rm -rvf ROOT && rm -f ROOT.war
cd $SVN_DIR
mv -f ROOT.war ../../tomcat/webapps
cd $TOMCAT_DIR/bin
./startup.sh
exit 0