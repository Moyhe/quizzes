import { Outlet } from "react-router";
import NavBar from "./Components/NavBar";

function App() {
    return (
        <>
            <main>
                <NavBar />
            </main>
            <Outlet />
        </>
    );
}

export default App;
