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
Model=1
#
(echo "p \n P $Azimuth $Elevation \n \pause 4 \n p \n \pause 4 \n p \n \pause 4 \n p \n \pause 4 \n p \n \pause 4 \n p \n \pause 4 \n p \n \pause 4 \n p \n \pause 4 \n p \n \pause 4 \n p \n \pause 4 \n p \n \pause 4 \n p;) | rotctl -m $Model
#
