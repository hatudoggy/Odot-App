import Dexie, { Table } from 'dexie'
import { KeyOfIconList } from '../components/DynamicIcon'
import OpenAI from 'openai'

export interface NoteItem {
  id?: number
  title?: string
  content: string
  createdAt?: Date
  updatedAt?: Date
}


export interface RepoItem {
  id?: number
  title: string
  link: string
  media: number
  tags: number[]
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface RepoMedia {
  id?: number
  label: string
  icon?: KeyOfIconList
}

export interface RepoTag {
  id?: number
  label: string
  color?: string
}

export interface GPTSettings {
  apiKey: string
  currentModel: string
}

export interface GPTItem {
  id?: number
  chatId: number
  label: string
  createdAt: Date
  updatedAt: Date
}

export interface GPTItemChat {
  id?: number
  chatContent: ChatHead[]
}

export type ChatHead = OpenAI.Chat.Completions.ChatCompletionMessageParam & { timestamp: Date }


export class SubClassedDexie extends Dexie {
  notes!: Table<NoteItem>
  repo!: Table<RepoItem>
  repoMedia!: Table<RepoMedia>
  repoTag!: Table<RepoTag>
  gpt!: Table<GPTItem>
  gptChat!: Table<GPTItemChat>

  constructor() {
    super('OdotDB')
    this.version(8).stores({
      notes: '++id, title, createdAt, updatedAt',
      repo: '++id, title, link, media, *tags, createdAt, updatedAt',
      repoMedia: '++id, label',
      repoTag: '++id, label',
      gpt: '++id, label, createdAt, updatedAt',
      gptChat: '++id',
    })
  }
}

export const db = new SubClassedDexie()