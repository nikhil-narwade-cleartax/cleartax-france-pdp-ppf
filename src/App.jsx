import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileCheck,
  Wrench,
  TestTube,
  Rocket,
  ChevronDown,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Copy,
  Check,
  Clock,
  Target,
  FileText,
  Server,
  Database,
  Send,
  ArrowRight,
  Info,
  Calendar,
  Zap,
  Menu,
  X
} from 'lucide-react';

import {
  prerequisites,
  engineeringTasks,
  testCases,
  codeSnippets,
  lifecycleStatusCodes,
  timeline,
  mvs
} from './data/dashboardData';

const navItems = [
  { id: 'overview', label: 'Overview & Scope', icon: LayoutDashboard },
  { id: 'prerequisites', label: 'Prerequisites & Docs', icon: FileCheck },
  { id: 'engineering', label: 'Engineering Action Plan', icon: Wrench },
  { id: 'testcases', label: 'Test Cases Map', icon: TestTube },
  { id: 'fasttrack', label: 'Fast-Track Strategy', icon: Rocket },
];

// Premium Progress Bar
function ProgressBar({ completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-600">Progress</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-slate-900">{percentage}%</span>
          <span className="text-xs text-slate-500">({completed}/{total})</span>
        </div>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-blue-500 to-blue-600"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Premium Checklist Item
function ChecklistItem({ item, checked, onChange }) {
  return (
    <label className="group flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-slate-50 border border-transparent hover:border-slate-200">
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
          checked
            ? 'bg-blue-600 border-blue-600'
            : 'border-slate-300 group-hover:border-blue-400'
        }`}>
          {checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-base leading-relaxed transition-all duration-200 ${
          checked
            ? 'text-slate-400 line-through'
            : 'text-slate-700'
        }`}>
          {item.text}
        </span>
        {item.critical && !checked && (
          <span className="ml-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            Required
          </span>
        )}
      </div>
    </label>
  );
}

// Premium Code Block
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-slate-900 text-slate-100 p-6 overflow-x-auto text-sm font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Premium Accordion
function Accordion({ title, children, defaultOpen = false, badge, badgeColor = 'blue' }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const badgeStyles = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-emerald-100 text-emerald-700',
    yellow: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
    purple: 'bg-violet-100 text-violet-700',
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-shadow hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-50"
      >
        <div className="flex items-center gap-4">
          <span className="text-base font-semibold text-slate-900">{title}</span>
          {badge && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyles[badgeColor]}`}>
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[5000px]' : 'max-h-0'}`}>
        <div className="p-6 pt-2 bg-slate-50 border-t border-slate-200">
          {children}
        </div>
      </div>
    </div>
  );
}

