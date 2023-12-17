//Libraries
import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import { listsPlugin } from '@mdxeditor/editor/plugins/lists'
import { markdownShortcutPlugin, MDXEditorMethods } from '@mdxeditor/editor'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from 'react'

//Icons
import { IoClose } from 'react-icons/io5'

//Components
import TextareaAutosize from 'react-textarea-autosize';

//Types
import { useLiveQuery } from 'dexie-react-hooks'

//DB
import { db, NoteItem} from '../localdb/db'

//Styles
import '@mdxeditor/editor/style.css'
import './Notes/notes-style.css'

function Notes() {

  const noteItems = useLiveQuery(
    () => db.notes.toArray()
  )

  //console.log(noteItems)

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

      {
        noteItems && 
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 300: 1, 620: 2, 950: 3, 1290: 4, 1640: 5, 2000: 6 }}
          >
            <Masonry 
              gutter='1.3rem'
            >
              {
                noteItems.map((note, noteIndex)=>
                  <NoteCard
                    key={noteIndex}
                    item={note}
                  />
                )
              }
            </Masonry>
          </ResponsiveMasonry>
      }


    </div>
  )
}


function ActionBar(){
  
  const handleAddTextNote = () => {
    db.notes.add({
      title: 'New Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }


  return(
    <div>
      <button
        className="p-2 px-4 bg-slate-600 rounded"
        onClick={handleAddTextNote}
      >
        Add Note +
      </button>
    </div>
  )
}

function NoteCard({ item }: { item: NoteItem}){

  const handleEditTitle = (newTitle: string) => {
    db.notes.update(item, {
      title: newTitle
    })
  }

  const handleEditContent = (newContent: string) => {
    //let newContent = editorRef.current?.getMarkdown()
    db.notes.update(item, {
      content: newContent
    })
  }

  const handleDeleteNote = () => {
    if(item.id){
      db.notes.delete(item.id)
    }
  }

  const [noteContent, setNoteContent] = useState(item.content);
  const debouncedContent = useDebounce(noteContent, 300)

  const editorRef = useRef<MDXEditorMethods>(null)

  useEffect(()=>{
    if(debouncedContent){
      handleEditContent(debouncedContent)
    }
  }, [debouncedContent])
  
  return(
    <div
      className="relative min-h-[12rem] max-h-[25rem] p-4 pt-3 flex flex-col bg-neutral-800 border border-neutral-400 rounded-lg group"
    >
      <button
        className='absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 p-1.5 bg-neutral-600 shadow-lg rounded-full transition-all invisible opacity-0 hover:bg-neutral-500 group-hover:visible group-hover:opacity-100'
        onClick={handleDeleteNote}
      >
        <IoClose className='text-lg' />
      </button>
      <TextareaAutosize 
        className='mx-2 text-lg font- font-semibold bg-transparent resize-none focus:outline-none'
        defaultValue={item.title}
        onBlur={(e)=>handleEditTitle(e.target.value)}
        maxLength={20}
        spellCheck={false}
      />

      <MDXEditor 
        ref={editorRef}
        className='dark-theme' 
        markdown={noteContent}
        plugins={[listsPlugin(), markdownShortcutPlugin()]} 
        onChange={(e)=>setNoteContent(e)}
        contentEditableClassName='checklist'
      />

      <div>
        
      </div>
    </div>
  )
}


  
export default Notes