import AddIcon from "@/assets/AddIcon";
import "@/components/kanban/kanban.css";
import Card from "@/components/card/card";
import OptionsIcon from "@/assets/OptionsIcon";
import { Ticket, User } from "@/types/kanbanTypes";
import { getIconForGroup, GroupName } from "@/utils/kanbanUtils";

const PRIORITY_GROUPS: GroupName[] = [
  "No Priority",
  "Urgent",
  "High",
  "Medium",
  "Low",
];
const STATUS_GROUPS: GroupName[] = [
  "Backlog",
  "Todo",
  "In progress",
  "Done",
  "Cancelled",
];

interface KanbanBoardProps {
  readonly users: User[];
  readonly groupBy: string;
  readonly groupTickets: Record<string, Ticket[]>;
}

export default function KanbanBoard({
  users,
  groupBy,
  groupTickets,
}: KanbanBoardProps) {
  let groups: GroupName[] = [];
  if (groupBy === "priority") {
    groups = PRIORITY_GROUPS;
  } else if (groupBy === "status") {
    groups = STATUS_GROUPS;
  }

  return (
    <section className="kanban-board">
      <div className="kanban-board__container">
        {groups.length > 0
          ? groups.map((group) => (
              <KanbanColumn
                key={group}
                group={group}
                users={users}
                groupBy={groupBy}
                tickets={groupTickets[group] || []}
              />
            ))
          : Object.entries(groupTickets).map(([group, tickets]) => (
              <KanbanColumn
                key={group}
                group={group as GroupName}
                users={users}
                groupBy={groupBy}
                tickets={tickets}
              />
            ))}
      </div>
    </section>
  );
}

interface KanbanColumnProps {
  users: User[];
  group: GroupName;
  groupBy: string;
  tickets: Ticket[];
}

function KanbanColumn({
  users,
  group,
  groupBy,
  tickets,
}: Readonly<KanbanColumnProps>) {
  const Icon = getIconForGroup(group);

  return (
    <div className="kanban-board__column">
      <div className="kanban-board__column-header">
        <div className="kanban-board__group-info">
          <span className="kanban-board__logo">{Icon}</span>
          <span className="kanban-board__group-name">{group}</span>
          <span className="kanban-board__ticket-count">{tickets.length}</span>
        </div>
        <KanbanActions />
      </div>
      <div className="kanban-board__tickets">
        {tickets.length > 0 &&
          tickets.map((ticket) => (
            <Card
              key={ticket.id}
              ticket={ticket}
              groupBy={groupBy}
              user={users.find((u) => u.id === ticket.userId)!}
            />
          ))}
      </div>
    </div>
  );
}

function KanbanActions() {
  return (
    <div className="kanban-board__actions">
      <ActionButton label="Add">
        <AddIcon />
      </ActionButton>
      <ActionButton label="Options">
        <OptionsIcon />
      </ActionButton>
    </div>
  );
}

interface ActionButtonProps {
  readonly label: string;
  readonly children: JSX.Element;
}

function ActionButton({ label, children }: ActionButtonProps) {
  return (
    <button aria-label={label} className="kanban-board__button">
      {children}
    </button>
  );
}
