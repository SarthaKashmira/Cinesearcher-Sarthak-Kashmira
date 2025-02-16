import { PageLoader } from "components/commons";
import List from "components/Movie/List";
import { Switch, Redirect, Route } from "react-router-dom";

import "./App.css";
// eslint-disable-next-line import/extensions

const App = () => (
  <Switch>
    <Route component={List} path="/home" />
    <Redirect from="/" to="/home" />
    <Route component={PageLoader} path="*" />
  </Switch>
);

export default App;
