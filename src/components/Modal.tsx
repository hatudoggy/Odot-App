//Hooks
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import { changeModalState, closeModal } from "../features/modal/modalSlice"

//Headless
import { Dialog } from "@headlessui/react"

//Modal Components
import RepoAddModal from "./modals/RepoAddModal"
import RepoViewItemModal from "./modals/RepoViewItemModal"

//DB
import { RepoItem } from "../localdb/db"


//type ModalType = 'repoAdd' | 'repoView' | null



function Modal() {
  const {isModalOpen, currentModal, modalPayload} = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()

  const modalSwitcher = (modal: string | null) => {
    switch(modal){
      case 'repoAdd':
        return <RepoAddModal />
      case 'repoView':
        return <RepoViewItemModal item={modalPayload} />
      default:
        return <ModalDefault/>
      
    }
  }

  return (
    <Dialog 
      open={isModalOpen} 
      onClose={()=>dispatch(closeModal())} 
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className=" bg-zinc-800 border-2 border-zinc-500 border-opacity-10 shadow-md rounded-xl overflow-hidden">
          {modalSwitcher(currentModal)}
        </Dialog.Panel>
      </div>
    </Dialog>

  )
}

// isModalOpen &&
// <div
//   className="z-40 absolute w-screen h-screen grid place-content-center"
// >
//   <div
//     className="z-40 p-7 bg-zinc-800 border-2 border-zinc-500 border-opacity-10 shadow-md rounded-xl"
//   >
//     {modalSwitcher(currentModal)}
//   </div>

//   <div
//     className="absolute w-full h-full bg-black opacity-30"
//     onClick={()=>dispatch(closeModal())}
//   ></div>
// </div>


function ModalDefault() {

  return(
    <div>

    </div>
  )
}
  
export default Modal