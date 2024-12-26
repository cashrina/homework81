import { Routes, Route } from "react-router-dom";
import Link from "./components/Link.tsx";

function App() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Link />} />
            </Routes>
        </div>
    );
}

export default App;


