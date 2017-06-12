// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import ReactDOM from "react-dom";
// import RastersMap from "./RastersMap";
// import SearchBar from "./SearchBar";
// import SearchResults from "./SearchResults";
// import SnackBar from "./SnackBar";
// import ViewSwitchButton from "./ViewSwitchButton";

// import styles from "./styles/MainScreen.css";

// class MainScreenComponent extends Component {
//   constructor() {
//     super();
//     this.state = {
//       viewportWidth: window.innerWidth,
//       viewportHeight: window.innerHeight
//     };
//   }
//   componentDidMount() {
//     window.addEventListener("resize", () => {
//       this.setState({
//         viewportWidth: window.innerWidth,
//         viewportHeight: window.innerHeight
//       });
//     });
//   }
//   render() {
//     const { ui } = this.props;
//     console.log("[dbg] ui =", ui);
//     return (
//       <div
//         className={styles.MainScreen}
//         style={{ height: this.state.viewportHeight }}
//       >

//         <div className={styles.MapView}><RastersMap /></div>

//         <SearchBar />

//         <div
//           style={{
//             flex: 1,
//             backgroundColor: "#fff"
//           }}
//         >
//           <SearchResults />

//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     ui: state.ui
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     changeView: newView => changeView(newView, dispatch)
//   };
// }

// const mainScreen = connect(mapStateToProps, null)(MainScreenComponent);
// export default MainScreen;
