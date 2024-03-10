import { Route } from "react-router-dom";

export const routes = <>
  <Route path="/" lazy={() => import('../pages/IndexPage')} />
</>