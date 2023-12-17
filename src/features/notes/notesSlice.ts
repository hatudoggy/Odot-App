import { createSlice } from "@reduxjs/toolkit"
import { NoteItem } from "../../localdb/db"
//import type { PayloadAction } from "@reduxjs/toolkit"


export interface NavState {
  noteList: NoteItem[]
}

const initialState: NavState = {
  noteList: [
    { title: '', noteType: 'text', content: 'awfaw' },
    { title: 'Test Title', noteType: 'text' , content: 'dog' },
    { 
      title: 'Test Checklist', 
      noteType: 'checklist',
      content: [
        {checked: false, text: 'hatdogawgawgawgggggggggggggggggg awgawgawga'},
        {checked: false, text: 'patdog'},
      ]
    },
  ]
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    addNote: (state) => {
      state.noteList.push({
        title: '',
        content: '',
        noteType: 'text',
      })
  }
  }
})

export const { addNote } = navigationSlice.actions

export default navigationSlice.reducer