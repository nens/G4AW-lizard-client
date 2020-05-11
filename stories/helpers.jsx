import React, { Component } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import i18n from "../src/i18n"; // initialized i18next instance
import { theStore } from "../src/store/Store";
import { mapBoxAccesToken} from '../src/mapboxConfig';

export const i18nDecorator = getStory =>
  <I18nextProvider i18n={i18n}>
    <Provider store={theStore}>
      {getStory()}
    </Provider>
  </I18nextProvider>;

export const THUMBNAIL_LIST = [
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  },
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  },
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  },
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  },
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  },
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  }
];

export const PHOTO_LIST = [
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  }
];

export const DEFAULT_TABLE_DATA = [
  { key: "Pest Risk", value: "High" },
  { key: "Brown plant hopper present", value: "Yes" },
  { key: "Leaf Folder present", value: "No" },
  { key: "Blast present", value: "Yes" },
  { key: "Brown plant hopper risk", value: "High" },
  { key: "Leaf Folder risk", value: "Low" },
  { key: "Blast risk", value: "Medium" }
];

export const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit," +
  " sed do eiusmod tempor incididunt ut labore et dolore magna " +
  "aliqua. Ut enim ad minim veniam, quis nostrud exercitation " +
  "ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
  "Duis aute irure dolor in reprehenderit in voluptate velit " +
  "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint " +
  "occaecat cupidatat non proident, sunt in culpa qui officia " +
  "deserunt mollit anim id est laborum.";

export const SIMPLE_LINE_CHART_DATA = [
  { timestamp: 1495519200000, value: 17.3 },
  { timestamp: 1495522800000, value: 19.2 },
  { timestamp: 1495526400000, value: 19.8 },
  { timestamp: 1495530000000, value: 20.4 },
  { timestamp: 1495533600000, value: 19.9 },
  { timestamp: 1495537200000, value: 19.3 },
  { timestamp: 1495540800000, value: 19.1 },
  { timestamp: 1495544400000, value: 19.2 },
  { timestamp: 1495548000000, value: 19.2 },
  { timestamp: 1495551600000, value: 18.2 },
  { timestamp: 1495555200000, value: 17.5 },
  { timestamp: 1495558800000, value: 16.0 },
  { timestamp: 1495562400000, value: 15.3 },
  { timestamp: 1495566000000, value: 14.7 },
  { timestamp: 1495569600000, value: 13.5 },
  { timestamp: 1495573200000, value: 13.1 },
  { timestamp: 1495576800000, value: 12.6 },
  { timestamp: 1495580400000, value: 12.0 },
  { timestamp: 1495584000000, value: 11.4 },
  { timestamp: 1495587600000, value: 11.2 },
  { timestamp: 1495591200000, value: 11.3 },
  { timestamp: 1495594800000, value: 10.9 },
  { timestamp: 1495598400000, value: 11.2 },
  { timestamp: 1495602000000, value: 13.0 },
  { timestamp: 1495605600000, value: 14.8 },
  { timestamp: 1495609200000, value: 15.7 },
  { timestamp: 1495612800000, value: 16.3 },
  { timestamp: 1495616400000, value: 17.4 },
  { timestamp: 1495620000000, value: 18.1 },
  { timestamp: 1495623600000, value: 18.7 },
  { timestamp: 1495627200000, value: 20.0 },
  { timestamp: 1495630800000, value: 19.9 },
  { timestamp: 1495634400000, value: 20.0 },
  { timestamp: 1495638000000, value: 19.8 },
  { timestamp: 1495641600000, value: 19.3 },
  { timestamp: 1495645200000, value: 18.2 },
  { timestamp: 1495648800000, value: 17.1 },
  { timestamp: 1495652400000, value: 15.7 },
  { timestamp: 1495656000000, value: null }
];

export const DEMO_LAYERS = [
  {
    title: "Satellite",
    attribution: "",
    url:
      `https://api.mapbox.com/styles/v1/nelenschuurmans/ck8oabi090nys1imfdxgb6nv3/tiles/256/{z}/{x}/{y}@2x?access_token=${mapBoxAccesToken}`,
      mapThumb:
        `https://api.mapbox.com/styles/v1/nelenschuurmans/ck8oabi090nys1imfdxgb6nv3/tiles/256/11/1632/963@2x?access_token=${mapBoxAccesToken}`,
    opacity: 1,
    layerType: "tms",
    layerOptions: {},
    active: false
  },
  {
    title: "Topo",
    attribution: "",
    url:
      `https://api.mapbox.com/styles/v1/nelenschuurmans/ck8sgpk8h25ql1io2ccnueuj6/tiles/256/{z}/{x}/{y}@2x?access_token=${mapBoxAccesToken}`,
      mapThumb:
        `https://api.mapbox.com/styles/v1/nelenschuurmans/ck8sgpk8h25ql1io2ccnueuj6/tiles/256/11/1632/963@2x?access_token=${mapBoxAccesToken}`,
    opacity: 1, 
    layerType: "tms",
    layerOptions: {},
    active: true
  },
  {
    title: "Aerial",
    attribution: "",
    url: "",
    opacity: 1,
    layerType: "wms",
    layerOptions: {},
    active: false
  },
  {
    title: "LIDAR",
    attribution: "",
    url: "",
    opacity: 1,
    layerType: "wms",
    layerOptions: {},
    active: false
  },
  {
    title: "NDVI",
    attribution: "",
    url: "",
    opacity: 1,
    layerType: "wms",
    layerOptions: {},
    active: false
  },
  {
    title: "Landsat",
    attribution: "",
    url: "",
    opacity: 1,
    layerType: "wms",
    layerOptions: {},
    active: false
  },
  {
    title: "Sentinel 2A",
    attribution: "",
    url: "",
    opacity: 1,
    layerType: "wms",
    layerOptions: {},
    active: false
  }
];

export const LEGEND_DATA = [
  {
    title: "Rice growth",
    attribution: "",
    url: "",
    mapThumb: "",
    opacity: 1,
    layerType: "tms",
    layerOptions: {},
    active: true,
    legend: [
      {
        label: "Harvest",
        color: "#E84506"
      },
      {
        label: "Ripening",
        color: "#FF7813"
      },
      {
        label: "Milking",
        color: "#FFC306"
      },
      {
        label: "Tillering",
        color: "yellow"
      }
    ]
  },
  {
    title: "Pest risk",
    attribution: "",
    url: "",
    mapThumb: "",
    opacity: 1,
    layerType: "tms",
    layerOptions: {},
    active: false,
    legend: []
  },
  {
    title: "Flood risk",
    attribution: "",
    url: "",
    mapThumb: "",
    opacity: 1,
    layerType: "tms",
    layerOptions: {},
    active: false,
    legend: [
      {
        label: "Low risk",
        color: "#ffffff"
      },
      {
        label: "Medium risk",
        color: "#CCE1F1"
      },
      {
        label: "High risk",
        color: "#005292"
      },
      {
        label: "Extreme risk",
        color: "#00385F"
      },
      {
        label: "Extremer risk",
        color: "#00385F"
      },
      {
        label: "Even more extreme risk",
        color: "#00386F"
      },
      {
        label: "Extremest risk",
        color: "#ff0000"
      }
    ]
  }
];
