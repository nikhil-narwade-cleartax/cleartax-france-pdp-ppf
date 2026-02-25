// France PDP-to-PPF Interoperability Testing Dashboard Data

export const prerequisites = [
  {
    id: 'pre-1',
    category: 'Administrative',
    items: [
      { id: 'pre-1-1', text: 'Immatriculation Provisoire (Pre-approval) obtained', critical: true },
      { id: 'pre-1-2', text: 'Belgian BCE/KBO number confirmed', critical: true },
      { id: 'pre-1-3', text: 'Belgian VAT number (BE format) confirmed', critical: true },
      { id: 'pre-1-4', text: 'ISO 27001 certification verified valid', critical: true },
      { id: 'pre-1-5', text: 'SecNumCloud hosting attestation verified', critical: false },
    ]
  },
  {
    id: 'pre-2',
    category: 'Portal Access',
    items: [
      { id: 'pre-2-1', text: 'Access to Resana portal verified', critical: true },
      { id: 'pre-2-2', text: 'Access to PPF qualification portal verified', critical: true },
      { id: 'pre-2-3', text: 'Technical contact registered with AIFE', critical: true },
    ]
  },
  {
    id: 'pre-3',
    category: 'Documents from Resana',
    items: [
      { id: 'pre-3-1', text: 'Data pool operating procedure downloaded', critical: true },
      { id: 'pre-3-2', text: '[Platform]_Expected e-reporting value and application code.xlsx downloaded', critical: true },
      { id: 'pre-3-3', text: '4 XML files (Flux 2 invoices) downloaded', critical: true },
      { id: 'pre-3-4', text: 'Scenarios_e-invoicing tab reviewed', critical: true },
      { id: 'pre-3-5', text: 'Scenarios_e-reporting tab reviewed', critical: true },
      { id: 'pre-3-6', text: 'Compte rendu template downloaded', critical: false },
    ]
  },
  {
    id: 'pre-4',
    category: 'Certificate & Connection',
    items: [
      { id: 'pre-4-1', text: 'RGS*/eIDAS certificate obtained', critical: true },
      { id: 'pre-4-2', text: 'Certificate converted to PKCS7 format (.p7b)', critical: true },
      { id: 'pre-4-3', text: 'EDI raccordement form submitted', critical: true },
      { id: 'pre-4-4', text: 'AIFE approval received', critical: true },
      { id: 'pre-4-5', text: 'SFTP/AS2 connection credentials received', critical: true },
      { id: 'pre-4-6', text: 'Connection validated (can access inbox/outbox)', critical: true },
    ]
  }
];

export const engineeringTasks = [
  {
    id: 'eng-1',
    category: 'Infrastructure & Connectivity',
    items: [
      { id: 'eng-1-1', text: 'Configure SFTP client with certificate authentication', critical: true },
      { id: 'eng-1-2', text: 'Set up polling mechanism for /outbox responses', critical: true },
      { id: 'eng-1-3', text: 'Implement certificate-based authentication', critical: true },
      { id: 'eng-1-4', text: 'Create logging/audit trail for all transmissions', critical: false },
    ]
  },
  {
    id: 'eng-2',
    category: 'Directory API Implementation',
    items: [
      { id: 'eng-2-1', text: 'POST /routing-codes - Create routing code endpoint', critical: true },
      { id: 'eng-2-2', text: 'POST /directory/appropriate - Appropriate SIREN/SIRET endpoint', critical: true },
      { id: 'eng-2-3', text: 'PUT /directory/close - Close line with date endpoint', critical: true },
      { id: 'eng-2-4', text: 'PUT /directory/mask - Hide directory line endpoint', critical: true },
    ]
  },
  {
    id: 'eng-3',
    category: 'XML Payload Generators',
    items: [
      { id: 'eng-3-1', text: 'F1 regulatory data XML generator (CII or UBL format)', critical: true },
      { id: 'eng-3-2', text: 'F2 lifecycle status XML generator (200, 210, 212, 213)', critical: true },
      { id: 'eng-3-3', text: 'F10 e-reporting XML generator (sub-flows 10.1-10.4)', critical: true },
      { id: 'eng-3-4', text: 'Directory update XML generator (for EDI tests)', critical: true },
    ]
  },
  {
    id: 'eng-4',
    category: 'Response Parsers',
    items: [
      { id: 'eng-4-1', text: 'CFE (500-Acceptable) response parser', critical: true },
      { id: 'eng-4-2', text: 'F6 lifecycle acknowledgment parser', critical: true },
      { id: 'eng-4-3', text: 'F1 lifecycle (250-Submitted) parser', critical: true },
      { id: 'eng-4-4', text: 'Error response handler', critical: false },
    ]
  },
  {
    id: 'eng-5',
    category: 'Special Implementations',
    items: [
      { id: 'eng-5-1', text: 'Dual-role simulation (issuer + receiver for tests 2.3, 2.4)', critical: true },
      { id: 'eng-5-2', text: 'Evidence capture automation (timestamps, screenshots)', critical: false },
      { id: 'eng-5-3', text: 'Test data pool integration', critical: true },
    ]
  }
];

