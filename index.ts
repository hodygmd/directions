/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

function initMap(): void {
  (document.getElementById("sidebar") as HTMLElement).style.display = "none";
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
    }
  );

  directionsRenderer.setMap(map);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  (document.getElementById("start") as HTMLElement).addEventListener(
    "change",
    onChangeHandler
  );
  (document.getElementById("end") as HTMLElement).addEventListener(
    "change",
    onChangeHandler
  );
}

function calculateAndDisplayRoute(
  directionsService: google.maps.DirectionsService,
  directionsRenderer: google.maps.DirectionsRenderer
) {
  directionsService
    .route({
      origin: {
        query: (document.getElementById("start") as HTMLInputElement).value,
      },
      destination: {
        query: (document.getElementById("end") as HTMLInputElement).value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {    
      directionsRenderer.setDirections(response);
      const route = response.routes[0];
      let totalDistance = 0;
      for (const leg of route.legs) {
        totalDistance += leg?.distance?.value || 0;
      }
      // Convert distance to kilometers and display it
      totalDistance = totalDistance / 1000;
      console.log(`Total Distance: ${totalDistance.toFixed(2)} km`);

      (document.getElementById('total-distance') as HTMLElement).innerHTML=totalDistance + ' km';
      
      (document.getElementById("sidebar") as HTMLElement).style.display = "block";
    })
    .catch((e) => /*window.alert("Directions request failed due to " + e)*/window.alert("No se encontraron rutas entre el origen y el destino"));
}
declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
