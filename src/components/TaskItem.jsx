import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Edit3, Calendar, Tag, X } from 'lucide-react';

export const TaskItem = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editCategory, setEditCategory] = useState(task.category);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim(), editPriority, editCategory);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditTitle(task.title);
      setEditPriority(task.priority);
      setEditCategory(task.category);
      setIsEditing(false);
    }
  };

  const priorityStyles = {
    high: { bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700', dot: 'bg-rose-500', label: 'High' },
    medium: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Med' },
    low: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Low' },
  };

  const categoryStyles = {
    Work: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Study: 'bg-blue-50 text-blue-700 border-blue-200',
    Personal: 'bg-teal-50 text-teal-700 border-teal-200',
    General: 'bg-stone-100 text-stone-700 border-stone-200',
  };

  const currentPriority = priorityStyles[task.priority] || priorityStyles.medium;
  const currentCategoryClass = categoryStyles[task.category] || categoryStyles.General;

  return (
    <div
      id={`task-item-${task.id}`}
      className={`group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-2.5 rounded-xl border transition-all duration-200 ${
        task.completed
          ? 'bg-stone-50/80 border-stone-200 opacity-75'
          : 'bg-white border-stone-200/90 hover:border-stone-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
        {/* Custom Checkbox */}
        <button
          type="button"
          id={`checkbox-toggle-${task.id}`}
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Mark task as active' : 'Mark task as complete'}
          className={`mt-0.5 sm:mt-0 w-6 h-6 rounded-md border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
            task.completed
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'border-stone-300 bg-white hover:border-emerald-500 text-transparent hover:text-stone-300'
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </button>

        {/* Content or Edit Mode */}
        {isEditing ? (
          <div className="flex-1 flex flex-col gap-2 py-1">
            <input
              ref={inputRef}
              id={`edit-input-${task.id}`}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-1.5 text-base border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-white text-stone-900"
            />
            <div className="flex flex-wrap items-center gap-2">
              <select
                id={`edit-priority-${task.id}`}
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="text-xs px-2 py-1 rounded-md border border-stone-300 bg-white text-stone-700"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <select
                id={`edit-category-${task.id}`}
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="text-xs px-2 py-1 rounded-md border border-stone-300 bg-white text-stone-700"
              >
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Personal">Personal</option>
                <option value="General">General</option>
              </select>
              <div className="flex items-center gap-1 ml-auto">
                <button
                  type="button"
                  id={`save-edit-btn-${task.id}`}
                  onClick={handleSave}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-stone-900 text-white hover:bg-stone-800 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  id={`cancel-edit-btn-${task.id}`}
                  onClick={() => {
                    setEditTitle(task.title);
                    setIsEditing(false);
                  }}
                  className="px-2 py-1 text-xs rounded-md border border-stone-200 text-stone-600 hover:bg-stone-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 min-w-0 pr-2">
            <p
              onDoubleClick={() => setIsEditing(true)}
              className={`text-base font-normal leading-snug break-words transition-colors ${
                task.completed
                  ? 'line-through text-stone-400'
                  : 'text-stone-900'
              }`}
            >
              {task.title}
            </p>

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
              {/* Priority badge */}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                  currentPriority.bg
                } ${currentPriority.text}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${currentPriority.dot}`} />
                {currentPriority.label}
              </span>

              {/* Category pill */}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                  currentCategoryClass
                }`}
              >
                <Tag className="w-2.5 h-2.5" />
                {task.category}
              </span>

              {/* Due date if exists */}
              {task.dueDate && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-normal text-stone-500 bg-stone-100 border border-stone-200">
                  <Calendar className="w-2.5 h-2.5" />
                  {task.dueDate}
                </span>
              )}

              {task.completed && task.completedAt && (
                <span className="text-[11px] text-emerald-600 font-medium">
                  Done
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Controls */}
      {!isEditing && (
        <div className="flex items-center justify-end gap-1 mt-2.5 sm:mt-0 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            id={`btn-edit-${task.id}`}
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            id={`btn-delete-${task.id}`}
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
