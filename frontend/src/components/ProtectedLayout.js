import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <AppBar
                pages={[
                    { label: "Profile", path: "profile" },
                    { label: "Feeding", path: "feeding" },
                    { label: "Poem", path: "poemList" }
                ]}
            />
            {outlet}
        </div>
    );
};
