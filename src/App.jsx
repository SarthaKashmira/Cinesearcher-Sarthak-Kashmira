import { Switch, Redirect, Route } from "react-router-dom";
import Home from "src/components/Home";

import "./App.css";
// eslint-disable-next-line import/extensions

const App = () => (
  <Switch>
    <Route component={Home} path="/home" />
    <Redirect from="/" to="/home" />
  </Switch>
);

export default App;
