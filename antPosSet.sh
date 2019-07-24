#!/bin/bash
#
#Antenna Position Setter
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
#
echo "P $Azimuth $Elevation \n p" | rotctl
#
