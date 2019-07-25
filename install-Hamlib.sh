#!/bin/bash
cd Hamlib
./bootstrap
./configure
make
make check
make install
cd ..