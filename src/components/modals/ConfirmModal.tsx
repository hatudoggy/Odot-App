//hooks
import { useDispatch } from "react-redux"
import { closeModal, setConfirmPopup } from "../../features/modal/modalSlice"


interface ConfirmModalProps{
  title: string
  description?: string
}

function ConfirmModal({item}: {item: ConfirmModalProps}){

  const dispatch = useDispatch()

  return(
    <div
      className=""
    >
      <h1>
        {item.title}
      </h1>
      <p
        className=""
      >
        {item.description}
      </p>

      <div
        className=""
      >
        <button
          className=""
          onClick={()=>dispatch(setConfirmPopup(true))}
        >
          Confirm
        </button>
        <button
          className=""
          onClick={()=>dispatch(setConfirmPopup(false))}
        >
          Cancel
        </button>
      </div>
    </div>
  )
  }
  
  export default ConfirmModal