# Fortune Coffee App

Description: 

## Software Dependencies




## How to Start App

### iOS
In the root directory

Install dependencies: ``npm install``
In the ios directory

Install Pods: ``gem install cocoapods``
Install Pods: ``pod install``
Install xcpretty: ``gem install xcpretty``
Launch: ```open Sample.xcworkspace```

## ARCHIVING IN XCODE

### FREQUENT ERRORS
 if you need certificates, go to developer and download the certificates onto your computer. Then rebuild.

// Create the bundle first. Run this command to export the assets out and bundle it
1.``react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios``
!! While this is running. Dont do anything. It may look frozen but its not. Let it finish.  ~~~~~


** Change version number in plist file.

2.Open Workspace, Edit the scheme from Xcode like this:
-Product -> Scheme -> Edit Scheme -> Change build Configuration to Release


4. Change the build to a real device or a simulator

5. Go to Product -> Archive

6. Once it's done building, Distribute App to store, Done


### Android

1.You might need to do this to run it in Android Studio or on real device: ``adb reverse tcp:8081 tcp:8081``
2. for the sample server: ``adb reverse tcp:3000 tcp:3000``
3. To run from command line try: ``react-native run-android``


## To Build Android



1. Generate the Index File ``react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ ``

2. Go into android folder, ``cd android``

3. Build using gradlew ``gradlew assembleRelease``

4. You can find the generated APK at android/app/build/outputs/apk/app-release.apk.


## Google Play Signing & Uploading

How to sign the application

!! There is already a folder inside called output.zip. 
This contains the generated Java already.
Just upload this when prompted

1. First create the keystore file. Change 
   `` keytool -genkeypair -v -keystore YOURKEYNAME.keystore -alias YOURKEYALIAS -keyalg RSA -keysize 2048 -validity 10000``
2. Move the generated keystore file into ``/android/app``
   
3. Go into ``/android/app/build.gradle``
   
4.  Change build.gradle 
``` 
signingConfigs {
         release {
              storeFile file('fortunecoffee.keystore') <-- Change to file name of keystore
              storePassword 'fortunecoffee' <-- Change to the password you set
              keyAlias 'fortunecoffee' <-- Change to the alias you sent when you first ran the keystore generatation
              keyPassword 'fortunecoffee' <-- Password
        }
    }
    buildTypes {
        release {
            ... <-- Add everything from before
            signingConfig signingConfigs.release <-- Specficaly add this line, remove the debug if its there
        }
    }
```

5. Then cd into android folder, and create the key pairs using java. THIS IS VERY IMPORTANT!!
   They keys must match from our end.
    ``This will be on google, when generateing A new app, Choose to do our own app handler and follow the steps``
   
6. Follow the steps
7. Upload.


## Android Common Build Errors
### React Native Camera Errors

Under android/app/build.gradle

android {
    ...
    defaultConfig {
        ...
        missingDimensionStrategy 'react-native-camera', 'general' <-- insert this line
    }
}


### Server

There is a server that the app hits for data. The data is only stored in memory, but it should produce a more realistic environment.

In the server directory

Install nvm and node-4.2.3
Install dependencies: npm install
Run it: npm start

## Notes - Things to add/debug
- 
    
## Unfinished - MISSING FUNCTIONS
- 
