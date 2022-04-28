import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddProject from "./AddProject";
import Project from "./Project";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getProjects as getProjectList,
  addCandidate,
  createProject,
  completeProject,
  approve,
} from "../../utils/platform";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProjects = useCallback(async () => {
      try {
        setLoading(true);
        setProjects(await getProjectList());
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    }, []);

    const addProject = async (data) => {
        try {
          setLoading(true);
          createProject(data).then((resp) => {
            getProjects();
          });
          toast(<NotificationSuccess text="Project added successfully." />);
        } catch (error) {
          console.log({ error });
          toast(<NotificationError text="Failed to create a project." />);
        } finally {
          setLoading(false);
        }
      };

      const apply = async (id) => {
        try {
          setLoading(true);
          await addCandidate({
            id,
          }).then((resp) => getProjects());
          toast(<NotificationSuccess text="Applied successfully" />);
        } catch (error) {
          toast(<NotificationError text="Failed to apply." />);
        } finally {
          setLoading(false);
        }
      };

      const complete = async (id, resultLink) => {
        try {
          setLoading(true);
          await completeProject({
            id,
            resultLink,
          }).then((resp) => getProjects());
          toast(<NotificationSuccess text="Completed successfully" />);
        } catch (error) {
          toast(<NotificationError text="Failed to complete." />);
        } finally {
          setLoading(false);
        }
      };

      const pay = async (id, amount) => {
        try {
          setLoading(true);
          await approve({
            id,
            amount,
          }).then((resp) => getProjects());
          toast(<NotificationSuccess text="Aproved and paid successfully" />);
        } catch (error) {
          toast(<NotificationError text="Failed to aprove." />);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        getProjects();
      }, [getProjects]);

      return (
        <>
          {!loading ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h1 className="fs-4 fw-bold mb-0">NEAR Freelance</h1>
                <AddProject save={addProject} />
              </div>
              <Row xs={1} sm={2} lg={2} className="g-3 mb-5 g-xl-4 g-xxl-5">
                {projects.map((_project) => (
                  <Project
                    project={{
                      ..._project,
                    }}
                    key={_project.id}
                    apply={apply}
                    complete={complete}
                    pay={pay}
                  />
                ))}
              </Row>
            </>
          ) : (
            <Loader />
          )}
        </>
      );
    };

    export default Projects;