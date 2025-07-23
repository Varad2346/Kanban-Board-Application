import React, { useContext, useState } from "react";
import "./AddColumn.css";
import { MyContext } from "../store/MyContext";
import { useSnackbar } from 'notistack';

const AddColumn = ({ visible }) => {
    const { enqueueSnackbar } = useSnackbar();

  const [addCol, setAddCol] = useState("");
  const { selectedProjectId,setcolAdded } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!addCol.trim()) return;
    try {
      const response = await fetch(`http://localhost:3000/api/column/new/${selectedProjectId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: addCol }),
      });

      const data = await response.json();
      if (data.success) {
                enqueueSnackbar("Column Added Sucessfully!", { variant: "success" });

        setcolAdded((prev)=>prev+1);
        setAddCol("");
        visible(); // call to close

      } else {
        throw new Error("Could not create column");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-column-form">
      <form onSubmit={handleSubmit}>
        <div className="add-column-upper">
          <input
            type="text"
            placeholder="Enter column name"
            className="add-column-input"
            value={addCol}
            onChange={(e) => setAddCol(e.target.value)}
            autoFocus
          />
        </div>
        <div className="add-column-lower">
          <button type="submit" className="add-col-btn add-col-right" title="Add Column">
         Submit
          </button>
          <button type="button" className="add-col-cancel add-col-wrong" title="Cancel" onClick={visible}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddColumn;