export const testCases = {
  directory: [
    {
      id: 'dir-1.1a',
      name: 'Test 1.1a: SIREN/SIRET/Routing Code via API',
      mode: 'API',
      objectives: [
        'Test appropriation of SIREN mesh',
        'Test creation of routing code',
        'Test creation of SIRET and routing code lines'
      ],
      dataPool: 'SIREN-4, SIRET-4-2, CR-4-2-2',
      steps: [
        { step: 1, action: 'Create routing code CR-4-2-2', api: 'POST /routing-codes', params: 'code: CR-4-2-2 from data pool' },
        { step: 2, action: 'Close line 9998 on SIREN-4 mesh', api: 'PUT /directory/close', params: 'siren: SIREN-4, line: 9998, closeDate: D+1' },
        { step: 3, action: 'Appropriate SIREN-4 mesh', api: 'POST /directory/appropriate', params: 'siren: SIREN-4, startDate: D+1, endDate: null, employeeNumber: 1' },
        { step: 4, action: 'Appropriate SIRET-4-2 line', api: 'POST /directory/appropriate', params: 'siret: SIRET-4-2, startDate: D+1, endDate: null, employeeNumber: 1' },
        { step: 5, action: 'Appropriate CR-4-2-2 line', api: 'POST /directory/appropriate', params: 'routingCode: CR-4-2-2, startDate: D+1, endDate: null, employeeNumber: 1' },
      ],
      expectedResult: 'Success confirmation for each operation + directory updated',
      executionDay: 'J0 (Day 0)'
    },
    {
      id: 'dir-1.2a',
      name: 'Test 1.2a: SIREN/Suffix via API',
      mode: 'API',
      objectives: [
        'Test appropriation of SIREN mesh',
        'Test creation of suffix mesh lines'
      ],
      dataPool: 'SIREN-2, suffix1, suffix2',
      steps: [
        { step: 1, action: 'Close line 9998 on SIREN-2', api: 'PUT /directory/close', params: 'closeDate: D+1' },
        { step: 2, action: 'Appropriate SIREN-2 mesh', api: 'POST /directory/appropriate', params: 'startDate: D+1, endDate: null, employeeNumber: 1' },
        { step: 3, action: 'Create directory line SIREN-2-suffix1', api: 'POST /directory/line', params: 'startDate: D+1, employeeNumber: 1' },
        { step: 4, action: 'Create directory line SIREN-2-suffix2', api: 'POST /directory/line', params: 'startDate: D+2, employeeNumber: 1' },
      ],
      expectedResult: 'All suffix lines created successfully',
      executionDay: 'J0 (Day 0)'
    },
    {
      id: 'dir-1.3a',
      name: 'Test 1.3a: Mask Directory Line via API',
      mode: 'API',
      objectives: ['Test masking a directory line on the suffix mesh'],
      dataPool: 'SIREN-2-suffix2 (from test 1.2a)',
      prerequisite: 'Test 1.2a must be completed first',
      steps: [
        { step: 1, action: 'Hide SIREN-2-suffix2 line', api: 'PUT /directory/mask', params: 'mask: true' },
      ],
      expectedResult: 'Directory line masked successfully',
      executionDay: 'D (day after 1.2a)'
    },
    {
      id: 'dir-1.1b',
      name: 'Test 1.1b: SIREN/SIRET/Routing Code via EDI',
      mode: 'EDI (SFTP)',
      objectives: [
        'Test appropriation of SIREN mesh via EDI',
        'Test creation of routing code via EDI',
        'Test creation of SIRET and routing code lines via EDI'
      ],
      dataPool: 'SIREN-3, SIRET-3-1, CR-3-1-1',
      steps: [
        { step: 1, action: 'Create routing code CR-3-1-1', edi: 'Upload XML to /inbox', content: 'Directory update XML with routing code creation' },
        { step: 2, action: 'Close line 9998 on SIREN-3', edi: 'Upload XML to /inbox', content: 'XML with closeDate: D+1, registrationNumber: 1' },
        { step: 3, action: 'Appropriate SIREN-3 mesh', edi: 'Upload XML to /inbox', content: 'XML with startDate: D+1, employeeNumber: 1' },
        { step: 4, action: 'Appropriate SIRET-3-1 line', edi: 'Upload XML to /inbox', content: 'XML with startDate: D+1, employeeNumber: 1' },
        { step: 5, action: 'Appropriate CR-3-1-1 line', edi: 'Upload XML to /inbox', content: 'XML with startDate: D+1, employeeNumber: 1' },
      ],
      expectedResult: 'Poll /outbox for success response XML for each operation',
      executionDay: 'J0 (Day 0)'
    },
    {
      id: 'dir-1.2b',
      name: 'Test 1.2b: SIREN/Suffix via EDI',
      mode: 'EDI (SFTP)',
      objectives: [
        'Test appropriation of SIREN mesh via EDI',
        'Test creation of suffix mesh lines via EDI'
      ],
      dataPool: 'SIREN-1, suffix1, suffix2',
      steps: [
        { step: 1, action: 'Close line 9998 on SIREN-1 mesh', edi: 'Upload XML', content: 'closeDate: D+1' },
        { step: 2, action: 'Appropriate SIREN-1 mesh', edi: 'Upload XML', content: 'startDate: D+1, employeeNumber: 1' },
        { step: 3, action: 'Create SIREN-1-suffix1 line', edi: 'Upload XML', content: 'startDate: D+1, employeeNumber: 1' },
        { step: 4, action: 'Create SIREN-1-suffix2 line', edi: 'Upload XML', content: 'startDate: D+2, employeeNumber: 1' },
      ],
      expectedResult: 'All operations confirmed via /outbox response',
      executionDay: 'J0 (Day 0)'
    },
    {
      id: 'dir-1.3b',
      name: 'Test 1.3b: Mask Directory Line via EDI',
      mode: 'EDI (SFTP)',
      objectives: ['Test masking a directory line via EDI'],
      dataPool: 'SIREN-1-suffix2 (from test 1.2b)',
      prerequisite: 'Test 1.2b must be completed first',
      steps: [
        { step: 1, action: 'Upload XML to hide SIREN-1-suffix2 line', edi: 'Upload XML to /inbox', content: 'Mask operation XML' },
      ],
      expectedResult: 'Mask operation confirmed via /outbox',
      executionDay: 'D (day after 1.2b)'
    },
  ],
  eInvoicing: [
    {
      id: 'inv-2.1',
      name: 'Test 2.1: Simple Invoice - Filed + Collected',
      mode: 'EDI only',
      role: 'Issuing platform',
      invoiceFile: 'C1_FACT2025_xxx (you choose the suffix)',
      format: 'CII or UBL',
      objectives: [
        'Test generation of F1 for simple invoice',
        'Test generation of F2 "Filed" lifecycle (200)',
        'Test generation of F2 "Paid" lifecycle (212)',
        'Test receipt of CFEs and F1/F6 lifecycles'
      ],
      steps: [
        {
          step: '1a',
          action: 'Send F2 "Submitted" lifecycle',
          yourAction: 'Platform sends F2 with status 200-Submitted to PPF',
          ppfResponse: 'PPF returns 2x CFE (500-Acceptable)',
          flowDirection: 'Platform -> PPF, PPF -> Platform'
        },
        {
          step: '1b',
          action: 'Send F1 regulatory data',
          yourAction: 'Platform sends F1 (invoice regulatory data) to PPF',
          ppfResponse: 'PPF returns CFE (500-Acceptable) + F1 lifecycle (250-Submitted)',
          flowDirection: 'Platform -> PPF, PPF -> Platform'
        },
        {
          step: '1c',
          action: 'Send F2 "Collected" lifecycle',
          yourAction: 'Platform sends F2 with status 212-Collected to PPF',
          ppfResponse: 'PPF returns CFE (500-Acceptable)',
          flowDirection: 'Platform -> PPF, PPF -> Platform'
        },
      ],
      statusCodes: ['200 (Submitted)', '212 (Collected)', '250 (F1 Submitted)', '500 (Acceptable)'],
      expectedResult: 'All flows complete with CFE confirmations'
    },
    {
      id: 'inv-2.2',
      name: 'Test 2.2: Credit Note - Filed',
      mode: 'EDI only',
      role: 'Issuing platform',
      format: 'CII or UBL',
      important: 'Credit note is INDEPENDENT of scenario 2.1 (not linked)',
      objectives: [
        'Test generation of F1 credit note',
        'Test generation of F2 "Filed" lifecycle',
        'Test receipt of CFEs and F1/F6 lifecycles'
      ],
      steps: [
        {
          step: '2a',
          action: 'Send F2 "Submitted" for credit note',
          yourAction: 'Platform sends F2 with status 200-Submitted to PPF',
          ppfResponse: 'PPF returns CFE (500-Acceptable)',
          flowDirection: 'Platform -> PPF, PPF -> Platform'
        },
        {
          step: '2b',
          action: 'Send F1 regulatory data for credit note',
          yourAction: 'Platform sends F1 (credit note data) to PPF',
          ppfResponse: 'PPF returns CFE (500-Acceptable) + F1 lifecycle (250-Submitted)',
          flowDirection: 'Platform -> PPF, PPF -> Platform'
        },
      ],
      statusCodes: ['200 (Submitted)', '250 (F1 Submitted)', '500 (Acceptable)'],
      expectedResult: 'Credit note F2 and F1 accepted with CFE confirmations'
    },
    {
      id: 'inv-2.3',
      name: 'Test 2.3: Invoice Rejection (Dual Role)',
      mode: 'EDI only',
      role: 'BOTH Issuer AND Receiver',
      format: 'CII or UBL',
      rejectionReason: 'REJ_UNI (Duplicate invoice)',
      critical: 'Your platform must simulate being BOTH the sender and receiver of the same invoice',
      objectives: [
        'Test generation of F1 for simple invoice',
        'Test generation of F2 "Rejected" lifecycle',
        'Test reception of CFEs and F1/F6 lifecycles'
      ],
      steps: [
        {
          step: '3a',
          role: 'Issuer',
          action: 'Send F2 "Submitted"',
          yourAction: 'Platform (as issuer) sends F2 with status 200-Submitted',
          ppfResponse: 'PPF returns CFE (500-Acceptable)',
        },
        {
          step: '3b',
          role: 'Issuer',
          action: 'Send F1 regulatory data',
          yourAction: 'Platform (as issuer) sends F1 to PPF',
          ppfResponse: 'PPF returns CFE (500-Acceptable) + F1 lifecycle (250-Submitted)',
        },
        {
          step: '3c',
          role: 'Receiver',
          action: 'Send F2 "Rejected"',
          yourAction: 'Platform (as receiver) sends F2 with status 213-Rejected, reason: REJ_UNI',
          ppfResponse: 'PPF returns CFE (500-Acceptable)',
        },
      ],
      statusCodes: ['200 (Submitted)', '213 (Rejected)', '250 (F1 Submitted)', '500 (Acceptable)'],
      expectedResult: 'Invoice rejected with REJ_UNI reason code confirmed'
    },
    {
      id: 'inv-2.4',
      name: 'Test 2.4: Invoice Refusal (Dual Role)',
      mode: 'EDI only',
      role: 'BOTH Issuer AND Receiver',
      format: 'CII or UBL',
      critical: 'Your platform must simulate being BOTH the sender and receiver',
      difference: 'Status 210 (Refused) vs 213 (Rejected) - Refused is business-level rejection',
      objectives: [
        'Test generation of F1 for simple invoice',
        'Test generation of F2 "Refused" lifecycle',
        'Test receipt of CFEs and F1/F6 lifecycles'
      ],
      steps: [
        {
          step: '4a',
          role: 'Issuer',
          action: 'Send F2 "Submitted"',
          yourAction: 'Platform (as issuer) sends F2 with status 200-Submitted',
          ppfResponse: 'PPF returns CFE (500-Acceptable)',
        },
        {
          step: '4b',
          role: 'Issuer',
          action: 'Send F1 regulatory data',
          yourAction: 'Platform (as issuer) sends F1 to PPF',
          ppfResponse: 'PPF returns CFE (500-Acceptable) + F1 lifecycle (250-Submitted)',
        },
        {
          step: '4c',
          role: 'Receiver',
          action: 'Send F2 "Refused"',
          yourAction: 'Platform (as receiver) sends F2 with status 210-Refused',
          ppfResponse: 'PPF returns CFE (500-Acceptable)',
        },
      ],
      statusCodes: ['200 (Submitted)', '210 (Refused)', '250 (F1 Submitted)', '500 (Acceptable)'],
      expectedResult: 'Invoice refused (business rejection) confirmed'
    },
  ],
  eReporting: [
    {
      id: 'rep-3.1',
      name: 'Test 3.1: Initial B2Bi/B2C Sales',
      mode: 'EDI only',
      subFlows: ['F10.1 (B2Bi sales)', 'F10.3 (B2C transactions)'],
      objectives: [
        'Verify platform can structure technically valid F10',
        'Test transmission of aggregated B2Bi and B2C sales data'
      ],
      inputData: {
        'F10.1 (B2Bi sales)': 'FACT_REPORT2025_S1F1.xml + FACT_REPORT2025_S1F2.xml',
        'F10.3 (B2C transactions)': 'Manually create per parameters below'
      },
      transactionParams: [
        { date: '2025-09-22', type: 'Goods', vatRate: 'Standard', count: 100, amount: '10,000 EUR (excl. VAT)' },
        { date: '2025-09-16', type: 'Services', vatRate: 'Standard', count: 100, amount: '10,000 EUR (excl. VAT)' },
      ],
      important: 'Use issuer ID and partner application code from [Platform]_Expected values xxx.xlsx',
      steps: [
        {
          step: '1a',
          action: 'Compile and send initial F10 to PPF',
          yourAction: 'Platform sends F10 (combining 10.1 + 10.3 data)',
          ppfResponse: 'PPF sends F6 lifecycle with "Submitted" status',
        },
      ],
      expectedResult: 'F6 lifecycle confirmation received, data transmitted to Concentrator'
    },
    {
      id: 'rep-3.2',
      name: 'Test 3.2: Initial B2Bi/B2C Receipts',
      mode: 'EDI only',
      subFlows: ['F10.2 (B2Bi receipts)', 'F10.4 (B2C payments)'],
      objectives: [
        'Verify platform can structure technically valid F10 for receipts',
        'Test transmission of aggregated B2Bi and B2C receipt data'
      ],
      inputData: {
        'F10.2 (B2Bi receipts)': 'FACT_REPORT2025_S2F3.xml + FACT_REPORT2025_S2F4.xml',
        'F10.4 (B2C payments)': 'Manually create per parameters below'
      },
      transactionParams: [
        { date: '2025-09-22', type: 'Services', vatRate: 'Standard', count: 100, amount: '20,000 EUR (incl. VAT)' },
        { date: '2025-09-16', type: 'Services', vatRate: 'Standard', count: 100, amount: '20,000 EUR (incl. VAT)' },
      ],
      steps: [
        {
          step: '2a',
          action: 'Compile and send initial F10 to PPF',
          yourAction: 'Platform sends F10 (combining 10.2 + 10.4 data)',
          ppfResponse: 'PPF sends F6 lifecycle with "Submitted" status',
        },
      ],
      expectedResult: 'F6 lifecycle confirmation received'
    },
    {
      id: 'rep-3.3',
      name: 'Test 3.3: Corrective B2Bi/B2C Receipts',
      mode: 'EDI only',
      subFlows: ['F10.2 (corrective)', 'F10.4 (corrective)'],
      purpose: 'Test correction/replacement of previous e-reporting',
      keyDifference: 'Different amounts to indicate correction (30K vs 20K from test 3.2)',
      objectives: [
        'Verify platform can structure corrective F10',
        'Test correction/replacement flow'
      ],
      inputData: {
        'F10.2 (corrective)': 'FACT_REPORT2025_S2F3.xml + FACT_REPORT2025_S2F4.xml',
        'F10.4 (corrective)': 'Manually create with UPDATED amounts'
      },
      transactionParams: [
        { date: '2025-09-22', type: 'Services', vatRate: 'Standard', count: 100, amount: '30,000 EUR (incl. VAT)' },
        { date: '2025-09-16', type: 'Services', vatRate: 'Standard', count: 100, amount: '30,000 EUR (incl. VAT)' },
      ],
      steps: [
        {
          step: '3a',
          action: 'Compile and send corrective F10 to PPF',
          yourAction: 'Platform sends corrective F10 (with updated amounts)',
          ppfResponse: 'PPF sends F6 lifecycle with "Submitted" status',
        },
      ],
      expectedResult: 'Corrective F10 accepted, replaces previous submission'
    },
  ]
};

