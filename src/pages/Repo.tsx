//Hooks
import { useDispatch, useSelector } from "react-redux";
import { useLiveQuery } from "dexie-react-hooks"
import { ReactNode, useEffect, useRef, useState } from "react";
import { autoUpdate, shift, useFloating } from '@floating-ui/react';

//Icons
import { FaFilter } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import { SiAddthis } from "react-icons/si";
import { IoIosArrowForward } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaSquare } from "react-icons/fa";

//Components
import IconBtn from "../components/IconBtn";
import { openModal } from "../features/modal/modalSlice";
import TextInput from "../components/TextInput";
import DynamicIcon, { KeyOfIconList, iconList } from "../components/DynamicIcon";
import PopOverPicker, { PickerOptions } from "../components/PopOverPicker";
import Label from "../components/Label";
import { MultiValue, SingleValue } from "react-select"
import Selectable from "../components/Selectable";
import MultiSelectable from "../components/MultiSelectable";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/Tooltip";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

//HeadlessUI
import { Popover, Tab } from '@headlessui/react'

//Redux
import { RootState } from "../app/store";
import { SortOrder, SortType, changeFilterMediaValue, changeFilterTagsValue, changeSearchValue, changeSortOrderValue, changeSortTypeValue } from "../features/repo/repoSlice";

//DB
import { RepoItem, RepoMedia, RepoTag, db } from "../localdb/db"
import { Collection, IndexableType } from "dexie";

//CSS
import '../App.css'


function Repo() {
  
  const { searchValue, sortValue, filterValue } = useSelector((state: RootState) => state.repo)
  const dispatch = useDispatch()
  
  const handleSorting = (sortType: string, order: string, item: Collection<RepoItem, IndexableType>) => {
    let unsortedItem
    if(order === 'desc'){
      unsortedItem = item.reverse()
    } else {
      unsortedItem = item
    }

    switch(sortType){
      case 'title':
        return unsortedItem.sortBy('title')
      case 'createdAt':
        return unsortedItem.sortBy('createdAt')
      case 'updatedAt':
        return unsortedItem.sortBy('updatedAt')
      default:
        return unsortedItem.sortBy('createdAt')
    }
  }

  const handleFiltering = (mediaFilter: RepoMedia[], tagsFilter: RepoTag[], item: Collection<RepoItem, IndexableType>) => {
    let unsortedItem = item
    
    if(mediaFilter.length > 0) {
      unsortedItem = unsortedItem.and(mediaItem => mediaFilter.some((media)=> media.id === mediaItem.media))
    }

    if(tagsFilter.length > 0) {
      unsortedItem = unsortedItem.and(tagItem => tagsFilter.some((media)=> media.id && tagItem.tags.includes(media.id)))
    }


    return unsortedItem
  }

  const repoItems = useLiveQuery(
    () => {

      const origItem = db.repo
      const searchedItem = origItem.where('title').startsWithIgnoreCase(searchValue).clone()
      const filteredItem = handleFiltering(filterValue.media, filterValue.tags, searchedItem)
      const sortedItem = handleSorting(sortValue.sortType, sortValue.sortOrder, filteredItem)

      return sortedItem
    }, [searchValue, sortValue, filterValue]
  )

  const repoMedias = useLiveQuery(
    () => db.repoMedia.toArray()
  )

  const repoTags = useLiveQuery(
    () => db.repoTag.toArray()
  )

  //console.log(repoItems)
  
  return (
    <div
      className="flex-1 flex flex-col gap-8"
    >
      
      <div
        className="fixed top-0 left-0 w-full h-[6.3rem] bg-[#242424]"
      ></div>
      <ActionBar />
      {
        repoItems && repoMedias && repoTags &&
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 1, 620: 2, 950: 3, 1290: 4, 1640: 5, 2000: 6 }}
        >
          <Masonry 
            gutter='1rem'
          >
            {
              
              repoItems.map((item, index)=>
                <RepoCard 
                  key={index} 
                  item={item} 
                  media={
                    repoMedias.find((media)=>
                      media.id === item.media
                    )
                  }
                  tags={item.tags.map((tag) => 
                    {
                      const repoTag = repoTags.find((repoTag)=>repoTag.id === tag)
                      if(repoTag)
                        return{
                          id: repoTag.id,
                          label: repoTag.label,
                          color: repoTag.color
                        }
                    })}
                />
              )
            }
          </Masonry>
        </ResponsiveMasonry>
      }

    </div>

  )
}

