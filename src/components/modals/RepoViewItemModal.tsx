//Hooks
import { FormEvent, ReactNode, useState } from "react";
import { offset, useFloating } from "@floating-ui/react";
import { SingleValue, MultiValue } from 'react-select'

//Icons
import { BsThreeDots } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

//Components
import { LabeledInput } from "./RepoAddModal";
import { SelectOption } from "../InlineSelectable";

//Redux
import { useDispatch } from "react-redux";
import { closeModal } from "../../features/modal/modalSlice";

//DB
import { useLiveQuery } from "dexie-react-hooks";
import { RepoItem, RepoMedia, RepoTag, db } from "../../localdb/db"

//HeadlessUI
import { Menu } from "@headlessui/react";

interface RepoViewItemProps{
  id: number
}

function RepoViewItemModal({item}: {item: RepoViewItemProps}) {

  const repoItemQuery = useLiveQuery(
    async () => await db.repo.where('id').equals(item.id).toArray()
  )

  const repoItem = repoItemQuery && repoItemQuery[0]

  const repoMediaQuery = useLiveQuery(
    async () => {
      if(repoItem)
        return db.repoMedia.where('id').equals(repoItem.media).toArray()

    }, [repoItem]
  )

  const repoMedia = repoMediaQuery && repoMediaQuery[0]

  const repoTags = useLiveQuery(
    async () => {
      if(repoItem)
        return await db.repoTag.where('id').anyOf(repoItem.tags.map((tag)=> tag)).toArray()
    }, [repoItem]
  )

  const tagColors = repoTags?.map(tag => tag?.color)

  const bannerStyle = {
    background: (tagColors?.length === 1) ? `${tagColors[0]}` : `linear-gradient(to right, ${tagColors?.join(', ')})`
  }

  const [isEditMode, setIsEditMode] = useState(false)

  const handleEditModeOn = () => {
    setIsEditMode(true)
  }

  const handleEditModeOff = () => {
    setIsEditMode(false)
  }



  return(
    <div
      className="w-screen max-w-md"
    >
      <div
        className="w-full h-24 relative"
        style={bannerStyle}
      >
        {
          isEditMode ?
            <div
              className="absolute w-full flex justify-between"
            >
              <button
                className="p-2.5 pl-3"
                onClick={handleEditModeOff}
              >
                <FaArrowLeft />
              </button>
              <span
                className="self-start p-1 px-1 bg-slate-600 bg-opacity-40 shadow-sm text-sm rounded-sm"
              >
                Edit Mode
              </span>
            </div>

            :
            <MoreMenu 
              id={item.id}
              editMode={handleEditModeOn}
            />
        }

      </div>
        
      <div
        className="p-7 pt-5"
      >
        {repoItem &&
          (!isEditMode ? 
            <>
              <TextWithLabel 
                label="Title"
                text={repoItem.title}
                className="text-xl"
              />
              <Divider />
              <TextWithLabel 
                label="Link"
                text={repoItem.link === '' ? 'N/A' : repoItem.link}
                className=""
              />
              <Divider />
              <TextWithLabel 
                label="Media"
                text={repoMedia?.label || 'N/A'}
                className=""
              />
              <Divider />
              <TextWithLabel
                label="Tags"
              >
                <div
                  className="p-2 flex flex-wrap gap-2"
                >
                  {repoTags &&
                    repoTags.map((tag, index)=>
                      <button
                        key={index}
                        className="p-0.5 px-1.5 rounded"
                        style={{
                          backgroundColor: tag?.color
                        }}
                      >
                        {tag?.label}
                      </button>
                    )
                  }
                </div>
              </TextWithLabel>
              <Divider />
              <TextWithLabel 
                label="Description"
                text={repoItem.description === '' ? 'N/A' : repoItem.description}
                className=""
              />
              <p className="mt-4 flex gap-2 text-sm opacity-50">
                <span>Created at {repoItem.createdAt.toLocaleDateString()}</span>
                <span>Updated at {repoItem.updatedAt.toLocaleDateString()}</span>
              </p>
            </>
            :
            repoMedia && repoTags &&
              <EditModeForm item={repoItem} media={repoMedia} tags={repoTags} setIsEditMode={setIsEditMode}/>
          )
        }


      </div>

    </div>
  )
}

