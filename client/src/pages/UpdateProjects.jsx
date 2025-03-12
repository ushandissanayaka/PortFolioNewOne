import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState(false);
  const [projectBanner, setProjectBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        });
        const project = res.data.project;
        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setTechnologies(project.technologies.join(", "));
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBanner(project.projectBanner?.url || null);
        setBannerPreview(project.projectBanner?.url || "");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch project details");
      }
    };

    getProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies.split(",").map(tech => tech.trim()));
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    if (projectBanner && typeof projectBanner !== 'string') {
      formData.append("projectBanner", projectBanner);
    }

    try {
      const res = await axios.put(`http://localhost:4000/api/v1/project/update/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(res.data.message);
      navigate(`/view/project/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update project");
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Update Project</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Project Banner</label>
            <div style={styles.fileInputContainer}>
              <input
                type="file"
                id="fileInput"
                onChange={handleBannerChange}
                style={styles.hiddenFileInput}
              />
              <label htmlFor="fileInput" style={styles.customFileButton}>
                Choose File
              </label>
              {bannerPreview && (
                <img
                  src={bannerPreview}
                  alt="Project Banner Preview"
                  style={styles.bannerImage}
                />
              )}
            </div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...styles.input, height: "100px" }}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Git Repo Link</label>
            <input
              type="text"
              value={gitRepoLink}
              onChange={(e) => setGitRepoLink(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Project Link</label>
            <input
              type="text"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Technologies (comma separated)</label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Stack</label>
            <input
              type="text"
              value={stack}
              onChange={(e) => setStack(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Deployed?</label>
            <select
              value={deployed}
              onChange={(e) => setDeployed(e.target.value === "true")}
              style={styles.input}
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button type="submit" style={styles.submitButton}>
            Update Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;

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
  fileInputContainer: {
    position: 'relative',
    marginBottom: '1.5rem',
  },
  hiddenFileInput: {
    display: 'none',
  },
  customFileButton: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    backgroundColor: '#3182ce',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'center',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.3s ease',
  },
  customFileButtonHover: {
    backgroundColor: '#2c5282',
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '6px',
    marginTop: '0.5rem',
  },
  submitButton: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#3182ce',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    outline: 'none',
  },
};