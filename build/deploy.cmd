call npm install 
IF "%ERRORLEVEL%" NEQ "0" goto error

call npm run build
IF "%ERRORLEVEL%" NEQ "0" goto error

:: del /q %DEPLOYMENT_TARGET%\*
:: for /d %%I in (%DEPLOYMENT_TARGET%\*) do (
::     @rd /s /q "%%~I"
:: )
for /d %%i in (%DEPLOYMENT_TARGET%\*) do if /i not "%%~nxi"=="node_modules" del /s /q "%%i"
IF "%ERRORLEVEL%" NEQ "0" goto error

xcopy %DEPLOYMENT_SOURCE%\dist\* %DEPLOYMENT_TARGET%\dist /s /i
xcopy %DEPLOYMENT_SOURCE%\index.html %DEPLOYMENT_TARGET%\index.html*
xcopy %DEPLOYMENT_SOURCE%\web.config %DEPLOYMENT_TARGET%\web.config*
xcopy %DEPLOYMENT_SOURCE%\server.js %DEPLOYMENT_TARGET%\server.js*
xcopy %DEPLOYMENT_SOURCE%\package.json %DEPLOYMENT_TARGET%\package.json*
:: xcopy %DEPLOYMENT_SOURCE%\node_modules\* %DEPLOYMENT_TARGET%\node_modules /s /i

call cd %DEPLOYMENT_TARGET% 
call npm install --only=production
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