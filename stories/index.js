import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { storiesOf, action } from "@kadira/storybook";
import { theStore } from "../src/store/Store";
import CollapsibleBar from "../src/components/CollapsibleBar.jsx";
import DetailViewHeader from "../src/components/DetailViewHeader.jsx";
import DetailViewSection from "../src/components/DetailViewSection.jsx";
import DetailViewTable from "../src/components/DetailViewTable.jsx";
import FlatButton from "../src/components/FlatButton.jsx";
import FooterBar from "../src/components/FooterBar.jsx";
import HeaderBar from "../src/components/HeaderBar.jsx";
import i18n from "../src/i18n"; // initialized i18next instance
import InputField from "../src/components/InputField.jsx";
import ListSearchView from "../src/components/ListSearchView.jsx";
import LoginLogoutButton from "../src/components/LoginLogoutButton.jsx";
import MapSearchView from "../src/components/MapSearchView.jsx";
import Modal from "../src/components/Modal.jsx";
import DetailViewPhoto from "../src/components/DetailViewPhoto.jsx";
import PhotoGallery from "../src/components/PhotoGallery.jsx";
import RaisedButton from "../src/components/RaisedButton.jsx";
import React from "react";
import SearchBar from "../src/components/SearchBar.jsx";
import SearchResultCard from "../src/components/SearchResultCard.jsx";
import SnackBar from "../src/components/SnackBar.jsx";
import ToggleSwitch from "../src/components/ToggleSwitch.jsx";
import ViewSwitchButton from "../src/components/ViewSwitchButton.jsx";

