import { createSlice } from "@reduxjs/toolkit"
import { NoteItem } from "../../localdb/db"
//import type { PayloadAction } from "@reduxjs/toolkit"


export interface NavState {
  noteList: NoteItem[]
}

const initialState: NavState = {
  noteList: [
    { title: '', content: 'awfaw' },
    { title: 'Test Title' , content: 'dog' },
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
      })
  }
  }
})

export const { addNote } = navigationSlice.actions

export default navigationSlice.reducer