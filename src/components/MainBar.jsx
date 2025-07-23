import React, { useContext, useEffect, useState } from "react";
import "./MainBar.css";
import { MyContext } from "../store/MyContext";

const MainBar = () => {
  const { userDetails, setSelectedProjectId ,shouldRefresh,setShouldRefresh} = useContext(MyContext);

  const [projectList, setProjectList] = useState([]);
  const [newProjectInput, setNewProjectInput] = useState({
    projectName: "",
    domain: "",
  });
  const [isProjectFormVisible, setIsProjectFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 New search state

  useEffect(() => {
    if (userDetails) {
      async function fetchProjects() {
        try {
          const id = userDetails?._id;
          const response = await fetch("http://localhost:3000/api/project/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          });
          const data = await response.json();
          if (data.success) {
            setProjectList(data.data);
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      }

      fetchProjects();
    }
  }, [userDetails,shouldRefresh]);

  const handleSubmit = async () => {
    try {
      const id = userDetails?._id;

      const response = await fetch("http://localhost:3000/api/project/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          projectName: newProjectInput.projectName,
          Domain: newProjectInput.domain,
        }),
      });

      const data = await response.json();
      if (data.success) {
        const projectResponse = await fetch(
          "http://localhost:3000/api/project/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          }
        );
        const projectData = await projectResponse.json();
        if (projectData.success) {
          setProjectList(projectData.data);
        }

        setNewProjectInput({ projectName: "", domain: "" });
        setIsProjectFormVisible(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredProjects = projectList.filter((project) =>
    (project.projectName + project.Domain)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        <span>Projects</span>
        <div className="add-project-button">
          <i
            className="fa-solid fa-plus"
            style={{ fontWeight: "100" }}
            onClick={() => setIsProjectFormVisible(true)}
          ></i>
        </div>
      </div>
      <div className="project-search">
        <i className="fa-solid fa-search"></i>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />{" "}
      </div>
      <div className="project-list">
        {filteredProjects?.map((project) => (
          <div
            key={project._id}
            className="project-card"
            onClick={() => setSelectedProjectId(project._id)}
          >
            <div className="project-title">{project.projectName}</div>
            <div className="project-domain">{project.Domain}</div>
            <div className="project-settings">
              <i class="fa-solid fa-caret-down"></i>
            </div>
          </div>
        ))}
      </div>

      {isProjectFormVisible && (
        <div className="project-form">
          <div className="project-form-section">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="projectName"
              id="title"
              value={newProjectInput.projectName}
              onChange={(e) =>
                setNewProjectInput({
                  ...newProjectInput,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="Enter project name"
            />
          </div>
          <div className="project-form-section">
            <label htmlFor="domain">Domain</label>
            <input
              type="text"
              name="domain"
              id="domain"
              value={newProjectInput.domain}
              onChange={(e) =>
                setNewProjectInput({
                  ...newProjectInput,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="Enter project domain"
            />
          </div>
          <div className="project-form-actions">
            <button onClick={handleSubmit}>Add Project</button>
            <button
              onClick={() => setIsProjectFormVisible(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainBar;
