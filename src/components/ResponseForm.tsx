import { useState, useEffect, useContext } from 'react'
import { Button, toaster } from 'evergreen-ui'
import { TextArea } from '@twilio-paste/core';
import { AppContext } from '@/context/AppProvider';

export const ResponseForm = () => {  
  const { response, setResponse }:any = useContext(AppContext)

  const [text, setText] = useState(response);
  

  useEffect(()=> {
    setText(response);
  }, [response])

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (response.length > 0) {
        setResponse(e.target.response.value);
      } else {
        
      }
    }
    catch(e) {
      
    }
  }

  const handleChange = (e) => {
    setText(e.target.value);
  }

  return (
    <form style={{width: "100%", marginTop: "10px"}} onSubmit={onSubmit}>
        <TextArea className="h-48" resize='vertical' onChange={handleChange} type="text" name="response" value={text} />
        <div className='mt-2 text-center'>
        </div>
    </form>
  )
}