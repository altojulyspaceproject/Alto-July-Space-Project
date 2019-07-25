#!/bin/bash
source /home/ec2-user/.bash_profile
# cd /home/ec2-user/project
pm2 start npm --name spaceApp -- start --log /tmp/SpaceApp.log
# pm2 start npm -- start --name spaceApp --log /tmp/SpaceApp.log
