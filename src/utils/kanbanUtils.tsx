// kanbanUtils.ts
import {
  Done,
  ToDo,
  Backlog,
  Cancelled,
  InProgress,
} from "@/assets/StatusIcons";
import {
  NoPriority,
  LowPriority,
  HighPriority,
  UrgentPriority,
  MediumPriority,
} from "@/assets/PriorityIcons";

export type GroupName =
  | "Low"
  | "Done"
  | "Todo"
  | "High"
  | "Urgent"
  | "Medium"
  | "Backlog"
  | "Cancelled"
  | "No Priority"
  | "In progress";

const ICON_MAPPING: Record<GroupName, JSX.Element> = {
  "No Priority": <NoPriority />,
  Urgent: <UrgentPriority />,
  High: <HighPriority />,
  Medium: <MediumPriority />,
  Low: <LowPriority />,
  Backlog: <Backlog />,
  "In progress": <InProgress />,
  Done: <Done />,
  Cancelled: <Cancelled />,
  Todo: <ToDo />,
};

// Retrieve the icon based on the group name, ensuring it’s typed correctly
export function getIconForGroup(group: GroupName | string): JSX.Element {
  if (group in ICON_MAPPING) {
    return ICON_MAPPING[group as GroupName];
  }
  return (
    <span className="kanban-board__logo-name">
      {group.charAt(0).toUpperCase()}
    </span>
  );
}

export function getPriorityLabel(priority: number): GroupName {
  switch (priority) {
    case 4:
      return "Urgent";
    case 3:
      return "High";
    case 2:
      return "Medium";
    case 1:
      return "Low";
    default:
      return "No Priority";
  }
}
