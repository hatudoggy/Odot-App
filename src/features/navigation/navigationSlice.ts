import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"


export type NavComponent = 'sched' | 'notes' | 'links' | 'gpt' | 'settings'

export interface NavItem {
  key: NavComponent
  label: string
}

export interface NavState {
  currentNav: NavComponent
  navigations: NavItem[]
}

const initialState: NavState = {
  currentNav: 'sched',
  navigations: [
    {key: 'sched', label: 'Schedule'},
    {key: 'notes', label: 'Notes'},
    {key: 'links', label: 'Links'},
    {key: 'gpt', label: 'GPT'},
  ]
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    changeCurrentNav: (state, action: PayloadAction<NavComponent>) => {
      state.currentNav = action.payload
    }
  }
})

export const { changeCurrentNav } = navigationSlice.actions

export default navigationSlice.reducer