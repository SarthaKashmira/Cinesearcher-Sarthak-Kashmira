import { PageNotFound } from "components/commons";
import Favorites from "components/Favorites";
import List from "components/Movie/List";
import { Switch, Redirect, Route } from "react-router-dom";
import { routes } from "routes";

import "./App.css";

const App = () => (
  <Switch>
    <Route exact component={List} path={routes.home} />
    <Route exact component={Favorites} path={routes.favorite} />
    <Redirect exact from={routes.default} to={routes.home} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
