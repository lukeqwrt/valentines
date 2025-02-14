import React, { createContext, useState } from "react";

// Create Context
export const GlobalContext = createContext(null);

// Create Provider Component
export const GlobalProvider = ({ children }) => {
    const [foodState, setFoodState] = useState({}); // Initialize with an empty array

    return (
        <GlobalContext.Provider value={{ foodState, setFoodState }}>
            {children}
        </GlobalContext.Provider>
    );
};
