import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { storiesOf, action } from "@kadira/storybook";
import { theStore } from "../src/store/Store";
import CollapsibleBar from "../src/components/CollapsibleBar.jsx";
// import DetailViewHeader from "../src/components/DetailViewHeader.jsx";
import DetailViewSection from "../src/components/DetailViewSection.jsx";
import DetailViewTable from "../src/components/DetailViewTable.jsx";
import FlatButton from "../src/components/FlatButton.jsx";
import HeaderBar from "../src/components/HeaderBar.jsx";
import i18n from "../src/i18n"; // initialized i18next instance
import InputField from "../src/components/InputField.jsx";
import ListSearchView from "../src/components/ListSearchView.jsx";
// import LoginLogoutButton from "../src/components/LoginLogoutButton.jsx";
import MapSearchView from "../src/components/MapSearchView.jsx";
import PhotoView from "../src/components/PhotoView.jsx";
// import DetailViewThumbnails from "../src/components/DetailViewThumbnails";
import RaisedButton from "../src/components/RaisedButton.jsx";
import React from "react";
import SearchBar from "../src/components/SearchBar.jsx";
import SearchResultCard from "../src/components/SearchResultCard.jsx";
import SnackBar from "../src/components/SnackBar.jsx";
import ToggleSwitch from "../src/components/ToggleSwitch.jsx";
// import ViewSwitchButton from "../src/components/ViewSwitchButton.jsx";

import runModal from "./ModalStories";
runModal();

import runDetailViewHeader from "./DetailViewHeaderStories";
runDetailViewHeader();

import runDetailViewSection from "./DetailViewSectionStories";
runDetailViewSection();

import runDetailViewThumbnails from "./DetailViewThumbnailsStories";
runDetailViewThumbnails();

import runDetailViewThumbnailsSection
  from "./DetailViewThumbnailsSectionStories";
runDetailViewThumbnailsSection();

import runDetailViewTable from "./DetailViewTableStories";
runDetailViewTable();

import runDetailViewTableSection from "./DetailViewTableSectionStories";
runDetailViewTableSection();

import runPhotoView from "./PhotoViewStories";
runPhotoView();

import runCollapsibleBar from "./CollapsibleBarStories";
runCollapsibleBar();

import runHeaderBar from "./HeaderBarStories";
runHeaderBar();

import runSearchResultCard from "./SearchResultCardStories";
runSearchResultCard();

import runListSearchView from "./ListSearchViewStories";
runListSearchView();

import runFlatButton from "./FlatButtonStories";
runFlatButton();

import runRaisedButton from "./RaisedButtonStories";
runRaisedButton();

import runLoginLogoutButton from "./LoginLogoutButtonStories";
runLoginLogoutButton();

import runViewSwitchButton from "./ViewSwitchButtonStories";
runViewSwitchButton();

import runSearchBar from "./SearchBarStories";
runSearchBar();

import runSnackBar from "./SnackBarStories";
runSnackBar();

import runTimeseriesChart from "./TimeseriesChartStories";
runTimeseriesChart();

import runInputField from "./InputFieldStories";
runInputField();

import runToggleSwitch from "./ToggleSwitchStories";
runToggleSwitch();
