import React, {createContext, useState, useEffect} from 'react'
import io from 'socket.io-client'

export const DataContext = createContext()

export const DataProvider = ({children}) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const socket = io()
        return () =>  socket.close()
    },[])

    const state = {
        products: [products, setProducts],
        socket
    }

    return(
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )
}