import React, { useState } from 'react';
import { BookOpen, Check, Copy, X, Layers, Code2, Globe, Cpu } from 'lucide-react';

export const ProjectReportModal = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const reportText = `Project Overview: The To-Do List Application was developed as a supporting frontend practice project during the internship. The main purpose of this application was to strengthen my understanding of HTML5, CSS3, JavaScript, and DOM manipulation. The project provided practical experience in creating an interactive interface and handling user actions through JavaScript.

3.2.2 Technologies Used
• HTML5
• CSS3
• JavaScript
• DOM Manipulation

3.2.3 Development Work
The application provided a simple interface for managing tasks. JavaScript was used to handle interaction with the webpage and update the displayed content based on user actions.
Working on this project helped me understand how JavaScript interacts with HTML elements through the DOM. It also provided additional practice with event handling and frontend logic.
The project was primarily used as a learning exercise and supported the development of the JavaScript skills required for later React.js projects.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="project-report-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        id="project-report-modal"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-stone-900 text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-900 leading-tight">
                Internship Project Documentation
              </h2>
              <p className="text-xs text-stone-500">
                Frontend Practice Project Specification & Tech Stack
              </p>
            </div>
          </div>
          <button
            type="button"
            id="btn-close-report-modal"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-700 text-sm leading-relaxed">
          {/* Executive Overview */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
              Project Purpose
            </h3>
            <p className="text-xs text-stone-600 leading-normal">
              The To-Do List Application was developed as a supporting frontend practice project during the internship.
              The main purpose of this application was to strengthen my understanding of HTML5, CSS3, JavaScript, and
              DOM manipulation. The project provided practical experience in creating an interactive interface and
              handling user actions through JavaScript.
            </p>
          </div>

          {/* Section 3.2.2 Technologies Used */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-stone-200/80 text-stone-800 text-[11px] font-mono">
                3.2.2
              </span>
              <span>Technologies Used</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs mb-1">
                  <Globe className="w-4 h-4 text-orange-600" />
                  <span>HTML5</span>
                </div>
                <p className="text-xs text-stone-500">
                  Semantic document structuring with form inputs, buttons, articles, and accessible ARIA attributes.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs mb-1">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>CSS3</span>
                </div>
                <p className="text-xs text-stone-500">
                  Modern layout techniques (Flexbox & Grid), interactive state transitions, custom checkboxes, and responsive design.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs mb-1">
                  <Code2 className="w-4 h-4 text-amber-600" />
                  <span>JavaScript (ES6+)</span>
                </div>
                <p className="text-xs text-stone-500">
                  Event listeners (click, submit, keydown), array transformations (filter, map), and localStorage persistence.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs mb-1">
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  <span>DOM Manipulation</span>
                </div>
                <p className="text-xs text-stone-500">
                  Direct node creation (`createElement`), class manipulation (`classList.toggle`), and dynamic DOM hierarchy updates.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3.2.3 Development Work */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-stone-200/80 text-stone-800 text-[11px] font-mono">
                3.2.3
              </span>
              <span>Development Work</span>
            </h3>
            <div className="space-y-3 text-xs text-stone-600 bg-stone-50/50 p-4 rounded-xl border border-stone-200/70">
              <p>
                The application provided a simple interface for managing tasks. JavaScript was used to handle interaction
                with the webpage and update the displayed content based on user actions.
              </p>
              <p>
                Working on this project helped me understand how JavaScript interacts with HTML elements through the DOM.
                It also provided additional practice with event handling and frontend logic.
              </p>
              <p>
                The project was primarily used as a learning exercise and supported the development of the JavaScript
                skills required for later React.js projects.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-stone-100 bg-stone-50">
          <span className="text-xs text-stone-500">Internship Practice Project Documentation</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-copy-report-text"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Documentation Text'}</span>
            </button>
            <button
              type="button"
              id="btn-close-modal-footer"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
