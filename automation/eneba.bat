@echo off
echo 🚀 Démarrage de BlueStacks...
start "" "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\BlueStacks 5.lnk"

echo ⏳ Attente du chargement de BlueStacks...
for /L %%i in (1,1,15) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

echo 🔗 Connexion ADB à BlueStacks...
adb connect 127.0.0.1:5555
for /L %%i in (1,1,2) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

:: 🌟 Ouvrir l'application Eneba
echo 📱 Ouverture de l'application Eneba...
adb -s emulator-5554 shell input tap 450 600  
for /L %%i in (1,1,10) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

:: 🔍 Rechercher "eneba"
echo 🔍 Recherche "Eneba"...
adb -s emulator-5554 shell input tap 300 100  
for /L %%i in (1,1,3) do (
    echo Attente... %%i
    timeout /t 1 >nul
)
adb -s emulator-5554 shell input text "eneba"
for /L %%i in (1,1,5) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

:: 📜 Faire défiler jusqu'aux offres
echo 📜 Scroll jusqu'aux offres...
adb -s emulator-5554 shell input swipe 500 800 500 400  
for /L %%i in (1,1,5) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

:: 🎯 Sélectionner la carte cadeau de 5€
echo 🎯 Sélection de la carte 5€...
adb -s emulator-5554 shell input tap 300 300  
for /L %%i in (1,1,5) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

:: 🛒 Achat immédiat
echo 🛒 Achat immédiat...
adb -s emulator-5554 shell input tap 820 835  
for /L %%i in (1,1,7) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

:: 💳 Choix du paiement par carte bancaire
echo 💳 Sélection du paiement par carte...
adb -s emulator-5554 shell input tap 860 420  
for /L %%i in (1,1,6) do (
    echo Attente... %%i
    timeout /t 1 >nul
)
adb -s emulator-5554 shell input tap 450 1400  
for /L %%i in (1,1,5) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

:: 💳 Saisie des informations de la carte
echo 💳 Saisie des informations de paiement...
adb -s emulator-5554 shell input tap 160 360  
for /L %%i in (1,1,2) do (
    echo Attente... %%i
    timeout /t 1 >nul
)
adb -s emulator-5554 shell input text "4397710008794551"  
for /L %%i in (1,1,2) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

adb -s emulator-5554 shell input tap 160 460  
for /L %%i in (1,1,2) do (
    echo Attente... %%i
    timeout /t 1 >nul
)
adb -s emulator-5554 shell input text "benedikt%sstrokin"
for /L %%i in (1,1,2) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

adb -s emulator-5554 shell input tap 365 480  
for /L %%i in (1,1,2) do (
    echo Attente... %%i
    timeout /t 1 >nul
)
adb -s emulator-5554 shell input text "1029"
for /L %%i in (1,1,2) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

adb -s emulator-5554 shell input tap 800 410  
for /L %%i in (1,1,2) do (
    echo Attente... %%i
    timeout /t 1 >nul
)
adb -s emulator-5554 shell input text "173"  
for /L %%i in (1,1,3) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

adb -s emulator-5554 shell input tap 450 1400  
for /L %%i in (1,1,5) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

:: 📧 Entrée de l'email pour la confirmation
echo 📧 Entrée de l'email...
adb -s emulator-5554 shell input tap 450 730  
for /L %%i in (1,1,2) do (
    echo Attente... %%i
    timeout /t 1 >nul
)
adb -s emulator-5554 shell input text "cerebep570@winsita.com"  
for /L %%i in (1,1,2) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

adb -s emulator-5554 shell input tap 450 940  
for /L %%i in (1,1,12) do (
    echo Attente... %%i
    timeout /t 1 >nul
)

:: 🔑 Vérification OTP (si nécessaire)
::echo 🔑 Vérification OTP si demandé...
::adb -s emulator-5554 shell input tap 450 450  
::for /L %%i in (1,1,3) do (
::    echo Attente... %%i
::   timeout /t 1 >nul
::)
::adb -s emulator-5554 shell input keyevent 61  
::for /L %%i in (1,1,2) do (
::    echo Attente... %%i
::    timeout /t 1 >nul
::)
::adb -s emulator-5554 shell input text "123456"  
::for /L %%i in (1,1,3) do (
::    echo Attente... %%i
::    timeout /t 1 >nul
::)
::adb -s emulator-5554 shell input keyevent 66  
::for /L %%i in (1,1,5) do (
::    echo Attente... %%i
::    timeout /t 1 >nul
::)

echo ✅ Achat complété avec succès !