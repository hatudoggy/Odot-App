//Hooks
import { ReactNode, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'

//Icons
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { IoMdTrash } from "react-icons/io";

//Components
import IconBtn from '../IconBtn';

//CSS
import '../../App.css'
import { changeAPIKey } from '../../features/gpt/gptSlice';


function GptSettingsModal() {

  return(
    <div
      className="thin-scroll px-7 py-8 w-screen max-w-xl h-screen max-h-[28rem] overflow-y-auto overflow-x-hidden"
    >
      <APISettings/>

    </div>
  )
}

function APISettings() {
  const { apiKey } = useSelector((state: RootState) => state.gpt)
  const dispatch = useDispatch()
  const [keySetupState, setKeySetupState] = useState(apiKey !== null ? 'yesKey' : 'noKey')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSaveAPIKey = () => {
    if(inputRef.current && inputRef.current.value.length > 0){
      const apiKeyValue = inputRef.current.value
      localStorage.setItem('gptAPIKey', apiKeyValue)
      dispatch(changeAPIKey(apiKeyValue))
      setKeySetupState('yesKey')
    }
  }

  const handleDisplayShortenedKey = (key: string) => {
    const keyStart = key.slice(0, 3)
    const keyEnd = key.slice(-3)
    return `${keyStart}...${keyEnd}`
  }

  const handleAddAPIComponent = (currentState: string) => {
    switch(currentState){
      case 'noKey':
        return(
          <button
            className='py-2 px-4 bg-zinc-700 rounded-lg'
            onClick={()=>setKeySetupState('insertKey')}
          >
            Add Key
          </button>
        )

      case 'insertKey':
        return (
          <div
            className='py-1 flex gap-2'
          >
            <input 
              ref={inputRef}
              className='w-44 px-2 py-1.5 border border-zinc-500 border-opacity-20 rounded'
              placeholder='Insert api key here...'
            />
            <IconBtn 
              iconElement={<FaCheck />}
              onClick={handleSaveAPIKey}
            />
            <IconBtn 
              iconElement={<FaXmark />}
              onClick={()=>setKeySetupState('noKey')}
            />
          </div>
        )
      case 'yesKey':
        return (
          <div
            className='py-2 flex gap-3'
          >
            <div>
              {apiKey && handleDisplayShortenedKey(apiKey)}
            </div>
            <IconBtn
              iconElement={<IoMdTrash />}
            />
          </div>
        )
    }
  }

  return(
    <SettingsItem 
      title='API Key'
      description='Setup your API key here to use the app'
    >
      {handleAddAPIComponent(keySetupState)}
    </SettingsItem>
  )
}

interface SettingsItemProps {
  children?: ReactNode
  title: string
  description?: string
}

function SettingsItem({children, title, description}: SettingsItemProps) {

  return(
    <div
      className='w-full mb-5 flex'
    >
      <div
        className='flex-1'
      >
        <h1
          className='max-w-[15rem] text-lg font-medium'
        >
          {title}
        </h1>
        <p
          className='max-w-[25rem] text-sm text-white text-opacity-70'
        >
          {description}
        </p>
      </div>

      <div
        className='flex-none'
      >
        {children}
      </div>
    </div>
  )
}

export default GptSettingsModal