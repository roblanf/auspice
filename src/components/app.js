/*eslint-env browser*/
import React from "react";
import { connect } from "react-redux";
import { loadJSONs } from "../actions/loadData";
import { BROWSER_DIMENSIONS, NEW_DATASET } from "../actions/types";
import { restoreStateFromURL, turnURLtoDataPath } from "../util/urlHelpers"
import "whatwg-fetch"; // setup polyfill
import Radium from "radium";
import _ from "lodash";
import Title from "./framework/title";
import Background from "./framework/background";
import ToggleSidebarTab from "./framework/toggle-sidebar-tab";
import Controls from "./controls/controls";
import Frequencies from "./charts/frequencies";
import Entropy from "./charts/entropy";
import Map from "./map/map";
import TreeView from "./tree/treeView";
import queryString from "query-string";
import * as globals from "../util/globals";
import Sidebar from "react-sidebar";
import Flex from "./framework/flex";
import { titleStyles } from "../globalStyles";

/* BRIEF REMINDER OF PROPS AVAILABLE TO APP:
  React-Router v4 injects length, action, location, push etc into props,
    but perhaps it's more consistent if we access these through
    this.context.router.
  Regardless, changes in URL will trigger the lifecycle methods
    here as that is a prop of this component, whether we use it or not
  see https://reacttraining.com/react-router
*/
@connect()
@Radium
class App extends React.Component {
  constructor(props) {
    super(props);
    /* window listener to see when width changes cross thrhershold to toggle sidebar */
    /* A note on sidebar terminology:
    sidebarOpen (AFAIK) is only used via touch drag events
    sidebarDocked is the prop used on desktop.
    While these states could be moved to redux, they would need
    to be connected to here, triggering an app render anyways
    */
    const mql = window.matchMedia(`(min-width: ${globals.controlsHiddenWidth}px)`);
    mql.addListener(() => this.setState({sidebarDocked: this.state.mql.matches}));
    this.state = {
      mql,
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
  }
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  // componentWillMount() {
  // }

  componentDidMount() {
    /* This is hit on the initial load and when a browser is refreshed
    but NOT when browser back/forward buttons are used.
    */

    /* firstly, set up browser stuff for resizes etc */
    this.handleResizeByDispatching(); // initial dimensions
    window.addEventListener( // future resizes
      "resize",
      _.throttle(this.handleResizeByDispatching.bind(this), 500, {
        leading: true,
        trailing: true
      })
      /* invoke resize event at most twice per second to let redraws catch up
      Could also be _.debounce for 'wait until resize stops'
      */
    );

    /* secondly, parse URL, set URL, load data etc
    we're always going to load data here, it's just a question of what data to load!
    NOTE because the page has just loaded, there is no state to clear, we simply load
    new bits of state via the URL query and then URL pathname
    */
    // console.log("CDM")
    restoreStateFromURL(this.context.router, this.props.dispatch);
    const data_path = turnURLtoDataPath(this.context.router);
    if (data_path) {
      this.props.dispatch({type: NEW_DATASET, data: this.context.router.location.pathname});
      this.props.dispatch(loadJSONs(data_path));
    } else {
      console.log("<app> couldn't work out the dataset to load. Bad.");
    }
  }

  componentDidUpdate() {
    /* back/forward buttons used (i.e. app doesn't reload, things don't
    remount, but this is the place to detect URL changes)
    */
    // console.log("app.js CDU")
    // console.log("redux datasetPathName:", this.props.datasetPathName);
    // this.maybeFetchDataset();
  }

  handleResizeByDispatching() {
    this.props.dispatch({
      type: BROWSER_DIMENSIONS,
      data: {
        width: window.innerWidth,
        height: window.innerHeight,
        docHeight: window.document.body.clientHeight
        /* background needs docHeight because sidebar creates
        absolutely positioned container and blocks height 100% */
      }
    });
  }

  render() {
    /* there must be a better way to accomodate header. See https://github.com/balloob/react-sidebar/issues/23 */
    return (
      <Sidebar
        sidebar={
          <Controls/>
        }
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        styles={{root: {top: globals.titleBarHeight}}}
        onSetOpen={(a) => {this.setState({sidebarOpen: a});}}>
        <Background>
          <ToggleSidebarTab
            open={this.state.sidebarDocked}
            handler={() => {this.setState({sidebarDocked: !this.state.sidebarDocked});}}
          />
          <Flex style={{height: 80}}>
            <Title style={titleStyles.big}/>
          </Flex>
          <TreeView
            query={queryString.parse(this.context.router.location.search)}
            sidebar={this.state.sidebarOpen || this.state.sidebarDocked}
          />
          <Map
            sidebar={this.state.sidebarOpen || this.state.sidebarDocked}
            justGotNewDatasetRenderNewMap={false}
          />
          <Frequencies/>
          <Entropy
            sidebar={this.state.sidebarOpen || this.state.sidebarDocked}
          />
        </Background>
      </Sidebar>
    );
  }
}

export default App;
