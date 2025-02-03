# MIT Media Lab Camera Culture Group Privacy System User App
**This is reference implementation for the users with "developer" role who can follow the code to develop newer versions**

This is React Native app that allows the users to post the data through mobile app. The users can post up to 10 data points that are then sent over to the [Privacy Guardian](https://github.com/nytron88/mit-privacy-backend). The app works on the principal of [Secured Multi-Party Computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation) where each data point entered by the user is sent to to backend servers - a random integer R and and the the difference of data point and R (X - R).


## Prerequsities

 - Yarn
 - React Native
 - Android Studio
 - JDK 11

## Installation
1. Download [Android Studio](https://developer.android.com/studio) and [install](https://reactnative.dev/docs/environment-setup?guide=native) it
2. Setup the env:
   ```
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. Checkout the code and change into the project directory:
   
   ```
   git clone https://github.com/nytron88/mit-privacy-user-app.git
   
   cd mit-privacy-user-app
   ```
4. Install the required packages

   ```
   yarn install
   ```
5. Open Android Studio and run the emulator
6. Run the app in the emnulator:

   ```
   yarn run android
   ```
    **NOTE:** The code for iOS app is also built in but not tested.
8. This will open a separate terminal window and to throw the app in the emulator press **```a```**

   ![image](https://github.com/nytron88/eta-prediction-user-oauth2/assets/79620454/2ead8c3e-6d7f-464c-b1af-d2ef5e0c78ee)

5. **NOTE** that if you are doing this first time, gradle build will be initiated that takes longer to build the package.

    ![image](https://github.com/nytron88/eta-prediction-user-oauth2/assets/79620454/daa926d4-e204-4f41-a418-4aef82656837)

7. Once the build is successful, the app will be loaded in the emulator:

    ![image](https://github.com/nytron88/eta-prediction-user-oauth2/assets/79620454/e8080cfc-7c04-441e-93c3-683027b04335)

8. Once you click the ```Login``` button, the OAuth2 provider's login screen will appear. The provider in this case is [Auth0](https://auth0.com]

   ![image](https://github.com/nytron88/eta-prediction-user-oauth2/assets/79620454/399199fe-1b1e-4dcc-af1b-4a011d5e8c1a)

9. After the sign up on successful login, the control will be redirected to the app:

   ![image](https://github.com/nytron88/eta-prediction-user-oauth2/assets/79620454/d6f0333d-8a5a-4cc5-8031-0aec2ef5de52)

## Configuration
1. There are two cinfig files of interest: ```.env``` and ```app/auth0-configuration.js```.
 
   a. The .env file contains the below properties (sample):

   ```
   R_SERVER_URL = http://10.0.2.2:8181
   X_R_SERVER_URL = http://10.0.2.2:8281
   PROCESS_ETA_EP = /api/user/post_eta_data
   RAND_INT = 50
   API_AUDIENCE = https://token-management-api
   ```
   **R_SERVER_URL and X_R_SERVER_URL**: These are the URL's of the server instances if Privacy Guardian. Change the host name and port that suits your requirements. ***NOTE:*** When running server instances on your local machine, instead of using ```localhost```, use ```10.0.2.2```
   because Android emulator doesn't work on ```localhost```.

   **PROCESS_ETA_EP**: This is the endpoint on the Privacy Guardian that receives ```POST``` requests submitted from the app

   **RAND_INT**: The random integer for Secured Multi_party Computation

   **API_AUDIENCE**: The Token Management API configured in Auth0 tenant

   b. ```app/auth0-configuration.js```

   ```
   module.exports = {
    clientId: "REDACTED",
    domain: "REDACTED",
   };
   ```
   **clientId**: The application's client id in Auth0 tenant

   **domain**: The Auth0 tenant's domain
   

