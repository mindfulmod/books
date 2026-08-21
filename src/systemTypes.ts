import type { Chapter, ConceptNode } from "./data";

export type Depth = "glance" | "understand" | "deep" | "sources";

export type Glyph =
  | "name"
  | "forces"
  | "order"
  | "know"
  | "pattern"
  | "receive"
  | "clear"
  | "learn"
  | "prepare"
  | "witness"
  | "arrive"
  | "leverage"
  | "attend"
  | "assent"
  | "resolve"
  | "act"
  | "guard"
  | "remember"
  | "steady"
  | "balance"
  | "practice"
  | "diagnose"
  | "health"
  | "mirror"
  | "company"
  | "cultivate";

export type JourneyNode = {
  id: string;
  label: string;
  micro: string;
  summary: string;
  guardrail: string;
  chapterId: number;
  glyph: Glyph;
};

export type Journey = {
  id: string;
  number: string;
  question: string;
  title: string;
  description: string;
  payoff: string;
  image: string;
  imageAlt: string;
  minutes: number;
  color: string;
  nodes: JourneyNode[];
};

export type SourceLink = {
  label: string;
  note: string;
  url: string;
};

export type TaxonomyGroup = {
  id: string;
  label: string;
  description: string;
  color: string;
  chapterIds: number[];
};

export type ProcessStage = TaxonomyGroup;

export type RelationLensState = {
  id: "fruit" | "means" | "attachment";
  label: string;
  signal: string;
  body: string;
  role: "support" | "balance" | "warning";
};

export type RelationLensItem = {
  id: string;
  label: string;
  question: string;
  chapterId: number;
  states: RelationLensState[];
};

export type WealthAuditGate = {
  id: "purpose" | "source" | "amount" | "outlet" | "intention";
  label: string;
  question: string;
  clearSign: string;
  dangerSign: string;
  nextAction: string;
  chapterId: number;
};

export type WealthAuditItem = {
  id: string;
  label: string;
  scenario: string;
  opening: string;
  gates: WealthAuditGate[];
};

export type AudienceResponse = "steady" | "shifted" | "audience-led";

export type AudienceChamberStage = {
  id: "alone" | "seen" | "praised" | "overlooked";
  label: string;
  question: string;
  steady: string;
  shifted: string;
  audienceLed: string;
  repair: string;
  chapterId: number;
};

export type AudienceChamberItem = {
  id: string;
  label: string;
  scenario: string;
  privatePurpose: string;
  stages: AudienceChamberStage[];
};

export type SolitudeReading = "sound" | "ostentation" | "pride" | "both";

export type SolitudeVerdict = {
  id: SolitudeReading;
  label: string;
  name: string;
  body: string;
  repair: string;
  chapterId: number;
};

export type SolitudeTrialItem = {
  id: string;
  label: string;
  trial: string;
  purpose: string;
  companyQuestion: string;
  solitudeQuestion: string;
  chapterId: number;
  verdicts: SolitudeVerdict[];
};

export type SubstitutionResponse = "intact" | "partial" | "collapsed";

export type SubstitutionSwap = {
  id: string;
  label: string;
  prompt: string;
  intact: string;
  partial: string;
  collapsed: string;
  chapterId: number;
};

export type SubstitutionItem = {
  id: string;
  label: string;
  claim: string;
  setting: string;
  swaps: SubstitutionSwap[];
};

export type MirrorObstructionId = "unformed" | "tarnished" | "turned-away" | "veiled" | "misdirected";

export type MirrorObstruction = {
  id: MirrorObstructionId;
  label: string;
  mirrorImage: string;
  question: string;
  present: string;
  absent: string;
  remedy: string;
  chapterId: number;
};

export type MirrorSubject = {
  id: string;
  label: string;
  subject: string;
  note: string;
  obstructions: MirrorObstruction[];
};

export type FaultMirror = {
  id: string;
  label: string;
  route: string;
  requires: string;
  reveals: string;
  failure: string;
  question: string;
  open: string;
  closed: string;
  chapterId: number;
};

export type MeasureDegree = {
  id: string;
  label: string;
  body: string;
  role: "support" | "balance" | "warning";
};

export type FoodMeasure = {
  id: string;
  label: string;
  duty: string;
  note: string;
  method: string;
  degrees: MeasureDegree[];
  chapterId: number;
};

export type RepentancePartId = "knowledge" | "regret" | "present" | "future" | "past";

export type RepentancePart = {
  id: RepentancePartId;
  label: string;
  limb: string;
  question: string;
  present: string;
  absent: string;
  remedy: string;
  chapterId: number;
};

export type RepentanceSubject = {
  id: string;
  label: string;
  subject: string;
  note: string;
  parts: RepentancePart[];
};

export type DutyVerdictId = "leave" | "remove" | "patience" | "both";

export type DutyStep = {
  id: "absolute" | "removable" | "blessing";
  label: string;
  question: string;
  yes: string;
  no: string;
  chapterId: number;
};

export type DutyVerdict = {
  id: DutyVerdictId;
  name: string;
  body: string;
  action: string;
  chapterId: number;
};

export type DutyCase = {
  id: string;
  label: string;
  condition: string;
  note: string;
  steps: DutyStep[];
  verdicts: DutyVerdict[];
};

export type InstrumentRole = "support" | "balance" | "warning";

export type AxisOption = {
  id: string;
  label: string;
  note: string;
};

export type InstrumentAxis = {
  id: string;
  kicker: string;
  question: string;
  options: AxisOption[];
};

export type InstrumentVerdict = {
  key: string;
  name: string;
  body: string;
  action: string;
  role: InstrumentRole;
  chapterId: number;
};

export type InstrumentCase = {
  id: string;
  label: string;
  lede: string;
  note: string;
  axes: InstrumentAxis[];
  verdicts: InstrumentVerdict[];
};

export type Instrument = {
  title: string;
  note: string;
  items: InstrumentCase[];
};

export type SystemBook = {
  id: number;
  title: string;
  shortTitle: string;
  defaultJourneyId: string;
  chapters: Chapter[];
  conceptNodes: ConceptNode[];
  journeys: Journey[];
  sources: SourceLink[];
  taxonomy?: {
    title: string;
    note: string;
    groups: TaxonomyGroup[];
  };
  process?: {
    title: string;
    note: string;
    stages: ProcessStage[];
  };
  relationLens?: {
    title: string;
    note: string;
    items: RelationLensItem[];
  };
  wealthAudit?: {
    title: string;
    note: string;
    items: WealthAuditItem[];
  };
  audienceChamber?: {
    title: string;
    note: string;
    items: AudienceChamberItem[];
  };
  solitudeTest?: {
    title: string;
    note: string;
    items: SolitudeTrialItem[];
  };
  substitutionTest?: {
    title: string;
    note: string;
    items: SubstitutionItem[];
  };
  mirrorObstructions?: {
    title: string;
    note: string;
    items: MirrorSubject[];
  };
  faultMirrors?: {
    title: string;
    note: string;
    items: FaultMirror[];
  };
  foodMeasures?: {
    title: string;
    note: string;
    items: FoodMeasure[];
  };
  repentanceCheck?: {
    title: string;
    note: string;
    items: RepentanceSubject[];
  };
  dutyFinder?: {
    title: string;
    note: string;
    items: DutyCase[];
  };
  instrument?: Instrument;
  editorialNote?: string;
};
