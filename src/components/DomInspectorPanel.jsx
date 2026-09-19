import React, { useState } from 'react';
import { Terminal, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

export const DomInspectorPanel = ({
  logs,
  onClearLogs,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div id="dom-inspector-container" className="bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 shadow-md overflow-hidden mt-8 transition-all">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-stone-950/60 border-b border-stone-800/80">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-stone-800 text-[11px] font-mono text-emerald-400 border border-stone-700">
            <Terminal className="w-3 h-3" />
            <span>DOM & Event Console</span>
          </div>
          <span className="text-xs text-stone-400 hidden sm:inline">
            Live DOM manipulation & event stream (Internship Practice)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {logs.length > 0 && (
            <button
              type="button"
              id="btn-clear-dom-logs"
              onClick={onClearLogs}
              title="Clear event logs"
              className="p-1 text-stone-400 hover:text-stone-200 text-xs rounded transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            id="btn-toggle-dom-inspector"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs text-stone-300 hover:text-white px-2 py-1 rounded bg-stone-800/80 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <span>{isExpanded ? 'Hide Inspector' : `View Inspector (${logs.length})`}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Console Stream */}
      {isExpanded && (
        <div className="p-4 bg-stone-950 font-mono text-xs max-h-64 overflow-y-auto space-y-2">
          <div className="text-[11px] text-stone-400 pb-2 border-b border-stone-800/60 flex items-center justify-between">
            <span>Demonstrating 3.2.3: "JavaScript used to handle interaction and update displayed DOM elements"</span>
            <span className="text-emerald-400 text-[10px]">Real-time DOM Tracker</span>
          </div>

          {logs.length === 0 ? (
            <div className="text-stone-500 py-3 text-center italic text-xs">
              Interact with the To-Do list above (add, check, edit, or delete) to observe live DOM manipulation events.
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-2.5 p-2 rounded bg-stone-900/70 border border-stone-800/60 hover:border-stone-700 transition-colors"
              >
                <span className="text-stone-500 shrink-0 text-[11px]">{log.time}</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 text-[10px] uppercase font-bold tracking-wider shrink-0 border border-amber-900/60">
                  {log.eventType}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-emerald-400 font-semibold">{log.domMethod}</span>
                  <span className="text-stone-400 text-[11px] block mt-0.5">{log.description}</span>
                  <span className="text-stone-500 text-[10px] block mt-0.5">Target: {log.targetNode}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
