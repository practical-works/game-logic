REM Required: "NodeJS", "NPM", and "http-server" package.
REM To install "http-server" run: `npm i http-server`.
@echo off
cls
start chrome http://localhost:8080
http-server -c-1 -s