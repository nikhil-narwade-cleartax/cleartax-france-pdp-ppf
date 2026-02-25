import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileCheck,
  Wrench,
  TestTube,
  Rocket,
  ChevronDown,
  ChevronRight,
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
  Menu
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

// Navigation items
const navItems = [
  { id: 'overview', label: 'Overview & Scope', icon: LayoutDashboard },
  { id: 'prerequisites', label: 'Prerequisites & Docs', icon: FileCheck },
  { id: 'engineering', label: 'Engineering Action Plan', icon: Wrench },
  { id: 'testcases', label: 'Test Cases Map', icon: TestTube },
  { id: 'fasttrack', label: 'Fast-Track Strategy', icon: Rocket },
];

// Progress Bar Component
function ProgressBar({ completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">Overall Progress</span>
        <span className="font-semibold text-[#0052cc]">{completed}/{total} ({percentage}%)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: percentage === 100 ? '#10b981' : '#0052cc'
          }}
        />
      </div>
    </div>
  );
}

// Checkbox Item Component
function ChecklistItem({ item, checked, onChange }) {
  return (
    <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
      <div className="mt-0.5">
        {checked ? (
          <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
        ) : (
          <Circle className="w-5 h-5 text-gray-300" />
        )}
      </div>
      <div className="flex-1">
        <span className={`${checked ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
          {item.text}
        </span>
        {item.critical && !checked && (
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
            Critical
          </span>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
    </label>
  );
}

// Code Block Component
function CodeBlock({ code, language = 'bash' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-300" />
        )}
      </button>
    </div>
  );
}

// Accordion Component
function Accordion({ title, children, defaultOpen = false, badge, badgeColor = 'blue' }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const badgeColors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
          <span className="font-medium text-gray-800">{title}</span>
          {badge && (
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${badgeColors[badgeColor]}`}>
              {badge}
            </span>
          )}
        </div>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
}

