import L from "leaflet";

const WMS_BASE_URL =
  "/proxy/http://maps1.project.lizard.net/geoserver/Q0007_sat4rice_2018/wms";

const getWMSFeatureParams = {
  request: "GetFeatureInfo",
  service: "WMS",
  srs: "EPSG:4326",
  version: "1.1.1",
  info_format: "application/json",
  bbox: null,
  height: 256,
  width: 256,
  FEATURE_COUNT: 50,
  layers: "Q0007_sat4rice_2018:latest_weekly_LT",
  query_layers: "0007_sat4rice_2018:latest_weekly_LT",
  x: null,
  y: null
};

export function getParcelAttributesByLatLng(map, lat, lng) {
  const size = map.getSize();
  const point = map.latLngToContainerPoint(L.latLng(lat, lng), map.getZoom());
  const bbox = map.getBounds().toBBoxString();
  const { x, y } = point;

  const totalParams = Object.assign(getWMSFeatureParams, {
    bbox,
    width: size.x,
    height: size.y,
    x,
    y
  });

  const query = Object.keys(totalParams)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(totalParams[k]))
    .join("&");

  const url = `${WMS_BASE_URL}?${query}`;

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
