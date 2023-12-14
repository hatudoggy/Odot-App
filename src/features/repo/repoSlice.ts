import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { RepoMedia, RepoTag } from "../../localdb/db"

export type SortType = 'title' | 'createdAt' | 'updatedAt'
export type SortOrder = 'asc' | 'desc'

interface SortValue {
  sortType: SortType
  sortOrder: SortOrder
}

interface FilterValue {
  media: RepoMedia[]
  tags: RepoTag[]
}

export interface RepoState {
  searchValue: string
  filterValue: FilterValue
  sortValue: SortValue
}

const initialState: RepoState = {
  searchValue: '',
  filterValue: {
    media: [],
    tags: []
  },
  sortValue: {
    sortType: 'createdAt',
    sortOrder: 'asc'
  },
}

export const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    changeSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    changeSortTypeValue: (state, action: PayloadAction<SortType>) => {
      state.sortValue.sortType = action.payload
    },
    changeSortOrderValue: (state, action: PayloadAction<SortOrder>) => {
      state.sortValue.sortOrder = action.payload
    },
    changeFilterMediaValue: (state, action: PayloadAction<RepoMedia[]>) => {
      state.filterValue.media = action.payload
    },
    changeFilterTagsValue: (state, action: PayloadAction<RepoTag[]>) => {
      state.filterValue.tags = action.payload
    },
  }
})

export const { 
  changeSearchValue, 
  changeSortTypeValue, 
  changeSortOrderValue,
  changeFilterMediaValue,
  changeFilterTagsValue
} = repoSlice.actions

export default repoSlice.reducer