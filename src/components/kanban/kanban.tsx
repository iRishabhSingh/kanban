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
  users: User[];
  groupBy: string;
  groupTickets: Record<string, Ticket[]>;
}

export default function KanbanBoard({
  users,
  groupBy,
  groupTickets,
}: KanbanBoardProps) {
  const groups: GroupName[] =
    groupBy === "priority"
      ? PRIORITY_GROUPS
      : groupBy === "status"
      ? STATUS_GROUPS
      : [];

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
                group={group}
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
  group: GroupName | string;
  groupBy: string;
  tickets: Ticket[];
}

function KanbanColumn({ users, group, groupBy, tickets }: KanbanColumnProps) {
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
  label: string;
  children: JSX.Element;
}

function ActionButton({ label, children }: ActionButtonProps) {
  return (
    <button aria-label={label} className="kanban-board__button">
      {children}
    </button>
  );
}
