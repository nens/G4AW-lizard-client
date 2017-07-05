// const wfsUrl = "/proxy/http://geoserver9.lizard.net/geoserver/g4aw/wms"; // Proxied because of CORS errors
// const parcelLayer = "g4aw:g4aw_vn_ricefield_vin_bihn";

const wfsUrl =
  "/proxy/http://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms";
const parcelLayer = "g4aw:latest_weekly_LT";

const getFeatureParams = {
  service: "WFS",
  request: "GetFeature",
  outputFormat: "application/json",
  typeName: parcelLayer
};

export function getParcelAttributes(parcelId) {
  const totalParams = Object.assign({ featureId: parcelId }, getFeatureParams);

  const query = Object.keys(totalParams)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(totalParams[k]))
    .join("&");

  const url = `${wfsUrl}?${query}`;

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
    };

    request.open("GET", url);
    request.send();
  });
}