export const codeSnippets = {
  pkcs7Conversion: `# Convert certificates to PKCS7 format
openssl crl2pkcs7 -nocrl \\
  -certfile your_certificate.crt \\
  -certfile intermediate_ca.crt \\
  -certfile root_ca.crt \\
  -out certificate_chain.p7b

# Verify the PKCS7 file
openssl pkcs7 -in certificate_chain.p7b -print_certs -noout`,

  sftpCommands: `# Connect to PPF qualification environment
sftp -i /path/to/key username@ppf-qualification-endpoint

# Upload invoice/request
put invoice.xml /inbox/

# Check for responses
ls /outbox/

# Download response
get /outbox/response.xml ./`,

  f2LifecycleExample: `<?xml version="1.0" encoding="UTF-8"?>
<LifecycleStatus xmlns="urn:france:ppf:lifecycle:v1">
  <InvoiceReference>
    <ID>INV-2025-001234</ID>
    <IssueDate>2025-09-22</IssueDate>
  </InvoiceReference>
  <Status>
    <Code>200</Code>
    <Description>Submitted</Description>
  </Status>
  <Timestamp>2025-09-22T10:30:00+02:00</Timestamp>
  <Amount currencyID="EUR">10000.00</Amount>
</LifecycleStatus>`,

  f10EReportingExample: `<?xml version="1.0" encoding="UTF-8"?>
<EReporting xmlns="urn:france:ppf:ereporting:v1">
  <Header>
    <IssuerID>[From Expected Values Excel]</IssuerID>
    <PartnerApplicationCode>[From Expected Values Excel]</PartnerApplicationCode>
    <ReportingPeriod>
      <StartDate>2025-09-01</StartDate>
      <EndDate>2025-09-30</EndDate>
    </ReportingPeriod>
  </Header>
  <SubFlow type="10.3">
    <TransactionDate>2025-09-22</TransactionDate>
    <TransactionType>Goods</TransactionType>
    <VATRate>Standard</VATRate>
    <TransactionCount>100</TransactionCount>
    <TotalAmountExclVAT currencyID="EUR">10000.00</TotalAmountExclVAT>
  </SubFlow>
</EReporting>`,
};

