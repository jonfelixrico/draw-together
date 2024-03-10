import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routes } from "./routes"

export default function ReactRouterProvider () {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}