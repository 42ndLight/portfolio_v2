export interface ProjectArtifact {
  id: string;
  artifactNumber: string;
  category: string;
  badge: string;
  badgeType: 'green' | 'cyan';
  title: string;
  subtitle: string;
  description: string;
  systemSchemaFlow: string;
  schemaStatus: string;
  techTags: string[];
  latencyStat: string;
  throughputStat: string;
  architectureDetails: {
    clientLayer: string;
    offlineStorage: string;
    apiGateway: string;
    cloudDatabase: string;
    specializedServices: string;
  };
  engineeringChallenges: {
    title: string;
    metric: string;
    description: string;
  }[];
  flowNodes: {
    id: string;
    name: string;
    role: string;
    tech: string;
    state: 'active' | 'syncing' | 'idle' | 'offline';
    notes: string;
  }[];
  liveDemoUrl?: string;
  codeSnippet?: string;
}

export interface ScopingFormData {
  projectType: string;
  urgency: string;
  budgetRange: string;
  techPreferences: string[];
  clientName: string;
  clientEmail: string;
  companyName: string;
  systemDescription: string;
  requireOfflineCapability: boolean;
  requireFintechIntegration: boolean;
}

export interface GlobalNodeLatency {
  region: string;
  code: string;
  city: string;
  latencyMs: number;
  status: 'OPTIMAL' | 'DEGRADED' | 'OPERATIONAL';
}

export interface DiagnosticMetric {
  id: string;
  label: string;
  numberTag: string;
  value: string;
  description: string;
  color: 'green' | 'cyan';
  trend: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string[];
  codeBlock?: {
    language: string;
    filename: string;
    code: string;
  };
  category: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  author: string;
  viewsCount: string;
  externalUrl: string;
  keyTakeaways: string[];
}

export interface EngineerProfile {
  name: string;
  handle: string;
  title: string;
  location: string;
  status: string;
  experienceYears: string;
  bio: string;
  philosophy: {
    rule: string;
    principle: string;
  }[];
  milestones: {
    year: string;
    role: string;
    company: string;
    impact: string;
  }[];
  stackBreakdown: {
    area: string;
    technologies: string[];
  }[];
  socials: {
    github: string;
    linkedin: string;
    blog: string;
    email: string;
  };
  pgpKey: string;
}
