import React, { useState, createContext } from 'react'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({data : [], min : 1500, max : 1600, filteredData : [], filters : { min : 1500, max : 1600, typeFiltered : false, subTypeFiltered : false }});

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    )
}
