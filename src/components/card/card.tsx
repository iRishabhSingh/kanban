import "@/components/card/card.css";
import { Ticket, User } from "@/types/kanbanTypes";
import { getIconForGroup, getPriorityLabel } from "@/utils/kanbanUtils";

interface CardProps {
  readonly ticket: Ticket;
  readonly user: User;
  readonly groupBy: string;
}

export default function Card({ ticket, user, groupBy }: CardProps) {
  const showAvatar = groupBy !== "user";
  const showStatusIcon = groupBy !== "status";
  const showPriorityIcon = groupBy !== "priority";

  return (
    <div className="card">
      <div className="card__header">
        <span className="card__id">{ticket.id}</span>
        {showAvatar && (
          <div className="card__user-avatar">
            <span className="card__avatar-image">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <span
              className={`card__status-dot ${
                user.available ? "card__status-dot--available" : ""
              }`}
            ></span>
          </div>
        )}
      </div>
      <h3 className="card__title">
        {showStatusIcon && (
          <span className="card__status-icon">
            {getIconForGroup(ticket.status)}
          </span>
        )}
        {ticket.title}
      </h3>
      <div className="card__tags">
        {showPriorityIcon && (
          <span className="card__priority-tag">
            {getIconForGroup(getPriorityLabel(ticket.priority))}
          </span>
        )}
        {ticket.tag.map((tag) => (
          <span key={tag} className="card__feature-tag">
            <span className="card__feature-tag-dot"></span>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
