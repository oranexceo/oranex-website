import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project } from '../types';
import { MapPin, Calendar, CheckCircle2, Clock, Layers, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { projects, openQuoteModal } = useApp();

  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const sectors = ['All', 'Agro-processing', 'Manufacturing', 'Laboratories & Scientific', 'Energy & Electrical'];
  const statuses = ['All', 'Completed', 'Ongoing', 'In Progress', 'Planned'];

  const filteredProjects = projects.filter((prj) => {
    const matchSec = selectedSector === 'All' || prj.sector === selectedSector;
    const matchStat = selectedStatus === 'All' || prj.status === selectedStatus;
    return matchSec && matchStat;
  });

  return (
    <div className="py-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span>Home</span>
              <span aria-hidden="true">/</span>
              <span className="text-slate-900 font-semibold">Projects &amp; Procurement Execution</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
              Project Procurement &amp; Delivery Log
            </h1>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              Representative examples of equipment procurement, turnkey delivery, installation, and raw material framework agreements across Ethiopia and regional African corridors.
            </p>
          </div>

          <button
            onClick={() => openQuoteModal({ productOrScope: 'Turnkey Project Execution Inquiry' })}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-900 rounded transition-colors whitespace-nowrap shadow-sm self-start md:self-auto cursor-pointer"
          >
            Inquire for Turnkey Project
          </button>
        </div>

        {/* Honest Trust Disclaimer (Prompt Section 22) */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl mb-8 flex items-start gap-3 text-xs text-slate-600 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-blue-800 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-slate-900">Portfolio Transparency Notice: </span>
            Oranex maintains strict commercial confidentiality regarding client names and proprietary contract values. The projects listed below illustrate typical scopes of supply, logistical frameworks, and technical commissioning services executed or currently scheduled. Project portfolio is actively updated.
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium mr-1">Sector:</span>
            {sectors.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  selectedSector === sec
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 rounded bg-white text-slate-800 focus:outline-none"
            >
              {statuses.map((stat, idx) => (
                <option key={idx} value={stat}>
                  {stat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-xs text-slate-500">
            Project portfolio is being updated. No projects match the selected criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((prj) => (
              <div
                key={prj.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      {/* Unboxed Metadata Line (No static pills) */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
                        <span className="font-semibold text-blue-900">{prj.sector}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{prj.location}</span>
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-slate-900 leading-snug">
                        {prj.title}
                      </h3>
                    </div>

                    <span
                      className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded shrink-0 ${
                        prj.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : prj.status === 'Ongoing'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {prj.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {prj.summary}
                  </p>

                  <div className="space-y-2.5 p-3.5 bg-[#F8FAFC] border border-slate-100 rounded-lg text-xs mb-4">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Scope of Execution:</span>
                      <span className="text-slate-800 font-medium">{prj.scope}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-slate-500 block text-[11px]">Equipment &amp; Materials Supplied:</span>
                      <span className="text-slate-800 font-medium">{prj.productsEquipment}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Oranex Role:</span>
                    <span className="font-semibold text-slate-900">{prj.oranexRole}</span>
                  </div>

                  <button
                    onClick={() => openQuoteModal({ productOrScope: `Inquiry referencing: ${prj.title}` })}
                    className="font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inquire for Similar Scope</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
