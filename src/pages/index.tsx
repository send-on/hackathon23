import Description from '@/components/Description'
import LookupUser from '@/components/Lookup'
import Traits from '@/components/Traits'
import Events from '@/components/Events'
import { AppContext } from '@/context/AppProvider'
import { useContext, useEffect } from 'react'



export default function Home() {
  const { setSpaceID, setProfileKey, setContext, setTemp, setWriteKey }:any = useContext(AppContext)
  useEffect(() => { 
    if (localStorage.getItem('spaceID')) {
      setSpaceID(localStorage.getItem('spaceID'))
    }
    if (localStorage.getItem('profileKey')) {
      setProfileKey(localStorage.getItem('profileKey'))
    }
    if (localStorage.getItem('context')) {
      setContext(localStorage.getItem('context'))
    }
    if (localStorage.getItem('temp')) {
      setTemp(localStorage.getItem('temp'))
    }
    if (localStorage.getItem('writeKey')) {
      setWriteKey(localStorage.getItem('writeKey'))
    }
  },[])

  return (
    <div> 
      <LookupUser />
      <div>
        <Description />
      </div>
      <div className='flex'>
        <div className='flex-2' style={{minWidth:"500px"}} >
          <Traits />

        </div>
        <div className='flex-1'>
          <Events />
        </div>
        
      </div>

    </div>
    

  )
}