function RepoCard({item, media, tags}:{ item: RepoItem, media: RepoMedia | undefined , tags: (RepoTag | undefined)[] }){

  const dispatch = useDispatch()

  const tagColors = tags.map(tag => tag?.color)

  const bannerStyle = {
    background: (tagColors.length === 0) ? '#27272a' : ((tagColors.length === 1) ? `${tagColors[0]}` : `linear-gradient(to right, ${tagColors.join(', ')})`)
  }

  return(
    
      <div
        className="bg-zinc-800 border-2 border-opacity-10 border-zinc-600 rounded-md text-left overflow-hidden  hover:bg-zinc-700 transition-colors"
      >
        <div
          className="relative w-full h-16"
          style={bannerStyle}
        >
          <span className="absolute top-2.5 right-3 text-xl">
            {
              media?.icon &&
              <Tooltip placement="bottom">
                <TooltipTrigger>
                  <DynamicIcon icon={media.icon}/>
                </TooltipTrigger>
                <TooltipContent className="p-1.5 bg-neutral-600/80 font-medium shadow-lg rounded-md">
                  {media.label}
                </TooltipContent>
              </Tooltip>
            }
          </span>
        </div>

        <div
          className="flex flex-col gap-0.5 p-4 [&>p]:truncate"
        >
          <button
            className="flex items-center group/title"
            onClick={()=>dispatch(openModal({
              modal: 'repoView', 
              modalPayload: {
                id: item.id,
                // title: item.title,
                // link: item.link,
                media: media,
                tags: tags,
                // description: item.description,
                // createdAt: item.createdAt.toLocaleDateString(),
                // updatedAt: item.updatedAt.toLocaleDateString()
              }
            }))}
          >
            <p
              className="flex-1 truncate text-left text-base font-semibold origin-left group-hover/title:scale-110 transition-transform"
            >
              {item.title}
            </p>
            <span
              className="pl-1.5 flex-none translate-x-1 opacity-0 group-hover/title:translate-x-0 group-hover/title:opacity-100 transition-all"
            >
              <IoIosArrowForward />
            </span>
          </button>

          <p
            className="text-sm"
          >
            <a className="transition-colors duration-300 hover:text-blue-400" href={item.link} target="_blank">{item.link}</a>
          </p>

          <div
            className="py-2 flex gap-1.5"
          >
            {
              tags.map((tag, index)=>
                <button
                  key={index}
                  className="px-1 py-0.5 rounded text-sm"
                  style={{
                    background: tag?.color
                  }}
                >
                  {tag?.label}
                </button>
              )
            }
          </div>

        </div>
      </div>

  )
}



function ActionBar() {
  
  const searchValue = useSelector((state: RootState) => state.repo.searchValue)
  const dispatch = useDispatch()

  return(
    <div
      className="sticky z-10 top-10 flex justify-between"
    >

      <div
        className="flex gap-5 w-full max-w-md"
      >
        <IconBtn
          iconElement={<SiAddthis />}
          className="text-3xl"
          onClick={()=>dispatch(openModal({modal: 'repoAdd'}))}
        />
        <TextInput
          type="search"
          className="flex-1"
          placeholder="Search..."
          value={searchValue}
          onChange={(e)=>dispatch(changeSearchValue(e.target.value))}
        />
        <FilterButton />
        <SortButton />
        <MoreButton />
      </div>
    </div>
  )
}

