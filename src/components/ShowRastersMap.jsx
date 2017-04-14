import { connect } from 'react-redux';
import React, { propTypes } from 'react';
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet';
import ReactDOM from 'react-dom';
import { fetchRasterAsync } from '../actions/RasterActions';
import { VIEWPORT_PADDING } from './Constants';

const hoogteUuid = "10415ccb-ec31-4d43-bdb3-db597061527b";

class RastersMap extends React.Component {
  componentDidMount() {
    this.props.getRaster(hoogteUuid);
  }

  getWidth() {
    return ((this.props.width || window.innerWidth) - VIEWPORT_PADDING) + "px";
  }

  getHeight() {
    return ((this.props.height || window.innerHeight) - VIEWPORT_PADDING) + "px";
  }

  render() {
    const { visibleRasters } = this.props;

    return (
      <div>
        <Map center={[52.092876, 5.104480]}
             zoom={13}
             zoomControl={false}
             style={{width: this.getWidth(), height: this.getHeight()}}>
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
