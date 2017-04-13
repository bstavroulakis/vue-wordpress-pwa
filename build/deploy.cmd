call npm install 
IF "%ERRORLEVEL%" NEQ "0" goto error

call npm run build
IF "%ERRORLEVEL%" NEQ "0" goto error

for /d %%D in (%DEPLOYMENT_TARGET%\*) do (
    if not "%%~nxD" == "node_modules" (
        del /S /Q "%%~D"
        IF "%ERRORLEVEL%" NEQ "0" goto error
    )
)
for %%D in (%DEPLOYMENT_TARGET%\*) do (
    del /S /Q "%%~D"
    IF "%ERRORLEVEL%" NEQ "0" goto error
)

xcopy /d %DEPLOYMENT_SOURCE%\dist\* %DEPLOYMENT_TARGET%\dist /s /i
xcopy /d %DEPLOYMENT_SOURCE%\index.html %DEPLOYMENT_TARGET%\index.html*
xcopy /d %DEPLOYMENT_SOURCE%\web.config %DEPLOYMENT_TARGET%\web.config*
xcopy /d %DEPLOYMENT_SOURCE%\server.js %DEPLOYMENT_TARGET%\server.js*
xcopy /d %DEPLOYMENT_SOURCE%\package.json %DEPLOYMENT_TARGET%\package.json*

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