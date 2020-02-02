import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './pages/Auth';
import { LinksPage } from './pages/Links';
import { CreatePage } from './pages/Create';
import { DetailPage } from './pages/Detail';

export const useRoutes = isAuthentificated => {
  if (isAuthentificated) {
    return (
      <Switch>
        <Route exact path="/links">
          <LinksPage />
        </Route>
        <Route exact path="/create">
          <CreatePage />
        </Route>
        <Route path="/details/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  } 

  return (
    <Switch>
      <Route exact path="/">
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
