import { Briefcase, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const AppliedJobs = ({ jobs }) => (
  <div className="space-y-4">
    {jobs.map((job) => (
      <div key={job.id} className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:border-blue-200 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">{job.role}</h4>
            <p className="text-xs text-slate-500">{job.company} • {job.appliedDate}</p>
          </div>
        </div>
        <div className="text-right">
          <Badge className="bg-emerald-50 text-emerald-700 border-none shadow-none">{job.status}</Badge>
          <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold cursor-pointer hover:text-blue-600">Details</p>
        </div>
      </div>
    ))}
  </div>
)