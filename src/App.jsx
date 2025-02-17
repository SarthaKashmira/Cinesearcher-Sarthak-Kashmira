import { PageNotFound } from "components/commons";
import Favorites from "components/Favorites";
import List from "components/Movie/List";
import { Switch, Redirect, Route } from "react-router-dom";
import { routes } from "routes";

import "./App.css";

const App = () => (
  <Switch>
    <Route component={List} path={routes.home} />
    <Route component={Favorites} path={routes.favorite} />
    <Redirect from="/" to={routes.home} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
