const wfsUrl = "https://geoserver9.lizard.net/geoserver/g4aw/wms";

const parcelLayer = "g4aw:g4aw_vn_ricefield_vin_bihn";

const getFeatureParams = {
  service: "WFS",
  request: "GetFeature",
  outputFormat: "application/json",
  typeName: parcelLayer
};

export function getParcelAttributes(parcelId) {
  const totalParams = Object.assign({ featureId: parcelId }, getFeatureParms);

  const query = Object.keys(totalParams)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(totalParams[k]))
    .join("&");

  const url = wfsUrl + "?" + query;

  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (this.readyState !== 4) return;

      if (this.status >= 200 && this.status < 300) {
        const json = JSON.parse(this.response);
        resolve(json);
      } else {
        reject(`Status ${this.status}, '${this.statusText}' for URL ${url}.`);
      }

      request.open("GET", url);
      request.send();
    };
  });
}
