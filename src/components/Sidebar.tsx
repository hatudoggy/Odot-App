import type { RootState } from '../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { NavComponent, NavItem, changeCurrentNav } from '../features/navigation/navigationSlice'

//Icons
import { IconContext } from 'react-icons/lib/esm/iconContext'
import { AiFillCalendar } from 'react-icons/ai'
import { FaNoteSticky } from 'react-icons/fa6'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'
import { IoMdSettings } from "react-icons/io";
import { RiOpenaiFill } from "react-icons/ri";

function Sidebar() {
  const navigation = useSelector((state: RootState) => state.navigation.navigations)

  return (
    <div
      className="flex-none z-20 sticky top-0 w-16 h-screen py-5 flex flex-col items-center justify-between bg-zinc-700 bg-opacity-60 shadow-md "
    >
      <div
        className='flex flex-col items-center gap-5'
      >
        {
          navigation.map((nav, index)=>
            <SidebarButton key={index} nav={nav}/>
          )
        }
      </div>
      
      <SidebarButton nav={{key:'settings', label:'Settings'}}/>
    </div>
  )
}


function SidebarButton({nav}: { nav: NavItem }) {
  const dispatch = useDispatch()

  const iconRender = (navKey: NavComponent) => {
    switch(navKey){
      case 'sched':
        return <AiFillCalendar/>
      case 'notes':
        return <FaNoteSticky/>
      case 'links':
        return <FaExternalLinkSquareAlt/>
      case 'gpt':
        return <RiOpenaiFill/>
      case 'settings':
        return <IoMdSettings />
    }
  }

  return(
    <button
      className='px-3 py-2'
      onClick={()=>dispatch(changeCurrentNav(nav.key))}
    >
      <IconContext.Provider
        value={{
          className: 'text-3xl'
        }}
      >
        {iconRender(nav.key)}
      </IconContext.Provider>
    </button>
  )
}
  
export default Sidebar
  