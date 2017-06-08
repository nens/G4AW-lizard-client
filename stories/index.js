import runModal from "./ModalStories";
runModal();

import runDetailViewHeader from "./DetailViewHeaderStories";
runDetailViewHeader();

import runDetailViewSection from "./DetailViewSectionStories";
runDetailViewSection();

import runTabBar from "./TabBarStories";
runTabBar();

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

import runInputField from "./InputFieldStories";
runInputField();

import runLayerSelection from "./LayerSelectionStories";
runLayerSelection();

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

import runSimpleLineChart from "./SimpleLineChartStories";
runSimpleLineChart();

import runSnackBar from "./SnackBarStories";
runSnackBar();

import runTimeseriesChart from "./TimeseriesChartStories";
runTimeseriesChart();

import runToggleSwitch from "./ToggleSwitchStories";
runToggleSwitch();

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
