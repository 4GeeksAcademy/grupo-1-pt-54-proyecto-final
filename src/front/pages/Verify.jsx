import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const Verify = () => {
    const [params] = useSearchParams();
    const token = params.get("token");
    const [msg, setMsg] = useState();


    const verifyToken = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/verify/${token}`);
            if (!response.ok) throw new Error("Error al verificar el token");

            const body = await response.json();
            setMsg(body.msg);
        } catch (error) {
            console.log(error);
            setMsg(error.message);
        }
    }
    useEffect(() => {
        verifyToken()
    }, []);
    return (
        <div style={{ position: "relative", width: "100%", height: "88vh", overflow: "hidden" }}>
            <Navbar />
            <img
                src="https://files.123freevectors.com/wp-content/original/154086-abstract-blue-and-white-graphic-background.jpg"
                alt="background image"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", transform: "translate(20%, -50%)", fontFamily: "Libre Baskerville, serif", textAlign: "center", alignSelf: "anchor-center" }}>
                <h2>Your email has been verified successfully! You can now login.</h2>
            </div>
        </div>
    )
}
