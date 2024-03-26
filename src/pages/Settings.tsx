//hooks
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import { Dialog } from '@headlessui/react'

//localdb
import { db } from "../localdb/db"
import {importDB, exportDB, importInto, peakImportFile,} from "dexie-export-import";
import { closeModal, openModal } from "../features/modal/modalSlice";
import { RootState } from "../app/store";


function Settings() {



  return (
    <div
      className="p-16"
    >
      <h1
        className="text-3xl font-medium mb-5"
      >Settings</h1>
      
      <ImportExportSetting />
    </div>
  )
}




function ImportExportSetting(){

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const dispatch = useDispatch()

  const handleDexieImport = async (file: File) => {
    try {

      if (!file) {
        return;
      }
  
      await importInto(db, file);
  
      console.log('Import successful');
    } catch (error) {
      console.error('Import failed:', error);
    }
    //const importBlob = await importDB(importData)
  }

  const handleDexieExport = async () => {
    try {
      const exportBlob = await exportDB(db, { prettyJson: true });
  
      const blobUrl = URL.createObjectURL(exportBlob);
  
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'exportedData.json';
  
      document.body.appendChild(a);
      a.click();
  
      document.body.removeChild(a);
  
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Export failed:', error);
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file)
      setSelectedFile(file)

  }


  const handleImportModalConfirmation = () => {

    if(fileInputRef.current){
      fileInputRef.current.click()


    }
  }

  useEffect(()=>{
    if(selectedFile){
      dispatch(openModal({
        modal: 'confirmPopup',
        modalPayload: {
          title: 'Are you sure you want to import the file?',
          description: 'This will overwrite your current data that you have. Export your current data first if you want to save it.',
        }
      }))
    }
  },[selectedFile])

  const confirmPopup = useSelector((state: RootState) => state.modal.confirmPopup)


  useEffect(()=>{
    if(confirmPopup !== null || confirmPopup !== undefined){
      if(confirmPopup){
        if(selectedFile){
          handleDexieImport(selectedFile)
          dispatch(closeModal())
        }
      } else{
        dispatch(closeModal())
      }
    }
  },[confirmPopup])

  return(
    <LabeledOption
      label="Import/Export Data"
      description="You can import or export all of your data here. The data is saved as a JSON file"
    >
      <div
        className=" flex justify-end gap-2"
      >
        <input ref={fileInputRef} type="file" className="w-fit" onChange={handleFileSelect} hidden />
        <button
          className="py-2 px-3 bg-gray-600 rounded-lg"
          onClick={handleImportModalConfirmation}
        >
          Import
        </button>
        <button
          className="py-2 px-3 bg-gray-600 rounded-lg"
          onClick={handleDexieExport}
        >
          Export
        </button>
      </div>
    </LabeledOption>
  )
}




interface LabeledOptionProps{
  children?: ReactNode
  label?: string
  description?: string
}

function LabeledOption(props: LabeledOptionProps){

  return(
    <div
      className="w-full flex"
    >
      <div
        className=" max-w-xs min-w-[5rem] w-full"
      >
        <h2
          className="font-medium text-lg text-white text-opacity-80"
        >
          {props.label}
        </h2>
        <p
          className="text-sm text-white text-opacity-60"
        >
          {props.description}
        </p>
      </div>

      <div
        className="flex-1"
      >
        {
          props.children
        }
      </div>
      
    </div>
  )
}
  
export default Settings