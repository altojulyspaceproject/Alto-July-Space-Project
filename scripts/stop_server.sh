#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/ec2-user/project
sudo chmod -R +x scripts/
pkill -f node
