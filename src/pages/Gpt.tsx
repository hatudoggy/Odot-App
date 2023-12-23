
//Components
import TextareaAutosize from 'react-textarea-autosize';
import IconBtn from '../components/IconBtn';

//Icons
import { IoSend } from 'react-icons/io5';
import { MdPlayArrow } from "react-icons/md";

//CSS
import '../App.css'
import { RadioGroup } from '@headlessui/react';

function Gpt(){

  return(
    <div
      className="w-full h-screen"
    >
      <div
        className="pl-6 py-7 w-full h-full flex"
      >
        <ChatHistory />

        <div
          className="ml-1 mr-4 w-px h-full bg-white bg-opacity-10"
        >

        </div>

        <div
          className="flex-1 flex flex-col gap-1"
        >
          <div
            className="thin-scroll flex-1 w-full rounded-lg overflow-y-auto"
          >
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
            <h1>Hatdog</h1>
          </div>

          <div
            className="pr-4 w-full flex"
          >
            <TextareaAutosize 
              className="thin-scroll h-full w-full p-3 bg-neutral-700 bg-opacity-30 rounded-2xl border border-white border-opacity-20  outline-none focus:border-opacity-40 focus:rounded-lg resize-none"
              maxRows={8}
              placeholder='Message GPT...'
            />
            <IconBtn 
              className='pl-4 pr-1 text-xl'
              iconElement={<IoSend/>}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatHistory(){

  const tempHistory = [
    {value:'a', label:'Chatting'},
    {value:'b', label:'Chatting'},
    {value:'c', label:'Chatting'},
    {value:'d', label:'Chatting'},
    {value:'e', label:'Chatting'},
    {value:'f', label:'Chatting'},
    {value:'g', label:'Chatting'},
  ]

  return(
    <RadioGroup className='thin-scroll pr-2.5 w-[14rem] h-full overflow-y-auto '>

      <div
        className='py-3.5 bg-[#242424]'
      >
        <RadioGroup.Option 
          value='new-chat'
          className="sticky top-0 px-3 py-2.5 font-semibold  cursor-pointer rounded-2xl ui-not-checked:bg-zinc-700 ui-not-checked:bg-opacity-80 ui-checked:shadow-lg ui-checked:bg-zinc-600"
        >
          New Chat
        </RadioGroup.Option>
      </div>

      <div
        className="pl-1 flex flex-col gap-0.5"
      >
        {
          tempHistory.map((item)=>
            <ChatHistoryItem 
              key={item.value}
              value={item.value}
              label={item.label}
            />
          )
        }
        
      </div>
      
    </RadioGroup>

  )
}

interface ChatItemProps {
  value: string
  label: string
}

function ChatHistoryItem({value, label}: ChatItemProps){

  return(
    <RadioGroup.Option 
      value={value}
      className="px-2 py-2 flex items-center gap-1.5 ui-checked:bg-white ui-checked:bg-opacity-20 rounded cursor-pointer"
    >
      <MdPlayArrow className=' ui-not-checked:text-neutral-500 transition-transform ui-checked:translate-x-1'/> {label}
    </RadioGroup.Option>
  )
}



interface ChatBubbleProps {
  messenger: 'user' | 'gpt'
  message: string
}

function ChatBubble({messenger, message}: ChatBubbleProps) {

  return(
    <div
      className='flex items-start'
    >
      <div
        className=''
      >

      </div>
      <div
        className='flex-1'
      >
        <p>
          {message}
        </p>
      </div>
    </div>
  )

}

export default Gpt