export const lifecycleStatusCodes = [
  { code: '200', name: 'Deposited/Submitted', direction: 'PDP -> PPF', description: 'Invoice submitted by issuer' },
  { code: '210', name: 'Refused', direction: 'PDP -> PPF', description: 'Receiver business-rejects invoice (e.g., wrong price)' },
  { code: '212', name: 'Collected/Paid', direction: 'PDP -> PPF', description: 'Payment received confirmation' },
  { code: '213', name: 'Rejected', direction: 'PDP -> PPF', description: 'Platform rejects (e.g., duplicate - REJ_UNI)' },
  { code: '250', name: 'Submitted (F1)', direction: 'PPF -> PDP', description: 'F1 regulatory data acknowledged' },
  { code: '500', name: 'Acceptable (CFE)', direction: 'PPF -> PDP', description: 'Confirmation of valid submission' },
];

export const timeline = {
  deadline: 'January 14, 2026',
  phases: [
    { week: 1, title: 'Certificate & Preparation', tasks: ['Order certificate', 'Gather documents', 'Download Resana docs', 'Study test scenarios'] },
    { week: 2, title: 'Connection Setup', tasks: ['Receive certificate', 'Convert to PKCS7', 'Submit raccordement', 'Wait for AIFE approval', 'Test connectivity'] },
    { week: 3, title: 'Directory & E-Invoicing Tests', tasks: ['Generate data pool', 'Execute 6 Directory tests', 'Execute 4 E-Invoicing tests', 'Capture evidence'] },
    { week: 4, title: 'E-Reporting & Remediation', tasks: ['Execute 3 E-Reporting tests', 'Review all results', 'Remediate failures', 'Re-test as needed'] },
    { week: 5, title: 'Compile & Submit', tasks: ['Organize evidence package', 'Create test results matrix', 'Write executive summary', 'Submit compte rendu'] },
  ]
};