interface EditModeFormProps {
  item: RepoItem
  media: RepoMedia
  tags: RepoTag[]
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

interface RepoItemEdit extends Omit<RepoItem, 'createdAt'> {

}

function EditModeForm({item, media, tags, setIsEditMode}: EditModeFormProps) {

  const dispatch = useDispatch()

  const repoMediasQuery = useLiveQuery(
    () => db.repoMedia.reverse().toArray()
  )

  const repoTagsQuery = useLiveQuery(
    () => db.repoTag.reverse().toArray()
  )


  const [repoMedia, setRepoMedia] = useState<SingleValue<SelectOption>>({
    value: media.id?.toString() || '',
    label: media.label || ''
  })


  const [repoTags, setRepoTags] = useState<MultiValue<SelectOption> | null>(
    tags?.map((tag)=>({
    value: tag.id?.toString() || '',
    label: tag.label || ''
  })))

  const handleEditRepo = (repoItem: RepoItemEdit) => {
    db.repo.update(item, {
      title: repoItem.title,
      link: repoItem.link,
      media: repoItem.media,
      tags: repoItem.tags,
      description: repoItem.description,
      updatedAt: repoItem.updatedAt,
    })
  }

  function handleFormSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const repoTitle = formData.get('repoTitle')?.toString()
    const repoLink = formData.get('repoLink')?.toString()
    const repoDescription = formData.get('repoDescription')?.toString()
    
    const formPayload: RepoItemEdit = {
      title: repoTitle || '',
      link: repoLink || '',
      media: Number(repoMedia?.value) || 0,
      tags: repoTags ? repoTags.map((tag) => Number(tag.value)) : [],
      description: repoDescription || '',
      updatedAt: new Date()
    }

    handleEditRepo(formPayload)
    setIsEditMode(false)
  }

  return(
    <div className="flex flex-col gap-2.5">
      <form onSubmit={handleFormSubmission}>

        <LabeledInput name="repoTitle" type="line" label="Title" value={item.title} />
        <LabeledInput name="repoLink" type="line" label="Link" value={item.link}/>

        <LabeledInput 
          name="repoMedia"
          type="select" 
          label="Media" 
          options={repoMediasQuery?.map((media)=>({
            value: media.id?.toString() || '',
            label: media.label,
            icon: media.icon
          })) || []} 
          onChange={(e)=>setRepoMedia(e)}
          value={{
            value: media.id?.toString() || '',
            label: media?.label || ''
          }}
        />
        <LabeledInput 
          name="repoTags"
          type="multiple" 
          label="Tags" 
          options={repoTagsQuery?.map((tag)=>({
            value: tag.id?.toString() || '',
            label: tag.label,
            color: tag.color
          })) || []}
          onChange={(e)=>setRepoTags(e)}
          value={tags.map((tag)=>({
            value: tag.id?.toString() || '',
            label: tag.label || ''
          }))}
        />

        <LabeledInput name="repoDescription" type="area" label="Description" value={item.description}/>
        <div className="mt-4 flex gap-2 justify-end">
          <button
            className="p-1.5 px-5 bg-gray-600 rounded-md text-base"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

interface MoreMenuProps{
  id: number
  editMode: () => void
}

function MoreMenu({id, editMode}: MoreMenuProps) {

  const {refs, floatingStyles} = useFloating({
    placement: 'bottom-end',
    middleware: [
      offset(5)
    ]
  })

  const dispatch = useDispatch()

  const handleDeleteRepo = () => {
    dispatch(closeModal())
    db.repo.delete(id)
  }

  return(
    <Menu>
      <Menu.Button ref={refs.setReference} className='absolute top-2 right-3 '>
        {({open}) => (
          <div className={`p-1 rounded-full ${open && 'bg-white bg-opacity-30'}`}>
            <BsThreeDots className={`text-xl `}/>
          </div>
        )}
      </Menu.Button>

      <Menu.Items ref={refs.setFloating} style={floatingStyles} className="w-24 flex flex-col p-1 bg-zinc-600 shadow-md rounded">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`py-1.5 px-2 flex items-center gap-1 text-left rounded ${active && 'bg-neutral-500'}`}
              onClick={editMode}
            >
              <MdEdit /> Edit
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`py-1.5 px-2 flex items-center gap-1 text-left rounded ${active && 'bg-red-400 bg-opacity-70'}`}
              onClick={handleDeleteRepo}
            >
             <MdDelete /> Delete
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}

interface TextWithLabelProps{
  children?: ReactNode
  label: string
  text?: string
  className?: string
}

function TextWithLabel({children, label, text, className}: TextWithLabelProps) {

  return(
    <div 
      className=""
    >
      <p className="text-sm opacity-50">{label}</p>
      {
        children ?
          children :
          <p className={`px-1 ${className}`}>{text}</p>
      }
    </div>
  )
}

function Divider() {

  return(
    <hr className="my-2.5 opacity-30"/>
  )
}

export default RepoViewItemModal