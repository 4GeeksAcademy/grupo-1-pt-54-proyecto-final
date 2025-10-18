// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { RegistroUsuario } from "./pages/RegistroUsuario";
import SearchComponent from "./components/SearchComponent";
import { Login } from "./pages/Login";
import { LandingPage } from "./pages/LandingPage";
import { Recuperacion } from "./pages/Recuperacion";
import { LibroIndividual } from "./components/LibroIndividual";
import { EliminarLibro } from "./components/EliminarLibro";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      <Route index element={<LandingPage />} />

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path="/search-component" element={<SearchComponent />} />
        <Route path="/libro-individual/:id" element={<LibroIndividual />} />
        <Route path="/dashboard" element={<LibroIndividual />} />
        <Route path="/registro-usuario" element={<RegistroUsuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperacion" element={<Recuperacion />} />
        <Route path="/eliminar-libro" element={<EliminarLibro />} />
    </Route>
  ))
