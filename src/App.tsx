//Libraries
import type { RootState } from './app/store'
import { useSelector } from 'react-redux'
import { NavComponent } from './features/navigation/navigationSlice'

//Local Files
import './App.css'
import Modal from './components/Modal'
import Sidebar from './components/Sidebar'
import Repo from './pages/Repo'
import Notes from './pages/Notes'
import Schedule from './pages/Schedule'
import Settings from './pages/Settings'



function App() {
  const currentNav = useSelector((state: RootState) => state.navigation.currentNav)

  const changePage = (key: NavComponent) => {
    switch(key){
      case 'sched':
        return <Schedule />
      case 'notes':
        return <Notes />
      case 'links':
        return <Repo />
      case 'settings':
        return <Settings />
    }
  }

  return (
    <>
      <Modal />
      <div
        className='flex w-full overflow-x-clip'
      >
        <Sidebar/>
        <div
          className='relative px-12 py-10 flex-1 min-h-screen'
        >
          { changePage(currentNav) }
        </div>
      </div>
    </>
  )
}

export default App
