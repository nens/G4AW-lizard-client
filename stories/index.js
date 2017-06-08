import runModal from "./ModalStories";
runModal();

import runDetailViewHeader from "./DetailViewHeaderStories";
runDetailViewHeader();

import runDetailViewSection from "./DetailViewSectionStories";
runDetailViewSection();

import runTabBar from "./TabBarStories";
runTabBar();

// storiesOf("TabBar", module)
//   .addDecorator(getStory => (
//     <I18nextProvider i18n={i18n}>
//       <Provider store={theStore}>
//         {getStory()}
//       </Provider>
//     </I18nextProvider>
//   ))
//   .add("Tab 1 of 3 open", () => (
//     <TabBar isSelected={0} handleTabClick={action("handleTabClick()")}>
//       <Tab title="Settings">
//         <HeaderBar title="Map Settings" />
//       </Tab>
//       <Tab title="Account">
//         Tab two
//       </Tab>
//       <Tab title="Help">
//         Tab three
//       </Tab>
//     </TabBar>
//   ))
//   .add("Tab 2 of 3 open", () => (
//     <TabBar isSelected={1} handleTabClick={action("handleTabClick()")}>
//       <Tab title="Settings">
//         Tab one
//       </Tab>
//       <Tab title="Account">
//         <HeaderBar title="Account Settings" />
//       </Tab>
//       <Tab title="Help">
//         Tab three
//       </Tab>
//     </TabBar>
//   ))
//   .add("Tab 3 of 3 open", () => (
//     <TabBar isSelected={2} handleTabClick={action("handleTabClick()")}>
//       <Tab title="Settings">
//         Tab one
//       </Tab>
//       <Tab title="Account">
//         Tab two
//       </Tab>
//       <Tab title="Help">
//         <HeaderBar title="Support" />
//       </Tab>
//     </TabBar>
//   ));

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

import runSimpleLineChart from "./SimpleLineChartStories";
runSimpleLineChart();
