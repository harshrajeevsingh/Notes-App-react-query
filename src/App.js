import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import EditNote from "./components/EditNote";
import FindNote from "./components/FindNote";
import Layout from "./components/Layout";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import { queryClient } from "./utility/queryClient";
import ViewNote from "./components/ViewNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/notes"} />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/notes",
        element: <Notes />,
      },
      { path: "/new-note", element: <NewNote /> },
      { path: "/view-note/:id", element: <ViewNote /> },
      { path: "/edit-note/:id", element: <EditNote /> },
      { path: "/find-note", element: <FindNote /> },
    ],
  },
]);

function App() {
  return (
    // Wrapped thye whole app within provider, so it's accessible throughout the app
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
