#!/bin/bash
SVN_DIR=/usr/local/meetup
TOMCAT_DIR=/usr/local/tomcat
cd $SVN_DIR/trunk && svn up && cd grails-app/conf && mv -f app-config.properties.deploy app-config.properties && cd ../../deploy
node pub/release/src/release.js -c=release.conf && node pub/release/src/release.js -c=release.mobile.conf && cd ..
grails prod war ROOT.war && cd .. && mkdir tmp && mv -f trunk/ROOT.war tmp && cd tmp && jar -xvf ROOT.war && rm -f ROOT.war
cd $TOMCAT_DIR/bin && ./shutdown.sh && sleep 10
cd $SVN_DIR && rm -rvf webapps && mv -f tmp webapps
cd $TOMCAT_DIR/bin && ./startup.sh
exit 0