#!/bin/bash
source /home/ec2-user/.bash_profile
now=$(date +"%FT%H%M%z")
sudo mv /home/ec2-user/project /home/ec2-user/project_old_$now >> /tmp/SpaceApp.log
cd /home/ec2-user/project
npm i >> /tmp/SpaceApp.log
