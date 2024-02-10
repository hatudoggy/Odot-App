import Dexie, { Table } from "dexie";
import { KeyOfIconList } from "../components/DynamicIcon";
import { todoTags, todoPriority } from "../interface/ITodo";

export interface NoteItem {
  id?: number;
  title?: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RepoItem {
  id?: number;
  title: string;
  link: string;
  media: number;
  tags: number[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RepoMedia {
  id?: number;
  label: string;
  icon?: KeyOfIconList;
}

export interface RepoTag {
  id?: number;
  label: string;
  color?: string;
}

export interface TodoItem {
  id?: number;
  title: string;
  startDate: Date;
  endDate: Date;
  tags?: todoTags[];
  priority: todoPriority;
  note?: string;
  completed: boolean;
}

export class SubClassedDexie extends Dexie {
  notes!: Table<NoteItem>;
  repo!: Table<RepoItem>;
  repoMedia!: Table<RepoMedia>;
  repoTag!: Table<RepoTag>;
  todo!: Table<TodoItem>;

  constructor() {
    super("OdotDB");
    this.version(7).stores({
      notes: "++id, title, createdAt, updatedAt",
      repo: "++id, title, link, media, *tags, createdAt, updatedAt",
      repoMedia: "++id, label",
      repoTag: "++id, label",
      todo: "++id, title, startDate, endDate, *tags, priority, note, completed",
    });
  }
}

export const db = new SubClassedDexie();
