import { useEffect, useState } from "react";
import { deleteProjectApi, getAllProjectsApi } from "../Services/allApis";
import { toast } from "react-toastify";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const date = (value) => new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(value));

const ProjectTable = ({ setEditProject, setShowForm, refreshKey }) => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "", page: 1 });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      const result = await getAllProjectsApi(filters);
      setLoading(false);
      if (result.status === 200) {
        setProjects(result.data.projects);
        setPagination(result.data.pagination);
      } else toast.error(result.data?.message || "Failed to fetch projects");
    }, 250);
    return () => clearTimeout(timer);
  }, [filters, refreshKey]);

  const removeProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const result = await deleteProjectApi(id);
    if (result.status !== 200) return toast.error(result.data?.message || "Failed to delete project");
    toast.success("Project deleted successfully");
    setFilters((current) => ({ ...current, page: 1, _refresh: Date.now() }));
  };

  const isOverdue = (project) => project.status !== "Completed" && new Date(project.endDate) < new Date(new Date().toDateString());

  return <section className="bg-white rounded-lg shadow-sm border border-forest-100 p-6">
    <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-semibold text-slate-900">All Projects</h2><p className="text-sm text-slate-500 mt-1">Monitor active work and delivery milestones.</p></div><span className="text-sm font-medium text-forest-700 bg-forest-50 px-3 py-1 rounded-full">{pagination.total} total</span></div>
    <div className="flex flex-col gap-3 mb-5 sm:flex-row"><input aria-label="Search projects" placeholder="Search by project, client, or location" value={filters.search} onChange={(e) => setFilters((current) => ({ ...current, search: e.target.value, page: 1 }))} className="border border-slate-300 rounded-md px-3 py-2.5 flex-1" /><select aria-label="Filter by status" value={filters.status} onChange={(e) => setFilters((current) => ({ ...current, status: e.target.value, page: 1 }))} className="border border-slate-300 rounded-md px-3 py-2.5"><option value="">All statuses</option><option value="Ongoing">Ongoing</option><option value="Delayed">Delayed</option><option value="Completed">Completed</option></select></div>
    <div className="overflow-x-auto rounded-md border border-slate-200"><table className="w-full text-sm"><thead className="bg-forest-50 text-forest-900"><tr><th className="border-b border-slate-200 p-3 text-left">Project</th><th className="border-b border-slate-200 p-3 text-left">Location</th><th className="border-b border-slate-200 p-3 text-left">Status</th><th className="border-b border-slate-200 p-3 text-right">Budget</th><th className="border-b border-slate-200 p-3 text-left">Timeline</th><th className="border-b border-slate-200 p-3">Actions</th></tr></thead><tbody>{loading ? <tr><td colSpan="6" className="p-8 text-center text-slate-500">Loading projects...</td></tr> : projects.length ? projects.map((item) => <tr key={item._id} className={isOverdue(item) ? "bg-red-50" : "hover:bg-forest-50/60"}><td className="border-b border-slate-100 p-3 font-medium">{item.projectName}{item.clientName && <span className="block font-normal text-slate-500">{item.clientName}</span>}</td><td className="border-b border-slate-100 p-3">{item.location}</td><td className="border-b border-slate-100 p-3"><span className={item.status === "Completed" ? "text-forest-700" : item.status === "Delayed" ? "text-amber-700" : "text-forest-600"}>{item.status}</span>{isOverdue(item) && <span className="block text-xs font-medium text-red-700">Overdue</span>}</td><td className="border-b border-slate-100 p-3 text-right">{currency.format(item.budget)}</td><td className="border-b border-slate-100 p-3 whitespace-nowrap">{date(item.startDate)} - {date(item.endDate)}</td><td className="border-b border-slate-100 p-3"><div className="flex gap-2 justify-center"><button onClick={() => { setEditProject(item); setShowForm(true); }} className="bg-green-800 hover:bg-green-900 text-white px-3 py-1.5 rounded-md">Edit</button><button onClick={() => removeProject(item._id)} className="border border-red-200 hover:bg-red-50 text-red-700 px-3 py-1.5 rounded-md">Delete</button></div></td></tr>) : <tr><td colSpan="6" className="p-8 text-center text-slate-500">No projects found.</td></tr>}</tbody></table></div>
    {pagination.totalPages > 1 && <div className="flex items-center justify-end gap-3 mt-4"><button disabled={filters.page === 1} onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))} className="border rounded px-3 py-1 disabled:opacity-40">Previous</button><span className="text-sm">Page {pagination.page} of {pagination.totalPages}</span><button disabled={filters.page === pagination.totalPages} onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))} className="border rounded px-3 py-1 disabled:opacity-40">Next</button></div>}
  </section>;
};

export default ProjectTable;
