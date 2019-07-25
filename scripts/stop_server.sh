#!/bin/bash
source /home/ec2-user/.bash_profile
pm2 kill
killall -9 node
