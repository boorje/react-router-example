import React from "react";
import { Route, Switch } from "react-router-dom";
// Pages
import HomePage from "./pages/homePage";
import UserPage from "./pages/userPage";
import NotFoundPage from "./pages/notFoundPage";

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/:id" component={UserPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
