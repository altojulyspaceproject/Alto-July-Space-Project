#!/bin/bash
$ chmod u+x antPosRet

#Antenna Position Retriever
#
#
# Author: Steph
#
#
# Requirements: installed Hamlib library
#Inputs: satellite azimuth and elevation, radio and rotator specs 
#
# input order = [azimuth, elevation, rotator model number,]
#
Azimuth=$1
Elevation=$2
Model=$3
#
rotctld --model=Model
#
foo=$\get_pos
echo "your variable"
echo {$foo[@]}



