import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import { TabComponent, changeCurrentTab } from "../features/schedule/scheduleSlice"
import ToDoTab from "./Schedule/ToDoTab"
import CalendarTab from "./Schedule/CalendarTab"


function Schedule() {

  return (
    <div
      className="flex flex-col"
    >
      <Tabs />
      <TabContainer />
    </div>
  )
}

function Tabs() {
  //const currentTab = useSelector((stat))
  const {currentTab, scheduleTabs} = useSelector((state: RootState)=> state.schedule)
  const dispatch = useDispatch()

  return(
    <div
      className="relative py-2 flex "
    >
      {
        scheduleTabs.map((tab, index)=>
          <button
            key={index+tab.key}
            className={`z-20 pb-2 px-3 border-b-2 ${currentTab === tab.key && 'border-b-2 text-sky-500 border-sky-500'}`}
            onClick={()=>dispatch(changeCurrentTab(tab.key))}
          >
            {tab.label}
          </button>
        )
      }
      <hr
        className="absolute bottom-2 w-1/2 border-[1px]"
      />
    </div>
  )
}

function TabContainer() {

  const currentTab = useSelector((state: RootState)=> state.schedule.currentTab)

  const changeTab = (key: TabComponent) =>{
    switch(key){
      case 'todo':
        return <ToDoTab />
      case 'calendar':
        return <CalendarTab />
    }
  }

  return(
    <div>
      { changeTab(currentTab) }
    </div>
  )
}

export default Schedule