//Hooks
import { useEffect, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import OpenAI from "openai"

//Components
import TextareaAutosize from 'react-textarea-autosize';
import IconBtn from '../components/IconBtn';

//Icons
import { IoSend } from 'react-icons/io5';
import { IoIosArrowForward } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";

//Types
import ChatCompletionsAPI from "openai"


//CSS
import '../App.css'
import { RadioGroup } from '@headlessui/react';

//DB
import { ChatHead, db } from '../localdb/db';
import { changeCurrentChat } from '../features/gpt/gptSlice';
import { openModal } from '../features/modal/modalSlice';


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
          <ChatContentArea />

          <MessageBar />
        </div>
      </div>
    </div>
  )
}

function ChatHistory(){

  const chatItems = useLiveQuery(
    () => db.gpt.reverse().toArray()
  )

  const { currentChat } = useSelector((state: RootState) => state.gpt)
  const dispatch = useDispatch()

  return(
    <RadioGroup value={currentChat} onChange={(e)=>dispatch(changeCurrentChat(e))} className='thin-scroll pr-2.5 w-[14rem] h-full overflow-y-auto '>

      <div
        className='sticky top-0 flex py-3.5 bg-[#242424]'
      >
        <RadioGroup.Option 
          value='new-chat'
          className="flex-1 px-3 py-2.5 font-semibold  cursor-pointer rounded-2xl ui-not-checked:bg-zinc-700 ui-not-checked:bg-opacity-80 ui-checked:shadow-lg ui-checked:bg-zinc-600"
        >
          New Chat
        </RadioGroup.Option>

        <IconBtn
          className='ml-1 px-1.5'
          iconElement={<LuSettings2 className='text-lg'/>}
          onClick={()=>dispatch(openModal({modal: 'gptSettings'}))}
        />
        
      </div>

      <div
        className="pl-1 flex flex-col gap-0.5"
      >
        {
          chatItems && 
            chatItems.map((item)=>
              <ChatHistoryItem 
                key={item.id}
                value={item.chatId.toString() || ''}
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
      <IoIosArrowForward className=' ui-not-checked:text-neutral-500 transition-transform ui-checked:translate-x-1'/> {`${label} ${value}`} 
    </RadioGroup.Option>
  )
}


function ChatContentArea(){
  const { currentChat } = useSelector((state: RootState) => state.gpt)

  const chatContent = useLiveQuery(
    () => currentChat !== 'new-chat' ? db.gptChat.where('id').equals(Number(currentChat)).toArray() : [], 
    [currentChat]
  )

  const chats = useLiveQuery(
    () => db.gptChat.toArray()
  )

  //console.log(chats)

  return(
    <div
      className="thin-scroll flex-1 w-full pt-4 pr-3 rounded-lg overflow-y-auto"
    >
      <div
        className='w-full max-w-3xl mx-auto'
      >
        {
          chatContent &&
            chatContent.length > 0 ?
              chatContent[0].chatContent.map((chat, index)=>{
                  if(typeof chat.content === 'string')
                    return(
                      <ChatBubble key={index} item={chat} />
                    )
                  else if(chat.content === null)
                    return(
                      <h1
                        key={index}
                      >
                        loading
                      </h1>
                    )

                }

              )
              :
              <h1>Start Chat</h1>
        }
      </div>

    </div>
  )
}



function ChatBubble({ item }: {item: ChatHead}) {

  const handleRoleName = () =>{
    switch(item.role){
      case 'user':
        return (
          <h1
            className='text-left font-medium'
          >
            You
          </h1>
        )
      case 'assistant':
        return (
          <h1
            className='mb-1 text-right font-medium'
          >
            Gippity
          </h1>
        )
      default:
        return
    }
  }

  const handleContentRender = () => {
    switch(typeof item.content){
      case 'string':
        return item.content
      case 'object':
        return
    }
  }

  const textContentStyle = () => {
    switch(item.role){
      case 'user':
        return ''
      case 'assistant':
        return 'p-3 bg-neutral-700 bg-opacity-40 rounded-md'
      default:
        return ''
    }
  }
  
  return(
    <div
      className='mb-5 grid grid-cols-[65px_minmax(0,_1fr)_65px]'
    >
      <div
        className='px-3 flex justify-end '
      >
        {
          item.role === 'user' &&
            <div
              className='w-8 h-8 bg-green-400 rounded-full'
            >

            </div>
        }
      </div>
      <div
        className='flex-1'
      >
        {handleRoleName()}
        <p
          className={`whitespace-pre-line ${textContentStyle()}`}
        >
          {handleContentRender()}
        </p>
      </div>

      <div
        className='px-3 flex justify-start '
      >
        {
          item.role === 'assistant' &&
          <div
          className='w-8 h-8 bg-blue-400 rounded-full'
        >

        </div>
        }
      </div>
    </div>
  )

}

function MessageBar() {
  const { currentChat, apiKey } = useSelector((state: RootState) => state.gpt)
  const dispatch = useDispatch()
  const [textValue, setTextValue] = useState('')

  useEffect(()=>{
    setTextValue('')
  },[currentChat])

  const fetchGptPrompt = () => {

  }

  const appendToChatHistory = () => {

  }


  const messageCycle = (chatId: number, msg: string) => {
    console.log('Chat ID: ', chatId)
    if(apiKey !== null){
      //Append user prompt to chat content
      db.gptChat.where("id").equals(chatId)
        .modify((value, ref)=>{
          ref.value.chatContent.push({
            role: 'user',
            content: msg,
            timestamp: new Date()
          })
        })
      .then(async (idx)=>{

        setTextValue('')

        const chatHistory = await db.gptChat.get(chatId)
        if(chatHistory){
          console.log('Chat History Payload: ', chatHistory)

          const newHistory = chatHistory.chatContent.map(({ timestamp, ...rest }) => rest)

          db.gptChat.where("id").equals(chatId)
          .modify((value, ref)=>{
            ref.value.chatContent.push({
              role: 'assistant',
              content: null,
              timestamp: new Date()
            })
          })

          //Perform gpt API call
          const openai = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true})
          const prompt = await openai.chat.completions.create({
            messages: newHistory,
            model: "gpt-4-1106-preview",
          })
          
          console.log('Prompt Data: ', prompt)

          //Append gpt prompt to chat content
          db.gptChat.where("id").equals(chatId)
            .modify((value, ref)=>{
              ref.value.chatContent[ref.value.chatContent.length - 1].content = prompt.choices[0].message.content
            })
          
        }      
      })
    }

  }

  const handleSendPrompt = () => {
    
    if(currentChat === "new-chat"){
      //Create chat content
      db.gptChat.add({
        chatContent: []
      }).then((e)=>{
        //Create chat item then add id of chat content
        db.gpt.add({
          chatId: Number(e),
          label: 'New Chat ',
          createdAt: new Date(),
          updatedAt: new Date()
        }).then((f)=>{
          dispatch(changeCurrentChat(e.toString()))
          messageCycle(Number(e), textValue)
        })
      })


    }else {
      messageCycle(Number(currentChat), textValue)
    }
  }

  return(
    <div
      className="pr-4 w-full flex"
    >
      <TextareaAutosize 
        className="thin-scroll h-full w-full p-3 bg-neutral-700 bg-opacity-30 rounded-2xl border border-white border-opacity-20  outline-none focus:border-opacity-40 focus:rounded-lg resize-none"
        maxRows={8}
        placeholder='Message GPT...'
        value={textValue}
        onChange={(e)=>setTextValue(e.target.value)}
      />
      <IconBtn 
        className='pl-4 pr-1 text-xl'
        iconElement={<IoSend/>}
        onClick={handleSendPrompt}
      />
    </div>
  )
}

export default Gpt