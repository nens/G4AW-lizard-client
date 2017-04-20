import { connect } from 'react-redux';
import React from 'react';
import { Map, TileLayer, WMSTileLayer } from 'react-leaflet';
import ReactDOM from 'react-dom';

import { VIEWPORT_PADDING } from './Constants';
import { getRaster } from '../actions/RasterActions';

const hoogteUuid = "10415ccb-ec31-4d43-bdb3-db597061527b";

class RastersMapComponent extends React.Component {
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
            <WMSTileLayer
              url={raster.wms_info.get('endpoint')}
              key={raster.uuid}
              layers={raster.wms_info.get('layer')}
              styles={raster.options.get('styles')}
            />
           ))}
        </Map>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    'visibleRasters': Object.values(state.rasters)
      .filter((raster) => !!raster.data)
      .map((raster) => raster.data)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRaster: (uuid) => getRaster(uuid, dispatch)
  };
}

const RastersMap = connect(
  mapStateToProps, mapDispatchToProps)(RastersMapComponent);

export default RastersMap;
