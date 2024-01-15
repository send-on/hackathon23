import { createContext, useState } from "react"

interface AppProvider {
  children: any
}

const AppContext = createContext({});

const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState("6220faf2"); 
  const [userTraits, setUserTraits] = useState([]); 
  const [userEvents, setUserEvents] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [response, setResponse] = useState(""); 

  return (
    <AppContext.Provider value={{ 
      user, setUser, setUserTraits, setUserEvents, userTraits, userEvents, loading, setLoading, response, setResponse
     }}>
      {children}
    </AppContext.Provider>
  )
}

export {AppProvider, AppContext}