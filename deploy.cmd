call npm install 
IF "%ERRORLEVEL%" NEQ "0" goto error

call npm run build
IF "%ERRORLEVEL%" NEQ "0" goto error

del /q %DEPLOYMENT_TARGET%\*
for /d %%x in (%DEPLOYMENT_TARGET%\*) do @rd /s /q "%%x"
IF "%ERRORLEVEL%" NEQ "0" goto error

xcopy %DEPLOYMENT_SOURCE%\* %DEPLOYMENT_TARGET% /Y /E
IF "%ERRORLEVEL%" NEQ "0" goto error

goto end

:error
endlocal
echo An error has occurred during web site deployment.  
call :exitSetErrorLevel  
call :exitFromFunction 2>nul

:exitSetErrorLevel
exit /b 1

:exitFromFunction
()

:end
endlocal  
echo Finished successfully.  