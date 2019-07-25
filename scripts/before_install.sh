#!/bin/bash
source /home/ec2-user/.bash_profile
now=$(date +"%m_%d_%Y")
sudo mv /home/ec2-user/project /home/ec2-user/project_old_$now >> /tmp/SpaceApp.log
