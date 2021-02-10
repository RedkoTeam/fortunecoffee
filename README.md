# Fortune Coffee App

Description: 

## Software Dependencies

#### IMPORANTANT
1. Do not modify anything inside the android folder, unless you are just copy and pasteing the the downloaded keys
2. If it doesnt work, check your gradle version to make sure its compatiable. React native should just automatically do it already, therefore this issue is rare.

### Android

1.You might need to do this to run it in Android Studio or on real device: ``adb reverse tcp:8081 tcp:8081``
2. for the sample server: ``adb reverse tcp:3000 tcp:3000``
3. To run from command line try: ``react-native run-android``


# Do not modify any android files, gradles are set in place already. There is no need to make furthur modifications. If it doesnt work. Check the steps
## To Build Android ~ THIS IS SIGNED APK

0.1. Run react-native run-android first, if it works then you  can export. 

#### Newer gradlews, we can just run the gradlew commands and it will do all of this. You may try that first. cd into android.
   1. `./gradlew clean`
   2. `./gradlew assembleRelease`
   3. If this doesnt work. Then go ahead and do the bottom code. Hopefully it does
####

1. Generate the Index File ``react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ ``

// This step is nessassary or you will get errors, we must remove it because gradlew will automatically copy the files themselves.
2. `rm -rf ./android/app/src/main/res/drawable-*` + `rm -rf ./android/app/src/main/res/raw` `

3. Go into android folder, ``cd android``


4. IMPORTANT, you need the keys from google drive to get it.
    // https://drive.google.com/file/d/1avJ6oeOsNJWfSSlyAt_K0fVgIYsRq4Sr/view?usp=sharing
    copy and paste to your android. This is the keystore passwords etc. Without this it will not work
    These do no get pushed to the repo, therefore you download and get it yourself

5. Build using gradlew ``./gradlew assembleRelease``

6. You can find the generated APK at android/app/build/outputs/apk/app-release.apk.


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

5. Then cd into android folder, and create the key pairs using ``/android/pepk.jar``. THIS IS VERY IMPORTANT!!
   They keys must match from our end.
    ``This will be on google, when generateing A new app, Choose to do our own app handler and follow the steps``
   
6. Follow the steps on google console
7. Upload.


## Android Common Build Errors

1. Android resource linking failed
    `./gradlew clean`
    `./gradlew assembleRelease`


### @React Native Camera Errors

Under android/app/build.gradle
```
android {
    ...
    defaultConfig {
        ...
        missingDimensionStrategy 'react-native-camera', 'general' <-- insert this line
    }
}
```

## Notes - Things to add/debug
- 
    
## Unfinished - MISSING FUNCTIONS
- 
