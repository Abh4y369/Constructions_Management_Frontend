import { useState } from "react";
import { addProjectApi, updateProjectApi } from "../Services/allApis";
import { toast } from "react-toastify";

const emptyProject = {
  projectName: "", clientName: "", location: "", budget: "", startDate: "", endDate: "", status: "Ongoing", description: "",
};

const toFormProject = (project) => project ? {
  ...emptyProject,
  ...project,
  startDate: project.startDate?.split("T")[0] || "",
  endDate: project.endDate?.split("T")[0] || "",
} : emptyProject;

const ProjectForm = ({ setShowForm, editProject, setEditProject, onSaved }) => {
  const [project, setProject] = useState(() => toFormProject(editProject));

  const updateField = (event) => setProject((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!project.projectName.trim() || !project.location.trim() || project.budget === "" || !project.startDate || !project.endDate) {
      return toast.warning("Project name, location, budget, and dates are required");
    }
    if (Number(project.budget) < 0) return toast.warning("Budget cannot be negative");
    if (new Date(project.endDate) < new Date(project.startDate)) return toast.warning("End date must be on or after the start date");

    const result = editProject
      ? await updateProjectApi(editProject._id, project)
      : await addProjectApi(project);
    if (![200, 201].includes(result.status)) return toast.error(result.data?.message || "Unable to save project");

    toast.success(editProject ? "Project updated successfully" : "Project added successfully");
    setProject(emptyProject);
    onSaved();
    setShowForm(false);
    setEditProject(null);
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl border border-green-100 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">    
      <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">{editProject ? "Edit Project" : "Add Project"}</h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-5">Keep project dates, budget, and delivery status current.</p>
      
      <form className="grid gap-3 sm:gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <input 
          required 
          name="projectName" 
          placeholder="Project Name" 
          className="border border-slate-300 rounded-md p-2.5 sm:p-3 text-sm sm:text-base w-full" 
          value={project.projectName} 
          onChange={updateField} 
        />
        
        <input 
          name="clientName" 
          placeholder="Client Name (optional)" 
          className="border border-slate-300 rounded-md p-2.5 sm:p-3 text-sm sm:text-base w-full" 
          value={project.clientName} 
          onChange={updateField} 
        />
        
        <input 
          required 
          name="location" 
          placeholder="Location" 
          className="border border-slate-300 rounded-md p-2.5 sm:p-3 text-sm sm:text-base w-full" 
          value={project.location} 
          onChange={updateField} 
        />
        
        <input 
          required 
          name="budget" 
          type="number" 
          min="0" 
          step="0.01" 
          placeholder="Budget" 
          className="border border-slate-300 rounded-md p-2.5 sm:p-3 text-sm sm:text-base w-full" 
          value={project.budget} 
          onChange={updateField} 
        />
        
        <select 
          name="status" 
          className="border border-slate-300 rounded-md p-2.5 sm:p-3 text-sm sm:text-base w-full" 
          value={project.status} 
          onChange={updateField}
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Delayed">Delayed</option>
          <option value="Completed">Completed</option>
        </select>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
          <label htmlFor="startDate" className="text-sm sm:text-base w-full sm:w-auto">
            Start Date: <br />
            <input 
              name="startDate" 
              id="startDate"
              required 
              type="date" 
              className="border border-slate-300 rounded-md p-2.5 sm:p-3 text-sm sm:text-base w-full mt-1" 
              value={project.startDate} 
              onChange={updateField} 
            />
          </label>
          <label htmlFor="endDate" className="text-sm sm:text-base w-full sm:w-auto">
            End Date: <br />
            <input 
              name="endDate" 
              id="endDate"
              required 
              type="date" 
              className="border border-slate-300 rounded-md p-2.5 sm:p-3 text-sm sm:text-base w-full mt-1" 
              value={project.endDate} 
              onChange={updateField} 
            />
          </label>
        </div>
        
        <textarea 
          name="description" 
          rows="3" 
          placeholder="Project Description (optional)" 
          className="border border-slate-300 rounded-md p-2.5 sm:p-3 text-sm sm:text-base w-full md:col-span-2" 
          value={project.description} 
          onChange={updateField} 
        />
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:col-span-2">
          <button 
            type="submit" 
            className="bg-green-800 hover:bg-green-900 text-white px-4 sm:px-5 py-2.5 sm:py-2 rounded-md font-medium text-sm sm:text-base w-full sm:w-auto"
          >
            {editProject ? "Update Project" : "Add Project"}
          </button>
          <button 
            type="button" 
            onClick={() => { setProject(emptyProject); setEditProject(null); setShowForm(false); }} 
            className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 sm:px-5 py-2.5 sm:py-2 rounded-md font-medium text-sm sm:text-base w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProjectForm;