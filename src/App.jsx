import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileCheck,
  Wrench,
  TestTube,
  Rocket,
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
  X,
  Code,
  Beaker
} from 'lucide-react';

// shadcn/ui components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

// Code Block Component
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
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
      <pre className="bg-slate-950 text-slate-50 p-4 overflow-x-auto text-sm font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Checklist Item using shadcn Checkbox
function ChecklistItem({ item, checked, onChange }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer" onClick={onChange}>
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
      />
      <div className="flex-1 min-w-0">
        <label className={`text-sm font-medium leading-none cursor-pointer transition-all ${
          checked ? 'text-slate-400 line-through' : 'text-slate-700'
        }`}>
          {item.text}
        </label>
        {item.critical && !checked && (
          <Badge variant="destructive" className="ml-3 text-xs">
            Required
          </Badge>
        )}
      </div>
    </div>
  );
}

// Overview Section
function OverviewSection() {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">PDP-to-PPF Testing Context</CardTitle>
              <CardDescription>French tax authority requirements for platform accreditation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 leading-relaxed mb-6">
            The French tax authority (DGFiP/AIFE) requires that your platform (Plateforme Agr&eacute;&eacute;e/PA)
            demonstrates <strong className="text-slate-900">three core competencies</strong> before receiving final accreditation:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mb-3">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Directory Integration</h4>
                <p className="text-sm text-slate-600">
                  Query, register, and manage company routing data in the national Annuaire
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">E-Invoicing Transmission</h4>
                <p className="text-sm text-slate-600">
                  Send regulatory invoice data (F1) and lifecycle statuses (F2) to PPF
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-violet-50 to-violet-100/50 border-violet-200">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center mb-3">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">E-Reporting Capability</h4>
                <p className="text-sm text-slate-600">
                  Aggregate and transmit B2Bi/B2C transaction data (F10) to tax authorities
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">Data Flows Overview</CardTitle>
              <CardDescription>PDP to PPF communication architecture</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">Critical Timeline</CardTitle>
              <CardDescription>Accreditation submission deadline</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Card className="bg-gradient-to-r from-red-50 to-red-100/50 border-red-200 mb-6">
            <CardContent className="flex items-center gap-6 p-5">
              <div className="w-14 h-14 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-1">Compte Rendu Submission Deadline</p>
                <p className="text-3xl font-bold text-slate-900">January 14, 2026</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-5 gap-3">
            {timeline.phases.map((phase, idx) => (
              <Card key={phase.week} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <Badge className="mb-3 bg-blue-600">{`Week ${phase.week}`}</Badge>
                  <h4 className="font-bold text-slate-900 text-sm mb-3">{phase.title}</h4>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    {phase.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">Lifecycle Status Codes Reference</CardTitle>
              <CardDescription>F2 and CFE status code definitions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Code</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Direction</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {lifecycleStatusCodes.map((status) => (
                  <tr key={status.code} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <Badge className="bg-blue-600 font-mono">{status.code}</Badge>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900 text-sm">{status.name}</td>
                    <td className="px-4 py-3 text-slate-600 text-sm">{status.direction}</td>
                    <td className="px-4 py-3 text-slate-600 text-sm">{status.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Prerequisites Section
function PrerequisitesSection({ checkedItems, setCheckedItems }) {
  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-200 shadow-sm">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Before You Begin</h4>
            <p className="text-sm text-slate-600">
              Complete all prerequisites below before starting test execution. Items marked as
              <Badge variant="destructive" className="mx-2 text-xs">Required</Badge>
              will block your progress if not completed.
            </p>
          </div>
        </CardContent>
      </Card>

      {prerequisites.map((category) => (
        <Card key={category.id} className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">{category.category}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      ))}

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">Resana Portal Documents</CardTitle>
              <CardDescription>Required documents from AIFE portal</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-slate-100 rounded-lg">
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">Location:</strong>{' '}
              <code className="ml-2 px-2 py-1 bg-white rounded text-xs font-mono text-slate-700 border">
                1. Documents provided by AIFE / 1.0 Lifting of reservations
              </code>
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="p-4">
                <h4 className="font-bold text-slate-900 mb-3 text-sm">Required Documents</h4>
                <ul className="space-y-2">
                  {['Data pool operating procedure', '[Platform]_Expected e-reporting value and application code.xlsx', '4 XML files (FACT_REPORT2025_*)', 'Compte rendu template'].map((doc) => (
                    <li key={doc} className="flex items-center gap-2 text-sm text-slate-600">
                      <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="p-4">
                <h4 className="font-bold text-slate-900 mb-3 text-sm">XML Files for E-Reporting</h4>
                <ul className="space-y-2 font-mono text-xs">
                  {['FACT_REPORT2025_S1F1.xml', 'FACT_REPORT2025_S1F2.xml', 'FACT_REPORT2025_S2F3.xml', 'FACT_REPORT2025_S2F4.xml'].map((file) => (
                    <li key={file} className="px-2 py-1.5 bg-white rounded text-slate-700 border">
                      {file}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Engineering Section
function EngineeringSection({ checkedItems, setCheckedItems }) {
  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  return (
    <div className="space-y-6">
      {engineeringTasks.map((category) => (
        <Card key={category.id} className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">{category.category}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      ))}

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">PKCS7 Certificate Conversion</CardTitle>
              <CardDescription>Convert certificates to PPF-compatible format</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CodeBlock code={codeSnippets.pkcs7Conversion} />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">SFTP Commands Reference</CardTitle>
              <CardDescription>PPF qualification environment access</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CodeBlock code={codeSnippets.sftpCommands} />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">F2 Lifecycle XML Example</CardTitle>
              <CardDescription>Invoice lifecycle status payload structure</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CodeBlock code={codeSnippets.f2LifecycleExample} />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">F10 E-Reporting XML Example</CardTitle>
              <CardDescription>E-reporting payload structure</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CodeBlock code={codeSnippets.f10EReportingExample} />
        </CardContent>
      </Card>
    </div>
  );
}

// Test Cases Section using shadcn Accordion
function TestCasesSection() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-amber-50 to-amber-100/50 border-amber-200 shadow-sm">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Test Summary</h4>
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">13 total tests:</strong> 6 Directory (3 API + 3 EDI) + 4 E-Invoicing (EDI) + 3 E-Reporting (EDI)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Directory Tests */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">Directory Tests (6 Tests)</CardTitle>
              <CardDescription>Annuaire integration validation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {testCases.directory.map((test) => (
              <AccordionItem key={test.id} value={test.id} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">{test.name}</span>
                    <Badge variant={test.mode === 'API' ? 'secondary' : 'default'} className={test.mode === 'API' ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700'}>
                      {test.mode}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Objectives</h5>
                      <ul className="space-y-1.5">
                        {test.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="px-3 py-2 bg-slate-50 rounded-lg border">
                        <span className="text-xs text-slate-500">Data Pool</span>
                        <p className="font-mono text-xs text-slate-900">{test.dataPool}</p>
                      </div>
                      <div className="px-3 py-2 bg-slate-50 rounded-lg border">
                        <span className="text-xs text-slate-500">Execution Day</span>
                        <p className="font-semibold text-xs text-slate-900">{test.executionDay}</p>
                      </div>
                    </div>

                    {test.prerequisite && (
                      <Card className="bg-amber-50 border-amber-200">
                        <CardContent className="p-3">
                          <p className="text-sm"><strong className="text-amber-800">Prerequisite:</strong> <span className="text-slate-700">{test.prerequisite}</span></p>
                        </CardContent>
                      </Card>
                    )}

                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Steps</h5>
                      <div className="overflow-hidden rounded-lg border">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-slate-50">
                              <th className="px-3 py-2 text-left font-semibold text-slate-600 text-xs w-12">#</th>
                              <th className="px-3 py-2 text-left font-semibold text-slate-600 text-xs">Action</th>
                              <th className="px-3 py-2 text-left font-semibold text-slate-600 text-xs">{test.mode === 'API' ? 'API Call' : 'EDI Operation'}</th>
                              <th className="px-3 py-2 text-left font-semibold text-slate-600 text-xs">Parameters</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y bg-white">
                            {test.steps.map((step) => (
                              <tr key={step.step} className="hover:bg-slate-50">
                                <td className="px-3 py-2">
                                  <Badge className="bg-blue-600">{step.step}</Badge>
                                </td>
                                <td className="px-3 py-2 text-slate-900 text-xs">{step.action}</td>
                                <td className="px-3 py-2 font-mono text-xs text-slate-600 bg-slate-50">{step.api || step.edi}</td>
                                <td className="px-3 py-2 text-xs text-slate-600">{step.params || step.content}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <Card className="bg-emerald-50 border-emerald-200">
                      <CardContent className="p-3">
                        <p className="text-sm"><strong className="text-emerald-800">Expected Result:</strong> <span className="text-slate-700">{test.expectedResult}</span></p>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* E-Invoicing Tests */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">E-Invoicing Tests (4 Tests)</CardTitle>
              <CardDescription>F1/F2 transmission validation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {testCases.eInvoicing.map((test) => (
              <AccordionItem key={test.id} value={test.id} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">{test.name}</span>
                    <Badge className="bg-blue-100 text-blue-700">EDI</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-4">
                    {test.critical && (
                      <Card className="bg-red-50 border-red-200">
                        <CardContent className="p-3">
                          <p className="text-sm"><strong className="text-red-800">Critical:</strong> <span className="text-slate-700">{test.critical}</span></p>
                        </CardContent>
                      </Card>
                    )}

                    {test.important && (
                      <Card className="bg-amber-50 border-amber-200">
                        <CardContent className="p-3">
                          <p className="text-sm"><strong className="text-amber-800">Important:</strong> <span className="text-slate-700">{test.important}</span></p>
                        </CardContent>
                      </Card>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <div className="px-3 py-2 bg-slate-50 rounded-lg border">
                        <span className="text-xs text-slate-500">Role</span>
                        <p className={`font-semibold text-xs ${test.role.includes('BOTH') ? 'text-red-600' : 'text-slate-900'}`}>{test.role}</p>
                      </div>
                      <div className="px-3 py-2 bg-slate-50 rounded-lg border">
                        <span className="text-xs text-slate-500">Format</span>
                        <p className="font-mono text-xs text-slate-900">{test.format}</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Objectives</h5>
                      <ul className="space-y-1.5">
                        {test.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Steps</h5>
                      <div className="space-y-3">
                        {test.steps.map((step) => (
                          <Card key={step.step} className="border">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Badge className="bg-blue-600">Step {step.step}</Badge>
                                {step.role && (
                                  <Badge variant="outline" className={step.role === 'Receiver' ? 'border-orange-300 text-orange-700' : 'border-blue-300 text-blue-700'}>
                                    {step.role}
                                  </Badge>
                                )}
                                <span className="font-semibold text-sm text-slate-900">{step.action}</span>
                              </div>
                              <div className="grid md:grid-cols-2 gap-3">
                                <div className="p-3 bg-slate-50 rounded-lg">
                                  <span className="text-xs font-semibold text-slate-500 uppercase">Your Action</span>
                                  <p className="text-xs text-slate-700 mt-1">{step.yourAction}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg">
                                  <span className="text-xs font-semibold text-slate-500 uppercase">PPF Response</span>
                                  <p className="text-xs text-slate-700 mt-1">{step.ppfResponse}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Status Codes</h5>
                      <div className="flex flex-wrap gap-2">
                        {test.statusCodes.map((code) => (
                          <Badge key={code} variant="outline" className="font-mono text-xs">
                            {code}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Card className="bg-emerald-50 border-emerald-200">
                      <CardContent className="p-3">
                        <p className="text-sm"><strong className="text-emerald-800">Expected Result:</strong> <span className="text-slate-700">{test.expectedResult}</span></p>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* E-Reporting Tests */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">E-Reporting Tests (3 Tests)</CardTitle>
              <CardDescription>F10 transmission validation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {testCases.eReporting.map((test) => (
              <AccordionItem key={test.id} value={test.id} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">{test.name}</span>
                    <Badge className="bg-emerald-100 text-emerald-700">EDI</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {test.subFlows.map((flow) => (
                        <Badge key={flow} className="bg-emerald-100 text-emerald-700">
                          {flow}
                        </Badge>
                      ))}
                    </div>

                    {test.keyDifference && (
                      <Card className="bg-amber-50 border-amber-200">
                        <CardContent className="p-3">
                          <p className="text-sm"><strong className="text-amber-800">Key Difference:</strong> <span className="text-slate-700">{test.keyDifference}</span></p>
                        </CardContent>
                      </Card>
                    )}

                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Input Data Sources</h5>
                      <div className="grid md:grid-cols-2 gap-3">
                        {Object.entries(test.inputData).map(([key, value]) => (
                          <Card key={key} className="border">
                            <CardContent className="p-3">
                              <span className="text-xs font-semibold text-slate-500 uppercase">{key}</span>
                              <p className="font-mono text-xs text-slate-900 mt-1">{value}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Transaction Parameters</h5>
                      <div className="overflow-hidden rounded-lg border">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-slate-50">
                              <th className="px-3 py-2 text-left font-semibold text-slate-600 text-xs">Date</th>
                              <th className="px-3 py-2 text-left font-semibold text-slate-600 text-xs">Type</th>
                              <th className="px-3 py-2 text-left font-semibold text-slate-600 text-xs">VAT Rate</th>
                              <th className="px-3 py-2 text-left font-semibold text-slate-600 text-xs">Count</th>
                              <th className="px-3 py-2 text-left font-semibold text-slate-600 text-xs">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y bg-white">
                            {test.transactionParams.map((param, i) => (
                              <tr key={i} className="hover:bg-slate-50">
                                <td className="px-3 py-2 font-mono text-xs text-slate-900">{param.date}</td>
                                <td className="px-3 py-2 text-xs text-slate-700">{param.type}</td>
                                <td className="px-3 py-2 text-xs text-slate-700">{param.vatRate}</td>
                                <td className="px-3 py-2 text-xs text-slate-700">{param.count}</td>
                                <td className="px-3 py-2 font-semibold text-xs text-slate-900">{param.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {test.important && (
                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-3">
                          <p className="text-sm"><strong className="text-blue-800">Important:</strong> <span className="text-slate-700">{test.important}</span></p>
                        </CardContent>
                      </Card>
                    )}

                    <Card className="bg-emerald-50 border-emerald-200">
                      <CardContent className="p-3">
                        <p className="text-sm"><strong className="text-emerald-800">Expected Result:</strong> <span className="text-slate-700">{test.expectedResult}</span></p>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

// Fast Track Section
function FastTrackSection() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{mvs.title}</h2>
              <p className="text-blue-200">Focus only on what is required to pass the 13 test scenarios</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">Must Implement</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-400 flex items-center justify-center">
                <Circle className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">Can Skip (Not Required)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">Speed Optimizations</CardTitle>
              <CardDescription>Solutions to common bottlenecks</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mvs.speedOptimizations.map((opt, i) => (
              <Card key={i} className="border hover:shadow-sm transition-shadow">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="w-28 flex-shrink-0">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Bottleneck</span>
                    <p className="font-semibold text-sm text-slate-900 mt-1">{opt.bottleneck}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Solution</span>
                    <p className="text-sm text-slate-700 mt-1">{opt.solution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 font-bold tracking-tight">Optimal Execution Sequence</CardTitle>
              <CardDescription>5-week timeline to compliance</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
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
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

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
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white border-r z-30 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-0'} overflow-hidden`}>
        <div className="flex flex-col h-full w-72">
          {/* Logo */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="text-white font-bold">CT</span>
              </div>
              <div>
                <h1 className="font-bold text-slate-900">ClearTax France</h1>
                <p className="text-xs text-slate-500">PDP-to-PPF Testing</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Progress</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-900">{progressPercentage}%</span>
                <span className="text-xs text-slate-500">({completedItems}/{totalItems})</span>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-slate-200 [&>div]:bg-blue-600" />
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
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
          <div className="p-6 border-t">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Deadline</p>
                <p className="text-lg font-bold text-slate-900">Jan 14, 2026</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors shadow-sm"
                title={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                {isSidebarOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
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
                <p className="text-2xl font-bold text-blue-600">{progressPercentage}%</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-8 py-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default App;
