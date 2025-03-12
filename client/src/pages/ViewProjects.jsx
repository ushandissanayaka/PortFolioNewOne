import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewProjects = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState([]); // Initialize as an array
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState(false); // Initialize as boolean
  const [projectBanner, setProjectBanner] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        });
        const project = res.data.project;
        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setTechnologies(project.technologies || []); // Ensure it's an array
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBanner(project.projectBanner?.url || null);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch project details");
      }
    };

    getProjects();
  }, [id]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Project Details</h1>
        <div style={styles.field}>
          {projectBanner && (
            <div style={styles.field}>
             
              <img
                src={projectBanner}
                alt="Project Banner"
                style={styles.bannerImage}
              />
            </div>
          )}
          <label style={styles.label}>Title</label>
          <input
            type="text"
            value={title}
            readOnly
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            readOnly
            style={{ ...styles.input, height: "100px" }}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Git Repo Link</label>
          <a
            href={gitRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            {gitRepoLink}
          </a>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Project Link</label>
          <a
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            {projectLink}
          </a>
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Technologies</label>
          <input
            type="text"
            value={technologies.join(", ")} // Convert array to string
            readOnly
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Stack</label>
          <input
            type="text"
            value={stack}
            readOnly
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Deployed?</label>
          <input
            type="text"
            value={deployed ? "Yes" : "No"}
            readOnly
            style={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewProjects;

// Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
    padding: '2rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    width: '100%',
    maxWidth: '650px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#2d3748',
    textAlign: 'center',
  },
  field: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a5568',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#edf2f7',
    fontSize: '14px',
    color: '#2d3748',
    outline: 'none',
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px',
    marginTop: '0.5rem',
  },
  link: {
    display: 'block',
    width: '100%',
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#edf2f7',
    fontSize: '14px',
    color: '#3182ce',
    textDecoration: 'none',
    cursor: 'pointer',
    outline: 'none',
  },
};