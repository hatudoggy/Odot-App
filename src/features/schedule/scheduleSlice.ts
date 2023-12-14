import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
//import type { PayloadAction } from "@reduxjs/toolkit"

export type TabComponent = 'todo' | 'calendar'

export interface ScheduleTabItem {
  key: TabComponent
  label: string
}

export interface ScheduleState {
  currentTab: TabComponent
  scheduleTabs: ScheduleTabItem[]
}

const initialState: ScheduleState = {
  currentTab: 'todo',
  scheduleTabs: [
    {key: 'todo', label: 'To Do'},
    {key: 'calendar', label: 'Calendar'},
  ]
}

export const navigationSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    changeCurrentTab: (state, action: PayloadAction<TabComponent>) => {
      state.currentTab = action.payload
    }
  }
})

export const { changeCurrentTab } = navigationSlice.actions

export default navigationSlice.reducer