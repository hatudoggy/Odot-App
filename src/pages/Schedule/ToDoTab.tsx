function ToDoTab() {

  return (
    <div
      className=""
    >
      <ActionBar />
      <ToDoContainer />
    </div>
  )
}

function ActionBar() {

  return(
    <div>
      
    </div>
  )
}

function ToDoContainer() {

  return(
    <div
      className="py-2 flex flex-col gap-2"
    >
      <ToDoCard />
    </div>
  )
}

function ToDoCard() {

  return(
    <div
      className="p-3 bg-slate-700 w-full rounded-xl"
    >
      atdog
    </div>
  )
}
    
export default ToDoTab