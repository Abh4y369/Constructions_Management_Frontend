import { useState } from "react";
import Navbar from "../Components/Navbar";
import ProjectForm from "../Components/ProjectForm";
import ProjectTable from "../Components/ProjectTable";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return <div className="min-h-screen ">
    <Navbar />
    <main className="container mx-auto max-w-7xl px-5 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-7">
        <div><p className="text-sm font-medium text-forest-700 mb-1">PROJECT PORTFOLIO</p><h1 className="text-3xl font-bold tracking-tight text-slate-900">Project Dashboard</h1></div>
        <button onClick={() => { setEditProject(null); setShowForm(true); }} className="bg-green-700 hover:bg-green-800 shadow-sm text-white px-5 py-2.5 rounded-md font-medium">+ Add Project</button>
      </div>
      {showForm && <ProjectForm key={editProject?._id || "new-project"} setShowForm={setShowForm} editProject={editProject} setEditProject={setEditProject} onSaved={() => setRefreshKey((value) => value + 1)} />}
      <ProjectTable setEditProject={setEditProject} setShowForm={setShowForm} refreshKey={refreshKey} />
    </main>
  </div>;
};

export default Dashboard;
