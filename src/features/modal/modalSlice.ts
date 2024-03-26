import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

//DB
import { RepoItem, RepoTag } from "../../localdb/db"


export interface ModalState {
  isModalOpen: boolean
  currentModal: string | null
  modalPayload: any
  confirmPopup?: boolean | null
}

interface ModalPayload {
  modal: string | null
  modalPayload?: any
}

const initialState: ModalState = {
  isModalOpen: false,
  currentModal: null,
  modalPayload: null
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeModalState: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
    changeModalContent: (state, action: PayloadAction<string|null>) => {
      state.currentModal = action.payload
    },
    openModal: (state, action: PayloadAction<ModalPayload>) => {
      state.currentModal = action.payload.modal
      state.modalPayload = action.payload.modalPayload
      state.isModalOpen = true
    },
    closeModal: (state) => {
      state.isModalOpen = false
      state.modalPayload = null
      state.currentModal = null
      state.confirmPopup = null
    },
    setConfirmPopup: (state, action: PayloadAction<boolean>) => {
      state.confirmPopup = action.payload
    }
  }
})

export const { changeModalState, changeModalContent, openModal, closeModal, setConfirmPopup } = modalSlice.actions

export default modalSlice.reducer