import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import {useLocation} from "react-router-dom"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const location=useLocation()
    const isRegisterPath = location.pathname =="/registro-usuario" ? true : false
    const isLoginPath = location.pathname == "/login" ? true : false
    
    /*use condicional to not show navbar y footer in other  ==*/
    return (
        <ScrollToTop>
            {isRegisterPath || isLoginPath ? "" : <Navbar />}
                <Outlet />
            {isRegisterPath || isLoginPath  ? "" : <Footer />}
        </ScrollToTop>
    )
}