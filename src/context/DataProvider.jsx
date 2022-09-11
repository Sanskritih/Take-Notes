import { createContext, useState } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [notes, setNotes] = useState([]);
    const [pinnedNotes, setPinnedNotes] = useState([]);
    const [deleteNotes, setDeleteNotes] = useState([]);

    return (
        <DataContext.Provider value={{
            notes,
            setNotes,
            pinnedNotes,
            setPinnedNotes,
            deleteNotes,
            setDeleteNotes
        }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;