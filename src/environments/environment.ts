// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseURL1:'https://neophroncrm.com/spiceclubnew/api/v2',   // production url
      baseURL1:'https://neophroncrm.com/spiceclub_staging/api/v2', // stage url
  // https://neophroncrm.com/spiceclub_staging/api/v2/products/combo?page=1&buyertype=2&user_id=8

};

export const firebaseConfig = {
  apiKey: "AIzaSyBjCOJgXu_5SUqLPJa7dxseE-qgbLrWjlY",
  authDomain: "spiceclub-a8420.firebaseapp.com",
  projectId: "spiceclub-a8420",
  storageBucket: "spiceclub-a8420.appspot.com",
  messagingSenderId: "740565406646",
  appId: "1:740565406646:web:1c4961f6a753125760e717",
  measurementId: "G-BHZK0S6JV6"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
