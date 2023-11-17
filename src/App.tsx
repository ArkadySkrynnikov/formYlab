import "./styles/normalize.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import AuthorizationForm from "./components/AuthorizationForm/AuthorizationForm.tsx";

function App() {
    return (
        <>
            <div className='background'>
                <Routes>
                    <Route index element={<AuthorizationForm />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
