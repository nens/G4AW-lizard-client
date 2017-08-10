import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { HeaderBar, FlatButton } from ".";
import styles from "./styles/SettingsViewHelp.css";

class SettingsViewHelpComponent extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className={styles.SettingsViewHelpComponent}>
        <HeaderBar title={t("Help")} />
        <div style={{ padding: "0 20px 0 20px" }}>
          <h4>
            {t("Introduction")}
          </h4>
          <p>
            {t("This app is provided")}
          </p>
          <p>
            {t("For any issues regarding")}
          </p>

          <hr />
          <h4>
            {t("Welcome screen")}
          </h4>
          <p>
            {t("When you first open the app")}
          </p>
          <p>
            {t("After you have logged in")}
          </p>
          <ul>
            <li>
              {t("Search bar")}
            </li>
            <li>
              {t("Zoom to your location")}
            </li>
            <li>
              {t("Navigate on map")}
            </li>
          </ul>
          <p>
            {t("The three ways of finding")}
          </p>

          <h5>
            1) {t("Search bar")}
          </h5>
          <p>
            {t("The search bar is positioned")}
          </p>
          <ul>
            <li>
              {t("Field code")} ({t("example")}: 350518647-16-1)
            </li>
            <li>
              {t("Farmer name")} ({t("example")}: Nguyen)
            </li>
          </ul>
          <p>
            {t("The search results are presented in a list")}
          </p>

          <h5>
            2) {t("Zoom to your location")}
          </h5>
          <p>
            {t("By tapping on the big arrow")}
          </p>
          <p>
            {t("When the GPS of your device it active")}
          </p>

          <h5>
            3) {t("Navigate on map")}
          </h5>
          <p>
            {t("In the welcome screen")}
          </p>
          <p>
            {t("Tapping the button in the bottom-right")}
          </p>

          <hr />
          <h4>
            {t("Farm field information")}
          </h4>
          <p>
            {t("Once you have selected one of the farm fields")}
          </p>
          <ul>
            <li>
              {t("Field characteristics")}
            </li>
            <li>
              {t("Rice growth")}
            </li>
            <li>
              {t("Pest risk")}
            </li>
            <li>
              {t("Flood risk")}
            </li>
          </ul>

          <p>
            {t("By tapping, a tab can be opened or closed")}
          </p>
          <p>
            {t("Tapping the arrow on top of the screen")}
          </p>
          <p>
            {t("The following items are available for ")}
          </p>

          <table>
            <tbody>
              <tr>
                <td colSpan="2">
                  {t("Field information")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Farm ID")}
                </td>
                <td>
                  {t("A unique code for the field, for example")}:
                  352404946-16-1 (HTX)
                  <br />
                  {t("First part")}: {t("code of farmer")}
                  <br />
                  {t("Second part")}:
                  {t("number of seasons affiliated to Loc Troi Group")}
                  <br />
                  {t("Third part")}:
                  {t("HTX means farmer is part of the cooperation")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Cooperation")}
                </td>
                <td>
                  {t("Farmer is part of the cooperation")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Name of farmer")}
                </td>
                <td>
                  {t(
                    "Name of the farmer that is responsible for the rice field"
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Field size")}
                </td>
                <td>
                  {t(
                    "The field size in hectares, automatically calculated by app"
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Name of Farmer Friend")}
                </td>
                <td>
                  {t(
                    "Name of the Farmer Friend/ 3C Force worker that visits the field"
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Date of last visit")}
                </td>
                <td>
                  {t("The last time the Farmer Friend visited the field")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Special situation")}
                </td>
                <td>
                  {t(
                    "Special situation that is noted during the visit of the Farmer Friend"
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td colSpan="2">
                  {t("Rice Growth")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Expected harvest date")}
                </td>
                <td>
                  {t("The estimated date on which the rice can be harvested")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Days after sowing")}
                </td>
                <td>
                  {t("Number of days after the last known sowing date")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Sowing date")}
                </td>
                <td>
                  {t("Date of the last known sowing")}
                </td>
              </tr>

              <tr>
                <td>
                  {t("Growth stage")}
                </td>
                <td>
                  {t("Indicates the last known growth stage")}
                </td>
              </tr>

              <tr>
                <td>
                  {t("Plant height")}
                </td>
                <td>
                  {t("The last known height of the plant")}
                </td>
              </tr>

              <tr>
                <td>
                  {t("Crop condition")}
                </td>
                <td>
                  {t("The last known condition of the crop")}
                </td>
              </tr>

              <tr>
                <td>
                  {t("Number of stems")}
                </td>
                <td>
                  {t(
                    "The number of rice stems per square meter, important for estimating potential yield and pest risks"
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  {t("Variety")}
                </td>
                <td>
                  {t("Rice variety that is cultivated in the current season")}
                </td>
              </tr>

              <tr>
                <td>
                  {t("Last season yield")}
                </td>
                <td>
                  {t("The average dry rice yield (ton/ha) of")}
                </td>
              </tr>

              <tr>
                <td>
                  {t("Last season number of stems")}
                </td>
                <td>
                  {t("The number of rice stems per hectare of the last season")}
                </td>
              </tr>

              <tr>
                <td>
                  {t("Price of paddy")}
                </td>
                <td>
                  {t("The price of the paddy in VND per ton")}
                </td>
              </tr>

              <tr>
                <td>
                  {t("Last season variety")}
                </td>
                <td>
                  {t("Rice variety that was cultivated the previous season")}
                </td>
              </tr>

              <tr>
                <td>
                  {t("Last season harvest date")}
                </td>
                <td>
                  {t("The harvest date of the previous season")}
                </td>
              </tr>

              <tr>
                <td>
                  {t("Last season sowing date")}
                </td>
                <td>
                  {t("The sowing date of the previous season")}
                </td>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td colSpan="2">
                  {t("Pest Risk")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Pest risk")}
                </td>
                <td>
                  {t("The pest risk is calculated based on an algorithm")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Brown plant hopper present")}
                </td>
                <td>
                  {t(
                    "Indicates if the Brown plant hopper has been observed recently in that field"
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Leaffolder present")}
                </td>
                <td>
                  {t(
                    "Indicates if the Leaffolder has been observed recently in that field"
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Blast present")}
                </td>
                <td>
                  {t(
                    "Indicates if Blast has been observed recently in that field"
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Brown plant hopper risk")}
                </td>
                <td>
                  {t("The brown plant hopper risk is calculated based on ")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Leaffolder risk")}
                </td>
                <td>
                  {t("The leaffolder risk is calculated based on an")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Blast risk")}
                </td>
                <td>
                  {t("The blast risk is calculated based on an algorithm")}
                </td>
              </tr>
            </tbody>
          </table>

          <table>
            <tbody>
              <tr>
                <td colSpan="2">
                  {t("Flood Risk")}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Flood risk")}
                </td>
                <td>
                  {t(
                    "This presents the current flood risk level of the Mekong River"
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {t("Flood level")}
                </td>
                <td>
                  {t(
                    "Flood level indicates the current water level in the Mekong River "
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <hr />
          <h4>
            {t("Settings menu")}
          </h4>
          <p>
            {t("In the setting menu, you can switch")}
          </p>

          <hr />
          <h4>
            {t("Data collection")}
          </h4>
          <p>
            {t("Through the data collection tab")}:
          </p>
          <ul>
            <li>
              {t("Once")}:
              {t("Fill in one-time information at the start of the season.")}
            </li>
            <li>
              {t("Weekly")}:
              {t(
                "A form that allows to send weekly updates on the current status of the rice growth."
              )}
            </li>
          </ul>

          <hr />
          <h4>
            {t("Contact")}
          </h4>
          <p>
            {t("For any questions regarding the app")}
          </p>
          <p>
            Cuong Vu Truong (Loc Troi Group)<br />
            <a href="mailto:cuong.v.truong@loctroi.vn">
              cuong.v.truong@loctroi.vn
            </a>
          </p>
          <p>
            Nanne Tolsma (international)<br />
            <a href="mailto:tolsma@satelligence.com">tolsma@satelligence.com</a>
          </p>

          <hr />
          <h4>
            {t("About")}
          </h4>
          <p>
            {t("This app is part of the Sat4Rice project")}
          </p>
        </div>
      </div>
    );
  }
}

/* react-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

const SettingsViewHelp = connect(mapStateToProps, mapDispatchToProps)(
  SettingsViewHelpComponent
);
export default translate()(SettingsViewHelp);
