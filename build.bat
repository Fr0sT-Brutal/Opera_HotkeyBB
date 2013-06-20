@ECHO OFF
SET Name=HotkeyBB
DEL Release\%Name%.oex 2> nul & ^
CD Source & ^
..\7za.exe a -r -tzip -mx=9 ..\Release\%Name%.oex *
if errorlevel 1 pause