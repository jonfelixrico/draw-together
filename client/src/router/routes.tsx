import { Route } from "react-router-dom";

export const routes = <>
  <Route path="/" lazy={() => import('../layouts/MainLayout')}>
    <Route path="/" lazy={() => import('../pages/Index')} />
  </Route>
</>