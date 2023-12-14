import Dexie, { Table } from 'dexie'
import { KeyOfIconList } from '../components/DynamicIcon'

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

export class SubClassedDexie extends Dexie {
    repo!: Table<RepoItem>
    repoMedia!: Table<RepoMedia>
    repoTag!: Table<RepoTag>

    constructor() {
        super('OdotDB')
        this.version(6).stores({
            repo: '++id, title, link, media, *tags, createdAt, updatedAt',
            repoMedia: '++id, label',
            repoTag: '++id, label'
        })
    }
}

export const db = new SubClassedDexie()