// Premium Section Card
function SectionCard({ title, icon: Icon, children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      <div className="px-8 py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
        </div>
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}

// Overview Section
function OverviewSection() {
  return (
    <div className="space-y-8">
      <SectionCard title="PDP-to-PPF Testing Context" icon={Target}>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          The French tax authority (DGFiP/AIFE) requires that your platform (Plateforme Agréée/PA)
          demonstrates <strong className="text-slate-900">three core competencies</strong> before receiving final accreditation:
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Directory Integration</h4>
            <p className="text-slate-600">
              Query, register, and manage company routing data in the national Annuaire
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">E-Invoicing Transmission</h4>
            <p className="text-slate-600">
              Send regulatory invoice data (F1) and lifecycle statuses (F2) to PPF
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-2xl border border-violet-200">
            <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center mb-4">
              <Send className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">E-Reporting Capability</h4>
            <p className="text-slate-600">
              Aggregate and transmit B2Bi/B2C transaction data (F10) to tax authorities
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Data Flows Overview" icon={Server}>
        <CodeBlock code={`PDP-to-PPF Data Flows
=====================

DIRECTORY (Annuaire)
├── Query company routing info (SIREN/SIRET lookup)
├── Register/appropriate addressing lines
├── Create routing codes
└── Mask/close directory entries

E-INVOICING (Concentrator)
├── F1: Regulatory invoice data → PPF
├── F2: Invoice lifecycle statuses → PPF
│      (200-Submitted, 212-Collected, 210-Refused, 213-Rejected)
├── F6: Lifecycle acknowledgments ← PPF
└── CFE: Confirmation flows ← PPF

E-REPORTING (Concentrator)
├── F10.1: B2Bi sales (international B2B)
├── F10.2: B2Bi receipts
├── F10.3: B2C sales transactions
└── F10.4: B2C payment transactions`} />
      </SectionCard>

      <SectionCard title="Critical Timeline" icon={Calendar}>
        <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-red-50 to-red-100/50 rounded-2xl border border-red-200 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-1">Compte Rendu Submission Deadline</h4>
            <p className="text-3xl font-bold text-slate-900">January 14, 2026</p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {timeline.phases.map((phase, idx) => (
            <div key={phase.week} className="relative">
              {idx < timeline.phases.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
              )}
              <div className="relative z-10 p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mb-3">
                  {phase.week}
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-3">{phase.title}</h4>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  {phase.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Lifecycle Status Codes Reference" icon={Info}>
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Code</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Direction</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {lifecycleStatusCodes.map((status) => (
                <tr key={status.code} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-12 h-8 rounded-lg bg-blue-600 text-white font-mono text-sm font-bold">
                      {status.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{status.name}</td>
                  <td className="px-6 py-4 text-slate-600">{status.direction}</td>
                  <td className="px-6 py-4 text-slate-600">{status.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

// Prerequisites Section
function PrerequisitesSection({ checkedItems, setCheckedItems }) {
  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-1">Before You Begin</h4>
          <p className="text-slate-600">
            Complete all prerequisites below before starting test execution. Items marked as
            <span className="mx-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Required</span>
            will block your progress if not completed.
          </p>
        </div>
      </div>

      {prerequisites.map((category) => (
        <SectionCard key={category.id} title={category.category} icon={FileCheck}>
          <div className="space-y-2">
            {category.items.map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                checked={checkedItems[item.id] || false}
                onChange={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </SectionCard>
      ))}

      <SectionCard title="Resana Portal Documents" icon={FileText}>
        <div className="mb-6 p-4 bg-slate-100 rounded-xl">
          <p className="text-sm text-slate-600">
            <strong className="text-slate-900">Location:</strong>{' '}
            <code className="ml-2 px-3 py-1.5 bg-white rounded-lg text-sm font-mono text-slate-700 border border-slate-200">
              1. Documents provided by AIFE / 1.0 Lifting of reservations
            </code>
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4">Required Documents</h4>
            <ul className="space-y-3">
              {['Data pool operating procedure', '[Platform]_Expected e-reporting value and application code.xlsx', '4 XML files (FACT_REPORT2025_*)', 'Compte rendu template'].map((doc) => (
                <li key={doc} className="flex items-center gap-3 text-slate-600">
                  <FileText className="w-4 h-4 text-slate-400" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4">XML Files for E-Reporting</h4>
            <ul className="space-y-2 font-mono text-sm">
              {['FACT_REPORT2025_S1F1.xml', 'FACT_REPORT2025_S1F2.xml', 'FACT_REPORT2025_S2F3.xml', 'FACT_REPORT2025_S2F4.xml'].map((file) => (
                <li key={file} className="px-3 py-2 bg-white rounded-lg text-slate-700 border border-slate-200">
                  {file}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// Engineering Section
function EngineeringSection({ checkedItems, setCheckedItems }) {
  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  return (
    <div className="space-y-8">
      {engineeringTasks.map((category) => (
        <SectionCard key={category.id} title={category.category} icon={Wrench}>
          <div className="space-y-2">
            {category.items.map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                checked={checkedItems[item.id] || false}
                onChange={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </SectionCard>
      ))}

      <SectionCard title="PKCS7 Certificate Conversion" icon={Server}>
        <CodeBlock code={codeSnippets.pkcs7Conversion} />
      </SectionCard>

      <SectionCard title="SFTP Commands Reference" icon={Server}>
        <CodeBlock code={codeSnippets.sftpCommands} />
      </SectionCard>

      <SectionCard title="F2 Lifecycle XML Example" icon={FileText}>
        <CodeBlock code={codeSnippets.f2LifecycleExample} />
      </SectionCard>

      <SectionCard title="F10 E-Reporting XML Example" icon={FileText}>
        <CodeBlock code={codeSnippets.f10EReportingExample} />
      </SectionCard>
    </div>
  );
}

// Test Cases Section
function TestCasesSection() {
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-2xl border border-amber-200">
        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-1">Test Summary</h4>
          <p className="text-slate-600">
            <strong className="text-slate-900">13 total tests:</strong> 6 Directory (3 API + 3 EDI) + 4 E-Invoicing (EDI) + 3 E-Reporting (EDI)
          </p>
        </div>
      </div>

      <SectionCard title="Directory Tests (6 Tests)" icon={Database}>
        <div className="space-y-4">
          {testCases.directory.map((test) => (
            <Accordion
              key={test.id}
              title={test.name}
              badge={test.mode}
              badgeColor={test.mode === 'API' ? 'purple' : 'blue'}
            >
              <div className="space-y-6">
                <div>
                  <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Objectives</h5>
                  <ul className="space-y-2">
                    {test.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500">Data Pool</span>
                    <p className="font-mono text-sm text-slate-900">{test.dataPool}</p>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500">Execution Day</span>
                    <p className="font-semibold text-slate-900">{test.executionDay}</p>
                  </div>
                </div>

                {test.prerequisite && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-sm"><strong className="text-amber-800">Prerequisite:</strong> <span className="text-slate-700">{test.prerequisite}</span></p>
                  </div>
                )}

                <div>
                  <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Steps</h5>
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-4 py-3 text-left font-semibold text-slate-600 w-16">#</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-600">Action</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-600">{test.mode === 'API' ? 'API Call' : 'EDI Operation'}</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-600">Parameters</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {test.steps.map((step) => (
                          <tr key={step.step} className="hover:bg-slate-50">
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-sm">
                                {step.step}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-900">{step.action}</td>
                            <td className="px-4 py-3 font-mono text-xs text-slate-600 bg-slate-50">{step.api || step.edi}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{step.params || step.content}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-sm"><strong className="text-emerald-800">Expected Result:</strong> <span className="text-slate-700">{test.expectedResult}</span></p>
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="E-Invoicing Tests (4 Tests)" icon={FileText}>
        <div className="space-y-4">
          {testCases.eInvoicing.map((test) => (
            <Accordion key={test.id} title={test.name} badge="EDI" badgeColor="blue">
              <div className="space-y-6">
                {test.critical && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm"><strong className="text-red-800">Critical:</strong> <span className="text-slate-700">{test.critical}</span></p>
                  </div>
                )}

                {test.important && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-sm"><strong className="text-amber-800">Important:</strong> <span className="text-slate-700">{test.important}</span></p>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500">Role</span>
                    <p className={`font-semibold ${test.role.includes('BOTH') ? 'text-red-600' : 'text-slate-900'}`}>{test.role}</p>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500">Format</span>
                    <p className="font-mono text-slate-900">{test.format}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Objectives</h5>
                  <ul className="space-y-2">
                    {test.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Steps</h5>
                  <div className="space-y-3">
                    {test.steps.map((step) => (
                      <div key={step.step} className="p-5 bg-white rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold">
                            Step {step.step}
                          </span>
                          {step.role && (
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                              step.role === 'Receiver' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {step.role}
                            </span>
                          )}
                          <span className="font-semibold text-slate-900">{step.action}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <span className="text-xs font-semibold text-slate-500 uppercase">Your Action</span>
                            <p className="text-sm text-slate-700 mt-1">{step.yourAction}</p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <span className="text-xs font-semibold text-slate-500 uppercase">PPF Response</span>
                            <p className="text-sm text-slate-700 mt-1">{step.ppfResponse}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Status Codes</h5>
                  <div className="flex flex-wrap gap-2">
                    {test.statusCodes.map((code) => (
                      <span key={code} className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-mono border border-slate-200">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-sm"><strong className="text-emerald-800">Expected Result:</strong> <span className="text-slate-700">{test.expectedResult}</span></p>
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="E-Reporting Tests (3 Tests)" icon={Send}>
        <div className="space-y-4">
          {testCases.eReporting.map((test) => (
            <Accordion key={test.id} title={test.name} badge="EDI" badgeColor="green">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {test.subFlows.map((flow) => (
                    <span key={flow} className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold">
                      {flow}
                    </span>
                  ))}
                </div>

                {test.keyDifference && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-sm"><strong className="text-amber-800">Key Difference:</strong> <span className="text-slate-700">{test.keyDifference}</span></p>
                  </div>
                )}

                <div>
                  <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Input Data Sources</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(test.inputData).map(([key, value]) => (
                      <div key={key} className="p-4 bg-white rounded-xl border border-slate-200">
                        <span className="text-xs font-semibold text-slate-500 uppercase">{key}</span>
                        <p className="font-mono text-sm text-slate-900 mt-1">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Transaction Parameters</h5>
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="px-4 py-3 text-left font-semibold text-slate-600">Date</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-600">Type</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-600">VAT Rate</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-600">Count</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-600">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {test.transactionParams.map((param, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-mono text-slate-900">{param.date}</td>
                            <td className="px-4 py-3 text-slate-700">{param.type}</td>
                            <td className="px-4 py-3 text-slate-700">{param.vatRate}</td>
                            <td className="px-4 py-3 text-slate-700">{param.count}</td>
                            <td className="px-4 py-3 font-semibold text-slate-900">{param.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {test.important && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm"><strong className="text-blue-800">Important:</strong> <span className="text-slate-700">{test.important}</span></p>
                  </div>
                )}

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-sm"><strong className="text-emerald-800">Expected Result:</strong> <span className="text-slate-700">{test.expectedResult}</span></p>
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// Fast Track Section
function FastTrackSection() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <Zap className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{mvs.title}</h2>
            <p className="text-blue-200">Focus only on what is required to pass the 13 test scenarios</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <SectionCard title="Must Implement" icon={CheckCircle2}>
          <ul className="space-y-3">
            {mvs.required.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Can Skip (Not Required)" icon={Circle}>
          <ul className="space-y-3">
            {mvs.canSkip.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-slate-500">{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Speed Optimizations" icon={Rocket}>
        <div className="space-y-4">
          {mvs.speedOptimizations.map((opt, i) => (
            <div key={i} className="flex items-center gap-6 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
              <div className="w-36 flex-shrink-0">
                <span className="text-xs font-semibold text-slate-500 uppercase">Bottleneck</span>
                <p className="font-semibold text-slate-900 mt-1">{opt.bottleneck}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-slate-500 uppercase">Solution</span>
                <p className="text-slate-700 mt-1">{opt.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Optimal Execution Sequence" icon={Clock}>
        <CodeBlock code={`WEEK 1: UNBLOCK                    WEEK 2: CONNECT
┌────────────────────────────┐    ┌────────────────────────────┐
│ Day 1: Order certificate   │    │ Day 1: Convert to PKCS7    │
│ Day 1: Download Resana docs│    │ Day 1: Submit raccordement │
│ Day 2: Submit cert order   │    │ Day 2-5: AIFE processing   │
│ Day 3-5: CA verification   │    │ Day 3-5: Prep test scripts │
│ Day 5-7: Receive cert      │    │ Day 5: Get credentials     │
└────────────────────────────┘    └────────────────────────────┘
           │                                    │
           ▼                                    ▼
WEEK 3: TEST (Part 1)              WEEK 4: TEST (Part 2) + FIX
┌────────────────────────────┐    ┌────────────────────────────┐
│ Day 1: Validate connection │    │ Day 1: E-reporting test 1  │
│ Day 1-2: Directory tests   │    │ Day 2: E-reporting tests   │
│         (3 API + 3 EDI)    │    │         2-3                │
│ Day 3-4: E-invoicing tests │    │ Day 3: Review all results  │
│         1-4                │    │ Day 4-5: Remediate & retest│
│ Day 5: Capture evidence    │    │                            │
└────────────────────────────┘    └────────────────────────────┘
           │                                    │
           └────────────────┬───────────────────┘
                            ▼
                   WEEK 5: SUBMIT
          ┌─────────────────────────────┐
          │ Day 1-2: Compile evidence   │
          │ Day 3: Internal review      │
          │ Day 4: Final corrections    │
          │ Day 5: Submit compte rendu  │
          │ Day 5: Confirm AIFE receipt │
          └─────────────────────────────┘`} />
      </SectionCard>
    </div>
  );
}

// Main App
function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [checkedItems, setCheckedItems] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const allItems = [
    ...prerequisites.flatMap(cat => cat.items),
    ...engineeringTasks.flatMap(cat => cat.items)
  ];
  const totalItems = allItems.length;
  const completedItems = allItems.filter(item => checkedItems[item.id]).length;

  useEffect(() => {
    const saved = localStorage.getItem('pdp-dashboard-checklist');
    if (saved) setCheckedItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('pdp-dashboard-checklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <OverviewSection />;
      case 'prerequisites': return <PrerequisitesSection checkedItems={checkedItems} setCheckedItems={setCheckedItems} />;
      case 'engineering': return <EngineeringSection checkedItems={checkedItems} setCheckedItems={setCheckedItems} />;
      case 'testcases': return <TestCasesSection />;
      case 'fasttrack': return <FastTrackSection />;
      default: return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-30 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-0'} overflow-hidden`}>
        <div className="flex flex-col h-full w-72">
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="text-white font-bold">CT</span>
              </div>
              <div>
                <h1 className="font-bold text-slate-900">ClearTax France</h1>
                <p className="text-xs text-slate-500">PDP-to-PPF Testing</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="p-6 border-b border-slate-200">
            <ProgressBar completed={completedItems} total={totalItems} />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-slate-200">
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Deadline</p>
              <p className="text-lg font-bold text-slate-900">Jan 14, 2026</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {navItems.find(n => n.id === activeSection)?.label}
                </h1>
                <p className="text-sm text-slate-500">
                  France B2B E-invoicing PDP-to-PPF Interoperability
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Completion</p>
                <p className="text-3xl font-bold text-blue-600">{Math.round((completedItems / totalItems) * 100)}%</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-8 py-10">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default App;
