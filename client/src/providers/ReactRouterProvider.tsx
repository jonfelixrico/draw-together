import { RouterProvider, createBrowserRouter } from "react-router-dom"

export default function ReactRouterProvider () {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
  ])

  return <RouterProvider router={router} />
}