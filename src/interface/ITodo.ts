export interface TodoItem {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  tags: todoTags[];
  priority: todoPriority;
  note: string;
  status: todoStatus;
}

export type todoFilters = "all" | "day" | "week" | "month" | "notDue";

export type todoTags = "work" | "school" | "personal" | "other";

export type todoPriority = "low" | "medium" | "high";

export type todoStatus = "completed" | "in progress" | "not started";