storiesOf("Modal", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("modal open", () => (
    <Modal
      open={true}
      title="Login"
      actionButtons={[
        <FlatButton buttonText="Cancel" handleOnClick={action("clicked")} />,
        <FlatButton buttonText="Log in" handleOnClick={action("clicked")} />
      ]}
    >
      <div>
        <p>To view private data, please use your credentials to log in</p>
        <div>
          <InputField hintText="Username" />
        </div>
        <div>
          <InputField hintText="Password" type="password" />
        </div>
      </div>
    </Modal>
  ))
  .add("modal closed", () => <Modal open={false} />);

storiesOf("DetailViewHeader", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("example", () => (
    <DetailViewHeader
      latlonzoom={{ lat: 10.7880, lon: 106.7050, zoom: 17 }}
      title="LocTroi Farm ID"
      subTitle="Field address here"
      handleBackButtonClick={action("clicked")}
    />
  ))
  .add("half mode", () => (
    <DetailViewHeader
      halfMode={true}
      latlonzoom={{ lat: 10.7880, lon: 106.7050, zoom: 17 }}
      title="LocTroi Farm ID"
      subTitle="Field address here"
      handleBackButtonClick={action("clicked")}
    />
  ))
  .add("very long title", () => (
    <DetailViewHeader
      latlonzoom={{ lat: 10.7880, lon: 106.7050, zoom: 17 }}
      title="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      subTitle="Field address here"
      handleBackButtonClick={action("clicked")}
    />
  ))
  .add("very long subtitle", () => (
    <DetailViewHeader
      latlonzoom={{ lat: 10.7880, lon: 106.7050, zoom: 17 }}
      title="LocTroi Farm ID"
      subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      handleBackButtonClick={action("clicked")}
    />
  ))
  .add("vietnamese", () => (
    <DetailViewHeader
      latlonzoom={{ lat: 10.7880, lon: 106.7050, zoom: 17 }}
      title="Hàng Tiệc Cưới Hàng Tiệc Cưới"
      subTitle="Đây là tiếng Việt"
      handleBackButtonClick={action("clicked")}
    />
  ))
  .add("header image instead of map background", () => (
    <DetailViewHeader
      headerImage="http://i.imgur.com/vUWMZth.jpg"
      title="Hàng Tiệc Cưới Hàng Tiệc Cưới"
      subTitle="Đây là tiếng Việt"
      handleBackButtonClick={action("clicked")}
    />
  ));

storiesOf("DetailViewPhotoSection", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("photo gallery", () => (
    <DetailViewSection title="Photos" open={true}>
      <PhotoGallery
        images={[
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
        ]}
      />
    </DetailViewSection>
  ));

storiesOf("DetailViewSection", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("rice growth open", () => (
    <DetailViewSection title="Rice Growth" colorCode="#FFBF1D" open={true}>
      <DetailViewTable
        data={[
          { key: "Pest Risk", value: "High" },
          { key: "Brown plant hopper present", value: "Yes" },
          { key: "Leaf Folder present", value: "No" },
          { key: "Blast present", value: "Yes" },
          { key: "Brown plant hopper risk", value: "High" },
          { key: "Leaf Folder risk", value: "Low" },
          { key: "Blast risk", value: "Medium" }
        ]}
      />
    </DetailViewSection>
  ))
  .add("rice growth closed", () => (
    <DetailViewSection title="Rice Growth" subtitle="Stage 4" open={false}>
      <DetailViewTable
        data={[
          { key: "Brown plant hopper present", value: "Yes" },
          { key: "Leaf Folder present", value: "No" },
          { key: "Blast present", value: "Yes" },
          { key: "Brown plant hopper risk", value: "High" },
          { key: "Leaf Folder risk", value: "Low" },
          { key: "Blast risk", value: "Medium" }
        ]}
      />
    </DetailViewSection>
  ));

storiesOf("DetailViewTable", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("sample data", () => (
    <DetailViewTable
      data={[
        { key: "Brown plant hopper present", value: "Yes" },
        { key: "Leaf Folder present", value: "No" },
        { key: "Blast present", value: "Yes" },
        { key: "Brown plant hopper risk", value: "High" },
        { key: "Leaf Folder risk", value: "Low" },
        { key: "Blast risk", value: "Medium" }
      ]}
    />
  ))
  .add("no data", () => <DetailViewTable data={[]} />);

storiesOf("DetailViewPhoto", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("open at index 0", () => (
    <DetailViewPhoto
      currentPhoto={0}
      images={[
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
      ]}
    />
  ))
  .add("open at index 1", () => (
    <DetailViewPhoto
      currentPhoto={1}
      images={[
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
      ]}
    />
  ))
  .add("open at index 2", () => (
    <DetailViewPhoto
      currentPhoto={2}
      images={[
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
      ]}
    />
  ));

storiesOf("CollapsibleBar", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("rice growth closed", () => (
    <CollapsibleBar title="Rice Growth" subTitle="Stage 4" open={false} />
  ))
  .add("rice growth open", () => (
    <CollapsibleBar title="Rice Growth" subTitle="Stage 4" open={true} />
  ))
  .add("rice growth open, colored", () => (
    <CollapsibleBar title="Rice Growth" colorCode="#FFBF1D" open={true} />
  ));

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
      title="Hàng Tiệc Cưới Hàng Tiệc Cưới"
      subtitle="BTR-Q-31673"
    />
  ))
  .add("colored indicator", () => (
    <SearchResultCard
      handleClick={action("clicked")}
      indicatorColor="#ff0000"
      title="Hàng Tiệc Cưới Hàng Tiệc Cưới"
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

storiesOf("FlatButton", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      {getStory()}
    </I18nextProvider>
  ))
  .add("flat button example", () => (
    <FlatButton buttonText="I am Flat" handleOnClick={action("clicked")} />
  ));

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

storiesOf("SnackBar", module)
  .add("default", () => (
    <SnackBar
      open={true}
      message={"This is a test"}
      action={"OK"}
      onActionTap={action("clicked")}
    />
  ))
  .add("timeout", () => (
    <SnackBar
      autoHideDuration={5000}
      open={true}
      message={"This closes after 5 seconds"}
      action={"Fine"}
      onActionTap={action("clicked")}
    />
  ))
  .add("long string", () => (
    <SnackBar
      open={true}
      message={"This is a very long string that could break the ui"}
      action={"OK"}
      onActionTap={action("clicked")}
    />
  ))
  .add("long action string", () => (
    <SnackBar
      open={true}
      message={"This is a test"}
      action={"Now click this button"}
      onActionTap={action("clicked")}
    />
  ))
  .add("in vietnamese", () => (
    <SnackBar
      open={true}
      message={"Đây là tiếng Việt"}
      action={"được"}
      onActionTap={action("clicked")}
    />
  ))
  .add("with submessage", () => (
    <SnackBar
      open={true}
      message={"This is a SnackBar"}
      subMessage={"with a sub message"}
      action={"OK"}
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

storiesOf("InputField", module)
  .add("empty inputfield", () => <InputField />)
  .add("with hinttext", () => <InputField hintText="Username" />)
  .add("type=password", () => (
    <InputField type="password" hintText="Password" />
  ));

storiesOf("ToggleSwitch", module)
  .add("example: selected", () => (
    <ToggleSwitch
      defaultSelected={true}
      labelText="Some setting"
      onChange={action("Clicked")}
      labelOnText="On"
      labelOffText="Off"
    />
  ))
  .add("example: not selected", () => (
    <ToggleSwitch
      defaultSelected={false}
      labelText="Some setting"
      onChange={action("Clicked")}
      labelOnText="On"
      labelOffText="Off"
    />
  ));

storiesOf("FooterBar", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      <Provider store={theStore}>
        {getStory()}
      </Provider>
    </I18nextProvider>
  ))
  .add("example", () => (
    <FooterBar>
      <div>
        <i className="material-icons">access_time</i>
      </div>
      <div>
        <i className="material-icons">list</i>
      </div>
    </FooterBar>
  ));
