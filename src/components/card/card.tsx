import { Ticket, User } from "@/types/kanbanTypes";
import "@/components/card/card.css";

interface CardProps {
  readonly ticket: Ticket;
  readonly user: User;
  groupBy: string;
}

export default function Card({ ticket, user, groupBy }: CardProps) {
  const getPriorityLabel = (priority: number) => {
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
  };

  return (
    <div className="card">
      <div className="card__header">
        <span className="card__id">{ticket.id}</span>
        {groupBy !== "user" && (
          <div className="card__user-avatar">
            <img src="" alt="" className="card__avatar-image" />
            <span
              className={`card__status-dot ${
                user.available ? "card__status-dot--available" : ""
              }`}
            ></span>
          </div>
        )}
      </div>
      <h3 className="card__title">{ticket.title}</h3>
      <div className="card__tags">
        {groupBy !== "priority" && (
          <span className="card__priority-tag">
            {getPriorityLabel(ticket.priority)}
          </span>
        )}
        {ticket.tag.map((tag) => (
          <span key={tag} className="card__feature-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
