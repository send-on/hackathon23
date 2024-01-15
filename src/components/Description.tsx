import { Button, TextInput, toaster } from 'evergreen-ui'
import { AppContext } from '@/context/AppProvider';
import { Label, TextArea, HelpText } from "@twilio-paste/core";
import { useState, useEffect, useContext } from 'react'
import { ResponseForm } from './ResponseForm';



const Description = () => {
  const { loading, setResponse, setLoading, userTraits, userEvents }:any = useContext(AppContext)
  
  

  const onSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    
    let prompt = `These are the traits: ${JSON.stringify(userTraits)} \n These are the events: ${JSON.stringify(userEvents)}`

    setResponse("");
    setLoading(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
  
      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }
  
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
  
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResponse((prev: string) => prev + chunkValue);
      }
      setLoading(false);

    } catch (e) {
      setLoading(false);
      toaster.danger(e.message, {id: 'error-toast'});
      console.log(e.message);

    }
  }

  
  return (
    <div className='sub-section'>
      <Button appearance="primary" type='submit' onClick={() => onSubmit()} isLoading={loading}>
        Generate AI Summary
      </Button>
      
      <ResponseForm  />
    </div>
  )
}

export default Description