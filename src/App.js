import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./components/";
import { HeroCardSection, SavedData, StockDetails } from "./containers/";

const App = () => {
  return (
    <>
      <Header />
      <HeroCardSection />
      <Router>
        <Switch>
          <Route path="/" exact component={StockDetails} />
          <Route path="/view" exact component={SavedData} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
