import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  FileText,
  RotateCcw,
  Layers,
  Code2,
  Globe,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_TASKS } from './data/initialTasks';
import { TaskItem } from './components/TaskItem';
import { TaskInput } from './components/TaskInput';
import { TaskStats } from './components/TaskStats';
import { DomInspectorPanel } from './components/DomInspectorPanel';
import { ProjectReportModal } from './components/ProjectReportModal';

const LOCAL_STORAGE_KEY = 'todo_app_internship_tasks';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse tasks from localStorage', e);
    }
    return INITIAL_TASKS;
  });

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [domLogs, setDomLogs] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [deletedTaskUndo, setDeletedTaskUndo] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('LocalStorage write failed', e);
    }
  }, [tasks]);

  // Helper to append a DOM manipulation log
  const addDomLog = (
    eventType,
    domMethod,
    targetNode,
    description
  ) => {
    const newEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      time: new Date().toLocaleTimeString(),
      eventType,
      domMethod,
      targetNode,
      description,
    };
    setDomLogs((prev) => [newEntry, ...prev].slice(0, 30));
  };

  // Add initial log on load
  useEffect(() => {
    addDomLog(
      'change',
      'window.localStorage.getItem()',
      '#task-list-container',
      'Initialized task state from storage & rendered DOM nodes'
    );
  }, []);

  // Handlers
  const handleAddTask = (
    title,
    priority,
    category,
    dueDate
  ) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title,
      completed: false,
      priority,
      category,
      dueDate,
      createdAt: Date.now(),
    };

    setTasks((prev) => [newTask, ...prev]);

    addDomLog(
      'submit',
      'document.createElement("article") + appendChild()',
      `#task-item-${newTask.id}`,
      `Added task "${title.slice(0, 28)}${title.length > 28 ? '...' : ''}" to DOM list`
    );
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const willBeCompleted = !task.completed;
          addDomLog(
            'click',
            'element.classList.toggle("line-through") + setAttribute()',
            `#checkbox-toggle-${id}`,
            `Toggled task status to ${willBeCompleted ? 'completed' : 'active'}`
          );
          return {
            ...task,
            completed: willBeCompleted,
            completedAt: willBeCompleted ? Date.now() : undefined,
          };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (id) => {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    const taskToDelete = tasks[taskIndex];

    if (taskToDelete) {
      setDeletedTaskUndo({ task: taskToDelete, index: taskIndex });
      setTasks((prev) => prev.filter((t) => t.id !== id));

      addDomLog(
        'click',
        'element.remove() / parentNode.removeChild()',
        `#task-item-${id}`,
        `Removed task "${taskToDelete.title.slice(0, 24)}..." from DOM hierarchy`
      );

      // Clear undo notification after 5 seconds
      setTimeout(() => {
        setDeletedTaskUndo((current) => (current?.task.id === id ? null : current));
      }, 5000);
    }
  };

  const handleUndoDelete = () => {
    if (deletedTaskUndo) {
      const restored = [...tasks];
      restored.splice(deletedTaskUndo.index, 0, deletedTaskUndo.task);
      setTasks(restored);

      addDomLog(
        'click',
        'parentNode.insertBefore()',
        `#task-item-${deletedTaskUndo.task.id}`,
        `Restored task "${deletedTaskUndo.task.title.slice(0, 24)}..." to DOM`
      );

      setDeletedTaskUndo(null);
    }
  };

  const handleEditTask = (
    id,
    newTitle,
    newPriority,
    newCategory
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, priority: newPriority, category: newCategory }
          : task
      )
    );

    addDomLog(
      'input',
      'element.textContent = newTitle',
      `#task-item-${id}`,
      `Updated task text content & attributes in DOM`
    );
  };

  const handleCompleteAll = () => {
    setTasks((prev) =>
      prev.map((task) => ({
        ...task,
        completed: true,
        completedAt: task.completed ? task.completedAt : Date.now(),
      }))
    );
    addDomLog(
      'click',
      'querySelectorAll(".task-item").forEach(toggleCompleted)',
      '#task-list-container',
      'Batch updated all tasks to completed'
    );
  };

  const handleClearCompleted = () => {
    const removedCount = tasks.filter((t) => t.completed).length;
    setTasks((prev) => prev.filter((t) => !t.completed));
    addDomLog(
      'click',
      'querySelectorAll(".task-completed").forEach(remove)',
      '#task-list-container',
      `Cleared ${removedCount} completed DOM task nodes`
    );
  };

  const handleResetSampleTasks = () => {
    setTasks(INITIAL_TASKS);
    addDomLog(
      'click',
      'innerHTML = "" + re-render sample task elements',
      '#task-list-container',
      'Reset state to default internship practice tasks'
    );
  };

  // Filtered task collection
  const filteredTasks = tasks.filter((task) => {
    // Filter by completion status
    if (filter === 'active' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;

    // Filter by Category
    if (selectedCategory !== 'All' && task.category !== selectedCategory) return false;

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(q) ||
        task.category.toLowerCase().includes(q) ||
        task.priority.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const totalCount = tasks.length;
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-800 antialiased py-8 px-4 sm:px-6 lg:px-8 selection:bg-stone-200">
      <div className="max-w-3xl mx-auto">
        {/* Header section */}
        <header id="app-header" className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-stone-900 text-white shadow-xs">
                  <CheckSquare className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                    To-Do List Application
                  </h1>
                  <p className="text-xs text-stone-500 font-normal">
                    Frontend Practice Project &bull; Internship Milestone
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="btn-open-report"
                onClick={() => setIsReportModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium shadow-2xs transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                <span>Project Report (3.2.2 & 3.2.3)</span>
              </button>

              <button
                type="button"
                id="btn-reset-tasks"
                onClick={handleResetSampleTasks}
                title="Reset sample tasks"
                className="p-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-500 hover:text-stone-800 text-xs shadow-2xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Internship Context Banner */}
          <div
            id="internship-context-card"
            className="mt-4 p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs text-xs text-stone-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>
                <strong>Objective:</strong> Strengthen core understanding of HTML5, CSS3, JavaScript, and DOM manipulation.
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-stone-400">
              <span className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-stone-600">HTML5</span>
              <span className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-stone-600">CSS3</span>
              <span className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-stone-600">JavaScript</span>
              <span className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-stone-600">DOM API</span>
            </div>
          </div>
        </header>

        {/* Task Input Section */}
        <TaskInput onAddTask={handleAddTask} />

        {/* Task Stats & Filter Toolbar */}
        <TaskStats
          totalCount={totalCount}
          activeCount={activeCount}
          completedCount={completedCount}
          currentFilter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onCompleteAll={handleCompleteAll}
          onClearCompleted={handleClearCompleted}
        />

        {/* Undo Toast Notification */}
        {deletedTaskUndo && (
          <div
            id="undo-toast-notification"
            className="mb-4 flex items-center justify-between p-3 rounded-xl bg-stone-900 text-white text-xs shadow-md animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <span className="truncate mr-2">
              Task "{deletedTaskUndo.task.title.slice(0, 32)}..." removed.
            </span>
            <button
              type="button"
              id="btn-undo-delete"
              onClick={handleUndoDelete}
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-emerald-400 font-medium transition-colors cursor-pointer shrink-0"
            >
              Undo
            </button>
          </div>
        )}

        {/* Tasks List */}
        <main id="task-list-container" className="space-y-1">
          {filteredTasks.length === 0 ? (
            <div
              id="empty-tasks-state"
              className="bg-white rounded-2xl border border-dashed border-stone-300 p-8 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-stone-800">
                {searchQuery || selectedCategory !== 'All'
                  ? 'No tasks match your filter'
                  : filter === 'completed'
                  ? 'No completed tasks yet'
                  : filter === 'active'
                  ? 'All tasks completed! Great work.'
                  : 'No tasks on your list'}
              </p>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? 'Try clearing the search query or category filter.'
                  : 'Use the input above to add a new task and see DOM event handling in action.'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </main>

        {/* DOM & Event Inspector for Internship Practice Demonstration */}
        <DomInspectorPanel
          logs={domLogs}
          onClearLogs={() => setDomLogs([])}
        />

        {/* Educational Tech Stack Summary Footer */}
        <footer id="app-footer" className="mt-10 pt-6 border-t border-stone-200/70 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-orange-600" />
              HTML5 Semantic Forms
            </span>
            <span className="text-stone-300">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              CSS3 Flexbox & Transitions
            </span>
            <span className="text-stone-300">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-amber-600" />
              JavaScript Event Handling
            </span>
            <span className="text-stone-300">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              DOM Tree Manipulation
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-2">
            Internship Practice Learning Project &bull; Foundation for Frontend & React Architecture
          </p>
        </footer>
      </div>

      {/* Project Documentation Modal */}
      <ProjectReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
