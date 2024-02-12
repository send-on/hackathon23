import { createContext, useState } from "react"
import { systemContent } from "@/util/config";

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
  const [profileKey, setProfileKey] = useState(process.env.NEXT_PUBLIC_PROFILE_KEY);
  const [temp, setTemp] = useState(0.2)
  const [context, setContext] = useState(systemContent)
  const [writeKey, setWriteKey] = useState(process.env.NEXT_PUBLIC_TRACKING_WRITEKEY)
  const [spaceID, setSpaceID] = useState(process.env.NEXT_PUBLIC_SPACE_ID)

  return (
    <AppContext.Provider value={{ 
      user, setUser, setUserTraits, setUserEvents, userTraits, userEvents, loading, setLoading, response, setResponse, profileKey, setProfileKey, temp, setTemp, context, setContext, writeKey, setWriteKey, spaceID, setSpaceID
     }}>
      {children}
    </AppContext.Provider>
  )
}

export {AppProvider, AppContext}