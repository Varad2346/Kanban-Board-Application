import React, { useContext, useState } from "react";
import "./AddTask.css";
import { MyContext } from "../store/MyContext";

const AddTask = ({ id, toggle }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [file, setFile] = useState(null);
  const { rowAdded,setRowAdded } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("task", title);
    formData.append("dueDate", dueDate);
    formData.append("assignee", assignee);
    if (file) formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/api/task/new", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setRowAdded((prev)=>prev+1);
        toggle(); // Close the form
      } else {
        throw new Error(data.message || "Task creation failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-task-form-container">
      <form className="add-task-form" onSubmit={handleSubmit}>
        <div className="add-task-row-one">
          <div className="add-task-title-field">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="add-task-date-field">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="add-task-row-two">
          <label>Assignee</label>
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
          />
        </div>

        <div className="add-task-file-field">
          <label>Attach File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="*"
          />
        </div>

        <div className="add-task-row-three">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="cancel-btn" onClick={toggle}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
