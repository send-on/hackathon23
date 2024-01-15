import { Button, TextInput, toaster } from 'evergreen-ui'
import { useContext } from 'react'
import { AppContext } from '@/context/AppProvider';
import axios from 'axios';

const LookupUser = () => {
  const { user, setUser, setUserTraits, setUserEvents }:any = useContext(AppContext)

  const prapiUser = async (user: string) => {
    try {
      let userInfo = await axios.post('/api/prapi', {
        data: {user: user}
      })
      console.log(userInfo)
      setUserTraits(userInfo.data.traits)
      setUserEvents(userInfo.data.events)
    }
    catch (e) {
      console.log(e)
    }
    
  }

  return (
    <div className='section'>
      <div className='header mb-2' >Enter User ID to Lookup Profile</div>
      <div >
        <div className="input-box">
          <TextInput type="text" placeholder="userId"  onChange={e => setUser(e.target.value)} />
          <Button appearance='primary' style={{marginLeft: "2em"}}  onClick={()=>prapiUser(user)} >{`Submit`}</Button>
        </div>
      </div>
    </div>
  )
}

export default LookupUser

