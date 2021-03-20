import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import HeroCardSection from "./components/HeroCardSection";
import StockTable from "./components/StockTable";
import SavedDataTable from "./components/SavedDataTable";

const App = () => {
  return (
    <>
      <Header />
      <HeroCardSection />
      <Router>
        <Switch>
          <Route path="/" exact component={StockTable} />
          <Route path="/view" exact component={SavedDataTable} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
