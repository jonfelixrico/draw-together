import { RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { routes } from "./routes"

export default function ReactRouterProvider () {
  const router = createBrowserRouter(createRoutesFromElements(routes))
  return <RouterProvider router={router} />
}