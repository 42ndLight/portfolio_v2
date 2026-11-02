import { ProjectArtifact, DiagnosticMetric, GlobalNodeLatency, BlogPost, EngineerProfile } from '../types';

export const DIAGNOSTIC_METRICS: DiagnosticMetric[] = [
  {
    id: 'uptime',
    label: 'UPTIME SLA',
    numberTag: '#01',
    value: '99.98%',
    description: 'High-concurrency cloud deployments, failover topologies, and proactive health checks.',
    color: 'green',
    trend: '+0.04% vs 2024 target'
  },
  {
    id: 'offline-sync',
    label: 'OFFLINE SYNC DELAY',
    numberTag: '#02',
    value: '0ms',
    description: 'Zero-delay client operational states via Dexie.js, IndexedDB, and asynchronous conflict queues.',
    color: 'cyan',
    trend: 'P99 instant local writes'
  },
  {
    id: 'fiscal-compliance',
    label: 'FISCAL COMPLIANCE',
    numberTag: '#03',
    value: '100%',
    description: 'Automated eTIMS & KRA fiscalization pipelines with cryptographic receipt validation.',
    color: 'green',
    trend: 'Over 450,000 certified invoices'
  },
  {
    id: 'payment-throughput',
    label: 'PAYMENT THROUGHPUT',
    numberTag: '#04',
    value: '10M+',
    description: 'Processed through robust M-Pesa Daraja & mobile money webhook reconciliation engines.',
    color: 'cyan',
    trend: '99.991% auto-reconciliation rate'
  }
];

