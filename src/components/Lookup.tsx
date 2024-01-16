import { Button, TextInput, toaster } from 'evergreen-ui'
import { useContext, useState } from 'react'
import { AppContext } from '@/context/AppProvider';
import axios from 'axios';
import { Analytics } from '@segment/analytics-node'

const LookupUser = () => {
  const { user, setUser, setUserTraits, setUserEvents }:any = useContext(AppContext)
  const analytics = new Analytics({ writeKey: 'bFUMyIN5TxsEBd0yGf2oTTA5qo4dqABK',
    flushAt: 15,
    flushInterval: 1000
  })
  const [notes, setNotes] = useState('')

  const submitNotes = async () => {
    const currentTime = new Date()
    analytics.identify({
      userId: user,
      traits: {
        [`notes${JSON.stringify(currentTime)}`]: notes
      }
    })
    toaster.success(`Notes: ${notes}`)
  }


  const prapiUser = async (user: string) => {
    try {
      let userInfo = await axios.post('/api/prapi', {
        data: {user: user}
      })
      console.log(userInfo)
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
        <div className='header mb-2' >Text or Email Customer Directly</div>
          <TextInput type="text" placeholder="Text Message"  onChange={e => setUser(e.target.value)} />
          <Button style={{marginLeft: "2em"}}  onClick={()=>prapiUser(user)} >{`Message`}</Button>
        </div>
        
      </div>
    </div>
  )
}

export default LookupUser

