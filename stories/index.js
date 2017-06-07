import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { storiesOf, action } from "@kadira/storybook";
import { theStore } from "../src/store/Store";
import HeaderBar from "../src/components/HeaderBar.jsx";
import i18n from "../src/i18n"; // initialized i18next instance
import ListSearchView from "../src/components/ListSearchView.jsx";
import LoginLogoutButton from "../src/components/LoginLogoutButton.jsx";
import MapSearchView from "../src/components/MapSearchView.jsx";
import RaisedButton from "../src/components/RaisedButton.jsx";
import React from "react";
import SearchBar from "../src/components/SearchBar.jsx";
import SearchResultCard from "../src/components/SearchResultCard.jsx";
import SimpleLineChart from "../src/components/SimpleLineChart.jsx";
import SnackBar from "../src/components/SnackBar.jsx";
import { Tab, TabBar } from "../src/components/TabBar.jsx";
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

storiesOf("TabBar", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("Tab 1 of 3 open", () => (
    <TabBar isSelected={0} handleTabClick={action("handleTabClick()")}>
      <Tab title="Settings">
        <HeaderBar title="Map Settings" />
      </Tab>
      <Tab title="Account">
        Tab two
      </Tab>
      <Tab title="Help">
        Tab three
      </Tab>
    </TabBar>
  ))
  .add("Tab 2 of 3 open", () => (
    <TabBar isSelected={1} handleTabClick={action("handleTabClick()")}>
      <Tab title="Settings">
        Tab one
      </Tab>
      <Tab title="Account">
        <HeaderBar title="Account Settings" />
      </Tab>
      <Tab title="Help">
        Tab three
      </Tab>
    </TabBar>
  ))
  .add("Tab 3 of 3 open", () => (
    <TabBar isSelected={2} handleTabClick={action("handleTabClick()")}>
      <Tab title="Settings">
        Tab one
      </Tab>
      <Tab title="Account">
        Tab two
      </Tab>
      <Tab title="Help">
        <HeaderBar title="Support" />
      </Tab>
    </TabBar>
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

storiesOf("TimeseriesChart", module)
  .addDecorator(getStory => (
    <Provider store={theStore}>
      {getStory()}
    </Provider>
  ))
  .add("timeseries", () => <TimeseriesChart />);

storiesOf("SimpleLineChart", module)
  .addDecorator(getStory => (
    <Provider store={theStore}>
      {getStory()}
    </Provider>
  ))
  .add("tiny and simple", () => (
    <SimpleLineChart
      lineColor="#8884d8"
      width={250}
      height={120}
      data={[
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
      ]}
    />
  ))
  .add("larger, with grid", () => (
    <SimpleLineChart
      lineColor="#8884d8"
      showGrid={true}
      width={500}
      height={300}
      data={[
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
      ]}
    />
  ));
