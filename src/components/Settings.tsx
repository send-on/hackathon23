import { useEffect, useState, useContext } from 'react';
import { SideSheet, Pane, Heading, Card, Button, TextInput, IconButton, TrashIcon, Textarea, toaster } from 'evergreen-ui';
import { AppContext } from '@/context/AppProvider';

function Settings() {
  const [isShown, setIsShown] = useState(false);
  const { temp, setTemp, context, setContext, profileKey, setProfileKey, writeKey, setWriteKey, spaceID, setSpaceID }:any = useContext(AppContext)

  const handleChange = (value: any, setState: (arg0: any) => void) => {
    setState(value);
  }

  const saveSettings = (e) => {
    localStorage.setItem('spaceID', spaceID);
    localStorage.setItem('profileKey', profileKey);
    localStorage.setItem('writeKey', writeKey);
    localStorage.setItem('temp', temp);
    localStorage.setItem('context', context);
    toaster.success("Settings Saved")
  }
  const resetSettings = () => {
    localStorage.removeItem('spaceID')
    localStorage.removeItem('profileKey');
    localStorage.removeItem('writeKey');
    localStorage.removeItem('temp');
    localStorage.removeItem('context');
    toaster.success("Settings reset, refresh the page to see changes.")
  }


  return (
    <div style={{"marginLeft":"8px"}}>
      <SideSheet
        isShown={isShown}
        onCloseComplete={() => setIsShown(false)}
        containerProps={{
          display: 'flex',
          flex: '1',
          flexDirection: 'column'
        }}
      >
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16}>
            <Heading size={600}>Settings</Heading>
          </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
        <div>Space ID: <TextInput name="temp" value={spaceID} onChange={(e)=>handleChange(e.target.value, setSpaceID)} />
          </div>
          <div>Profile API Key: <TextInput name="temp" value={profileKey} onChange={(e)=>handleChange(e.target.value, setProfileKey)} />
          </div>
          <div>Write Key: <TextInput name="temp" value={writeKey} onChange={(e)=>handleChange(e.target.value, setWriteKey)} />
          </div>
          <div>Temperature (0 to 0.9): <TextInput name="temp" value={temp} onChange={(e)=>handleChange(e.target.value, setTemp)} />
          </div>
          <div>Context: <Textarea minHeight="500px" name="context" value={context} onChange={(e)=>handleChange(e.target.value, setContext)} />
          </div>
          <Button appearance="primary" intent="success" onClick={saveSettings}>Save</Button>
          <Button className="ml-2" onClick={resetSettings}>Reset</Button>
        </Pane>
      </SideSheet>
      <Button type="button" onClick={()=>setIsShown(true)} >Show Settings</Button>
    </div>
  )
}

export default Settings