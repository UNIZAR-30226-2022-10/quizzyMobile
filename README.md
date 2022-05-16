# quizzyMobile
mobile aplication repository

## Setup
### Ionic CLI

**NOTE:** To install ionic and use it you must execute the following command at administrator user in powershell:
```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

If you have done that, you can install ionic CLI with the following command:
```
npm install -g @ionic/cli
```

Go to the repository folder's root and enter this in the command line:
```
npm install
```
This will install all the packages and development dependencies for the project
in order to work properly

## Execution

To execute the application on the browser using an mobile emulator use:
```
ionic serve --lab
```

In case you want to execute on a device (Android), first of all you must install Android Studio.
If you have it, just execute the following commands:
```
ionic build
npx cap add android
npx cap open android
```

**NOTE:** You must delete android folder of your project before execute `npx cap add android`
