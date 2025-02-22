// src/components/AddProject.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  clearAllProjectSliceErrors,
  getAllProjects,
  resetProjectStateThunk,
} from "../../store/slices/projectSlice";
import { toast } from "react-toastify";

const AddProject = () => {
  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("false");
  const [projectBanner, setProjectBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.project);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectBanner(file);
      const reader = new FileReader();
      reader.onload = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    // Use the key "projectBanner" for the image file (as expected by the backend)
    formData.append("projectBanner", projectBanner);

    dispatch(addProject(formData));
  };

  // Handle notifications and state resets
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectStateThunk());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, message]);

  return (
    <div style={{ maxWidth: "650px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ fontSize:"50px" }}>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter title"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter description"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Git Repo Link</label>
          <input
            type="text"
            value={gitRepoLink}
            onChange={(e) => setGitRepoLink(e.target.value)}
            required
            placeholder="Enter Git repo link"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Project Link</label>
          <input
            type="text"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            required
            placeholder="Enter project link"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Technologies (comma separated or JSON array)</label>
          <input
            type="text"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            required
            placeholder='e.g., "React,Node.js"'
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Stack (comma separated or JSON array)</label>
          <input
            type="text"
            value={stack}
            onChange={(e) => setStack(e.target.value)}
            required
            placeholder='e.g., "MERN"'
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Deployed?</label>
          <select
            value={deployed}
            onChange={(e) => setDeployed(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Project Banner Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required
            style={{ display: "block", marginTop: "0.5rem" }}
          />
          {bannerPreview && (
            <img
              src={bannerPreview}
              alt="Banner Preview"
              style={{ width: "100%", marginTop: "1rem" }}
            />
          )}
        </div>
        <button type="submit" disabled={loading} style={{ padding: "0.25rem 1rem", fontSize: "20px", backgroundColor: "black", color: "white" }}>
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default AddProject;