export const PROJECTS: ProjectArtifact[] = [
  {
    id: 'homepoint-pos',
    artifactNumber: 'ARTIFACT.01',
    category: 'ENTERPRISE POS',
    badge: 'LIVE IN MULTI-OUTLET RETAIL',
    badgeType: 'green',
    title: 'Homepoint POS — Hardware Retail Engine',
    subtitle: 'High-Volume Offline-First Point of Sale & Fiscal Hardware Pipeline',
    description:
      'Engineered for high-volume retail environments with intermittent internet connectivity. Features full offline resilience via Dexie.js/IndexedDB, automated background two-way synchronization, direct USB/Bluetooth thermal printer drivers, barcode scanner interfacing, and certified KRA eTIMS fiscalization API integration.',
    systemSchemaFlow:
      '[UI / Vue 3 Client] ⇄ [Dexie.js / IndexedDB] ──(Network Active?)──► [Django REST API + Worker] ──► [Postgres + eTIMS KRA]',
    schemaStatus:
      'Status: Zero downtime recorded during network dropouts; auto-requeued 14,000+ cached items.',
    techTags: ['Django', 'Vue 3', 'Dexie.js', 'SQLite', 'eTIMS API', 'Thermal Print', 'Docker', 'IndexedDB'],
    latencyStat: 'LATENCY: 0.04s',
    throughputStat: '14,000+ CACHED QUEUES',
    architectureDetails: {
      clientLayer: 'Vue 3 Single-Page PWA with Tailwind CSS, Web Workers for barcode parsing, and WebUSB/Bluetooth API integration.',
      offlineStorage: 'Dexie.js abstraction over IndexedDB holding product catalogs (50k+ SKUs), local transaction logs, and pending sync journals.',
      apiGateway: 'Django REST Framework with Nginx SSL reverse-proxy, tokenized session tokens, and strict rate-limiting per POS terminal.',
      cloudDatabase: 'PostgreSQL 16 clustered on AWS RDS with WAL-e replication and Redis 7 cache for instantaneous stock lookups.',
      specializedServices: 'KRA eTIMS VSCU cryptographic signing daemon with retry-backoff queue and automated SMS dispatch.'
    },
    engineeringChallenges: [
      {
        title: 'Zero-Downtime Offline Transaction Execution',
        metric: '0ms Latency',
        description: 'Store cashiers process card and cash checkouts without freezing even during 12-hour fiber cutoffs. Transactions write to an append-only IndexedDB store with signed sequence IDs.'
      },
      {
        title: 'Automatic Dual-Phase Conflict Reconciliation',
        metric: '14,200+ auto-requeued items',
        description: 'When connectivity restores, a background worker batches transactions into chunks of 50 with vector timestamping to prevent inventory double-decrement anomalies.'
      },
      {
        title: 'Hardware Driver Integration in Browser Sandbox',
        metric: '120ms ESC/POS Print Speed',
        description: 'Engineered custom ESC/POS binary generators utilizing Web Serial and WebUSB standards, bypassing native print spooler dialog delays.'
      },
      {
        title: 'Cryptographic KRA eTIMS Tax Fiscalization',
        metric: '100% Legal Compliance',
        description: 'Built an asynchronous signing pipeline that generates valid QR codes and cryptographic hash signatures according to Kenya Revenue Authority specifications.'
      }
    ],
    flowNodes: [
      {
        id: 'node-client',
        name: 'Vue 3 PWA Client',
        role: 'Cashier Terminal Interface',
        tech: 'Vue 3 + Web Workers',
        state: 'active',
        notes: 'Processes barcode input, calculates discounts, and dispatches to local cache'
      },
      {
        id: 'node-dexie',
        name: 'Dexie.js / IndexedDB',
        role: 'Local Persistence Engine',
        tech: 'Browser IndexedDB',
        state: 'active',
        notes: 'Guarantees sub-millisecond local reads/writes regardless of WiFi state'
      },
      {
        id: 'node-sync',
        name: 'Sync Dispatcher',
        role: 'Resilient Queue Worker',
        tech: 'Web Background Sync',
        state: 'syncing',
        notes: 'Detects network revival, batches pending checkout records with retry-backoff'
      },
      {
        id: 'node-api',
        name: 'Django REST Backend',
        role: 'Central Processing Unit',
        tech: 'Python 3.12 / DRF',
        state: 'active',
        notes: 'Validates inventory constraints and idempotency keys before commit'
      },
      {
        id: 'node-cloud',
        name: 'PostgreSQL & eTIMS Engine',
        role: 'Master Ledger & Tax Authority',
        tech: 'Postgres 16 + KRA VSCU',
        state: 'active',
        notes: 'Generates fiscal QR-code payload and updates global inventory master'
      }
    ],
    codeSnippet: `// Dexie.js Offline Checkout Transaction Queue
import Dexie, { Table } from 'dexie';

interface CachedSale {
  id?: number;
  saleUuid: string;
  items: Array<{ sku: string; qty: number; price: number }>;
  totalAmount: number;
  etimsSigned: boolean;
  syncStatus: 'PENDING' | 'SYNCED' | 'FAILED';
  createdAt: number;
}

export class PosDatabase extends Dexie {
  sales!: Table<CachedSale>;

  constructor() {
    super('HomepointPosDb');
    this.version(1).stores({
      sales: '++id, saleUuid, syncStatus, createdAt'
    });
  }
}

export const posDb = new PosDatabase();`
  },
  {
    id: 'kaziline',
    artifactNumber: 'ARTIFACT.02',
    category: 'TELECOM',
    badge: 'USSD-READY',
    badgeType: 'cyan',
    title: 'KaziLine Workforce Manager',
    subtitle: 'Low-Bandwidth Cellular Dispatch & USSD Labor Automation',
    description:
      'USSD-driven safety, attendance, and dispatch platform engineered specifically for field laborers across East Africa without smartphone or cellular data dependency. Integrates with Africa’s Talking gateways to provide sub-second session interaction loops.',
    systemSchemaFlow:
      '[Field Worker USSD Dial: *384*55#] ──► [Africa\'s Talking Gateway] ──► [Django Session FSM] ──► [Redis Session Store + Celery Queue] ──► [SMS Receipt]',
    schemaStatus: 'Engineered for zero-data environments; over 4,200,000 sessions processed with < 200ms turnaround.',
    techTags: ['USSD Gateway', "Africa's Talking", 'Django', 'Redis', 'Celery', 'SMS API', 'Twilio'],
    latencyStat: 'LATENCY: 0.12s',
    throughputStat: '4.2M SESSIONS',
    architectureDetails: {
      clientLayer: 'Feature phone cellular interface via GSM USSD signaling channel (*384*55#).',
      offlineStorage: 'Redis fast in-memory finite state machine (FSM) cache tracking active USSD menus per MSISDN phone number.',
      apiGateway: 'Fast webhook receiver handling burst inbound traffic from telecom network operators (Safaricom, Airtel, MTN).',
      cloudDatabase: 'TimescaleDB / PostgreSQL database storing clock-in geo-approximations, supervisor authorizations, and wage ledgers.',
      specializedServices: 'Africa’s Talking Voice and SMS broadcast daemons alerting supervisors to field emergency check-ins.'
    },
    engineeringChallenges: [
      {
        title: 'Telecom Session Timeout Constraints (Strict 20s Window)',
        metric: '< 180ms Handler Latency',
        description: 'Telco USSD sessions terminate if response payload is not returned within 20 seconds. Built a lightweight finite-state-machine executing all business logic in in-memory Redis buffers.'
      },
      {
        title: 'Zero Data Requirement for Construction and Agricultural Crews',
        metric: '100% Feature-Phone Accessible',
        description: 'Allowed workers in rural areas without mobile data to clock in, record completed task units, and request medical leaves via 2G networks.'
      },
      {
        title: 'Simultaneous Multi-Operator Telco Gateways',
        metric: '99.99% Routing Reliability',
        description: 'Implemented intelligent carrier fallback logic routing traffic across Safaricom and Airtel depending on real-time operator network latency.'
      }
    ],
    flowNodes: [
      {
        id: 'node-ussd',
        name: 'Feature Phone GSM',
        role: 'Field Worker Input',
        tech: 'USSD Protocol',
        state: 'active',
        notes: 'Dialing shortcode *384*55# on any mobile handset'
      },
      {
        id: 'node-telco',
        name: "Africa's Talking Gateway",
        role: 'Telco Session Broker',
        tech: 'HTTP Webhook Relay',
        state: 'active',
        notes: 'Translates SS7 signaling packets to HTTPS JSON webhooks'
      },
      {
        id: 'node-fsm',
        name: 'Django State Machine',
        role: 'Session Flow Controller',
        tech: 'Django + Redis FSM',
        state: 'active',
        notes: 'Keeps track of current menu level (e.g. Menu 1: Clock In, Menu 2: Wage Query)'
      },
      {
        id: 'node-celery',
        name: 'Celery Task Worker',
        role: 'Async Dispatch Engine',
        tech: 'Celery + Redis Broker',
        state: 'active',
        notes: 'Fires asynchronous SMS notifications and updates attendance registers'
      }
    ],
    codeSnippet: `// USSD Finite State Handler
def handle_ussd_callback(request):
    session_id = request.POST.get('sessionId')
    phone_number = request.POST.get('phoneNumber')
    text = request.POST.get('text', '')
    
    # Retrieve current worker state from Redis cache
    state = redis_client.get(f"ussd:{session_id}")
    if not text:
        response_text = "CON Welcome to KaziLine\\n1. Clock In\\n2. Report Safety Issue\\n3. Check Balance"
        return HttpResponse(response_text, content_type="text/plain")`
  },
  {
    id: 'invoice-engine',
    artifactNumber: 'ARTIFACT.03',
    category: 'FINTECH SAAS',
    badge: 'MULTI-TENANT',
    badgeType: 'green',
    title: 'Automated Invoice & Quotation Engine',
    subtitle: 'Asynchronous Vector PDF Generation & Multi-Currency Treasury Pipeline',
    description:
      'High-performance asynchronous quotation compiler and invoice reconciliation system with localized PDF vector rendering, automated tax splits, and multi-currency exchange feeds.',
    systemSchemaFlow:
      '[Draft Invoice Event] ──► [FastAPI Broker] ──► [Headless PDF Worker Cluster] ──► [S3 Encrypted Storage + Webhook Dispatch]',
    schemaStatus: 'P99 generation latency < 28ms; scalable to 100,000+ invoices/hour with zero memory leaks.',
    techTags: ['FastAPI', 'Vue 3', 'PostgreSQL', 'Docker', 'Rust PDF', 'Redis', 'AWS S3'],
    latencyStat: 'P99 < 28ms',
    throughputStat: '100K+ INVOICES/HR',
    architectureDetails: {
      clientLayer: 'Reactive invoice builder with live dynamic calculations, multi-currency conversion, and inline client signature capture.',
      offlineStorage: 'Local draft persistence in browser localStorage with cryptographic SHA256 integrity checks.',
      apiGateway: 'FastAPI async HTTP engine with JWT authentication, tenant-scoped schema isolation, and rate limiting.',
      cloudDatabase: 'PostgreSQL with multi-tenant row-level security (RLS) and auto-indexing on invoice dates and tenant IDs.',
      specializedServices: 'Custom Rust-backed PDF compiling cluster delivering vectorized PDFs in under 28 milliseconds.'
    },
    engineeringChallenges: [
      {
        title: 'Sub-30ms Vectorized PDF Generation',
        metric: 'P99 < 28ms',
        description: 'Replaced slow headless Chromium instances with an ultra-lean native vector renderer, slashing CPU utilization by 78%.'
      },
      {
        title: 'Multi-Currency Live FX Settlement',
        metric: 'Real-time Central Bank Feeds',
        description: 'Live rates fetched and cached from central bank APIs, computing localized VAT and withholding tax breakdowns on the fly.'
      },
      {
        title: 'Multi-Tenant Security with Row-Level Isolation',
        metric: 'Zero Tenant Leakage',
        description: 'Enforced PostgreSQL Row Level Security (RLS) policies guaranteeing cryptographic multi-tenant separation.'
      }
    ],
    flowNodes: [
      {
        id: 'node-input',
        name: 'Invoice Generator UI',
        role: 'Tenant Dashboard',
        tech: 'Vue 3 / TypeScript',
        state: 'active',
        notes: 'Interactive table with tax computations and real-time live preview'
      },
      {
        id: 'node-fastapi',
        name: 'FastAPI Async Gateway',
        role: 'REST Controller',
        tech: 'FastAPI / Python 3.12',
        state: 'active',
        notes: 'Validates line items and pushes compile tasks into Redis streams'
      },
      {
        id: 'node-pdf',
        name: 'Rust Rendering Engine',
        role: 'Vector PDF Compiler',
        tech: 'Rust Native Binary',
        state: 'active',
        notes: 'Compiles print-ready vectorized PDF documents in under 28ms'
      },
      {
        id: 'node-storage',
        name: 'Encrypted S3 & Dispatch',
        role: 'Cold Storage & Delivery',
        tech: 'AWS S3 + SendGrid API',
        state: 'active',
        notes: 'Presigned encrypted download links dispatched via email and WhatsApp'
      }
    ]
  }
];