function FilterButton() {

  const {refs, floatingStyles} = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      shift({
        padding: 10
      })
    ]
  })

  const repoMedias = useLiveQuery(
    () => db.repoMedia.toArray()
  )

  const repoTags = useLiveQuery(
    () => db.repoTag.toArray()
  )

  const { media, tags} = useSelector((state: RootState) => state.repo.filterValue)
  const dispatch = useDispatch()

  interface MultiSelectType {
    value?: number
    label: string
  }

  const handleChangeFilterMedia = (selected: MultiValue<MultiSelectType>) => {
    dispatch(
      changeFilterMediaValue(
        selected.map((option)=>({
          id: option.value,
          label: option.label
        }))
      )
    )
  }

  const handleChangeFilterTags = (selected: MultiValue<MultiSelectType>) => {
    dispatch(
      changeFilterTagsValue(
        selected.map((option)=>({
          id: option.value,
          label: option.label
        }))
      )
    )
  }

  return(
    <Popover>
      <Popover.Button ref={refs.setReference} className='h-full'>
        <FaFilter className="text-xl" />
      </Popover.Button>

      <Popover.Panel ref={refs.setFloating} style={floatingStyles} className='w-72 pt-2.5 p-4 bg-zinc-700 shadow-md rounded'>
        <div className="flex flex-col gap-3">
          <Label
            labelText="Media"
          >
            <MultiSelectable
              isMulti
              components={{DropdownIndicator:() => null}}
              options={repoMedias?.map((media)=>({
                value: media.id,
                label: media.label,
              }))}
              value={media.map((media)=>({
                value: media.id,
                label: media.label,
              }))}
              onChange={handleChangeFilterMedia}
            />
          </Label>

          <Label
            labelText="Tags"
          >
            <MultiSelectable
              isMulti
              components={{DropdownIndicator:() => null}}
              options={repoTags?.map((tag)=>({
                value: tag.id,
                label: tag.label,
              }))}
              value={tags.map((tag)=>({
                value: tag.id,
                label: tag.label,
              }))}
              onChange={handleChangeFilterTags}
            />
          </Label>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

function SortButton() {

  const {refs, floatingStyles} = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      shift({
        padding: 10
      })
    ]
  })

  interface SortOption {
    value: SortType
    label: string
  }

  interface OrderOption {
    value: SortOrder
    label: string
    alt: string
  }

  const sortOptions: SortOption[] = [
    {value: 'title', label: 'Title'},
    {value: 'createdAt', label: 'Created Date'},
    {value: 'updatedAt', label: 'Updated Date'},
  ]

  const orderOptions: OrderOption[] = [
    {value: 'asc', label: 'Asc', alt: 'Newest'},
    {value: 'desc', label: 'Desc', alt: 'Newest'},
  ]

  const { sortType, sortOrder } = useSelector((state:RootState) => state.repo.sortValue)
  const dispatch = useDispatch()


  const handleChangeSortType = (selected: SingleValue<SortOption>) => {
    if(selected)
      dispatch(changeSortTypeValue(selected.value))
  }

  const handleChangeSortOrder = (selected: SingleValue<OrderOption>) => {
    if(selected)
      dispatch(changeSortOrderValue(selected.value))
  }
  
  return(
    <Popover>
      <Popover.Button ref={refs.setReference} className='h-full'>
        {sortOrder === 'asc' ? <FaSortAmountDownAlt className="text-xl" /> : <FaSortAmountUp className="text-xl" />}
      </Popover.Button>

      <Popover.Panel ref={refs.setFloating} style={floatingStyles} className='p-3 bg-zinc-700 shadow-md rounded'>
        <div
          className="w-full flex flex-row gap-2"
        >
          <Label
            labelText="Type"
            className="min-w-[10rem]"
          >
            <Selectable
              className=""
              options={sortOptions}
              value={sortOptions.find((option)=>option.value === sortType)}
              onChange={handleChangeSortType}
            />
          </Label>

          <Label
            labelText="Order"
            className="min-w-[6rem]"
          >
            <Selectable
              className=""
              options={orderOptions}
              value={orderOptions.find((option)=>option.value === sortOrder)}
              onChange={handleChangeSortOrder}
            />
          </Label>
        </div>

      </Popover.Panel>
    </Popover>
  )
}

