/*eslint-disable */
import _ from "lodash";

export function hideKeyboard() {
  if (window.Keyboard) {
    window.Keyboard.hide();
  }
}

export function showKeyboard() {
  if (window.Keyboard) {
    window.Keyboard.show();
  }
}

export function isKeyboardVisible() {
  if (window.Keyboard) {
    return window.Keyboard.isVisible;
  }
}

export function checkConnection() {
  if (window.cordova) {
    let networkState = navigator.connection.type;

    let states = {};
    states[Connection.UNKNOWN] = "Unknown connection";
    states[Connection.ETHERNET] = "Ethernet connection";
    states[Connection.WIFI] = "WiFi connection";
    states[Connection.CELL_2G] = "Cell 2G connection";
    states[Connection.CELL_3G] = "Cell 3G connection";
    states[Connection.CELL_4G] = "Cell 4G connection";
    states[Connection.CELL] = "Cell generic connection";
    states[Connection.NONE] = "No network connection";

    return networkState !== Connection.NONE;
  } else {
    return navigator.onLine;
  }
}

export async function downloadFile(url, targetUrl) {
  return new Promise((resolve, reject) => {
    if (checkTargetPlatform()) {
      //Should works only with Android and iOS
      let fileTransfer = new FileTransfer();
      let uri = encodeURI(url);
      fileTransfer.download(
        uri,
        targetUrl,
        function(entry) {
          resolve(targetUrl);
        },
        function(error) {
          reject(error);
        }
      );
    } else {
      resolve();
    }
  });
}

export async function downloadImageBase64(url) {
  return new Promise((resolve, reject) => {
    if (checkTargetPlatform()) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function() {
        let reader = new FileReader();
        reader.onloadend = function() {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    }
  });
}

export function checkTargetPlatform() {
  if (window.cordova) {
    return (
      window.cordova.platformId === "ios" ||
      window.cordova.platformId === "android"
    );
  }
  return false;
}

export function checkPlatform(platform) {
  return window.cordova && window.cordova.platformId === platform;
}

// calculate direction route to draw google map base on google service direction
// return result and status of google service direction
export const calculateDirection = (bookingData, callBackChangeStore) => {
  const {
    objPickupLocation = {},
    destinationArr = []
  } = bookingData;

  if (_.isEmpty(objPickupLocation.name)) {
    callBackChangeStore("directions", {});
    return;
  }

  //destinationArr have at least 1 item have input empty (field name in object) will not calculate direction
  // save result is {}
  if (destinationArr.filter(item => _.isEmpty(item.name)).length > 0) {
    callBackChangeStore("directions", {});
    return;
  }

  const directionsService = new google.maps.DirectionsService();
  const origin = { lat: objPickupLocation.lat, lng: objPickupLocation.lng };
  const destination = {
    lat: destinationArr[destinationArr.length - 1].lat,
    lng: destinationArr[destinationArr.length - 1].lng
  };

  // waypoints list is item in destinationArr except last one
  let waypoints = [];
  destinationArr.forEach((des, index) => {
    if (index < destinationArr.length - 1)
      waypoints.push({
        location: new google.maps.LatLng(des.lat, des.lng)
      });
  });
  // console.log("waypoints", waypoints);

  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
      waypoints: waypoints.length > 0 ? waypoints : null
    },
    (result, status) => {
      // console.log("status routing", status);
      if (status === google.maps.DirectionsStatus.OK) {
        // console.log(`google.maps.DirectionsStatus ${result}, ${status}`);
        callBackChangeStore("directions", result);
      } else {
        console.error(`error fetching directions ${status}`);
        callBackChangeStore("directions", {});
      }
    }
  );
};

export function makeEvent(eventName) {
  console.log("MAKE EVENT HEREEEEEEEEEEEEEEEEEEEE", eventName);
  // Create a new event
  let event = new CustomEvent(eventName);
  // Dispatch the event
  window.dispatchEvent(event);
}