export const CONSULTING_CAPABILITIES = [
  {
    protocol: 'PROTOCOL // 01',
    title: 'Cloud & System Architecture',
    iconName: 'Server',
    description:
      'Designing zero-downtime, horizontal infrastructure setups from scratch or modernizing legacy monoliths into lightning-fast containerized stacks.',
    color: 'green',
    items: [
      'Docker, Compose & Multi-Stage Production Builds',
      'Nginx Reverse Proxy, SSL Hardening & Caching',
      'AWS / Railway / Linode Cloud Pipelines & VPCs',
      'Automated GitHub Actions CI/CD with Test Suites'
    ]
  },
  {
    protocol: 'PROTOCOL // 02',
    title: 'Offline-First & PWA Systems',
    iconName: 'WifiOff',
    description:
      'Engineering web applications that continue executing with zero internet access, seamlessly reconciling asynchronous state upon reconnect.',
    color: 'cyan',
    items: [
      'Dexie.js & IndexedDB Relational Stores',
      'Distributed Conflict Resolution & Vector Clocks',
      'Service Worker Background Sync Strategies',
      'Low-Bandwidth Network Optimization'
    ]
  },
  {
    protocol: 'PROTOCOL // 03',
    title: 'Fintech & Local API Integrations',
    iconName: 'CreditCard',
    description:
      'Battle-tested integration with African and international payments infrastructure, fiscal tax authorities, and cellular telecommunication backends.',
    color: 'green',
    items: [
      'Safaricom M-Pesa Daraja (B2C, C2B, STK Push)',
      'KRA eTIMS Fiscal Compliance API & Signing',
      "Africa's Talking USSD & SMS Relays",
      'Idempotency Keys & Webhook Auto-Recovery'
    ]
  }
];

