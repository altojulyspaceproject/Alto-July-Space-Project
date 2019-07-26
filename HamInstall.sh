#!/bin/bash
cd Alto-July-Training-Project/Hamlib
./bootstrap
./configure
make
make check
make install
cd ..