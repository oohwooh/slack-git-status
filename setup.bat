::This is all really straightforward so im not going to comment it either
@echo off
color f0
title Dragon Ball Zeke's JSON Formatter Thingy
set /p token == Please enter slack token 
echo {>config.json
echo "token":"%token%">>config.json
echo }>>config.json