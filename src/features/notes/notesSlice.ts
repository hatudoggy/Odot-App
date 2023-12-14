import { createSlice } from "@reduxjs/toolkit"
import { NoteItem } from "../../interface/INotes"
//import type { PayloadAction } from "@reduxjs/toolkit"


export interface NavState {
  noteList: NoteItem[]
}

const initialState: NavState = {
  noteList: [
    { title: '', content: 'awfaw', type: 'text'},
    { title: 'Test Title', content: 'dog', type: 'text' },
    { 
      title: 'Test Checklist', 
      content: [
        {checked: false, label: 'hatdogawgawgawgggggggggggggggggg awgawgawga'},
        {checked: false, label: 'patdog'},
      ], 
      type: 'checklist' 
    },
//     { 
//       title: 'Test Title', 
//       content: `
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices tortor nec tristique bibendum. Nullam sit amet mauris ac ante semper aliquam vel eget massa. Nulla at ipsum ipsum. Nam et dictum justo. Fusce posuere enim et mauris cursus, eget scelerisque velit tincidunt. Nam eleifend auctor iaculis. Donec eu malesuada libero.

// Aenean in odio nunc. Pellentesque viverra tristique mauris, sed vestibulum felis vulputate vel. Vestibulum dictum a diam quis gravida. Morbi elementum a nulla id elementum. Quisque et mi nulla. Nullam et posuere dui. Nullam ut quam suscipit, molestie lorem id, bibendum nisl. Curabitur vitae semper tortor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In sed mattis justo. Quisque tincidunt purus eu quam placerat, et egestas sapien egestas. Duis vel molestie elit.

// Sed justo odio, blandit id erat non, malesuada sollicitudin dui. Sed luctus massa congue sapien pulvinar venenatis. Maecenas commodo aliquam metus, in vestibulum lectus volutpat ut. Vivamus libero urna, vulputate a lacus eget, pellentesque pretium mauris. Sed metus nisl, aliquam commodo enim vitae, vehicula porttitor orci. Fusce ultrices tellus hendrerit, ullamcorper massa eget, pellentesque eros. Cras ultricies, massa eget egestas cursus, lacus nisi dictum sem, sit amet suscipit sapien ipsum dignissim nunc. Fusce in nunc convallis, dapibus orci ac, dignissim ligula. Nulla facilisi. Curabitur tempus vestibulum est, sed vehicula sem. Mauris semper velit euismod ullamcorper tristique. Proin pretium risus vitae euismod consequat. Nullam vulputate ex quis magna feugiat aliquet.
//       ` 
//     },
//     { title: '', content: 'awfaw' },
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
        type: 'text',
      })
  }
  }
})

export const { addNote } = navigationSlice.actions

export default navigationSlice.reducer