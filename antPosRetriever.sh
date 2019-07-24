#!/bin/bash
$chmod u+wx antPosRetriever.sh
#
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
rotctl --model=$Model < \get_pos
#