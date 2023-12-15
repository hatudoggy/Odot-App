export interface TodoItem {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  tags: todoTags[];
  priority: todoPriority;
  note: string;
  completed: boolean;
}

export type todoFilters = "all" | "day" | "week" | "month" | "notDue";

export type todoTags = "work" | "school" | "personal" | "other";

export type todoPriority = "low" | "medium" | "high";
