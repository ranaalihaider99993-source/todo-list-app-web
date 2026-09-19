import React, { useState } from 'react';
import { Plus, Calendar, Tag, AlertCircle } from 'lucide-react';

export const TaskInput = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('General');
  const [dueDate, setDueDate] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Please enter a task description');
      return;
    }

    onAddTask(title.trim(), priority, category, dueDate || undefined);
    setTitle('');
    setDueDate('');
    setErrorMessage('');
    setShowDetails(false);
  };

  return (
    <form
      id="new-task-form"
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs mb-6 transition-all"
    >
      <div className="flex items-center gap-2">
        <input
          id="task-title-input"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errorMessage) setErrorMessage('');
          }}
          onFocus={() => setShowDetails(true)}
          placeholder="Add a new task (e.g. Implement event listener)..."
          className="flex-1 bg-transparent px-3 py-2 text-base text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
        />
        <button
          type="submit"
          id="btn-submit-task"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Task</span>
        </button>
      </div>

      {errorMessage && (
        <div id="task-error-message" className="flex items-center gap-1.5 text-xs text-rose-600 px-3 pt-2">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Expanded Task Options */}
      <div
        className={`flex flex-wrap items-center gap-3 pt-3 mt-2 border-t border-stone-100 text-xs text-stone-600 transition-all ${
          showDetails || title.length > 0 ? 'opacity-100' : 'opacity-80'
        }`}
      >
        {/* Priority select */}
        <div className="flex items-center gap-1.5">
          <span className="text-stone-400 font-medium">Priority:</span>
          <select
            id="task-priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-stone-200 bg-stone-50 hover:bg-white text-stone-700 cursor-pointer focus:outline-hidden"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Category select */}
        <div className="flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-stone-400" />
          <span className="text-stone-400 font-medium">Category:</span>
          <select
            id="task-category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-stone-200 bg-stone-50 hover:bg-white text-stone-700 cursor-pointer focus:outline-hidden"
          >
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        {/* Optional Due Date */}
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3 text-stone-400" />
          <span className="text-stone-400 font-medium">Due:</span>
          <input
            id="task-duedate-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-2 py-0.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-white text-stone-700 text-xs cursor-pointer focus:outline-hidden"
          />
        </div>

        {/* Shortcut Hint */}
        <div className="ml-auto text-[11px] text-stone-400 hidden sm:block">
          Press <kbd className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-mono text-[10px]">Enter</kbd> to add
        </div>
      </div>
    </form>
  );
};