function MoreButton() {

  const {refs, floatingStyles} = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      shift({
        padding: 10
      })
    ]
  })


  return(
    <Popover>
      <Popover.Button ref={refs.setReference} className="h-full">
        <BsThreeDots className="text-2xl"/>
      </Popover.Button>

      <Popover.Panel ref={refs.setFloating} style={floatingStyles} className=" p-6 bg-zinc-700 shadow-md rounded">
        <Tab.Group vertical>
          <div className="flex">
            <Tab.List className="pr-3 flex flex-col gap-0.5 border-r border-white border-opacity-25">
              <Tab className='text-left pl-2 pr-9 py-1.5 rounded hover:bg-white hover:bg-opacity-10 ui-selected:bg-zinc-500 '>General</Tab>
              <Tab className='text-left pl-2 pr-9 py-1.5 rounded hover:bg-white hover:bg-opacity-10 ui-selected:bg-zinc-500 '>Media</Tab>
              <Tab className='text-left pl-2 pr-9 py-1.5 rounded hover:bg-white hover:bg-opacity-10 ui-selected:bg-zinc-500 '>Tags</Tab>
            </Tab.List>
            <Tab.Panels className="pl-4 w-56 h-56">
              <Tab.Panel className="">
                Quick Edit

              </Tab.Panel>

              <Tab.Panel>
                <MediaPanel />
              </Tab.Panel>

              <Tab.Panel>
                <TagPanel />
              </Tab.Panel>

            </Tab.Panels>
          </div>
        </Tab.Group>
      </Popover.Panel>
    </Popover>
  )
}

interface Item {
  id?: number
  label: string
  icon?: KeyOfIconList
  color?: string
}

function MediaPanel() {

  //Handle Media related actions
  const repoMedias = useLiveQuery(
    () => db.repoMedia.reverse().toArray()
  )
  //console.log(repoMedias)

  const handleAddMedia = () => {
    db.repoMedia.add({
      label: 'New Media',
      icon: 'none'
    })
  }

  const handleUpdateMedia = (item: Item, newLabel: string) => {
    db.repoMedia.update(item, {label: newLabel})
  }

  const handleUpdateMediaIcon = (item: Item, iconKey: string) =>{
    db.repoMedia.update(item, {icon: iconKey})
  }

  const handleDeleteMedia = (item: Item) => {
    if(item.id){
      db.repoMedia.delete(item.id)
      db.repo.where('media').equals(item.id).modify({media: 0})
    }
  }

  return(
    repoMedias && 
      <OptionsPanel 
        addOnClick={handleAddMedia} 
        updateLabel={handleUpdateMedia}
        deleteItem={handleDeleteMedia}
        optionsList={repoMedias} 
        pickerProps={{
          buttonElement: 'media',
          options: iconList,
          onSelect: handleUpdateMediaIcon
        }}
      />
  )
}

function TagPanel() {

  //Handle Tag related actions
  const repoTags = useLiveQuery(
    () => db.repoTag.reverse().toArray()
  )

  const handleAddTag = () => {
    db.repoTag.add({
      label: 'New Tag',
      color: '#3b3b3b'
    })
  }

  const handleUpdateTag = (item: Item, newLabel: string) => {
    db.repoTag.update(item, {label: newLabel})
  }

  const handleUpdateTagColor = (item: Item, tagColor: string) =>{
    db.repoTag.update(item, {color: tagColor})
  }

  const handleDeleteTag = (item: Item) => {
    if(item.id){
      db.repoTag.delete(item.id)
      db.repo.where('tags').equals(item.id).modify(value => {value.tags = value.tags.filter(tag => tag !== item.id)})
    }
  }

  const colorList = {
    '#32a885': <FaSquare style={{color: '#32a885'}} />, //Orig green
    '#408cca': <FaSquare style={{color: '#408cca'}} />, //Blue
    '#9f56ce': <FaSquare style={{color: '#9f56ce'}} />, //Purple
    '#d88e4c': <FaSquare style={{color: '#d88e4c'}} />, //Orange
    '#50c4b7': <FaSquare style={{color: '#50c4b7'}} />, //Teal
    '#d85363': <FaSquare style={{color: '#d85363'}} />, //Red
    '#6e6e6e': <FaSquare style={{color: '#6e6e6e'}} />, //Dark
    '#3b3b3b': <FaSquare style={{color: '#3b3b3b'}} />, //Gray
  }

  return(
    repoTags && 
      <OptionsPanel 
        addOnClick={handleAddTag} 
        updateLabel={handleUpdateTag}
        deleteItem={handleDeleteTag}
        optionsList={repoTags} 
        pickerProps={{
          buttonElement: 'tag',
          options: colorList,
          onSelect: handleUpdateTagColor
        }}
      />
  )
}

interface PickerProps {
  buttonElement: 'media' | 'tag'
  panelElement?: ReactNode
  options: PickerOptions
  onSelect: (item: Item, selected: string) => void
}


