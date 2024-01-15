import Description from '@/components/Description'
import LookupUser from '@/components/Lookup'
import Traits from '@/components/Traits'
import Events from '@/components/Events'
import { AppContext } from '@/context/AppProvider'
import { useContext } from 'react'


export default function Home() {
  const { userTraits, userEvents }:any = useContext(AppContext)

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
