import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (!user) {
        return <Navigate to="/login" />;
    }

    const userRole=user["userRole"]
    // console.log(userRole);

    if(userRole===1){
        return (
            <div>
                <AppBar
                    pages={[
                        { label: "manageChild", path: "manageChild" },
                        { label: "Feeding", path: "feeding" },
                        { label: "Poem", path: "poemList" },
                        { label: "Vaccine", path: "vaccine" },
                        { label: "Medicine", path: "medicineList" },
                        { label: "Allergy", path: "allergyList" },
                        { label: "History", path: "HistoryList" }

                    ]}
                />
                {outlet}
            </div>
        );
    }else{
        return (
            <div>
                <AppBar
                    pages={[
                        { label: "manageChild_n", path: "manageChild" },
                        { label: "Feeding_n", path: "feeding" },
                        { label: "Poem_n", path: "poemList" },
                        { label: "Vaccine_n", path: "vaccine" },
                        { label: "Medicine_n", path: "MedicineList" },
                        { label: "Allergy_n", path: "allergyList" }

                    ]}
                />
                {outlet}
            </div>
        );
    }

};