interface OptionsPanelProps {
  addOnClick: () => void
  updateLabel: (item: Item, newLabel: string) => void
  deleteItem: (item: Item) => void
  optionsList: RepoMedia[] | RepoTag[]
  pickerProps: PickerProps
}

function OptionsPanel({addOnClick, updateLabel, deleteItem, optionsList, pickerProps}: OptionsPanelProps) {

  const [isFocusOnNew, setIsFocusOnNew] = useState(false)

  const handleFocusOnNewItem = () => {
    addOnClick()
    setIsFocusOnNew(true)
  }
  

  return(
    <>
      <div className="flex justify-between">
        <p className="text-sm opacity-50">Options</p>
        <button 
          onClick={()=>handleFocusOnNewItem()} 
          className="text-xs opacity-70"
        >
          <FaPlus />
        </button>
      </div>
      <div className="thin-scroll py-1.5 max-h-56 flex flex-col overflow-y-auto">
        {
          optionsList.map((option, index)=>
            <OptionsItem 
              key={index} 
              item={option} 
              updateLabel={updateLabel} 
              deleteItem={deleteItem} 
              isFocusOnNew={index === 0 ? isFocusOnNew : false} 
              setIsFocusOnNew={setIsFocusOnNew}
              pickerProps={pickerProps}
            />
          )
        }
      </div>
    </>
  )
}

interface OptionsItemProps {
  item: Item
  updateLabel: (item: Item, newLabel: string) => void
  deleteItem: (item: Item) => void
  isFocusOnNew: boolean
  setIsFocusOnNew: React.Dispatch<React.SetStateAction<boolean>>
  pickerProps: PickerProps
}

function OptionsItem({item, updateLabel, deleteItem, isFocusOnNew, setIsFocusOnNew, pickerProps}: OptionsItemProps) {

  const [isUpdateLabel, setIsUpdateLabel] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const iconHandler = (item: Item) =>{
    if(item.icon !== undefined){
      if (item.icon !== 'none')
        return <DynamicIcon icon={item.icon} />
      else
        return <DynamicIcon icon="none" />
    }else if(item.color !== undefined){

    }
  }

  const handleOpenUpdateInput = () => {
    setIsUpdateLabel(()=>{
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0);
      
      return true
    })

  }

  useEffect(()=>{
    if(isFocusOnNew){
      handleOpenUpdateInput()
    }
  },[isFocusOnNew])

  const handleUpdateLabelDB = (newLabel: string) => {
    updateLabel(item, newLabel)
    setIsUpdateLabel(false)
    setIsFocusOnNew(false)
  }

  const handleDeleteOptionDB = () => {
    deleteItem(item)
  }

  const handleSwitchButtonElement = (buttonType: 'media' | 'tag') => {
    switch(buttonType){
      case 'media':
        return <DynamicIcon icon={item.icon as KeyOfIconList}/>
      case 'tag':
        return <FaSquare style={{color: item.color}}/>
    }
  }

  return(
    <div className="py-0.5 pr-1 flex justify-between items-center hover:bg-white hover:bg-opacity-10 rounded">
      <div className="flex gap-1 items-center" >
        <PopOverPicker 
          buttonElement={handleSwitchButtonElement(pickerProps.buttonElement)}
          panelElement={pickerProps.panelElement}
          options={pickerProps.options}
          onSelect={(selected)=>pickerProps.onSelect(item, selected)}
        />
        <div
          className="flex-1"
        >
          {
            isUpdateLabel ?
              <input 
                ref={inputRef}
                className="w-full bg-transparent focus:outline-none"
                defaultValue={item.label || 'New Option'}
                onBlur={(e)=>handleUpdateLabelDB(e.target.value)}
                onFocus={(e)=>e.target.select()}
                onKeyDown={(e) => {
                  if(e.key === 'Enter'){
                    e.currentTarget.blur()
                  }
                }}
              />
              :
              <button
                onClick={()=>handleOpenUpdateInput()}
              >
                {item.label}
              </button>
          }
        </div>


      </div>

      <button 
        className='text-lg opacity-50 transition-all hover:opacity-90 hover:text-red-400' 
        onClick={()=>handleDeleteOptionDB()}
      >
        <MdDelete />
      </button>
    </div>
  )
}


  
export default Repo