import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PrivatePage from "./components/PrivatePage/PrivatePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  { path: "/", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/private",
    element: (
      <PrivateRoute>
        <PrivatePage />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