export const GLOBAL_NODES: GlobalNodeLatency[] = [
  {
    region: 'AFRICA EAST',
    code: 'AF-EAST-1',
    city: 'Nairobi, Kenya',
    latencyMs: 14,
    status: 'OPTIMAL'
  },
  {
    region: 'EUROPE CENTRAL',
    code: 'EU-CENTRAL-1',
    city: 'Frankfurt, Germany',
    latencyMs: 84,
    status: 'OPTIMAL'
  },
  {
    region: 'US EAST',
    code: 'US-EAST-1',
    city: 'Virginia, United States',
    latencyMs: 119,
    status: 'OPTIMAL'
  },
  {
    region: 'ASIA PACIFIC',
    code: 'AP-SOUTHEAST-1',
    city: 'Singapore',
    latencyMs: 145,
    status: 'OPTIMAL'
  }
];

export const BLOG_SITE_CONFIG = {
  url: 'https://blog.42ndlight.africa',
  title: '42ndLight Dispatches // Engineering Chronicles',
  description: 'Deep dives on offline-first state machines, high-throughput telecom gateways, and resilient full-stack systems engineered for the African digital frontier.'
};

export const LATEST_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-01',
    slug: 'zero-downtime-offline-first-pwas-dexie-indexeddb',
    title: 'Zero-Downtime Offline-First PWAs: Conquering Distributed Conflicts with Dexie.js & IndexedDB',
    subtitle: 'How we engineered uninterrupted retail POS checkouts during 8-hour fiber drops in Nairobi, keeping 50k+ SKUs in local browser memory.',
    summary: 'When building retail systems for developing markets, internet disconnectivity is not an exception—it is an expected operating condition. This dispatch explores how we architected a conflict-resilient offline store with IndexedDB, Web Workers, and signed journal replay.',
    category: 'DISTRIBUTED SYSTEMS // OFFLINE ARCHITECTURE',
    publishDate: 'MARCH 12, 2025',
    readTime: '7 MIN READ',
    author: 'Kennedy Kinyua',
    viewsCount: '3.4K READS',
    externalUrl: 'https://blog.42ndlight.africa/posts/zero-downtime-offline-first-pwas-dexie',
    tags: ['Dexie.js', 'IndexedDB', 'PWA', 'Offline-First', 'Vector Clocks', 'Distributed Systems'],
    keyTakeaways: [
      'Treat local IndexedDB as the primary transactional source of truth; the cloud database is an asynchronous reconciliation sink.',
      'Append-only mutation logs with client-generated UUIDv7 allow deterministic ordered replay upon WAN reconnection.',
      'Worker-thread barcode decoding and ESC/POS thermal printing completely bypass browser UI thread freezes.',
      'Vector timestamps prevent inventory double-decrement race conditions across multi-terminal checkout registers.'
    ],
    codeBlock: {
      language: 'typescript',
      filename: 'offlineDatabase.ts (Dexie.js Sync Engine)',
      code: `import Dexie, { Table } from 'dexie';

export interface PendingTransaction {
  id: string; // UUIDv7 deterministic timestamp
  terminalId: string;
  timestamp: number;
  items: Array<{ sku: string; qty: number; price: number }>;
  totalAmount: number;
  syncState: 'PENDING' | 'RECONCILING' | 'SYNCED';
  signature: string; // HMAC client receipt hash
}

export class LocalCommerceStore extends Dexie {
  transactions!: Table<PendingTransaction, string>;
  productCatalog!: Table<{ sku: string; name: string; price: number; stock: number }, string>;

  constructor() {
    super('HomepointCommerce_OfflineDB');
    this.version(1).stores({
      transactions: 'id, terminalId, syncState, timestamp',
      productCatalog: 'sku, name'
    });
  }

  // Atomic local transaction write with zero WAN dependency
  async recordOfflineSale(saleData: Omit<PendingTransaction, 'id' | 'syncState'>): Promise<string> {
    return await this.transaction('rw', this.transactions, this.productCatalog, async () => {
      const txId = generateUUIDv7();
      await this.transactions.add({
        ...saleData,
        id: txId,
        syncState: 'PENDING'
      });
      return txId;
    });
  }
}`
    },
    content: [
      'In traditional web applications, network drops freeze the user interface or display an unhelpful connection error. In a retail supermarket processing over 800 customers an hour, a 2-second freeze forms long queues; an hour-long internet dropout can cause catastrophic business halts.',
      'To build Homepoint POS, we rejected the cloud-first paradigm entirely. We adopted a local-first philosophy: every search, barcode scan, cart aggregation, receipt printing, and payment record takes place strictly inside the browser\'s client memory and IndexedDB layer via Dexie.js.',
      'The biggest hurdle with offline transactions is data reconciliation. What happens if Cashier A and Cashier B both sell the last remaining unit of an item while disconnected? We solved this by using an append-only mutation journal coupled with vector timestamps and compensating ledger entries on the Django backend.',
      'When the network restores, an asynchronous Web Worker streams transactions in deterministic batches of 50. The server processes them idempotently, generating certified KRA eTIMS fiscal signatures and broadcasting stock adjustments via Redis Pub/Sub.'
    ]
  },
  {
    id: 'post-02',
    slug: 'sub-second-ussd-gateways-django-africas-talking',
    title: 'Sub-Second USSD Gateways: Orchestrating High-Concurrency Telecom Relays with Django & Africa’s Talking',
    subtitle: 'Handling 20-second SS7 session timeouts, idempotent state machines in Redis, and telco webhook resilience across East Africa.',
    summary: 'USSD remains the bedrock of inclusive mobile commerce in Africa. But with telco protocol timeouts capped at 20 seconds, your backend cannot afford cold starts or unoptimized database queries. Here is how we engineered sub-200ms round-trips.',
    category: 'TELECOM INFRASTRUCTURE // BACKEND SCALING',
    publishDate: 'FEBRUARY 24, 2025',
    readTime: '9 MIN READ',
    author: 'Kennedy Kinyua',
    viewsCount: '4.8K READS',
    externalUrl: 'https://blog.42ndlight.africa/posts/sub-second-ussd-gateways-django',
    tags: ['Django', 'USSD', "Africa's Talking", 'Redis Streams', 'Fintech', 'Idempotency'],
    keyTakeaways: [
      'Telco SS7 network channels will forcibly sever sessions if a response exceeds 20 seconds; target <250ms backend latency.',
      'Never touch disk or cold relational queries during active USSD menu navigation; persist session menus entirely in Redis with TTLs.',
      'Use state machine enums with strict step validations to prevent user navigation deadlocks.',
      'All monetary actions (e.g. mobile money disbursements) must enforce idempotency keys tied to the telecom session ID.'
    ],
    codeBlock: {
      language: 'python',
      filename: 'ussd_gateway/router.py (Django + Redis State Machine)',
      code: `import redis
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

r = redis.Redis(host='redis-cluster.internal', port=6379, db=0)

@csrf_exempt
def ussd_callback(request):
    session_id = request.POST.get("sessionId")
    service_code = request.POST.get("serviceCode")
    phone_number = request.POST.get("phoneNumber")
    text = request.POST.get("text", "").strip()

    # Step 1: Rapid in-memory session fetch (P99: 1.2ms)
    session_key = f"ussd:{session_id}"
    current_state = r.get(session_key)

    if not current_state:
        # Initial greeting dial
        r.setex(session_key, 120, "MENU_MAIN")
        response_text = "CON Welcome to KaziLine\\n1. Register Shift\\n2. Check Balance\\n3. Request Float"
        return HttpResponse(response_text, content_type="text/plain")

    # Step 2: Deterministic state transition via dispatch table
    next_response = dispatch_ussd_state(current_state.decode(), text, phone_number, session_id)
    return HttpResponse(next_response, content_type="text/plain")`
    },
    content: [
      'While Silicon Valley debates the next AI paradigm, millions of daily workers across Nairobi, Kampala, and Dar es Salaam check daily job placements, disburse earnings, and manage micro-insurance via basic 2G feature phones using USSD.',
      'USSD operates over the cellular signaling channel (SS7). Unlike HTTP where a client can wait 60 seconds for a response, telecom operators enforce an unforgiving 20-second session watchdog timer. If your backend lags, the session drops instantly and the user is left on a blank dial screen.',
      'To build the KaziLine workforce engine, we decoupled transaction persistence from session routing. Active menus reside exclusively in Redis with a 180-second TTL. The Django worker responds in under 180ms, while heavy calculations (like M-Pesa B2C payouts) are published to a distributed Celery queue.',
      'This architecture effortlessly scaled to over 500,000 monthly dialers without dropping a single session during peak morning shift registration hours.'
    ]
  }
];