// Section Card Component
function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0052cc] to-[#003d99]">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-white" />
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

// Overview Section
function OverviewSection() {
  return (
    <div className="space-y-6">
      <SectionCard title="PDP-to-PPF Testing Context" icon={Target}>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            The French tax authority (DGFiP/AIFE) requires that your platform (Plateforme Agreee/PA)
            demonstrates <strong>three core competencies</strong> before receiving final accreditation:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5 text-[#0052cc]" />
                <h4 className="font-semibold text-gray-800">Directory Integration</h4>
              </div>
              <p className="text-sm text-gray-600">
                Query, register, and manage company routing data in the national Annuaire
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-800">E-Invoicing Transmission</h4>
              </div>
              <p className="text-sm text-gray-600">
                Send regulatory invoice data (F1) and lifecycle statuses (F2) to PPF
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <Send className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-gray-800">E-Reporting Capability</h4>
              </div>
              <p className="text-sm text-gray-600">
                Aggregate and transmit B2Bi/B2C transaction data (F10) to tax authorities
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Data Flows Overview" icon={Server}>
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`  PDP-to-PPF Data Flows
  =====================

  DIRECTORY (Annuaire)
  |-- Query company routing info (SIREN/SIRET lookup)
  |-- Register/appropriate addressing lines
  |-- Create routing codes
  \`-- Mask/close directory entries

  E-INVOICING (Concentrator)
  |-- F1: Regulatory invoice data -> PPF
  |-- F2: Invoice lifecycle statuses -> PPF
  |      (200-Submitted, 212-Collected, 210-Refused, 213-Rejected)
  |-- F6: Lifecycle acknowledgments <- PPF
  \`-- CFE: Confirmation flows <- PPF

  E-REPORTING (Concentrator)
  |-- F10.1: B2Bi sales (international B2B)
  |-- F10.2: B2Bi receipts
  |-- F10.3: B2C sales transactions
  \`-- F10.4: B2C payment transactions`}</pre>
        </div>
      </SectionCard>

      <SectionCard title="Critical Timeline" icon={Calendar}>
        <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-red-800">Compte Rendu Submission Deadline</h4>
            <p className="text-2xl font-bold text-red-600">January 14, 2026</p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {timeline.phases.map((phase) => (
            <div key={phase.week} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-xs text-[#0052cc] font-semibold mb-1">Week {phase.week}</div>
              <h4 className="font-medium text-gray-800 text-sm mb-2">{phase.title}</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {phase.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-gray-400">-</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Lifecycle Status Codes Reference" icon={Info}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 font-semibold text-gray-700">Code</th>
                <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                <th className="text-left p-3 font-semibold text-gray-700">Direction</th>
                <th className="text-left p-3 font-semibold text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody>
              {lifecycleStatusCodes.map((status) => (
                <tr key={status.code} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <span className="px-2 py-1 bg-[#0052cc] text-white rounded font-mono text-xs">
                      {status.code}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-gray-800">{status.name}</td>
                  <td className="p-3 text-gray-600">{status.direction}</td>
                  <td className="p-3 text-gray-600">{status.description}</td>
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
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#0052cc] mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-800">Before You Begin</h4>
            <p className="text-sm text-gray-600">
              Complete all prerequisites below before starting test execution. Items marked as
              <span className="mx-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Critical</span>
              will block your progress if not completed.
            </p>
          </div>
        </div>
      </div>

      {prerequisites.map((category) => (
        <SectionCard key={category.id} title={category.category} icon={FileCheck}>
          <div className="space-y-1">
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
        <p className="text-sm text-gray-600 mb-4">
          <strong>Location:</strong> <code className="bg-gray-100 px-2 py-1 rounded">1. Documents provided by AIFE / 1.0 Lifting of reservations</code>
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">Required Documents</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                Data pool operating procedure
              </li>
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                [Platform]_Expected e-reporting value and application code.xlsx
              </li>
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                4 XML files (FACT_REPORT2025_*)
              </li>
              <li className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                Compte rendu template
              </li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">XML Files for E-Reporting</h4>
            <ul className="text-sm font-mono text-gray-600 space-y-1">
              <li>FACT_REPORT2025_S1F1.xml</li>
              <li>FACT_REPORT2025_S1F2.xml</li>
              <li>FACT_REPORT2025_S2F3.xml</li>
              <li>FACT_REPORT2025_S2F4.xml</li>
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
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <div className="space-y-6">
      {engineeringTasks.map((category) => (
        <SectionCard key={category.id} title={category.category} icon={Wrench}>
          <div className="space-y-1">
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
        <CodeBlock code={codeSnippets.f2LifecycleExample} language="xml" />
      </SectionCard>

      <SectionCard title="F10 E-Reporting XML Example" icon={FileText}>
        <CodeBlock code={codeSnippets.f10EReportingExample} language="xml" />
      </SectionCard>
    </div>
  );
}

// Test Cases Section
function TestCasesSection() {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-800">Test Summary</h4>
            <p className="text-sm text-gray-600">
              <strong>13 total tests:</strong> 6 Directory (3 API + 3 EDI) + 4 E-Invoicing (EDI) + 3 E-Reporting (EDI)
            </p>
          </div>
        </div>
      </div>

      <SectionCard title="Directory Tests (6 Tests)" icon={Database}>
        <div className="space-y-3">
          {testCases.directory.map((test) => (
            <Accordion
              key={test.id}
              title={test.name}
              badge={test.mode}
              badgeColor={test.mode === 'API' ? 'purple' : 'blue'}
            >
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Objectives:</h5>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {test.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 flex-wrap text-sm">
                  <div>
                    <span className="text-gray-500">Data Pool:</span>{' '}
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{test.dataPool}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Execution Day:</span>{' '}
                    <span className="font-medium">{test.executionDay}</span>
                  </div>
                </div>

                {test.prerequisite && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <strong className="text-yellow-800">Prerequisite:</strong> {test.prerequisite}
                  </div>
                )}

                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Steps:</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-left w-12">#</th>
                          <th className="p-2 text-left">Action</th>
                          <th className="p-2 text-left">{test.mode === 'API' ? 'API Call' : 'EDI Operation'}</th>
                          <th className="p-2 text-left">Parameters/Content</th>
                        </tr>
                      </thead>
                      <tbody>
                        {test.steps.map((step) => (
                          <tr key={step.step} className="border-b border-gray-100">
                            <td className="p-2 font-mono text-[#0052cc]">{step.step}</td>
                            <td className="p-2">{step.action}</td>
                            <td className="p-2 font-mono text-xs bg-gray-50">{step.api || step.edi}</td>
                            <td className="p-2 text-xs text-gray-600">{step.params || step.content}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
                  <strong className="text-green-800">Expected Result:</strong> {test.expectedResult}
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="E-Invoicing Tests (4 Tests)" icon={FileText}>
        <div className="space-y-3">
          {testCases.eInvoicing.map((test) => (
            <Accordion
              key={test.id}
              title={test.name}
              badge="EDI"
              badgeColor="blue"
            >
              <div className="space-y-4">
                {test.critical && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-sm">
                    <strong className="text-red-800">Critical:</strong> {test.critical}
                  </div>
                )}

                {test.important && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <strong className="text-yellow-800">Important:</strong> {test.important}
                  </div>
                )}

                <div className="flex gap-4 flex-wrap text-sm">
                  <div>
                    <span className="text-gray-500">Role:</span>{' '}
                    <span className={`font-medium ${test.role.includes('BOTH') ? 'text-red-600' : ''}`}>{test.role}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Format:</span>{' '}
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{test.format}</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Objectives:</h5>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {test.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Steps:</h5>
                  <div className="space-y-3">
                    {test.steps.map((step) => (
                      <div key={step.step} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-[#0052cc] text-white rounded text-xs font-mono">
                            Step {step.step}
                          </span>
                          {step.role && (
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              step.role === 'Receiver' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {step.role}
                            </span>
                          )}
                          <span className="font-medium text-gray-800">{step.action}</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">Your Action:</span>
                            <p className="text-gray-700">{step.yourAction}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">PPF Response:</span>
                            <p className="text-gray-700">{step.ppfResponse}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Status Codes Used:</h5>
                  <div className="flex flex-wrap gap-2">
                    {test.statusCodes.map((code) => (
                      <span key={code} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
                  <strong className="text-green-800">Expected Result:</strong> {test.expectedResult}
                </div>
              </div>
            </Accordion>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="E-Reporting Tests (3 Tests)" icon={Send}>
        <div className="space-y-3">
          {testCases.eReporting.map((test) => (
            <Accordion
              key={test.id}
              title={test.name}
              badge="EDI"
              badgeColor="green"
            >
              <div className="space-y-4">
                <div className="flex gap-4 flex-wrap text-sm">
                  <div>
                    <span className="text-gray-500">Sub-flows:</span>{' '}
                    {test.subFlows.map((flow) => (
                      <span key={flow} className="ml-1 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">
                        {flow}
                      </span>
                    ))}
                  </div>
                </div>

                {test.keyDifference && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <strong className="text-yellow-800">Key Difference from Previous:</strong> {test.keyDifference}
                  </div>
                )}

                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Input Data Sources:</h5>
                  <div className="grid md:grid-cols-2 gap-3">
                    {Object.entries(test.inputData).map(([key, value]) => (
                      <div key={key} className="p-3 bg-gray-50 rounded border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">{key}</div>
                        <div className="text-sm font-mono text-gray-700">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Transaction Parameters:</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-left">Date</th>
                          <th className="p-2 text-left">Type</th>
                          <th className="p-2 text-left">VAT Rate</th>
                          <th className="p-2 text-left">Count</th>
                          <th className="p-2 text-left">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {test.transactionParams.map((param, i) => (
                          <tr key={i} className="border-b border-gray-100">
                            <td className="p-2 font-mono">{param.date}</td>
                            <td className="p-2">{param.type}</td>
                            <td className="p-2">{param.vatRate}</td>
                            <td className="p-2">{param.count}</td>
                            <td className="p-2 font-medium">{param.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {test.important && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                    <strong className="text-blue-800">Important:</strong> {test.important}
                  </div>
                )}

                <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
                  <strong className="text-green-800">Expected Result:</strong> {test.expectedResult}
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
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#0052cc] to-[#003d99] rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-8 h-8" />
          <h2 className="text-xl font-bold">{mvs.title}</h2>
        </div>
        <p className="text-blue-100">
          Focus only on what is required to pass the 13 test scenarios. Avoid over-engineering.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SectionCard title="Must Implement" icon={CheckCircle2}>
          <ul className="space-y-2">
            {mvs.required.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Can Skip (Not Required)" icon={Circle}>
          <ul className="space-y-2">
            {mvs.canSkip.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                <Circle className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Speed Optimizations" icon={Rocket}>
        <div className="space-y-3">
          {mvs.speedOptimizations.map((opt, i) => (
            <div key={i} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-32 flex-shrink-0">
                <span className="text-xs text-gray-500">Bottleneck</span>
                <p className="text-sm font-medium text-gray-800">{opt.bottleneck}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 mt-3 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-xs text-gray-500">Solution</span>
                <p className="text-sm text-gray-700">{opt.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Optimal Execution Sequence" icon={Clock}>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto">
          <pre>{`WEEK 1: UNBLOCK                    WEEK 2: CONNECT
+----------------------------+    +----------------------------+
| Day 1: Order certificate   |    | Day 1: Convert to PKCS7    |
| Day 1: Download Resana docs|    | Day 1: Submit raccordement |
| Day 2: Submit cert order   |    | Day 2-5: AIFE processing   |
| Day 3-5: CA verification   |    | Day 3-5: Prep test scripts |
| Day 5-7: Receive cert      |    | Day 5: Get credentials     |
+----------------------------+    +----------------------------+
           |                                    |
           v                                    v
WEEK 3: TEST (Part 1)              WEEK 4: TEST (Part 2) + FIX
+----------------------------+    +----------------------------+
| Day 1: Validate connection |    | Day 1: E-reporting test 1  |
| Day 1-2: Directory tests   |    | Day 2: E-reporting tests   |
|         (3 API + 3 EDI)    |    |         2-3                |
| Day 3-4: E-invoicing tests |    | Day 3: Review all results  |
|         1-4                |    | Day 4-5: Remediate & retest|
| Day 5: Capture evidence    |    |                            |
+----------------------------+    +----------------------------+
           |                                    |
           +----------------+-------------------+
                            v
                   WEEK 5: SUBMIT
          +-----------------------------+
          | Day 1-2: Compile evidence   |
          | Day 3: Internal review      |
          | Day 4: Final corrections    |
          | Day 5: Submit compte rendu  |
          | Day 5: Confirm AIFE receipt |
          +-----------------------------+`}</pre>
        </div>
      </SectionCard>
    </div>
  );
}

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [checkedItems, setCheckedItems] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Calculate total checkable items and completed count
  const allItems = [
    ...prerequisites.flatMap(cat => cat.items),
    ...engineeringTasks.flatMap(cat => cat.items)
  ];
  const totalItems = allItems.length;
  const completedItems = allItems.filter(item => checkedItems[item.id]).length;

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pdp-dashboard-checklist');
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('pdp-dashboard-checklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'prerequisites':
        return <PrerequisitesSection checkedItems={checkedItems} setCheckedItems={setCheckedItems} />;
      case 'engineering':
        return <EngineeringSection checkedItems={checkedItems} setCheckedItems={setCheckedItems} />;
      case 'testcases':
        return <TestCasesSection />;
      case 'fasttrack':
        return <FastTrackSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 overflow-hidden fixed h-full z-20`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0052cc] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CT</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-sm">ClearTax France</h1>
              <p className="text-xs text-gray-500">PDP-to-PPF Testing</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <ProgressBar completed={completedItems} total={totalItems} />
        </div>

        <nav className="p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-[#e6f0ff] text-[#0052cc]'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#0052cc]' : 'text-gray-400'}`} />
                <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200 bg-white">
          <div className="text-xs text-gray-500">
            <p>Deadline: <span className="font-semibold text-red-600">Jan 14, 2026</span></p>
            <p className="mt-1">Version 1.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {navItems.find(n => n.id === activeSection)?.label}
                </h1>
                <p className="text-sm text-gray-500">
                  France B2B E-invoicing PDP-to-PPF Interoperability Testing
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">Progress</p>
                <p className="text-lg font-bold text-[#0052cc]">{Math.round((completedItems / totalItems) * 100)}%</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-6xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default App;
