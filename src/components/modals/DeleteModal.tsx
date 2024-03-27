import { RootState } from "../../app/store";

// React icons
import { IoWarning } from "react-icons/io5";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modal/modalSlice";

// Dexie
import { db } from "../../localdb/db";
import { deleteSelectedTodo } from "../../features/todo/todoSlice";
import { TodoItem } from "../../interface/ITodo";

function DeleteModal({ itemsToDelete }: { itemsToDelete: TodoItem[] | any }) {
  const dispatch = useDispatch();

  /**
   * Delete selected items from redux store and Dexie
   * @returns void
   * */
  const deleteItems = () => {
    itemsToDelete.forEach((item: TodoItem) => {
      // Delete from redux store
      dispatch(deleteSelectedTodo(item));

      // Delete from Dexie
      db.todo.delete(item.id);
    });

    // Close delete modal
    dispatch(closeModal());
  };

  return (
    <div className="w-screen py-7 xl:max-w-xl max-w-lg flex flex-col gap-5 items-center">
      <IoWarning className="bg-zinc-900 w-14 h-14 p-2 rounded-full" />
      <h1 className="text-2xl font-bold">Delete Items</h1>
      <h5 className="font-normal text-md px-10 text-center">
        You're going to delete all the selected items. <br /> Are you sure?
      </h5>
      <span className="grid grid-cols-2 gap-4 w-full px-7 pt-4">
        <button
          className="bg-zinc-600 p-2 rounded-md font-medium w-full hover:bg-zinc-700 transition-colors"
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 bg-opacity-60 p-2 rounded-md font-medium transition-colors hover:bg-opacity-80"
          onClick={deleteItems}
        >
          Delete
        </button>
      </span>
    </div>
  );
}

export default DeleteModal;
