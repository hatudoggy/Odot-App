import { ChangeEvent } from "react";
import { db } from "../localdb/db"
import {importDB, exportDB, importInto, peakImportFile,} from "dexie-export-import";


function Settings() {

  const handleDexieImport = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
  
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

  return (
    <div
      className="p-16"
    >
      <div
        className="flex gap-6 items-center"
      >
        Import/Export Data 
        <div
          className="flex gap-2"
        >
          <input type="file" onChange={handleDexieImport} />
          <button
            className="py-2 px-3 bg-gray-600 rounded-lg"
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
      </div>
    </div>
  )
}
  
export default Settings