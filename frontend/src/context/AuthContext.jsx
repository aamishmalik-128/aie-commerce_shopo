import React, { createContext } from 'react'
export const AuthContext = createContext()
function AuthContextProvider ({children}) {

    let serverURL = "http://localhost:8000"
    let value = {
        serverURL
    }

  return (
    <div>
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    </div>
  )
}

export default AuthContextProvider