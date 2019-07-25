#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/ec2-user/project
pm2 restart all
#pm2 start npm --name "spaceApp" -- start
