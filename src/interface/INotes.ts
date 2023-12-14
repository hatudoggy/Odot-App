

export interface NoteItem {
  title: string
  content: NoteContent
  type: NoteType
}

export type NoteContent = string | NoteCheckItem[] | NotePhotoItem

interface NoteCheckItem {
  checked: boolean
  label: string
}

interface NotePhotoItem {
  link: string
  label: string
}

export type NoteType = 'text' | 'checklist' | 'photo'
