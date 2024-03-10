import { Route } from "react-router-dom";

export const routes = <>
  <Route path="/" lazy={() => import('../pages/Index')} />
  <Route path="/rooms/:roomId" lazy={() => import('../pages/Room')} />
</>