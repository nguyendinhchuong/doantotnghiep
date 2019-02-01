import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AddOS from "./AddOS";
import HistoryOS from "./HistoryOS";
import VertNavigator from "./VertNavigator";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <AddOS />
        <HistoryOS />
        <VertNavigator />
        <Footer />
      </div>
    );
  }
}

export default App;
