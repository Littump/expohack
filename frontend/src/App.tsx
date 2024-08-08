import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage";
import { ClientsPage } from "./pages/ClientsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { ThingsPage } from "./pages/ThingsPage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { ThingPage } from "./pages/ThingPage";
import { ClientCrossSalesPage } from "./pages/ClientCrossSalesPage";
import { ClientRecommendationPage } from "./pages/ClientRecommendationPage";
import { ClientHistoryPage } from "./pages/ClientHistoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/clients" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/clients",
    element: <ClientsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/clients/:id/",
    element: <Navigate to="cross-sales" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/clients/:id/cross-sales",
    element: <ClientCrossSalesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/clients/:id/personal-recommendation",
    element: <ClientRecommendationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/clients/:id/history",
    element: <ClientHistoryPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/things",
    element: <ThingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/thing/:id",
    element: <ThingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/favourites",
    element: <FavouritesPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
