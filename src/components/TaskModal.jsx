import React from "react";
import "./TaskModal.css";

const TaskModal = ({ task, onClose }) => {
  return (
    <div className="task-modal-overlay">
      <div className="task-modal">
        <div className="task-modal-header">
          <h2 className="task-title">{task?.task}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="task-modal-body">
          <div className="task-detail">
            <span className="detail-label">Due Date:</span>
            <span className="detail-value">{task.dueDate || "Not set"}</span>
          </div>
          <div className="task-detail">
            <span className="detail-label">Assignee:</span>
            <span className="detail-value">{task.assignee || "Unassigned"}</span>
          </div>
          {task.file && (
            <div className="task-detail">
              <span className="detail-label">File:</span>
              <a
                href={`http://localhost:3000/${task.file}`}
                target="_blank"
                rel="noreferrer"
                className="file-link"
              >
                View File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
