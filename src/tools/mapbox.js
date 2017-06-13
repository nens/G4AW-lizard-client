export function getMapboxUrl(coords) {
  return (
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    coords.longitude +
    "," +
    coords.latitude +
    ".json?access_token=pk.eyJ1IjoibmVsZW5zY2h1dXJtYW5zIiwiYSI6ImhkXzhTdXc" +
    "ifQ.3k2-KAxQdyl5bILh_FioCw"
  );
}