export const ENGINEER_PROFILE: EngineerProfile = {
  name: 'Kennedy Kinyua',
  handle: '42ndLight',
  title: 'Tech Lead & Distributed Systems Architect',
  location: 'Nairobi, Kenya [EAT / UTC+3]',
  status: 'AVAILABLE FOR ADVISORY & RETROFIT RETAINERS',
  experienceYears: '7+ YEARS OF HIGH-IMPACT PRODUCTION DEPLOYMENT',
  bio: 'Senior software architect and tech lead specializing in mission-critical distributed systems, resilient offline-first PWAs, and high-concurrency fintech pipelines engineered for the African digital economy and global scale. Track record designing zero-downtime platforms for high-volume retail, USSD workforce dispatch, and automated fiscal compliance.',
  philosophy: [
    {
      rule: 'RULE 01 // OFFLINE BY DESIGN',
      principle: 'Assume zero connectivity as the baseline. Network availability is a luxury, not a guarantee. Local storage must always be an autonomous, transactional source of truth.'
    },
    {
      rule: 'RULE 02 // IDEMPOTENCY IN ALL VECTORS',
      principle: 'Network dropouts cause repeated webhook delivery and client retries. Every API endpoint handling cash, stock, or status must be strictly idempotent.'
    },
    {
      rule: 'RULE 03 // SIMPLICITY OVER FADS',
      principle: 'Production infrastructure must be resilient, observable, and debuggable at 3:00 AM. Boring, battle-tested technologies outlive hype cycles.'
    }
  ],
  milestones: [
    {
      year: '2024 - 2025',
      role: 'Founding Architect & Tech Lead',
      company: '42ndLight // Homepoint POS',
      impact: 'Architected offline-first retail engine processing 14,000+ cached items, automated eTIMS fiscal signing, and thermal hardware integration across multiple retail branches.'
    },
    {
      year: '2023 - 2024',
      role: 'Principal Backend Engineer',
      company: 'KaziLine Workforce Platform',
      impact: 'Engineered sub-second USSD telecom routing and M-Pesa automated wage disbursement pipeline serving 500k+ monthly feature phone users.'
    },
    {
      year: '2021 - 2023',
      role: 'Senior Systems Consultant',
      company: 'Fintech & Logistics Scaleups (East Africa)',
      impact: 'Hardened high-volume Docker microservices, reduced database P99 latency by 74%, and integrated multi-bank clearing rails.'
    }
  ],
  stackBreakdown: [
    {
      area: 'CORE BACKEND & DISTRIBUTED',
      technologies: ['Django / DRF', 'Python 3.12', 'FastAPI', 'PostgreSQL', 'Redis & Streams', 'Celery']
    },
    {
      area: 'OFFLINE & CLIENT RUNTIME',
      technologies: ['Dexie.js / IndexedDB', 'Vue 3 & React', 'TypeScript', 'Web Workers', 'WebUSB / ESC-POS']
    },
    {
      area: 'DEVOPS, CLOUD & NETWORKING',
      technologies: ['Docker & Compose', 'Nginx Reverse Proxy', 'Linux / Debian', 'CI/CD Pipelines', 'AWS / Linode']
    },
    {
      area: 'REGIONAL & FINTECH APIS',
      technologies: ['M-Pesa Daraja API', 'KRA eTIMS VSCU', "Africa's Talking USSD/SMS", 'Stripe / Bank Rails']
    }
  ],
  socials: {
    github: 'https://github.com/42ndlight',
    linkedin: 'https://linkedin.com/in/kennedykinyua',
    blog: 'https://blog.42ndlight.africa',
    email: 'kennedy@42ndlight.africa'
  },
  pgpKey: '42F9 8B21 A0C4 513E E790'
};
