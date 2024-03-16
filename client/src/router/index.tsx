import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { routes } from './routes'

/*
 * As per the instructions of createBrowser router in
 * https://reactrouter.com/en/main/routers/create-browser-router#createbrowserrouter,
 * we need to create the router instance OUTSIDE of the react tree or else loaders
 * and whatnot can run twice if strict mode is on.
 *
 * See https://github.com/remix-run/react-router/discussions/10605 as well.
 */
const router = createBrowserRouter(createRoutesFromElements(routes))

export default function ReactRouterProvider() {
  return <RouterProvider router={router} />
}
