# Fortune Coffee App

Description: 

## Software Dependencies




## How to Start App

### iOS
In the root directory

Install dependencies: npm install
In the ios directory

Install Pods: gem install cocoapods
Install Pods: pod install
Install xcpretty: gem install xcpretty
Launch: open Sample.xcworkspace

## ARCHIVING IN XCODE

### FREQUENT ERRORS
 if you need certificates, go to developer and download the certificates onto your computer. Then rebuild.

// Create the bundle first. Run this command to export the assets out and bundle it
1.
$ react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios
!! While this is running. Dont do anything. It may look frozen but its not. Let it finish.  ~~~~~


** Change version number in plist file.

2. 
-Open Workspace
-Edit the scheme from Xcode like this:
-Product -> Scheme -> Edit Scheme -> Change build Configurration to Release


4. Change the build to to a real device or a simulator

5. Go to Product -> Archive

6. Once it's done building, Distrubute App to store, Done


### Android

You might need to do this to run it in Android Studio or on real device: adb reverse tcp:8081 tcp:8081
And for the sample server: adb reverse tcp:3000 tcp:3000
To run from command line try: react-native run-android

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
