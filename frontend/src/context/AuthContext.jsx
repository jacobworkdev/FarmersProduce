import { createContext, useState, useEffect } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        //get the token and the user id of the farmer from the local storage
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
        // if both token and the user id is present mount and set state
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser))
            setToken(storedToken)
        }
    }, [])

    const login = (userData, token) => {
        //save and set the local storage user variable equal to the logged in user id
        localStorage.setItem(user, JSON.stringify(userData))
        localStorage.setItem('token', token)
    }
    const logout = () => {
        //remove the user id and the token from local storage
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext