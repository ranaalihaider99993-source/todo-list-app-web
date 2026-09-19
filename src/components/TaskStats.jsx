import React from 'react';
import { CheckCheck, Trash2, Search, X } from 'lucide-react';

export const TaskStats = ({
  totalCount,
  activeCount,
  completedCount,
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onCompleteAll,
  onClearCompleted,
}) => {
  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div id="task-stats-panel" className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 mb-5 shadow-xs">
      {/* Top row: Progress indicator & Counters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-stone-900">Project Progress</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {percentComplete}% Completed
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining &bull; {completedCount} done
          </p>
        </div>

        {/* Bulk Action Buttons */}
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              type="button"
              id="btn-complete-all"
              onClick={onCompleteAll}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-xs font-medium transition-colors cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mark All Done</span>
            </button>
          )}

          {completedCount > 0 && (
            <button
              type="button"
              id="btn-clear-completed"
              onClick={onClearCompleted}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-rose-600 hover:bg-rose-50 text-xs font-medium transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Done</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-100 h-2 rounded-full mt-3 overflow-hidden">
        <div
          className="bg-emerald-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      {/* Controls row: Search, Filter Tabs, Category */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mt-4 pt-1">
        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl border border-stone-200/60 shrink-0">
          <button
            type="button"
            id="filter-tab-all"
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              currentFilter === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            type="button"
            id="filter-tab-active"
            onClick={() => onFilterChange('active')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              currentFilter === 'active'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            type="button"
            id="filter-tab-completed"
            onClick={() => onFilterChange('completed')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              currentFilter === 'completed'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Done ({completedCount})
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center gap-2 flex-1 md:justify-end">
          {/* Search box */}
          <div className="relative flex-1 md:max-w-56">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="search-tasks-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder:text-stone-400 focus:bg-white focus:outline-hidden focus:border-stone-400"
            />
            {searchQuery && (
              <button
                type="button"
                id="btn-clear-search"
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <select
            id="category-filter-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 cursor-pointer focus:bg-white focus:outline-hidden"
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
            <option value="General">General</option>
          </select>
        </div>
      </div>
    </div>
  );
};
