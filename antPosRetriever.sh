#!/bin/bash
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
Model=$1
#
echo "p" | rotctl -m $Model
#