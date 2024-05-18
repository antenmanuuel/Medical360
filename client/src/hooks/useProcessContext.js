import { useContext } from "react";
import ProcessContext from "../context/ProcessContext";

export const useProcessContext = () => {
    const context = useContext(ProcessContext);

    if (!context) {
        throw Error("ProcessContext must be used inside application");
    }

    return context;
}