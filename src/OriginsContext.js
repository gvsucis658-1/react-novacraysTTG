import React, { createContext, useState, useContext, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const OriginsContext = createContext();

export const OriginsProvider = ({children}) => {
    const [origins, setOrigins] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "origins"), (snapshot) => {
        const originsData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        setOrigins(originsData); 
        });
    
        return () => unsubscribe();
    }, []);

    return (
        <OriginsContext.Provider value={{origins, setOrigins}}>
            {children}
        </OriginsContext.Provider>
    );
}

export const useOrigins = () => {
    return useContext(OriginsContext)
}

