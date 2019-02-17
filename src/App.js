import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./utils/bootstrap.scss";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";

import InventoryView from "./views/InventoryView";
import OffersView from "./views/OffersView";
import SettingsView from "./views/SettingsView";
import NewTradeView from "./views/NewTradeView";
import DeveloperView from "./views/DeveloperView";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={InventoryView} />
          <Route path="/offers" component={OffersView} />
          <Route path="/settings" component={SettingsView} />
          <Route exact path="/trade" component={NewTradeView} />
          <Route path="/trade/:address" component={NewTradeView} />
          <Route exact path="/developer" component={DeveloperView} />
        </Switch>
      </div>
    );
  }
}

export default App;
