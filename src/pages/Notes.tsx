//Libraries
import type { RootState } from '../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { addNote } from '../features/notes/notesSlice'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import TextareaAutosize from 'react-textarea-autosize'
//import { useEffect, useRef, useState } from 'react'

//Types
import { NoteContent, NoteItem, NoteType } from '../interface/INotes'

function Notes() {
  const notesList = useSelector((state: RootState) => state.notes.noteList)

  return (
    <div
      className="flex flex-col gap-3"
    >
      <h1
        className="text-2xl font-semibold"
      >
        Notes Tab
      </h1>
      
      <ActionBar />

      <ResponsiveMasonry
        columnsCountBreakPoints={{300: 1, 620: 2, 950: 3 }}
      >
        <Masonry 
          gutter='1.3rem'
        >
          {
            notesList.map((note, noteIndex)=>
              <NoteCard
                key={noteIndex}
                title={note.title}
                content={note.content}
                type={note.type}
              />
            )
          }
        </Masonry>
      </ResponsiveMasonry>

    </div>
  )
}


function ActionBar(){
  const dispatch = useDispatch()

  return(
    <div>
      <button
        className="p-2 px-4 bg-slate-600 rounded"
        onClick={()=>dispatch(addNote())}
      >
        Add Note +
      </button>
    </div>
  )
}

function NoteCard({
  title,
  content,
  type,
}:NoteItem){

  const noteTypeRenderer = (noteType: NoteType, content: NoteContent) => {
    switch(noteType){
      case 'text':
        if(typeof content === 'string'){
          return (
            <TextareaAutosize
              className='bg-transparent resize-none focus:outline-none'
              spellCheck='false'
              defaultValue={content}
            />
          )
        }
      break

      case 'checklist':
        if(Array.isArray(content)){  
          return (
            <div
              className='flex flex-col gap-1'
            >
              {
                content.map((checkItem, checkIndex)=>
                  <div
                    key={checkIndex}
                    className='flex gap-2 items-start'
                  >
                    <input
                      type='checkbox'
                      className='flex-none mt-2'
                      //checked={checkItem.checked}
                    />
                    <p
                      className='flex-1 w-11/12 break-words'
                    >
                      {checkItem.label}
                    </p>
                  </div>
                )
              }
            </div>
          )
        }
      break

      case 'photo':
        if(typeof content === 'string'){
          return (
            <TextareaAutosize
              className='bg-transparent resize-none focus:outline-none'
              spellCheck='false'
              defaultValue={content}
            />
          )
        }
      break

      default:
        return null

    }
  }


  return(
    <div
      className="min-h-[6rem] max-h-[25rem] p-4 pt-3 flex flex-col bg-neutral-800 border border-neutral-400 rounded-lg overflow-hidden"
    >
      {
        title !== '' &&
          <h3
            className="mb-2 text-lg font- font-semibold"
          >
            { title }
          </h3>
      }

      { noteTypeRenderer(type, content) }

      <div>
        
      </div>
    </div>
  )
}
  
export default Notes