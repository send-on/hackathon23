import { Button, TextInput, toaster } from 'evergreen-ui'
import { useContext, useState } from 'react'
import { AppContext } from '@/context/AppProvider';
import axios from 'axios';
import { Analytics } from '@segment/analytics-node'
import Settings from "@/components/Settings";

const LookupUser = () => {
  const { user, setUser, setUserTraits, setUserEvents, temp, setTemp, context, setContext, profileKey, spaceID }:any = useContext(AppContext)
  const analytics = new Analytics({ writeKey: process.env.NEXT_PUBLIC_TRACKING_WRITEKEY,
    flushAt: 15,
    flushInterval: 1000
  })
  const [notes, setNotes] = useState('')


  const submitNotes = async () => {
    const currentTime = new Date()
    if (notes.includes(":")) {
      let temp_arr = notes.split(":")
      analytics.identify({
        userId: user,
        traits: {
          [temp_arr[0]]: temp_arr[1]
        }
      })
      toaster.success(`Trait: ${temp_arr[0]} Value: ${temp_arr[1]}`)
    } else {
      analytics.identify({
        userId: user,
        traits: {
          [`notes${JSON.stringify(currentTime)}`]: notes
        }
      })
      toaster.success(`Notes: ${notes}`)
    }
    
  }


  const prapiUser = async (user: string) => {
    try {
      let userInfo = await axios.post('/api/prapi', {
        data: {user: user, profileKey: profileKey, spaceID: spaceID }
      })
      setUserTraits(userInfo.data.traits)
      setUserEvents(userInfo.data.events)
      toaster.success(`User: ${user}`)
    }
    catch (e) {
      toaster.danger(`User: ${user} not found`)
      console.log(e)
    }
  }


  return (
    <div className='section'>
      <div className='flex' >
        <div className="input-box flex-1">
          <div className='header mb-2' >Enter User ID to Lookup Profile</div>
          <TextInput type="text" placeholder="userId"  onChange={e => setUser(e.target.value)} />
          <Button appearance='primary' style={{marginLeft: "2em"}}  onClick={()=>prapiUser(user)} >{`Submit`}</Button>
        </div>
        <div className="input-box flex-1">
        <div className='header mb-2' >Add Trait to Profile</div>
          <TextInput type="text" placeholder="Add Notes to Profile as Trait"  onChange={e => setNotes(e.target.value)} />
          <Button style={{marginLeft: "2em"}}  onClick={()=>submitNotes(notes)} >{`Add Trait`}</Button>
        </div>
        <div className="input-box flex-1">

        <div className='header mb-2' >API and Context Settings</div>
        <div className="text-left">
            <Settings 
            temp={temp}
            setTemp={setTemp}
            context={context}
            setContext={setContext}
          /></div>
        </div>
        
      </div>
    </div>
  )
}

export default LookupUser



