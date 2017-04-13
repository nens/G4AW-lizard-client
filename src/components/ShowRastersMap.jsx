import { connect } from 'react-redux';
import React, { propTypes } from 'react';
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet';
import ReactDOM from 'react-dom';
import { fetchRasterAsync } from '../actions/RasterActions';

const hoogteUuid = "10415ccb-ec31-4d43-bdb3-db597061527b";

class RastersMap extends React.Component {
  componentDidMount() {
    this.props.getRaster(hoogteUuid);
  }

  render() {
    const { visibleRasters } = this.props;

    return (
      <div>
        <Map center={[52.092876, 5.104480]}
             zoom={13}
             style={{width: "100%", height: 200}}>
          <TileLayer
             url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {visibleRasters.map((raster) => (
             <WMSTileLayer url={raster.url} key={raster.uuid} />
           ))}
        </Map>
      </div>
    );
  }
}

function mapStateToProps (state) {
  console.log(state.rasters);
  return {
    'visibleRasters': Object.values(state.rasters)
      .filter((raster) => !!raster.data)
      .map((raster) => raster.data)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getRaster: (uuid) => fetchRasterAsync(uuid, dispatch)
  };
}


export const ShowRastersMap = connect(
  mapStateToProps, mapDispatchToProps)(RastersMap);
