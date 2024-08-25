import GlobalContext from "../context/GlobalContext";
import { useContext } from "react";

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw Error("GlobalContext must be used inside application");
    }

    return context;
}