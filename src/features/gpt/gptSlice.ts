import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

//DB
import { RepoItem, RepoTag } from "../../localdb/db"


export interface GptState {
  currentChat: string
  apiKey: string | null
}


const initialState: GptState = {
  currentChat: 'new-chat',
  apiKey: localStorage.getItem('gptAPIKey') || null
}

export const gptSlice = createSlice({
  name: 'gpt',
  initialState,
  reducers: {
    changeCurrentChat: (state, action: PayloadAction<string>) => {
      state.currentChat = action.payload
    },
    changeAPIKey: (state, action: PayloadAction<string | null>) => {
      state.apiKey = action.payload
    },
  }
})

export const { changeCurrentChat, changeAPIKey } = gptSlice.actions

export default gptSlice.reducer