export const mvs = {
  title: 'Minimum Viable Scope for Compliance',
  required: [
    'EDI (SFTP) connection - required for ALL tests',
    'Directory API client - for 3 API tests',
    'UBL OR CII format support - at least one',
    'F1 regulatory data generator',
    'F2 lifecycle generator (statuses 200, 210, 212, 213)',
    'F10 e-reporting generator',
    'CFE/F6 response parser',
    'Dual-role simulation (issuer + receiver)',
  ],
  canSkip: [
    'Factur-X support (not required for these tests)',
    'AS2 protocol (SFTP is sufficient)',
    'Full production error handling',
    'Advanced UI/dashboard features',
  ],
  speedOptimizations: [
    { bottleneck: 'Certificate acquisition', solution: 'Order Day 1, request expedited processing (extra 50-100 EUR)' },
    { bottleneck: 'AIFE raccordement delay', solution: 'Submit complete form immediately after cert; follow up Day 7' },
    { bottleneck: 'Format support', solution: 'Pick ONE format (CII recommended - simpler XML than UBL)' },
    { bottleneck: 'Dual-role testing', solution: 'Mock the receiver role internally rather than full implementation' },
    { bottleneck: 'E-reporting XML', solution: 'Use provided XML files directly, only modify issuer ID and app code' },
    { bottleneck: 'Evidence capture', solution: 'Automate logging with timestamps during test execution' },
  ]
};
