@echo off
REM Deploy RevTech website: add, commit, push
REM Usage: deploy.bat
REM        deploy.bat "Your commit message"

set MSG=Deploy: site updates
if not "%~1"=="" set MSG=%~1

git add -A
git status --short
git commit -m "%MSG%"
git push
echo Done. Pushed to origin.
pause
