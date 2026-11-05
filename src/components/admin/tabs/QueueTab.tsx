import React, { useState, useEffect } from 'react';
import {
  marketingApi,
  PublishingJob,
  WorkerHealth
} from '../../../services/marketingApi';
import { useApp } from '../../../context/AppContext';
import {
  Clock,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Ban,
  Activity,
  Server,
  Layers,
  ExternalLink,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface QueueTabProps {
  globalPause: boolean;
  onRefreshOverview: () => void;
}

export const QueueTab: React.FC<QueueTabProps> = ({ globalPause, onRefreshOverview }) => {
  const { addToast } = useApp();
  const [jobs, setJobs] = useState<PublishingJob[]>([]);
  const [health, setHealth] = useState<WorkerHealth | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const loadQueueData = async () => {
    setIsLoading(true);
    try {
      const [jobsData, healthData] = await Promise.all([
        marketingApi.getJobs({ status: filterStatus }),
        marketingApi.getWorkerHealth()
      ]);
      setJobs(jobsData);
      setHealth(healthData);
    } catch (err: any) {
      console.warn('Queue loading error:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQueueData();
    const interval = setInterval(loadQueueData, 8000);
    return () => clearInterval(interval);
  }, [filterStatus]);

  const handleRetry = async (jobId: string) => {
    setActionLoadingId(jobId);
    try {
      await marketingApi.retryJob(jobId);
      addToast('Job Re-enqueued', 'Publishing job returned to PENDING state for next dispatch cycle.', 'success');
      await loadQueueData();
      onRefreshOverview();
    } catch (err: any) {
      addToast('Retry Failed', err.message, 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleCancel = async (jobId: string) => {
    setActionLoadingId(jobId);
    try {
      await marketingApi.cancelJob(jobId);
      addToast('Job Cancelled', 'Publishing job was marked CANCELLED and will not be dispatched.', 'info');
      await loadQueueData();
      onRefreshOverview();
    } catch (err: any) {
      addToast('Cancellation Failed', err.message, 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      {/* Worker Telemetry Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-5 border border-slate-700 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Background Publishing Worker & Persistent Queue
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  POLLING (10s)
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Executes scheduled releases autonomously in the background. Does not require the browser to stay open.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadQueueData}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Queue</span>
            </button>
          </div>
        </div>

        {/* Worker Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-4 pt-4 border-t border-slate-700/80">
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Worker Status</div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{health?.isRunning ? 'ACTIVE' : 'STARTING'}</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Queue Depth</div>
            <div className="text-sm font-bold text-purple-300 mt-0.5">
              {health?.queueLength ?? 0} Pending
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Active Jobs</div>
            <div className="text-sm font-bold text-blue-300 mt-0.5">
              {health?.activeJobsCount ?? 0} Processing
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Failed Retries</div>
            <div className="text-sm font-bold text-amber-300 mt-0.5">
              {health?.failedJobsCount ?? 0} Failed
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Worker Uptime</div>
            <div className="text-sm font-mono text-slate-200 mt-0.5">
              {health ? formatUptime(health.uptimeSeconds) : '...'}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Published Today</div>
            <div className="text-sm font-bold text-white mt-0.5">
              {health?.processedToday ?? 0} Posts
            </div>
          </div>
        </div>
      </div>

      {/* Global Pause Warning if active */}
      {globalPause && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 flex items-start gap-3">
          <PauseCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold">Global Automation Pause is Active:</span> The background worker will skip job execution until the global pause is explicitly resumed by an administrator. Scheduled jobs will remain safely queued in <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">PENDING</code> state without data loss.
          </div>
        </div>
      )}

      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Filter By Status:</span>
          <div className="flex items-center gap-1">
            {['all', 'PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                  filterStatus === st
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Showing {jobs.length} jobs in durable storage
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {jobs.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <Clock className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">Publishing Queue Empty</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No jobs match the current filter. Go to the Content Studio or Content Calendar and click "Schedule Post" to queue automated releases.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-mono border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Job ID & Key</th>
                  <th className="py-3 px-4">Campaign / Platform</th>
                  <th className="py-3 px-4">Scheduled Execution</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Retries</th>
                  <th className="py-3 px-4">Details / Errors</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => {
                  const isProcessing = job.status === 'PROCESSING';
                  const isFailed = job.status === 'FAILED';
                  const isCompleted = job.status === 'COMPLETED';
                  const isPending = job.status === 'PENDING';

                  return (
                    <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-slate-900">
                          #{job.id.slice(-8)}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]" title={job.idempotencyKey}>
                          key: {job.idempotencyKey}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800 line-clamp-1 max-w-[180px]">
                          {job.campaignTitle}
                        </div>
                        <div className="mt-0.5">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              job.platform === 'LinkedIn'
                                ? 'bg-sky-100 text-sky-800'
                                : job.platform === 'Facebook'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-pink-100 text-pink-800'
                            }`}
                          >
                            {job.platform}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-mono text-slate-700">
                          {new Date(job.scheduledTime).toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        {new Date(job.scheduledTime) <= new Date() && isPending && (
                          <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                            Due Now
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : isProcessing
                              ? 'bg-blue-100 text-blue-800 border border-blue-200 animate-pulse'
                              : isFailed
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : job.status === 'CANCELLED'
                              ? 'bg-slate-100 text-slate-600 border border-slate-200'
                              : 'bg-purple-100 text-purple-800 border border-purple-200'
                          }`}
                        >
                          {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                          {isProcessing && <RefreshCw className="w-3 h-3 animate-spin" />}
                          {isFailed && <XCircle className="w-3 h-3" />}
                          {isPending && <Clock className="w-3 h-3" />}
                          <span>{job.status}</span>
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-mono text-slate-700">
                          {job.attemptCount} / {job.maxRetries}
                        </div>
                        {job.lastAttemptAt && (
                          <div className="text-[10px] text-slate-400">
                            Last: {new Date(job.lastAttemptAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        {isCompleted && job.providerPostId && (
                          <div className="space-y-0.5">
                            <div className="text-emerald-700 font-mono text-[11px] font-semibold">
                              ID: {job.providerPostId}
                            </div>
                            {job.publishedUrl && (
                              <a
                                href={job.publishedUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1 text-[11px]"
                              >
                                <span>Verified Platform Post</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        )}

                        {isFailed && job.errorMessage && (
                          <div className="p-2 rounded bg-red-50 border border-red-200 text-red-800 text-[11px] leading-relaxed">
                            {job.errorMessage}
                          </div>
                        )}

                        {isPending && (
                          <span className="text-slate-400 text-[11px]">
                            Awaiting background worker execution slot
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isFailed && (
                            <button
                              onClick={() => handleRetry(job.id)}
                              disabled={actionLoadingId === job.id}
                              className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-[11px] flex items-center gap-1 transition cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Retry</span>
                            </button>
                          )}

                          {isPending && (
                            <button
                              onClick={() => handleCancel(job.id)}
                              disabled={actionLoadingId === job.id}
                              className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-700 font-semibold text-[11px] flex items-center gap-1 transition cursor-pointer"
                            >
                              <Ban className="w-3 h-3" />
                              <span>Cancel</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Production Architecture Guarantee Card */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Production Automation Architecture & Crash Recovery</span>
        </div>
        <p className="leading-relaxed">
          The ORANEX AI Marketing Engine background worker operates at a continuous 10-second tick in <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">server.ts</code>. Jobs use atomic idempotency keys (<code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">postId:scheduledTime</code>) preventing double publishing. On server restarts, any interrupted jobs in <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">PROCESSING</code> state are gracefully rolled back to <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">PENDING</code> and logged in the persistent audit trail.
        </p>
      </div>
    </div>
  );
};
