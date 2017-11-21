const wfsUrl =
  "/proxy/http://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wfs";
const PARCEL_LAYER = "Q0007_sat4rice_2018:latest_weekly_LT";

const getFeatureParams = {
  service: "WFS",
  request: "GetFeature",
  outputFormat: "application/json",
  typeName: PARCEL_LAYER
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
        try {
          const json = JSON.parse(this.response);
          resolve(json);
        } catch (err) {
          reject(`Response is not valid JSON: "${err}"`);
        }
      } else {
        reject(`Status ${this.status}, '${this.statusText}' for URL ${url}.`);
      }
    };

    request.open("GET", url);
    request.send();
  });
}
