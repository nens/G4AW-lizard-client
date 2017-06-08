import React, { Component } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import i18n from "../src/i18n"; // initialized i18next instance
import { theStore } from "../src/store/Store";

export const i18nDecorator = getStory => (
  <I18nextProvider i18n={i18n}>
    <Provider store={theStore}>
      {getStory()}
    </Provider>
  </I18nextProvider>
);

export const THUMBNAIL_LIST = [
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  },
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  },
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  },
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  },
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  },
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
    date: 1495803541255
  }
];

export const PHOTO_LIST = [
  {
    url: "https://static.pexels.com/photos/317441/pexels-photo-317441.jpeg",
    date: 1495803155030
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Parched_rice_field_Can_Tho.JPG",
    date: 1495803540255
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Around_Nha_Trang%2C_rice_fields_%286224431058%29.jpg",
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
