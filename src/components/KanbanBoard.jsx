import React, { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./KanbanBoard.css";
import { useEffect } from "react";
import AddColumn from "./AddColumn";
import AddTask from "./AddTask";
import { MyContext } from "../store/MyContext";
import TaskModal from "./TaskModal";

const KanbanBoard = () => {
  const [cols, setCols] = useState([]);
  const { selectedProjectId, ref, colAdded, rowAdded } = useContext(MyContext);

  const [showForm, setShowForm] = useState(false);
  const [showCardForm, setCardForm] = useState(true);
  const [selectedColId, setSelectedColId] = useState(null);

  //
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setShowTaskModal(false);
  };

  const toggleFormVisible = (event) => {
    event.stopPropagation();
    setShowForm((prev) => !prev);
  };
  const toggleCardForm = () => {
    setCardForm((prev) => !prev);
  };

  useEffect(() => {
    async function getCols() {
      if (!selectedProjectId) return; // wait until it's available

      try {
        console.log("pjds", selectedProjectId);
        const response = await fetch(`http://localhost:3000/api/column`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: selectedProjectId }),
        });

        const data = await response.json();
        console.log("Parsed Columns1:", data);

        if (data.success) {
          setCols(data.data);
        }
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    }

    getCols();
  }, [selectedProjectId, ref, colAdded, rowAdded]); // trigger only when projId is updated

  const updateColumnTasks = async (columnId, tasks) => {
    try {
      await fetch(`http://localhost:3000/api/column/${columnId}/tasks`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks: tasks.map((t) => t._id),
        }),
      });
    } catch (err) {
      console.error("Error updating backend:", err);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColIndex = cols.findIndex(
      (col) => col._id === source.droppableId
    );
    const destColIndex = cols.findIndex(
      (col) => col._id === destination.droppableId
    );

    if (sourceColIndex === -1 || destColIndex === -1) return;

    const sourceCol = cols[sourceColIndex];
    const destCol = cols[destColIndex];

    const sourceTasks = [...sourceCol.tasks];
    const destTasks = [...destCol.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);

      const updatedCols = [...cols];
      updatedCols[sourceColIndex] = {
        ...sourceCol,
        tasks: sourceTasks,
      };
      setCols(updatedCols);
    } else {
      destTasks.splice(destination.index, 0, movedTask);

      const updatedCols = [...cols];
      updatedCols[sourceColIndex] = {
        ...sourceCol,
        tasks: sourceTasks,
      };
      updatedCols[destColIndex] = {
        ...destCol,
        tasks: destTasks,
      };
      setCols(updatedCols);
      await updateColumnTasks(sourceCol._id, sourceTasks);
      await updateColumnTasks(destCol._id, destTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-area">
        {cols?.map((column, index) => {
          return (
            <div
              key={index}
              className="kanban-column"
              onMouseOver={() => setSelectedColId(column._id)}
            >
              <div className="column-title">
                <span>
                  {column?.title.toUpperCase()} {column?.tasks?.length}
                </span>
                <span
                  style={{ marginRight: "10px", color: "var(--theme-color)" }}
                >
                  <i className="fa-solid fa-caret-down"></i>
                </span>
              </div>

              <Droppable droppableId={column._id}>
                {(provided) => (
                  <div
                    className="kanban-droppable"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {column?.tasks?.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="kanban-card"
                            onClick={() => openTaskModal(task)}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="kanban-card-content">
                              <div className="kanban-card-task">
                                {task.task}
                              </div>
                              <div className="kanban-card-menu">
                                <span>
                                  <i className="fa-solid fa-trash"></i>
                                </span>
                              </div>
                            </div>
                            <div
                              style={{ height: "40px" }}
                              className="kanban-card-name"
                            >
                              <div>
                                <span>
                                  <i
                                    class="fa-regular fa-square-check"
                                    style={{ color: "var(--theme-color)" }}
                                  ></i>
                                </span>{" "}
                                KAN {index}
                              </div>
                              <img
                                src="./user_icon.png"
                                style={{ width: "25px" }}
                                alt=""
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {selectedColId === column._id &&
                      (showCardForm ? (
                        <div
                          className="task-create-btn"
                          onClick={toggleCardForm}
                          title="Add-Task"
                        >
                          <i
                            className="fa-solid fa-plus"
                            style={{ marginLeft: "20px", marginRight: "10px" }}
                          ></i>
                          <span>Create</span>
                        </div>
                      ) : (
                        <AddTask id={selectedColId} toggle={toggleCardForm} />
                      ))}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
        <div className="column-add-button">
          <i
            class="fa-solid fa-plus"
            style={{ fontWeight: "100" }}
            onClick={toggleFormVisible}
            title="Add Column"
          ></i>

          {selectedProjectId ? (
             showForm && <AddColumn visible={toggleFormVisible} />
          ) : (
            <div className="project-select-popup">No Project Selected!</div>
          )}
          {/* {showForm && selectedProjectId && <AddColumn visible={toggleFormVisible} />} */}
          {showTaskModal && selectedTask && (
            <TaskModal task={selectedTask} onClose={closeTaskModal} />
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
