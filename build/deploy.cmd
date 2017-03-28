call npm install 
IF "%ERRORLEVEL%" NEQ "0" goto error

call npm run build
IF "%ERRORLEVEL%" NEQ "0" goto error

del /q %DEPLOYMENT_TARGET%\*
for /d %%I in (%DEPLOYMENT_TARGET%\*) do (
    @rd /s /q "%%~I"
)
IF "%ERRORLEVEL%" NEQ "0" goto error

xcopy %DEPLOYMENT_SOURCE%\dist\* %DEPLOYMENT_TARGET%\dist /s /i
xcopy %DEPLOYMENT_SOURCE%\index.html %DEPLOYMENT_TARGET%\index.html*
xcopy %DEPLOYMENT_SOURCE%\web.config %DEPLOYMENT_TARGET%\web.config*
xcopy %DEPLOYMENT_SOURCE%\server.js %DEPLOYMENT_TARGET%\server.js*
%DEPLOYMENT_SOURCE%\build\7za.exe a -t7z %DEPLOYMENT_SOURCE%\deploy.7z %DEPLOYMENT_SOURCE%\node_modules
IF "%ERRORLEVEL%" NEQ "0" goto error

%DEPLOYMENT_SOURCE%\build\7za.exe -y x %DEPLOYMENT_SOURCE%\deploy.7z -o%DEPLOYMENT_TARGET%
IF "%ERRORLEVEL%" NEQ "0" goto error

del /q %DEPLOYMENT_SOURCE%\deploy.7z
IF "%ERRORLEVEL%" NEQ "0" goto error

call npm install --prefix %DEPLOYMENT_TARGET%/node_modules
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