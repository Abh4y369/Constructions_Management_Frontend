import { Routes, Route } from "react-router-dom";

import Auth from "../Pages/Auth";
import Dashboard from "../Pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>

            <Route path="/" element={<Auth />}/>
            <Route path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
};

export default AppRoutes;
