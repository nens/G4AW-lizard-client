import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { storiesOf, action } from "@kadira/storybook";
import { theStore } from "../src/store/Store";
import HeaderBar from "../src/components/HeaderBar.jsx";
import i18n from "../src/i18n"; // initialized i18next instance
import Legend from "../src/components/Legend.jsx";
import ListSearchView from "../src/components/ListSearchView.jsx";
import LoginLogoutButton from "../src/components/LoginLogoutButton.jsx";
import MapSearchView from "../src/components/MapSearchView.jsx";
import RaisedButton from "../src/components/RaisedButton.jsx";
import React from "react";
import SearchBar from "../src/components/SearchBar.jsx";
import SearchResultCard from "../src/components/SearchResultCard.jsx";
import SnackBar from "../src/components/SnackBar.jsx";
import ViewSwitchButton from "../src/components/ViewSwitchButton.jsx";

storiesOf("HeaderBar", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("example search results", () => <HeaderBar title="Search results" />)
  .add("with icon", () => (
    <HeaderBar
      title="Search results"
      icon="filter_list"
      handleClick={action("clicked")}
    />
  ));

storiesOf("SearchResultCard", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("blank result", () => (
    <SearchResultCard
      handleClick={action("clicked")}
      title="Bông trang"
      subtitle="BTR-Q-31673"
    />
  ))
  .add("long title", () => (
    <SearchResultCard
      handleClick={action("clicked")}
      title="Hàng Tiệc Cưới Hàng Tiệc Cưới "
      subtitle="BTR-Q-31673"
    />
  ))
  .add("colored indicator", () => (
    <SearchResultCard
      handleClick={action("clicked")}
      indicatorColor="#ff0000"
      title="Hàng Tiệc Cưới Hàng Tiệc Cưới "
      subtitle="BTR-Q-31673"
    />
  ))
  .add("long subtitle", () => (
    <SearchResultCard
      handleClick={action("clicked")}
      title="Bông trang "
      subtitle="BTR-Q-31673-R-2112-3333"
    />
  ))
  .add("no ripple", () => (
    <SearchResultCard
      ripple={false}
      handleClick={action("clicked")}
      title="Bông trang "
      subtitle="BTR-Q-31673-R-2112-3333"
    />
  ));

storiesOf("MapSearchView", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("initial view", () => <MapSearchView />);

storiesOf("ListSearchView", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("initial view", () => <ListSearchView />);

storiesOf("RaisedButton", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      {getStory()}
    </I18nextProvider>
  ))
  .add("icon example", () => (
    <RaisedButton
      iconClass="lock"
      buttonText="With icon"
      handleOnClick={action("clicked")}
    />
  ))
  .add("iconless example", () => (
    <RaisedButton buttonText="No icon" handleOnClick={action("clicked")} />
  ))
  .add("disabled", () => (
    <RaisedButton iconClass="block" disabled={true} buttonText="Disabled" />
  ));

storiesOf("LoginLogoutButton", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      {getStory()}
    </I18nextProvider>
  ))
  .add("login button", () => (
    <LoginLogoutButton handleOnClick={action("clicked")} />
  ))
  .add("logout button", () => (
    <LoginLogoutButton handleOnClick={action("clicked")} />
  ));

storiesOf("ViewSwitchButton", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      {getStory()}
    </I18nextProvider>
  ))
  .add("switch to map", () => (
    <ViewSwitchButton handleOnClick={action("clicked")} />
  ))
  .add("switch to omnibox", () => (
    <ViewSwitchButton handleOnClick={action("clicked")} />
  ));

storiesOf("SearchBar", module)
  .addDecorator(getStory => (
    <Provider store={theStore}>
      {getStory()}
    </Provider>
  ))
  .add("empty bar", () => <SearchBar />);

storiesOf("SnackBar", module).add("default", () => (
  <SnackBar
    open={true}
    message={"This is a test"}
    action={"OK"}
    onActionTap={action("clicked")}
  />
));

storiesOf("SnackBar", module).add("timeout", () => (
  <SnackBar
    autoHideDuration={5000}
    open={true}
    message={"This closes after 5 seconds"}
    action={"Fine"}
    onActionTap={action("clicked")}
  />
));

storiesOf("SnackBar", module).add("long string", () => (
  <SnackBar
    open={true}
    message={"This is a very long string that could break the ui"}
    action={"OK"}
    onActionTap={action("clicked")}
  />
));

storiesOf("SnackBar", module).add("long action string", () => (
  <SnackBar
    open={true}
    message={"This is a test"}
    action={"Now click this button"}
    onActionTap={action("clicked")}
  />
));

storiesOf("SnackBar", module).add("in vietnamese", () => (
  <SnackBar
    open={true}
    message={"Đây là tiếng Việt"}
    action={"được"}
    onActionTap={action("clicked")}
  />
));

storiesOf("TimeseriesGraph", module)
  .addDecorator(getStory => (
    <Provider store={theStore}>
      {getStory()}
    </Provider>
  ))
  .add("foobar", () => <TimeseriesGraph />);

storiesOf("Legend", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("legend open, showing rice growth", () => (
    <Legend
      activeLegendIdx={0}
      handleToggleLegend={action("open/close legend")}
      handlePreviousLayer={action("to previous layer")}
      handleNextLayer={action("to next layer")}
      data={[
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
              color: "#fff"
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
            }
          ]
        }
      ]}
      isOpen={true}
    />
  ))
  .add("legend open, showing flood risk", () => (
    <Legend
      handleToggleLegend={action("open/close legend")}
      handlePreviousLayer={action("to previous layer")}
      handleNextLayer={action("to next layer")}
      activeLegendIdx={2}
      data={[
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
              color: "#fff"
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
            }
          ]
        }
      ]}
      isOpen={true}
    />
  ))
  .add("legend closed", () => (
    <Legend
      handleToggleLegend={action("open/close legend")}
      handlePreviousLayer={action("to previous layer")}
      handleNextLayer={action("to next layer")}
      data={{}}
      isOpen={false}
    />
  ));
