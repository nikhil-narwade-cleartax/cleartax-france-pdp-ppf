import { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Clock,
  FileText,
  Database,
  Send,
  ArrowRight,
  Zap,
  X,
  FileCheck,
  Server,
  Shield,
  Globe,
  Key,
  Code,
  Workflow,
  TestTube,
  Rocket,
  Calendar,
  Target,
  Circle
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

import {
  prerequisites,
  engineeringTasks,
  testCases,
  codeSnippets,
  lifecycleStatusCodes,
  timeline,
  mvs
} from './data/dashboardData';

const tabs = [
  { id: 'overview', label: '01 Overview' },
  { id: 'prerequisites', label: '02 Prerequisites' },
  { id: 'engineering', label: '03 Engineering' },
  { id: 'testcases', label: '04 Test Cases' },
  { id: 'fasttrack', label: '05 Fast-Track' },
];

// Code Block
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-slate-200">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>
      <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Feature Card with colored top border
function FeatureCard({ icon: Icon, title, description, color = 'blue' }) {
  const colors = {
    blue: 'border-t-blue-500',
    teal: 'border-t-teal-500',
    orange: 'border-t-orange-400',
    purple: 'border-t-violet-500',
    green: 'border-t-emerald-500',
    red: 'border-t-red-500',
  };

  return (
    <div className={`bg-white rounded-lg border border-slate-200 border-t-4 ${colors[color]} p-6 hover:shadow-lg transition-shadow`}>
      <div className="mb-4">
        <Icon className="w-8 h-8 text-slate-600" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// Checklist Item
function ChecklistItem({ item, checked, onChange }) {
  return (
    <div
      className="flex items-start gap-3 py-3 cursor-pointer group"
      onClick={onChange}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        className="mt-0.5 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
      />
      <div className="flex-1">
        <span className={`text-sm leading-relaxed transition-all ${checked ? 'text-slate-400 line-through' : 'text-slate-700 group-hover:text-slate-900'}`}>
          {item.text}
        </span>
        {item.critical && !checked && (
          <span className="ml-2 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">Required</span>
        )}
      </div>
    </div>
  );
}

// Overview Section
function OverviewSection() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="max-w-3xl">
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">CONTEXT</p>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">What is PDP-to-PPF Testing?</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          The French tax authority (DGFiP/AIFE) requires your platform to demonstrate interoperability
          with the national invoicing portal before receiving final PDP accreditation.
        </p>
      </div>

      {/* Core Competencies */}
      <div>
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">CORE COMPETENCIES</p>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Three Areas You Must Prove</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Database}
            title="Directory Integration"
            description="Query, register, and manage company routing data in the national Annuaire. Handle SIREN/SIRET lookups and routing codes."
            color="blue"
          />
          <FeatureCard
            icon={FileText}
            title="E-Invoicing Transmission"
            description="Send regulatory invoice data (F1) and lifecycle statuses (F2) to PPF. Process CFE confirmations and F6 acknowledgments."
            color="teal"
          />
          <FeatureCard
            icon={Send}
            title="E-Reporting Capability"
            description="Aggregate and transmit B2Bi/B2C transaction data (F10) to tax authorities. Handle corrections and replacements."
            color="orange"
          />
        </div>
      </div>

      {/* Deadline */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-red-600 font-medium tracking-wide text-sm mb-1">SUBMISSION DEADLINE</p>
            <p className="text-3xl font-bold text-slate-900">January 14, 2026</p>
            <p className="text-slate-600 mt-1">Compte Rendu must be submitted by this date</p>
          </div>
        </div>
      </div>

      {/* Data Flows */}
      <div>
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">ARCHITECTURE</p>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Data Flow Overview</h2>
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
      </div>

      {/* Timeline */}
      <div>
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">TIMELINE</p>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">5-Week Execution Plan</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {timeline.phases.map((phase) => (
            <div key={phase.week} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center mb-4">
                {phase.week}
              </div>
              <h3 className="font-semibold text-slate-900 mb-3">{phase.title}</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                {phase.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Status Codes */}
      <div>
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">REFERENCE</p>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Lifecycle Status Codes</h2>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Code</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Direction</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {lifecycleStatusCodes.map((status) => (
                <tr key={status.code} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-12 h-8 rounded bg-blue-500 text-white font-mono text-sm font-bold">
                      {status.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{status.name}</td>
                  <td className="px-6 py-4 text-slate-600">{status.direction}</td>
                  <td className="px-6 py-4 text-slate-600">{status.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Prerequisites Section
function PrerequisitesSection({ checkedItems, setCheckedItems }) {
  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const categoryIcons = {
    'Administrative': Shield,
    'Portal Access': Globe,
    'Documents from Resana': FileText,
    'Certificate & Connection': Key,
  };

  const categoryColors = {
    'Administrative': 'blue',
    'Portal Access': 'teal',
    'Documents from Resana': 'orange',
    'Certificate & Connection': 'purple',
  };

  return (
    <div className="space-y-16">
      <div className="max-w-3xl">
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">BEFORE YOU BEGIN</p>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Prerequisites & Documentation</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Complete all prerequisites before starting test execution. Items marked as
          <span className="mx-2 text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">Required</span>
          will block your progress.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {prerequisites.map((category) => {
          const Icon = categoryIcons[category.category] || FileCheck;
          const color = categoryColors[category.category] || 'blue';
          const colors = {
            blue: 'border-t-blue-500',
            teal: 'border-t-teal-500',
            orange: 'border-t-orange-400',
            purple: 'border-t-violet-500',
          };

          return (
            <div key={category.id} className={`bg-white rounded-xl border border-slate-200 border-t-4 ${colors[color]} p-6`}>
              <div className="flex items-center gap-3 mb-6">
                <Icon className="w-6 h-6 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-900">{category.category}</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {category.items.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    item={item}
                    checked={checkedItems[item.id] || false}
                    onChange={() => toggleItem(item.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resana Documents */}
      <div>
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">RESANA PORTAL</p>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Required Documents from AIFE</h2>
        <div className="bg-slate-50 rounded-xl p-6 mb-6">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">Location:</span>
            <code className="ml-2 px-3 py-1 bg-white rounded border border-slate-200 text-sm font-mono">
              1. Documents provided by AIFE / 1.0 Lifting of reservations
            </code>
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={FileText}
            title="Required Documents"
            description="Data pool operating procedure, Expected e-reporting values Excel, Compte rendu template"
            color="blue"
          />
          <FeatureCard
            icon={Code}
            title="XML Test Files"
            description="FACT_REPORT2025_S1F1.xml, FACT_REPORT2025_S1F2.xml, FACT_REPORT2025_S2F3.xml, FACT_REPORT2025_S2F4.xml"
            color="teal"
          />
        </div>
      </div>
    </div>
  );
}

// Engineering Section
function EngineeringSection({ checkedItems, setCheckedItems }) {
  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const categoryIcons = {
    'Infrastructure & Connectivity': Server,
    'Directory API Implementation': Database,
    'XML Payload Generators': Code,
    'Response Parsers': Workflow,
    'Special Implementations': Zap,
  };

  const categoryColors = ['blue', 'teal', 'orange', 'purple', 'green'];

  return (
    <div className="space-y-16">
      <div className="max-w-3xl">
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">IMPLEMENTATION</p>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Engineering Action Plan</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Technical implementation checklist for PDP-to-PPF interoperability.
          Complete each category to ensure full test coverage.
        </p>
      </div>

      <div className="space-y-8">
        {engineeringTasks.map((category, idx) => {
          const Icon = categoryIcons[category.category] || Code;
          const color = categoryColors[idx % categoryColors.length];
          const colors = {
            blue: 'border-t-blue-500',
            teal: 'border-t-teal-500',
            orange: 'border-t-orange-400',
            purple: 'border-t-violet-500',
            green: 'border-t-emerald-500',
          };

          return (
            <div key={category.id} className={`bg-white rounded-xl border border-slate-200 border-t-4 ${colors[color]} p-6`}>
              <div className="flex items-center gap-3 mb-6">
                <Icon className="w-6 h-6 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-900">{category.category}</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {category.items.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    item={item}
                    checked={checkedItems[item.id] || false}
                    onChange={() => toggleItem(item.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Code Examples */}
      <div>
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">CODE EXAMPLES</p>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Reference Implementations</h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">PKCS7 Certificate Conversion</h3>
            <CodeBlock code={codeSnippets.pkcs7Conversion} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">SFTP Commands</h3>
            <CodeBlock code={codeSnippets.sftpCommands} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">F2 Lifecycle XML</h3>
            <CodeBlock code={codeSnippets.f2LifecycleExample} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Test Cases Section
function TestCasesSection() {
  return (
    <div className="space-y-16">
      <div className="max-w-3xl">
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">VALIDATION</p>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Test Cases Map</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          13 total tests: 6 Directory (3 API + 3 EDI) + 4 E-Invoicing (EDI) + 3 E-Reporting (EDI)
        </p>
      </div>

      {/* Test Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={Database}
          title="Directory Tests"
          description="6 tests covering SIREN/SIRET appropriation, routing code creation, and directory line masking via API and EDI."
          color="blue"
        />
        <FeatureCard
          icon={FileText}
          title="E-Invoicing Tests"
          description="4 tests for F1/F2 transmission including invoice filing, collection, rejection, and refusal flows."
          color="teal"
        />
        <FeatureCard
          icon={Send}
          title="E-Reporting Tests"
          description="3 tests for F10 transmission covering B2Bi/B2C sales, receipts, and corrective submissions."
          color="orange"
        />
      </div>

      {/* Directory Tests */}
      <div>
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">DIRECTORY</p>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Annuaire Integration Tests</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {testCases.directory.map((test) => (
            <AccordionItem key={test.id} value={test.id} className="bg-white border border-slate-200 rounded-xl px-6">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-left">
                  <span className="font-semibold text-slate-900">{test.name}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${test.mode === 'API' ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700'}`}>
                    {test.mode}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-4">
                    <div className="px-3 py-2 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-500 block">Data Pool</span>
                      <span className="font-mono text-sm text-slate-900">{test.dataPool}</span>
                    </div>
                    <div className="px-3 py-2 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-500 block">Execution</span>
                      <span className="font-medium text-sm text-slate-900">{test.executionDay}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-900 mb-2">Objectives:</p>
                    <ul className="space-y-1">
                      {test.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="text-sm"><span className="font-medium text-emerald-800">Expected:</span> <span className="text-slate-700">{test.expectedResult}</span></p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* E-Invoicing Tests */}
      <div>
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">E-INVOICING</p>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">F1/F2 Transmission Tests</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {testCases.eInvoicing.map((test) => (
            <AccordionItem key={test.id} value={test.id} className="bg-white border border-slate-200 rounded-xl px-6">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-left">
                  <span className="font-semibold text-slate-900">{test.name}</span>
                  {test.role.includes('BOTH') && (
                    <span className="text-xs font-medium px-2 py-1 rounded bg-red-100 text-red-700">Dual Role</span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4 pt-2">
                  {test.critical && (
                    <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                      <p className="text-sm"><span className="font-medium text-red-800">Critical:</span> <span className="text-slate-700">{test.critical}</span></p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4">
                    <div className="px-3 py-2 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-500 block">Role</span>
                      <span className={`font-medium text-sm ${test.role.includes('BOTH') ? 'text-red-600' : 'text-slate-900'}`}>{test.role}</span>
                    </div>
                    <div className="px-3 py-2 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-500 block">Format</span>
                      <span className="font-mono text-sm text-slate-900">{test.format}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-900 mb-2">Status Codes:</p>
                    <div className="flex flex-wrap gap-2">
                      {test.statusCodes.map((code) => (
                        <span key={code} className="px-2 py-1 bg-slate-100 rounded font-mono text-xs text-slate-700">
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="text-sm"><span className="font-medium text-emerald-800">Expected:</span> <span className="text-slate-700">{test.expectedResult}</span></p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* E-Reporting Tests */}
      <div>
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">E-REPORTING</p>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">F10 Transmission Tests</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {testCases.eReporting.map((test) => (
            <AccordionItem key={test.id} value={test.id} className="bg-white border border-slate-200 rounded-xl px-6">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-left">
                  <span className="font-semibold text-slate-900">{test.name}</span>
                  <div className="flex gap-1">
                    {test.subFlows.map((flow) => (
                      <span key={flow} className="text-xs font-medium px-2 py-1 rounded bg-emerald-100 text-emerald-700">
                        {flow}
                      </span>
                    ))}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4 pt-2">
                  {test.keyDifference && (
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                      <p className="text-sm"><span className="font-medium text-amber-800">Key Difference:</span> <span className="text-slate-700">{test.keyDifference}</span></p>
                    </div>
                  )}

                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="text-sm"><span className="font-medium text-emerald-800">Expected:</span> <span className="text-slate-700">{test.expectedResult}</span></p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

// Fast Track Section
function FastTrackSection() {
  return (
    <div className="space-y-16">
      <div className="max-w-3xl">
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">OPTIMIZATION</p>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Fast-Track Strategy</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Focus only on what is required to pass the 13 test scenarios.
          Skip non-essential features to accelerate compliance.
        </p>
      </div>

      {/* MVS Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-emerald-500 p-6">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-semibold text-slate-900">Must Implement</h3>
          </div>
          <ul className="space-y-3">
            {mvs.required.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-slate-400 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Circle className="w-6 h-6 text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900">Can Skip</h3>
          </div>
          <ul className="space-y-3">
            {mvs.canSkip.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-sm text-slate-500">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Speed Optimizations */}
      <div>
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">BOTTLENECK SOLUTIONS</p>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Speed Optimizations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {mvs.speedOptimizations.map((opt, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
              <div className="flex-shrink-0">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Bottleneck</p>
                <p className="font-semibold text-slate-900">{opt.bottleneck}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Solution</p>
                <p className="text-sm text-slate-700">{opt.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Sequence */}
      <div>
        <p className="text-blue-600 font-medium tracking-wide text-sm mb-3">EXECUTION</p>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Optimal Sequence</h2>
        <CodeBlock code={`WEEK 1: UNBLOCK                    WEEK 2: CONNECT
┌────────────────────────────┐    ┌────────────────────────────┐
│ Day 1: Order certificate   │    │ Day 1: Convert to PKCS7    │
│ Day 1: Download Resana docs│    │ Day 1: Submit raccordement │
│ Day 2: Submit cert order   │    │ Day 2-5: AIFE processing   │
│ Day 3-5: CA verification   │    │ Day 3-5: Prep test scripts │
│ Day 5-7: Receive cert      │    │ Day 5: Get credentials     │
└────────────────────────────┘    └────────────────────────────┘

WEEK 3: TEST (Part 1)              WEEK 4: TEST (Part 2) + FIX
┌────────────────────────────┐    ┌────────────────────────────┐
│ Day 1: Validate connection │    │ Day 1: E-reporting test 1  │
│ Day 1-2: Directory tests   │    │ Day 2: E-reporting 2-3     │
│ Day 3-4: E-invoicing tests │    │ Day 3: Review all results  │
│ Day 5: Capture evidence    │    │ Day 4-5: Remediate & retest│
└────────────────────────────┘    └────────────────────────────┘

                   WEEK 5: SUBMIT
          ┌─────────────────────────────┐
          │ Day 1-2: Compile evidence   │
          │ Day 3: Internal review      │
          │ Day 4: Final corrections    │
          │ Day 5: Submit compte rendu  │
          └─────────────────────────────┘`} />
      </div>
    </div>
  );
}

// Main App
function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [checkedItems, setCheckedItems] = useState({});

  const allItems = [
    ...prerequisites.flatMap(cat => cat.items),
    ...engineeringTasks.flatMap(cat => cat.items)
  ];
  const totalItems = allItems.length;
  const completedItems = allItems.filter(item => checkedItems[item.id]).length;
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  useEffect(() => {
    const saved = localStorage.getItem('pdp-dashboard-checklist');
    if (saved) setCheckedItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('pdp-dashboard-checklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const renderSection = () => {
    switch (activeTab) {
      case 'overview': return <OverviewSection />;
      case 'prerequisites': return <PrerequisitesSection checkedItems={checkedItems} setCheckedItems={setCheckedItems} />;
      case 'engineering': return <EngineeringSection checkedItems={checkedItems} setCheckedItems={setCheckedItems} />;
      case 'testcases': return <TestCasesSection />;
      case 'fasttrack': return <FastTrackSection />;
      default: return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top bar */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <div>
                <h1 className="font-semibold text-slate-900">ClearTax France</h1>
                <p className="text-xs text-slate-500">PDP-to-PPF Interoperability</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-500">Progress</p>
                <p className="text-lg font-bold text-blue-600">{progressPercentage}%</p>
              </div>
              <div className="w-32">
                <Progress value={progressPercentage} className="h-2 bg-slate-200 [&>div]:bg-blue-500" />
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex gap-8 -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;
