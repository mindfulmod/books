import {
  ArrowLeft,
  ArrowRight,
  BookmarkSimple,
  BookOpenText,
  Brain,
  Check,
  Compass,
  Eye,
  Footprints,
  Heart,
  Info,
  Lightbulb,
  LinkSimple,
  ListBullets,
  Shield,
  Sparkle,
  Target,
  X,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { assetUrl } from "./assetUrl";
import { book01 } from "./book01";
import { book02 } from "./book02";
import { book03 } from "./book03";
import { book04 } from "./book04";
import { book05 } from "./book05";
import { book06 } from "./book06";
import { book07 } from "./book07";
import { book08 } from "./book08";
import { book09 } from "./book09";
import { book10 } from "./book10";
import { book11 } from "./book11";
import { book12 } from "./book12";
import { book13 } from "./book13";
import { book14 } from "./book14";
import { book21 } from "./book21";
import { book22 } from "./book22";
import { book23 } from "./book23";
import { book24 } from "./book24";
import { book25 } from "./book25";
import { book26 } from "./book26";
import { book27 } from "./book27";
import { book28 } from "./book28";
import { book29 } from "./book29";
import { book30 } from "./book30";
import { book31 } from "./book31";
import { book32 } from "./book32";
import { book33 } from "./book33";
import { book34 } from "./book34";
import { book35 } from "./book35";
import { book36 } from "./book36";
import { book37 } from "./book37";
import { book38 } from "./book38";
import { book39 } from "./book39";
import { book40 } from "./book40";
import { chapters, conceptNodes, contentSources, quarters } from "./data";
import type { Chapter, DeepReading, VisualModel } from "./data";
import type { AudienceResponse, Depth, Glyph, Journey, JourneyNode, SolitudeReading, SubstitutionResponse, SystemBook } from "./systemTypes";

type SavedState = {
  bookId: number;
  journeyId: string;
  nodeId: string;
  depth: Depth;
  visited: string[];
  bookmarks: string[];
};


const books = [book01, book02, book03, book04, book05, book06, book07, book08, book09, book10, book11, book12, book13, book14, book21, book22, book23, book24, book25, book26, book27, book28, book29, book30, book31, book32, book33, book34, book35, book36, book37, book38, book39, book40];

const depthOptions: Array<{ id: Depth; label: string; short: string }> = [
  { id: "glance", label: "30 seconds", short: "30s" },
  { id: "understand", label: "Understand", short: "Core" },
  { id: "deep", label: "Go deep", short: "Deep" },
  { id: "sources", label: "Grounding", short: "Source" },
];

const mapPositions = {
  4: [
    [12, 25],
    [43, 25],
    [80, 35],
    [58, 77],
  ],
  5: [
    [12, 25],
    [36, 25],
    [62, 25],
    [84, 55],
    [34, 77],
  ],
  6: [
    [11, 25],
    [35, 25],
    [61, 25],
    [85, 51],
    [64, 77],
    [34, 77],
  ],
} as const;

const STORAGE_KEY = "ihya-system-state-v2";
const LEGACY_STORAGE_KEY = "ihya-system-state-v1";

const ideaKey = (bookId: number, journeyId: string, nodeId: string) =>
  `${bookId}:${journeyId}:${nodeId}`;

function fallbackDeepReading(chapter: Chapter, node: JourneyNode, book: SystemBook): DeepReading {
  return {
    thesis: chapter.overview,
    context:
      `This section belongs to ${book.title}. Its argument is presented here as an original English synthesis, organized to preserve the distinction selected on the map.`,
    moves: chapter.points.map((point, index) => ({
      title: `Argument move ${String(index + 1).padStart(2, "0")}`,
      body: point,
    })),
    distinction: {
      title: "Keep the selected distinction intact",
      firstLabel: "The core claim",
      first: node.summary,
      secondLabel: "What it does not mean",
      second: node.guardrail,
    },
    misreading:
      "A concise synthesis can show the argument's structure, but it should not be treated as a replacement for every detail, report, or qualification in the source text.",
    observation: chapter.reflection,
    sourceAnchor: `Book ${book.id}, section ${chapter.id}, ${chapter.formalTitle}.`,
  };
}

function glyphFor(kind: Glyph) {
  const props = { size: 25, weight: "duotone" as const };
  switch (kind) {
    case "name":
      return <Heart {...props} />;
    case "forces":
      return <Compass {...props} />;
    case "order":
      return <Target {...props} />;
    case "know":
      return <Brain {...props} />;
    case "pattern":
      return <ListBullets {...props} />;
    case "receive":
    case "attend":
      return <Eye {...props} />;
    case "clear":
    case "prepare":
      return <Sparkle {...props} />;
    case "learn":
      return <BookOpenText {...props} />;
    case "witness":
      return <Lightbulb {...props} />;
    case "arrive":
      return <ArrowRight {...props} />;
    case "leverage":
      return <LinkSimple {...props} />;
    case "assent":
      return <Check {...props} />;
    case "resolve":
      return <Target {...props} />;
    case "act":
      return <Footprints {...props} />;
    case "guard":
      return <Shield {...props} />;
    case "remember":
      return <Sparkle {...props} />;
    case "steady":
      return <Compass {...props} />;
    case "balance":
      return <Target {...props} />;
    case "practice":
      return <Footprints {...props} />;
    case "diagnose":
    case "mirror":
      return <Eye {...props} />;
    case "health":
    case "cultivate":
      return <Sparkle {...props} />;
    case "company":
      return <LinkSimple {...props} />;
  }
}

function ConceptModel({ model, compact = false }: { model: VisualModel; compact?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, model.items.findIndex((item) => item.role === "balance")),
  );
  const activeItem = model.items[activeIndex] ?? model.items[0];

  return (
    <section className={`concept-model concept-model-${model.kind}${compact ? " concept-model-compact" : ""}`}>
      <header>
        <span>Visual logic</span>
        <h4>{model.title}</h4>
      </header>
      <div
        className="concept-model-track"
        role="tablist"
        aria-label={model.title}
        style={{
          "--model-count": model.items.length,
          "--model-edge": `${50 / model.items.length}%`,
        } as CSSProperties}
      >
        {model.items.map((item, index) => (
          <button
            className={`${item.role ?? "support"}${index === activeIndex ? " active" : ""}`}
            key={`${item.label}:${index}`}
            onClick={() => setActiveIndex(index)}
            role="tab"
            aria-selected={index === activeIndex}
          >
            <i aria-hidden="true"><span /></i>
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
      <div className={`concept-model-reading ${activeItem.role ?? "support"}`} role="tabpanel">
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(model.items.length).padStart(2, "0")}</span>
        <p>{activeItem.body}</p>
        <div className="concept-model-pager" aria-label="Move through visual logic">
          <button
            onClick={() => setActiveIndex((current) => Math.max(0, current - 1))}
            disabled={activeIndex === 0}
            aria-label="Previous step"
          ><ArrowLeft size={15} weight="bold" /></button>
          <button
            onClick={() => setActiveIndex((current) => Math.min(model.items.length - 1, current + 1))}
            disabled={activeIndex === model.items.length - 1}
            aria-label="Next step"
          ><ArrowRight size={15} weight="bold" /></button>
        </div>
      </div>
      {!compact && <p className="concept-model-caption">{model.caption}</p>}
    </section>
  );
}

function WorldLens({
  lens,
  chapterId,
  onSelectChapter,
}: {
  lens: NonNullable<SystemBook["relationLens"]>;
  chapterId: number;
  onSelectChapter: (chapterId: number) => void;
}) {
  const initialItem = lens.items.find((item) => item.chapterId === chapterId) ?? lens.items[0];
  const [activeItemId, setActiveItemId] = useState(initialItem.id);
  const [activeStateId, setActiveStateId] = useState<"fruit" | "means" | "attachment">("means");
  const activeItem = lens.items.find((item) => item.id === activeItemId) ?? lens.items[0];
  const activeState = activeItem.states.find((state) => state.id === activeStateId) ?? activeItem.states[0];

  return (
    <section className="world-lens" aria-labelledby="world-lens-title">
      <header>
        <span>Applied distinction</span>
        <h4 id="world-lens-title">{lens.title}</h4>
        <p>{lens.note}</p>
      </header>

      <div className="world-lens-subjects" role="tablist" aria-label="Choose an ordinary share">
        {lens.items.map((item) => (
          <button
            key={item.id}
            className={item.id === activeItem.id ? "active" : ""}
            onClick={() => setActiveItemId(item.id)}
            role="tab"
            aria-selected={item.id === activeItem.id}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="world-lens-question">
        <span>Hold the object still. Change the relation.</span>
        <strong>{activeItem.question}</strong>
      </div>

      <div className="world-lens-gates" role="tablist" aria-label={`Relations to ${activeItem.label}`}>
        {activeItem.states.map((state, index) => (
          <button
            key={state.id}
            className={`${state.role}${state.id === activeState.id ? " active" : ""}`}
            onClick={() => setActiveStateId(state.id)}
            role="tab"
            aria-selected={state.id === activeState.id}
          >
            <span className="lens-gate" aria-hidden="true"><i /></span>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <strong>{state.label}</strong>
          </button>
        ))}
      </div>

      <div className={`world-lens-reading ${activeState.role}`} role="tabpanel">
        <div>
          <span>{activeItem.label} · {activeState.label}</span>
          <strong>{activeState.signal}</strong>
        </div>
        <p>{activeState.body}</p>
        <button onClick={() => onSelectChapter(activeItem.chapterId)}>
          Open related section <ArrowRight size={15} weight="bold" />
        </button>
      </div>
    </section>
  );
}

function WealthAudit({
  audit,
  chapterId,
  onSelectChapter,
}: {
  audit: NonNullable<SystemBook["wealthAudit"]>;
  chapterId: number;
  onSelectChapter: (chapterId: number) => void;
}) {
  const initialItem = audit.items.find((item) => item.gates.some((gate) => gate.chapterId === chapterId)) ?? audit.items[0];
  const initialGateIndex = Math.max(0, initialItem.gates.findIndex((gate) => gate.chapterId === chapterId));
  const [activeItemId, setActiveItemId] = useState(initialItem.id);
  const [activeGateIndex, setActiveGateIndex] = useState(initialGateIndex);
  const activeItem = audit.items.find((item) => item.id === activeItemId) ?? audit.items[0];
  const activeGate = activeItem.gates[activeGateIndex] ?? activeItem.gates[0];

  const chooseItem = (itemId: string) => {
    setActiveItemId(itemId);
    setActiveGateIndex(0);
  };

  return (
    <section className="wealth-audit" aria-labelledby="wealth-audit-title">
      <header>
        <span>Applied diagnosis</span>
        <h4 id="wealth-audit-title">{audit.title}</h4>
        <p>{audit.note}</p>
      </header>

      <div className="wealth-audit-subjects" role="tablist" aria-label="Choose a financial situation">
        {audit.items.map((item) => (
          <button
            key={item.id}
            className={item.id === activeItem.id ? "active" : ""}
            onClick={() => chooseItem(item.id)}
            role="tab"
            aria-selected={item.id === activeItem.id}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="wealth-audit-scenario">
        <span>{activeItem.scenario}</span>
        <p>{activeItem.opening}</p>
      </div>

      <div className="wealth-audit-gates" role="tablist" aria-label={`Five duties applied to ${activeItem.label}`}>
        {activeItem.gates.map((gate, index) => (
          <button
            key={gate.id}
            className={index === activeGateIndex ? "active" : ""}
            onClick={() => setActiveGateIndex(index)}
            role="tab"
            aria-selected={index === activeGateIndex}
          >
            <span className="audit-gate-arch" aria-hidden="true"><i /></span>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <strong>{gate.label}</strong>
          </button>
        ))}
      </div>

      <div className="wealth-audit-reading" role="tabpanel">
        <div className="audit-reading-question">
          <span>Gate {activeGateIndex + 1} of {activeItem.gates.length}</span>
          <h5>{activeGate.question}</h5>
        </div>
        <div className="audit-reading-signs">
          <div className="clear">
            <span>Clear sign</span>
            <p>{activeGate.clearSign}</p>
          </div>
          <div className="danger">
            <span>Warning sign</span>
            <p>{activeGate.dangerSign}</p>
          </div>
        </div>
        <div className="audit-reading-action">
          <div>
            <span>One next action</span>
            <strong>{activeGate.nextAction}</strong>
          </div>
          <div className="audit-reading-controls">
            <button
              onClick={() => setActiveGateIndex((current) => Math.max(0, current - 1))}
              disabled={activeGateIndex === 0}
              aria-label="Previous wealth gate"
            ><ArrowLeft size={15} weight="bold" /></button>
            {activeGateIndex < activeItem.gates.length - 1 ? (
              <button onClick={() => setActiveGateIndex((current) => Math.min(activeItem.gates.length - 1, current + 1))}>
                Next gate <ArrowRight size={15} weight="bold" />
              </button>
            ) : (
              <button onClick={() => onSelectChapter(activeGate.chapterId)}>
                Open related section <ArrowRight size={15} weight="bold" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


function SolitudeTest({
  test,
  chapterId,
  onSelectChapter,
}: {
  test: NonNullable<SystemBook["solitudeTest"]>;
  chapterId: number;
  onSelectChapter: (chapterId: number) => void;
}) {
  const firstItem = test.items.find((item) => item.chapterId === chapterId) ?? test.items[0];
  const [activeItemId, setActiveItemId] = useState(firstItem.id);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const activeItem = test.items.find((item) => item.id === activeItemId) ?? test.items[0];
  const companyKey = `${activeItem.id}:company`;
  const solitudeKey = `${activeItem.id}:solitude`;
  const company = answers[companyKey];
  const solitude = answers[solitudeKey];
  const answered = company !== undefined && solitude !== undefined;
  const reading: SolitudeReading | undefined = answered
    ? company && solitude
      ? "both"
      : solitude
        ? "pride"
        : company
          ? "ostentation"
          : "sound"
    : undefined;
  const verdict = reading ? activeItem.verdicts.find((item) => item.id === reading) : undefined;

  const chooseItem = (itemId: string) => setActiveItemId(itemId);
  const record = (key: string, value: boolean) =>
    setAnswers((current) => ({ ...current, [key]: current[key] === value ? undefined as unknown as boolean : value }));

  const rows: Array<[string, string, boolean | undefined]> = [
    [companyKey, activeItem.companyQuestion, company],
    [solitudeKey, activeItem.solitudeQuestion, solitude],
  ];

  return (
    <section className="solitude-test" aria-labelledby="solitude-test-title">
      <header>
        <span>Applied self-observation</span>
        <h4 id="solitude-test-title">{test.title}</h4>
        <p>{test.note}</p>
      </header>

      <div className="solitude-trials" role="tablist" aria-label="Choose a trial">
        {test.items.map((item) => (
          <button key={item.id} className={item.id === activeItem.id ? "active" : ""} onClick={() => chooseItem(item.id)} role="tab" aria-selected={item.id === activeItem.id}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="solitude-purpose">
        <span>{activeItem.trial}</span>
        <p><strong>Why this trial</strong>{activeItem.purpose}</p>
      </div>

      <div className="solitude-questions">
        {rows.map(([key, question, value], index) => (
          <div key={key} className={`solitude-question${value === undefined ? "" : value ? " heavy" : " light"}`}>
            <span>{index === 0 ? "Before people" : "In solitude"}</span>
            <h5>{question}</h5>
            <div className="solitude-answer-buttons" aria-label={index === 0 ? "Answer for company" : "Answer for solitude"}>
              <button className={value === true ? "active heavy" : "heavy"} onClick={() => record(key, true)} aria-pressed={value === true}>
                <span aria-hidden="true" />Heavy
              </button>
              <button className={value === false ? "active light" : "light"} onClick={() => record(key, false)} aria-pressed={value === false}>
                <span aria-hidden="true" />Light
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={`solitude-verdict ${reading ?? "empty"}`} aria-live="polite">
        {verdict ? (
          <>
            <div className="solitude-verdict-head">
              <span>{verdict.label}</span>
              <strong>{verdict.name}</strong>
            </div>
            <p>{verdict.body}</p>
            <div><span>What to treat</span><strong>{verdict.repair}</strong></div>
            <button onClick={() => onSelectChapter(verdict.chapterId)}>Read the closest source movement <ArrowRight size={15} weight="bold" /></button>
          </>
        ) : (
          <p>Answer both questions for this trial. You are recording where the heaviness sits, not proving anything about your heart.</p>
        )}
      </div>
    </section>
  );
}


function SubstitutionTest({
  test,
  chapterId,
  onSelectChapter,
}: {
  test: NonNullable<SystemBook["substitutionTest"]>;
  chapterId: number;
  onSelectChapter: (chapterId: number) => void;
}) {
  const firstItem = test.items.find((item) => item.swaps.some((swap) => swap.chapterId === chapterId)) ?? test.items[0];
  const [activeItemId, setActiveItemId] = useState(firstItem.id);
  const [activeSwapId, setActiveSwapId] = useState(firstItem.swaps[0].id);
  const [answers, setAnswers] = useState<Record<string, SubstitutionResponse>>({});
  const activeItem = test.items.find((item) => item.id === activeItemId) ?? test.items[0];
  const activeSwap = activeItem.swaps.find((swap) => swap.id === activeSwapId) ?? activeItem.swaps[0];
  const answerKey = `${activeItem.id}:${activeSwap.id}`;
  const answer = answers[answerKey];
  const itemAnswers = activeItem.swaps.map((swap) => answers[`${activeItem.id}:${swap.id}`]);
  const completed = itemAnswers.filter(Boolean).length;

  const chooseItem = (itemId: string) => {
    const next = test.items.find((item) => item.id === itemId);
    if (!next) return;
    setActiveItemId(itemId);
    setActiveSwapId(next.swaps[0].id);
  };

  const reading = answer === "intact"
    ? activeSwap.intact
    : answer === "partial"
      ? activeSwap.partial
      : answer === "collapsed"
        ? activeSwap.collapsed
        : "Answer honestly for this swap. You are checking whether a stated purpose survives your removal, not proving anything about your heart.";

  const verdict = completed < activeItem.swaps.length
    ? `Work all ${activeItem.swaps.length} swaps for this claim to see the pattern rather than a single reaction.`
    : itemAnswers.includes("collapsed")
      ? "At least one swap collapsed the claim. What vanished when you were removed is the thing that was actually wanted, and that is the part to treat."
      : itemAnswers.includes("partial")
        ? "The claim survived with a residue. Ghazali expects the residue rather than its absence; note it and keep looking rather than declaring the matter closed."
        : "The claim held across every swap. Keep the result provisional, and remember that the satisfaction of having passed is itself the last trap in this book.";

  return (
    <section className="substitution-test" aria-labelledby="substitution-test-title">
      <header>
        <span>Applied self-observation</span>
        <h4 id="substitution-test-title">{test.title}</h4>
        <p>{test.note}</p>
      </header>

      <div className="substitution-claims" role="tablist" aria-label="Choose a claimed purpose">
        {test.items.map((item) => (
          <button key={item.id} className={item.id === activeItem.id ? "active" : ""} onClick={() => chooseItem(item.id)} role="tab" aria-selected={item.id === activeItem.id}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="substitution-claim">
        <span>{activeItem.claim}</span>
        <p><strong>The setting</strong>{activeItem.setting}</p>
      </div>

      <div className="substitution-swaps" role="tablist" aria-label={`Swaps for ${activeItem.label}`}>
        {activeItem.swaps.map((swap, index) => {
          const swapAnswer = answers[`${activeItem.id}:${swap.id}`];
          return (
            <button key={swap.id} className={`${swap.id === activeSwap.id ? "active" : ""}${swapAnswer ? ` ${swapAnswer}` : ""}`} onClick={() => setActiveSwapId(swap.id)} role="tab" aria-selected={swap.id === activeSwap.id}>
              <small>Swap {String(index + 1).padStart(2, "0")}</small>
              <strong>{swap.label}</strong>
              <em>{swapAnswer ?? "untested"}</em>
            </button>
          );
        })}
      </div>

      <div className="substitution-reading" role="tabpanel">
        <div className="substitution-prompt">
          <span>Remove yourself and look</span>
          <h5>{activeSwap.prompt}</h5>
        </div>
        <div className="substitution-answer-buttons" aria-label="Record what happens to the purpose">
          {([
            ["intact", "Purpose intact"],
            ["partial", "Something drops"],
            ["collapsed", "It collapses"],
          ] as Array<[SubstitutionResponse, string]>).map(([value, label]) => (
            <button key={value} className={answer === value ? `active ${value}` : value} onClick={() => setAnswers((current) => ({ ...current, [answerKey]: value }))} aria-pressed={answer === value}>
              <span aria-hidden="true" />{label}
            </button>
          ))}
        </div>
        <div className={`substitution-interpretation ${answer ?? "empty"}`} aria-live="polite">
          <p>{reading}</p>
          {answer && (
            <button onClick={() => onSelectChapter(activeSwap.chapterId)}>Read the closest source movement <ArrowRight size={15} weight="bold" /></button>
          )}
        </div>
      </div>

      <div className={`substitution-verdict ${completed === activeItem.swaps.length ? "complete" : ""}`}>
        <div className="substitution-verdict-plan" aria-hidden="true">
          {activeItem.swaps.map((swap) => <span key={swap.id} className={answers[`${activeItem.id}:${swap.id}`] ?? "empty"}><i /></span>)}
        </div>
        <div>
          <span>{completed} of {activeItem.swaps.length} swaps tested</span>
          <strong>{verdict}</strong>
        </div>
      </div>
    </section>
  );
}


function MirrorObstructions({
  test,
  onSelectChapter,
}: {
  test: NonNullable<SystemBook["mirrorObstructions"]>;
  onSelectChapter: (chapterId: number) => void;
}) {
  const [activeItemId, setActiveItemId] = useState(test.items[0].id);
  const [activeStepId, setActiveStepId] = useState(test.items[0].obstructions[0].id);
  const [marks, setMarks] = useState<Record<string, boolean>>({});
  const activeItem = test.items.find((item) => item.id === activeItemId) ?? test.items[0];
  const activeStep = activeItem.obstructions.find((o) => o.id === activeStepId) ?? activeItem.obstructions[0];
  const markKey = `${activeItem.id}:${activeStep.id}`;
  const mark = marks[markKey];
  const answered = activeItem.obstructions.filter((o) => marks[`${activeItem.id}:${o.id}`] !== undefined).length;
  const present = activeItem.obstructions.filter((o) => marks[`${activeItem.id}:${o.id}`] === true);

  const chooseItem = (itemId: string) => {
    const next = test.items.find((item) => item.id === itemId);
    if (!next) return;
    setActiveItemId(itemId);
    setActiveStepId(next.obstructions[0].id);
  };

  const summary = answered < activeItem.obstructions.length
    ? `Work all five in order. ${answered} of ${activeItem.obstructions.length} examined so far.`
    : present.length === 0
      ? "None of the five is standing here by your own reading. Ghazali holds the list exhaustive, so either the obstruction is subtler than it looked, or the thing is already clearer than you had assumed."
      : present.length === 1
        ? `One obstruction: ${present[0].label.toLowerCase()}. That is the one to treat, and treating a different one will not help.`
        : `${present.length} obstructions are standing: ${present.map((o) => o.label.toLowerCase()).join(", ")}. Ghazali's order is deliberate, so begin with the earliest of them.`;

  return (
    <section className="mirror-obstructions" aria-labelledby="mirror-obstructions-title">
      <header>
        <span>Applied self-observation</span>
        <h4 id="mirror-obstructions-title">{test.title}</h4>
        <p>{test.note}</p>
      </header>

      <div className="mirror-subjects" role="tablist" aria-label="Choose what you are trying to see">
        {test.items.map((item) => (
          <button key={item.id} className={item.id === activeItem.id ? "active" : ""} onClick={() => chooseItem(item.id)} role="tab" aria-selected={item.id === activeItem.id}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="mirror-subject">
        <span>{activeItem.subject}</span>
        <p><strong>Before you begin</strong>{activeItem.note}</p>
      </div>

      <div className="mirror-steps" role="tablist" aria-label={`Five obstructions for ${activeItem.label}`}>
        {activeItem.obstructions.map((o, index) => {
          const state = marks[`${activeItem.id}:${o.id}`];
          return (
            <button key={o.id} className={`${o.id === activeStep.id ? "active" : ""}${state === true ? " present" : state === false ? " absent" : ""}`} onClick={() => setActiveStepId(o.id)} role="tab" aria-selected={o.id === activeStep.id}>
              <span className="mirror-glass" aria-hidden="true"><i /></span>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <strong>{o.label}</strong>
              <em>{state === true ? "standing" : state === false ? "clear" : "unexamined"}</em>
            </button>
          );
        })}
      </div>

      <div className="mirror-reading" role="tabpanel">
        <div className="mirror-question">
          <span>{activeStep.mirrorImage}</span>
          <h5>{activeStep.question}</h5>
        </div>
        <div className="mirror-answer-buttons" aria-label="Is this obstruction standing?">
          <button className={mark === true ? "active present" : "present"} onClick={() => setMarks((c) => ({ ...c, [markKey]: true }))} aria-pressed={mark === true}>
            <span aria-hidden="true" />This one is standing
          </button>
          <button className={mark === false ? "active absent" : "absent"} onClick={() => setMarks((c) => ({ ...c, [markKey]: false }))} aria-pressed={mark === false}>
            <span aria-hidden="true" />Not this one
          </button>
        </div>
        <div className={`mirror-interpretation ${mark === true ? "present" : mark === false ? "absent" : "empty"}`} aria-live="polite">
          <p>{mark === undefined ? "Answer for this obstruction before moving on. You are locating what stands in the way, not deciding the matter itself." : mark ? activeStep.present : activeStep.absent}</p>
          {mark === true && <div><span>What this asks of you</span><strong>{activeStep.remedy}</strong></div>}
        </div>
        <div className="mirror-controls">
          <button onClick={() => setActiveStepId(activeItem.obstructions[Math.max(0, activeItem.obstructions.indexOf(activeStep) - 1)].id)} disabled={activeItem.obstructions.indexOf(activeStep) === 0} aria-label="Previous obstruction"><ArrowLeft size={15} weight="bold" /></button>
          {activeItem.obstructions.indexOf(activeStep) < activeItem.obstructions.length - 1 ? (
            <button onClick={() => setActiveStepId(activeItem.obstructions[activeItem.obstructions.indexOf(activeStep) + 1].id)}>Next obstruction <ArrowRight size={15} weight="bold" /></button>
          ) : (
            <button onClick={() => onSelectChapter(activeStep.chapterId)}>Open the mirror section <ArrowRight size={15} weight="bold" /></button>
          )}
        </div>
      </div>

      <div className={`mirror-summary ${answered === activeItem.obstructions.length ? "complete" : ""}`}>
        <div className="mirror-summary-plan" aria-hidden="true">
          {activeItem.obstructions.map((o) => {
            const state = marks[`${activeItem.id}:${o.id}`];
            return <span key={o.id} className={state === true ? "present" : state === false ? "absent" : "empty"}><i /></span>;
          })}
        </div>
        <div>
          <span>{answered} of {activeItem.obstructions.length} examined</span>
          <strong>{summary}</strong>
        </div>
      </div>
    </section>
  );
}


function FaultMirrors({
  test,
  onSelectChapter,
}: {
  test: NonNullable<SystemBook["faultMirrors"]>;
  onSelectChapter: (chapterId: number) => void;
}) {
  const [activeId, setActiveId] = useState(test.items[0].id);
  const [states, setStates] = useState<Record<string, boolean>>({});
  const active = test.items.find((item) => item.id === activeId) ?? test.items[0];
  const state = states[active.id];
  const answered = test.items.filter((item) => states[item.id] !== undefined).length;
  const openCount = test.items.filter((item) => states[item.id] === true).length;

  const summary = answered < test.items.length
    ? `Work through all four. ${answered} of ${test.items.length} considered so far.`
    : openCount === 0
      ? "None of the four is open to you. Ghazali expects the first two to be rare, but not all four to be shut, and the fourth needs nothing but company. That result is itself the finding."
      : openCount === 1
        ? "One route is open. Use it deliberately rather than waiting for a better one, since the two he ranks highest are the two he says have become rare."
        : `${openCount} routes are open. They report different things, so the one that is most comfortable is unlikely to be the one that shows the most.`;

  return (
    <section className="fault-mirrors" aria-labelledby="fault-mirrors-title">
      <header>
        <span>Applied self-observation</span>
        <h4 id="fault-mirrors-title">{test.title}</h4>
        <p>{test.note}</p>
      </header>

      <div className="fault-mirror-tabs" role="tablist" aria-label="Four routes to knowing a fault">
        {test.items.map((item, index) => (
          <button key={item.id} className={`${item.id === active.id ? "active" : ""}${states[item.id] === true ? " open" : states[item.id] === false ? " shut" : ""}`} onClick={() => setActiveId(item.id)} role="tab" aria-selected={item.id === active.id}>
            <span className="fault-mirror-face" aria-hidden="true"><i /></span>
            <small>Route {String(index + 1).padStart(2, "0")}</small>
            <strong>{item.label}</strong>
            <em>{states[item.id] === true ? "open" : states[item.id] === false ? "shut" : "unconsidered"}</em>
          </button>
        ))}
      </div>

      <div className="fault-mirror-reading" role="tabpanel">
        <div className="fault-mirror-route">
          <span>Ghazali's description</span>
          <p>{active.route}</p>
        </div>
        <div className="fault-mirror-grid">
          <div><span>What it requires</span><p>{active.requires}</p></div>
          <div><span>What it reveals</span><p>{active.reveals}</p></div>
          <div><span>How it fails</span><p>{active.failure}</p></div>
        </div>
        <div className="fault-mirror-question">
          <h5>{active.question}</h5>
          <div className="fault-mirror-answer-buttons" aria-label="Is this route open to you?">
            <button className={state === true ? "active open" : "open"} onClick={() => setStates((c) => ({ ...c, [active.id]: true }))} aria-pressed={state === true}>
              <span aria-hidden="true" />Open to me
            </button>
            <button className={state === false ? "active shut" : "shut"} onClick={() => setStates((c) => ({ ...c, [active.id]: false }))} aria-pressed={state === false}>
              <span aria-hidden="true" />Shut to me
            </button>
          </div>
        </div>
        <div className={`fault-mirror-interpretation ${state === true ? "open" : state === false ? "shut" : "empty"}`} aria-live="polite">
          <p>{state === undefined ? "Decide whether this route is actually available to you, rather than whether it sounds good." : state ? active.open : active.closed}</p>
          {state !== undefined && (
            <button onClick={() => onSelectChapter(active.chapterId)}>Read the source section <ArrowRight size={15} weight="bold" /></button>
          )}
        </div>
      </div>

      <div className={`fault-mirror-summary ${answered === test.items.length ? "complete" : ""}`}>
        <div className="fault-mirror-plan" aria-hidden="true">
          {test.items.map((item) => <span key={item.id} className={states[item.id] === true ? "open" : states[item.id] === false ? "shut" : "empty"}><i /></span>)}
        </div>
        <div>
          <span>{answered} of {test.items.length} considered</span>
          <strong>{summary}</strong>
        </div>
      </div>
    </section>
  );
}


function FoodMeasures({
  test,
  onSelectChapter,
}: {
  test: NonNullable<SystemBook["foodMeasures"]>;
  onSelectChapter: (chapterId: number) => void;
}) {
  const [activeId, setActiveId] = useState(test.items[0].id);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const active = test.items.find((item) => item.id === activeId) ?? test.items[0];
  const picked = picks[active.id];
  const pickedDegree = active.degrees.find((d) => d.id === picked);
  const set = test.items.filter((item) => picks[item.id]).length;
  const warned = test.items.filter((item) => {
    const p = picks[item.id];
    return p && item.degrees.find((d) => d.id === p)?.role === "warning";
  });

  const summary = set < test.items.length
    ? `Set all four to see them together. ${set} of ${test.items.length} placed so far.`
    : warned.length === 0
      ? "None of the four sits in the outer band. Keep the reading provisional, and note that Ghazali expects the measure to shift with age, work, and health rather than to be settled once."
      : `${warned.length} of the four sit in the outer band: ${warned.map((m) => m.label.toLowerCase()).join(", ")}. Take the earliest of them first, and move by degrees rather than at once.`;

  return (
    <section className="food-measures" aria-labelledby="food-measures-title">
      <header>
        <span>Applied self-observation</span>
        <h4 id="food-measures-title">{test.title}</h4>
        <p>{test.note}</p>
      </header>

      <div className="measure-tabs" role="tablist" aria-label="Four measures">
        {test.items.map((item) => {
          const p = picks[item.id];
          const role = p ? item.degrees.find((d) => d.id === p)?.role : undefined;
          return (
            <button key={item.id} className={`${item.id === active.id ? "active" : ""}${role ? ` ${role}` : ""}`} onClick={() => setActiveId(item.id)} role="tab" aria-selected={item.id === active.id}>
              <strong>{item.label}</strong>
              <em>{p ? item.degrees.find((d) => d.id === p)?.label : "unset"}</em>
            </button>
          );
        })}
      </div>

      <div className="measure-duty">
        <span>{active.duty}</span>
        <p><strong>Why it is a measure</strong>{active.note}</p>
      </div>

      <div className="measure-scale" role="group" aria-label={`Degrees for ${active.label}`}>
        {active.degrees.map((degree, index) => (
          <button key={degree.id} className={`${degree.role}${picked === degree.id ? " active" : ""}`} onClick={() => setPicks((c) => ({ ...c, [active.id]: degree.id }))} aria-pressed={picked === degree.id}>
            <i aria-hidden="true" />
            <small>{String(index + 1).padStart(2, "0")}</small>
            <strong>{degree.label}</strong>
          </button>
        ))}
      </div>

      <div className={`measure-reading ${pickedDegree?.role ?? "empty"}`} aria-live="polite">
        <p>{pickedDegree ? pickedDegree.body : "Choose the degree that actually describes you, not the one you intend."}</p>
        <div><span>Ghazali's method here</span><strong>{active.method}</strong></div>
        <button onClick={() => onSelectChapter(active.chapterId)}>Read the source section <ArrowRight size={15} weight="bold" /></button>
      </div>

      <div className={`measure-summary ${set === test.items.length ? "complete" : ""}`}>
        <div className="measure-plan" aria-hidden="true">
          {test.items.map((item) => {
            const p = picks[item.id];
            const role = p ? item.degrees.find((d) => d.id === p)?.role : "empty";
            return <span key={item.id} className={role}><i /></span>;
          })}
        </div>
        <div>
          <span>{set} of {test.items.length} placed</span>
          <strong>{summary}</strong>
        </div>
      </div>
    </section>
  );
}


const bookTotalNodes = (item: SystemBook) => item.journeys.reduce((sum, journey) => sum + journey.nodes.length, 0);

function Library({
  available,
  currentBookId,
  visited,
  bookmarks,
  onSelectBook,
  onClose,
}: {
  available: SystemBook[];
  currentBookId: number;
  visited: string[];
  bookmarks: string[];
  onSelectBook: (bookId: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const byId = new Map(available.map((item) => [item.id, item]));
  const readyTotal = available.reduce((sum, item) => sum + bookTotalNodes(item), 0);
  const readySeen = available.reduce(
    (sum, item) => sum + visited.filter((key) => key.startsWith(`${item.id}:`)).length,
    0,
  );

  return (
    <div className="library-backdrop" role="presentation" onClick={onClose}>
      <div className="library" role="dialog" aria-modal="true" aria-labelledby="library-title" onClick={(event) => event.stopPropagation()}>
        <header className="library-header">
          <div>
            <span>The library</span>
            <h2 id="library-title">Forty books, four quarters</h2>
            <p>
              {available.length} of 40 books are prepared. Books without reviewed interactive content are shown closed
              rather than filled with generated placeholder text.
            </p>
          </div>
          <button className="library-close" onClick={onClose} aria-label="Close the library"><X size={17} weight="bold" /></button>
        </header>

        <div className="library-progress">
          <span className="library-meter"><i style={{ width: `${readyTotal ? (readySeen / readyTotal) * 100 : 0}%` }} /></span>
          <span><strong>{readySeen}</strong> of {readyTotal} ideas seen across the prepared books</span>
        </div>

        <div className="library-quarters">
          {quarters.map((quarter) => {
            const ready = quarter.books.filter((entry) => byId.has(entry.id));
            const complete = ready.length === quarter.books.length;
            return (
              <section key={quarter.id} className={`library-quarter${complete ? " complete" : ""}${ready.length ? "" : " empty"}`}>
                <div className="library-quarter-head">
                  <div>
                    <span>{complete ? "Complete" : ready.length ? `${ready.length} of ${quarter.books.length} prepared` : "Not yet prepared"}</span>
                    <h3>{quarter.title}</h3>
                    <p>{quarter.focus}</p>
                  </div>
                  <span className="library-quarter-count" aria-hidden="true">
                    {quarter.books.map((entry) => <i key={entry.id} className={byId.has(entry.id) ? "ready" : ""} />)}
                  </span>
                </div>

                <ul className="library-books">
                  {quarter.books.map((entry) => {
                    const prepared = byId.get(entry.id);
                    if (!prepared) {
                      return (
                        <li key={entry.id} className="library-book closed">
                          <span className="library-book-number">{entry.id}</span>
                          <span className="library-book-body">
                            <strong>{entry.title}</strong>
                            <em>Not yet prepared</em>
                          </span>
                        </li>
                      );
                    }
                    const total = bookTotalNodes(prepared);
                    const seen = visited.filter((key) => key.startsWith(`${prepared.id}:`)).length;
                    const marks = bookmarks.filter((key) => key.startsWith(`${prepared.id}:`)).length;
                    const isCurrent = prepared.id === currentBookId;
                    return (
                      <li key={entry.id} className={`library-book ready${isCurrent ? " current" : ""}`}>
                        <button onClick={() => onSelectBook(prepared.id)} aria-current={isCurrent ? "true" : undefined}>
                          <span className="library-book-number">{prepared.id}</span>
                          <span className="library-book-body">
                            <strong>{prepared.title}</strong>
                            <em>
                              {prepared.chapters.length} sections · {prepared.journeys.length} journeys
                              {marks ? ` · ${marks} saved` : ""}
                            </em>
                            <span className="library-book-meter"><i style={{ width: `${total ? (seen / total) * 100 : 0}%` }} /></span>
                          </span>
                          <span className="library-book-progress">{seen}/{total}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <footer className="library-footer">
          <p>
            Each prepared book is an original English synthesis made from a complete reading of the public Arabic text.
            It is not a translation and does not replace one. Every book carries its own source ledger and editorial note.
          </p>
        </footer>
      </div>
    </div>
  );
}


function RepentanceCheck({
  test,
  onSelectChapter,
}: {
  test: NonNullable<SystemBook["repentanceCheck"]>;
  onSelectChapter: (chapterId: number) => void;
}) {
  const [activeId, setActiveId] = useState(test.items[0].id);
  const [activePartId, setActivePartId] = useState(test.items[0].parts[0].id);
  const [marks, setMarks] = useState<Record<string, boolean>>({});
  const active = test.items.find((item) => item.id === activeId) ?? test.items[0];
  const activePart = active.parts.find((part) => part.id === activePartId) ?? active.parts[0];
  const markKey = `${active.id}:${activePart.id}`;
  const mark = marks[markKey];
  const answered = active.parts.filter((part) => marks[`${active.id}:${part.id}`] !== undefined).length;
  const missing = active.parts.filter((part) => marks[`${active.id}:${part.id}`] === false);

  const chooseItem = (itemId: string) => {
    const next = test.items.find((item) => item.id === itemId);
    if (!next) return;
    setActiveId(itemId);
    setActivePartId(next.parts[0].id);
  };

  const summary = answered < active.parts.length
    ? `Work all five in order. ${answered} of ${active.parts.length} checked so far.`
    : missing.length === 0
      ? "All five are present by your own reading. Ghazali's guarantee attaches to a repentance that met its conditions, so hold the result as a description of the work rather than a verdict on the outcome."
      : missing.length === 1
        ? `One limb is missing: ${missing[0].label.toLowerCase()}. On Ghazali's account the parts are ordered, so this is the one to supply rather than redoubling the others.`
        : `${missing.length} limbs are missing: ${missing.map((part) => part.label.toLowerCase()).join(", ")}. Take the earliest of them, since each part is produced by the one before it.`;

  return (
    <section className="repentance-check" aria-labelledby="repentance-check-title">
      <header>
        <span>Applied self-observation</span>
        <h4 id="repentance-check-title">{test.title}</h4>
        <p>{test.note}</p>
      </header>

      <div className="repentance-subjects" role="tablist" aria-label="Choose what to check">
        {test.items.map((item) => (
          <button key={item.id} className={item.id === active.id ? "active" : ""} onClick={() => chooseItem(item.id)} role="tab" aria-selected={item.id === active.id}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="repentance-subject">
        <span>{active.subject}</span>
        <p><strong>Before you begin</strong>{active.note}</p>
      </div>

      <div className="repentance-parts" role="tablist" aria-label={`Five points for ${active.label}`}>
        {active.parts.map((part) => {
          const state = marks[`${active.id}:${part.id}`];
          return (
            <button key={part.id} className={`${part.id === activePart.id ? "active" : ""}${state === true ? " present" : state === false ? " missing" : ""}`} onClick={() => setActivePartId(part.id)} role="tab" aria-selected={part.id === activePart.id}>
              <small>{part.limb}</small>
              <strong>{part.label}</strong>
              <em>{state === true ? "present" : state === false ? "missing" : "unchecked"}</em>
            </button>
          );
        })}
      </div>

      <div className="repentance-reading" role="tabpanel">
        <div className="repentance-question">
          <h5>{activePart.question}</h5>
        </div>
        <div className="repentance-answer-buttons" aria-label="Is this part present?">
          <button className={mark === true ? "active present" : "present"} onClick={() => setMarks((c) => ({ ...c, [markKey]: true }))} aria-pressed={mark === true}>
            <span aria-hidden="true" />Present
          </button>
          <button className={mark === false ? "active missing" : "missing"} onClick={() => setMarks((c) => ({ ...c, [markKey]: false }))} aria-pressed={mark === false}>
            <span aria-hidden="true" />Missing
          </button>
        </div>
        <div className={`repentance-interpretation ${mark === true ? "present" : mark === false ? "missing" : "empty"}`} aria-live="polite">
          <p>{mark === undefined ? "Answer for this part before moving on. You are locating a missing limb, not deciding whether you were forgiven." : mark ? activePart.present : activePart.absent}</p>
          {mark === false && <div><span>What this asks of you</span><strong>{activePart.remedy}</strong></div>}
        </div>
        <div className="repentance-controls">
          <button onClick={() => setActivePartId(active.parts[Math.max(0, active.parts.indexOf(activePart) - 1)].id)} disabled={active.parts.indexOf(activePart) === 0} aria-label="Previous part"><ArrowLeft size={15} weight="bold" /></button>
          {active.parts.indexOf(activePart) < active.parts.length - 1 ? (
            <button onClick={() => setActivePartId(active.parts[active.parts.indexOf(activePart) + 1].id)}>Next part <ArrowRight size={15} weight="bold" /></button>
          ) : (
            <button onClick={() => onSelectChapter(activePart.chapterId)}>Open the source section <ArrowRight size={15} weight="bold" /></button>
          )}
        </div>
      </div>

      <div className={`repentance-summary ${answered === active.parts.length ? "complete" : ""}`}>
        <div className="repentance-plan" aria-hidden="true">
          {active.parts.map((part) => {
            const state = marks[`${active.id}:${part.id}`];
            return <span key={part.id} className={state === true ? "present" : state === false ? "missing" : "empty"}><i /></span>;
          })}
        </div>
        <div>
          <span>{answered} of {active.parts.length} checked</span>
          <strong>{summary}</strong>
        </div>
      </div>
    </section>
  );
}


function DutyFinder({
  test,
  onSelectChapter,
}: {
  test: NonNullable<SystemBook["dutyFinder"]>;
  onSelectChapter: (chapterId: number) => void;
}) {
  const [activeId, setActiveId] = useState(test.items[0].id);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const active = test.items.find((item) => item.id === activeId) ?? test.items[0];

  const answerOf = (stepId: string) => answers[`${active.id}:${stepId}`];
  const absolute = answerOf("absolute");
  const removable = answerOf("removable");
  const blessing = answerOf("blessing");

  const verdictId = absolute === undefined
    ? undefined
    : absolute
      ? "leave"
      : removable === undefined
        ? undefined
        : removable
          ? "remove"
          : blessing === undefined
            ? undefined
            : blessing
              ? "both"
              : "patience";
  const verdict = verdictId ? active.verdicts.find((item) => item.id === verdictId) : undefined;

  const visible = active.steps.filter((step) => {
    if (step.id === "absolute") return true;
    if (step.id === "removable") return absolute === false;
    return absolute === false && removable === false;
  });

  const chooseItem = (itemId: string) => {
    setActiveId(itemId);
  };

  return (
    <section className="duty-finder" aria-labelledby="duty-finder-title">
      <header>
        <span>Applied self-observation</span>
        <h4 id="duty-finder-title">{test.title}</h4>
        <p>{test.note}</p>
      </header>

      <div className="duty-cases" role="tablist" aria-label="Choose what to sort">
        {test.items.map((item) => (
          <button key={item.id} className={item.id === active.id ? "active" : ""} onClick={() => chooseItem(item.id)} role="tab" aria-selected={item.id === active.id}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="duty-condition">
        <span>{active.condition}</span>
        <p><strong>Before you begin</strong>{active.note}</p>
      </div>

      <ol className="duty-steps">
        {visible.map((step, index) => {
          const value = answerOf(step.id);
          return (
            <li key={step.id} className={value === undefined ? "" : value ? "yes" : "no"}>
              <div className="duty-step-head">
                <small>Question {index + 1}</small>
                <h5>{step.question}</h5>
              </div>
              <div className="duty-step-buttons" aria-label={step.label}>
                <button className={value === true ? "active yes" : "yes"} onClick={() => setAnswers((c) => ({ ...c, [`${active.id}:${step.id}`]: true }))} aria-pressed={value === true}>
                  <span aria-hidden="true" />Yes
                </button>
                <button className={value === false ? "active no" : "no"} onClick={() => setAnswers((c) => ({ ...c, [`${active.id}:${step.id}`]: false }))} aria-pressed={value === false}>
                  <span aria-hidden="true" />No
                </button>
              </div>
              {value !== undefined && <p className="duty-step-reading">{value ? step.yes : step.no}</p>}
            </li>
          );
        })}
      </ol>

      <div className={`duty-verdict ${verdictId ?? "empty"}`} aria-live="polite">
        {verdict ? (
          <>
            <div className="duty-verdict-head">
              <span>The duty here</span>
              <strong>{verdict.name}</strong>
            </div>
            <p>{verdict.body}</p>
            <div><span>What this means</span><strong>{verdict.action}</strong></div>
            <button onClick={() => onSelectChapter(verdict.chapterId)}>Read the source section <ArrowRight size={15} weight="bold" /></button>
          </>
        ) : (
          <p>Answer the questions in order. The later ones only apply if the earlier ones did not already settle the case.</p>
        )}
      </div>
    </section>
  );
}


function InstrumentPanel({
  instrument,
  onSelectChapter,
}: {
  instrument: NonNullable<SystemBook["instrument"]>;
  onSelectChapter: (chapterId: number) => void;
}) {
  const [activeId, setActiveId] = useState(instrument.items[0].id);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const active = instrument.items.find((item) => item.id === activeId) ?? instrument.items[0];

  const chosen = active.axes.map((axis) => picks[`${active.id}:${axis.id}`]);
  const complete = chosen.every(Boolean);
  const verdict = complete
    ? active.verdicts.find((candidate) =>
        candidate.key.split("|").every((part, index) => part === "*" || part === chosen[index]),
      )
    : undefined;

  return (
    <section className="instrument" aria-labelledby="instrument-title">
      <header>
        <span>Applied self-observation</span>
        <h4 id="instrument-title">{instrument.title}</h4>
        <p>{instrument.note}</p>
      </header>

      {instrument.items.length > 1 && (
        <div className="instrument-tabs" role="tablist" aria-label="Choose a case">
          {instrument.items.map((item) => (
            <button key={item.id} className={item.id === active.id ? "active" : ""} onClick={() => setActiveId(item.id)} role="tab" aria-selected={item.id === active.id}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div className="instrument-lede">
        <span>{active.lede}</span>
        <p><strong>Before you begin</strong>{active.note}</p>
      </div>

      <div className="instrument-axes">
        {active.axes.map((axis) => {
          const key = `${active.id}:${axis.id}`;
          const picked = picks[key];
          return (
            <div key={axis.id} className={`instrument-axis${picked ? " answered" : ""}`}>
              <span>{axis.kicker}</span>
              <h5>{axis.question}</h5>
              <div className="instrument-options" role="group" aria-label={axis.kicker}>
                {axis.options.map((option) => (
                  <button key={option.id} className={picked === option.id ? "active" : ""} onClick={() => setPicks((current) => ({ ...current, [key]: option.id }))} aria-pressed={picked === option.id}>
                    <i aria-hidden="true" />
                    <span>
                      <strong>{option.label}</strong>
                      <small>{option.note}</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`instrument-verdict ${verdict ? verdict.role : "empty"}`} aria-live="polite">
        {verdict ? (
          <>
            <div className="instrument-verdict-head">
              <span>What this indicates</span>
              <strong>{verdict.name}</strong>
            </div>
            <p>{verdict.body}</p>
            <div><span>What follows from it</span><strong>{verdict.action}</strong></div>
            <button onClick={() => onSelectChapter(verdict.chapterId)}>Read the source section <ArrowRight size={15} weight="bold" /></button>
          </>
        ) : (
          <p>Answer every question above. You are locating a condition so that the fitting response can begin, not settling anything about your standing.</p>
        )}
      </div>
    </section>
  );
}

function AudienceChamber({
  chamber,
  chapterId,
  onSelectChapter,
}: {
  chamber: NonNullable<SystemBook["audienceChamber"]>;
  chapterId: number;
  onSelectChapter: (chapterId: number) => void;
}) {
  const firstItem = chamber.items.find((item) => item.stages.some((stage) => stage.chapterId === chapterId)) ?? chamber.items[0];
  const firstStage = firstItem.stages.find((stage) => stage.chapterId === chapterId) ?? firstItem.stages[0];
  const [activeItemId, setActiveItemId] = useState(firstItem.id);
  const [activeStageId, setActiveStageId] = useState(firstStage.id);
  const [responses, setResponses] = useState<Record<string, AudienceResponse>>({});
  const activeItem = chamber.items.find((item) => item.id === activeItemId) ?? chamber.items[0];
  const activeStage = activeItem.stages.find((stage) => stage.id === activeStageId) ?? activeItem.stages[0];
  const responseKey = `${activeItem.id}:${activeStage.id}`;
  const activeResponse = responses[responseKey];
  const itemResponses = activeItem.stages.map((stage) => responses[`${activeItem.id}:${stage.id}`]);
  const completed = itemResponses.filter(Boolean).length;
  const strongestStage = [...activeItem.stages].reverse().find((stage) => responses[`${activeItem.id}:${stage.id}`] === "audience-led")
    ?? [...activeItem.stages].reverse().find((stage) => responses[`${activeItem.id}:${stage.id}`] === "shifted")
    ?? activeItem.stages[activeItem.stages.length - 1];
  const trace = itemResponses.includes("audience-led")
    ? "At least one room became audience-led. That is a place to slow down, restore the private purpose, and read the related source movement closely."
    : itemResponses.includes("shifted")
      ? "The act survives, but visibility changes its energy or emotional return. The shift is useful evidence for treatment, not a verdict on sincerity."
      : completed === activeItem.stages.length
        ? "The act appeared steady across these four observations. Keep the result provisional and continue ordinary vigilance before, during, and after."
        : "Complete all four rooms to compare the same act across privacy, visibility, praise, and being overlooked.";

  const chooseItem = (itemId: string) => {
    setActiveItemId(itemId);
    setActiveStageId("alone");
  };

  const responseCopy = activeResponse === "steady"
    ? activeStage.steady
    : activeResponse === "shifted"
      ? activeStage.shifted
      : activeResponse === "audience-led"
        ? activeStage.audienceLed
        : "Choose the closest observation. You are recording variance, not proving a hidden intention.";

  return (
    <section className="audience-chamber" aria-labelledby="audience-chamber-title">
      <header>
        <span>Applied self-observation</span>
        <h4 id="audience-chamber-title">{chamber.title}</h4>
        <p>{chamber.note}</p>
      </header>

      <div className="audience-chamber-subjects" role="tablist" aria-label="Choose an act to observe">
        {chamber.items.map((item) => (
          <button key={item.id} className={item.id === activeItem.id ? "active" : ""} onClick={() => chooseItem(item.id)} role="tab" aria-selected={item.id === activeItem.id}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="audience-purpose">
        <span>{activeItem.scenario}</span>
        <p><strong>Private purpose</strong>{activeItem.privatePurpose}</p>
      </div>

      <div className="audience-rooms" role="tablist" aria-label={`Four audience conditions for ${activeItem.label}`}>
        {activeItem.stages.map((stage, index) => {
          const stageResponse = responses[`${activeItem.id}:${stage.id}`];
          return (
            <button key={stage.id} className={`${stage.id === activeStage.id ? "active" : ""}${stageResponse ? ` ${stageResponse}` : ""}`} onClick={() => setActiveStageId(stage.id)} role="tab" aria-selected={stage.id === activeStage.id}>
              <span className="audience-room-arch" aria-hidden="true"><i /><b /></span>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <strong>{stage.label}</strong>
              <em>{stageResponse ? stageResponse.replace("-", " ") : "unobserved"}</em>
            </button>
          );
        })}
      </div>

      <div className="audience-reading" role="tabpanel">
        <div className="audience-question">
          <span>Room {activeItem.stages.indexOf(activeStage) + 1} of {activeItem.stages.length}</span>
          <h5>{activeStage.question}</h5>
        </div>
        <div className="audience-response-buttons" aria-label="Record the closest observation">
          {([
            ["steady", "Stayed steady"],
            ["shifted", "Shifted slightly"],
            ["audience-led", "Audience-led"],
          ] as Array<[AudienceResponse, string]>).map(([value, label]) => (
            <button key={value} className={activeResponse === value ? `active ${value}` : value} onClick={() => setResponses((current) => ({ ...current, [responseKey]: value }))} aria-pressed={activeResponse === value}>
              <span aria-hidden="true" />{label}
            </button>
          ))}
        </div>
        <div className={`audience-interpretation ${activeResponse ?? "empty"}`} aria-live="polite">
          <p>{responseCopy}</p>
          {activeResponse && <div><span>Return the act to purpose</span><strong>{activeStage.repair}</strong></div>}
        </div>
        <div className="audience-controls">
          <button onClick={() => setActiveStageId(activeItem.stages[Math.max(0, activeItem.stages.indexOf(activeStage) - 1)].id)} disabled={activeItem.stages.indexOf(activeStage) === 0} aria-label="Previous audience room"><ArrowLeft size={15} weight="bold" /></button>
          {activeItem.stages.indexOf(activeStage) < activeItem.stages.length - 1 ? (
            <button onClick={() => setActiveStageId(activeItem.stages[Math.min(activeItem.stages.length - 1, activeItem.stages.indexOf(activeStage) + 1)].id)}>Next room <ArrowRight size={15} weight="bold" /></button>
          ) : (
            <button onClick={() => onSelectChapter(activeStage.chapterId)}>Open this section <ArrowRight size={15} weight="bold" /></button>
          )}
        </div>
      </div>

      <div className={`motive-trace ${completed === activeItem.stages.length ? "complete" : ""}`}>
        <div className="motive-trace-plan" aria-hidden="true">
          {activeItem.stages.map((stage) => <span key={stage.id} className={responses[`${activeItem.id}:${stage.id}`] ?? "empty"}><i /></span>)}
        </div>
        <div>
          <span>Motive trace · {completed} of {activeItem.stages.length} rooms observed</span>
          <strong>{trace}</strong>
        </div>
        {completed === activeItem.stages.length && (
          <button onClick={() => onSelectChapter(strongestStage.chapterId)}>Read the closest source movement <ArrowRight size={15} weight="bold" /></button>
        )}
      </div>
    </section>
  );
}

function initialState(): SavedState {
  const fallbackJourney = book30.journeys.find((item) => item.id === book30.defaultJourneyId) ?? book30.journeys[0];
  const fallbackNode = fallbackJourney.nodes[0];
  const fallback: SavedState = {
    bookId: book30.id,
    journeyId: fallbackJourney.id,
    nodeId: fallbackNode.id,
    depth: "glance",
    visited: [ideaKey(book30.id, fallbackJourney.id, fallbackNode.id)],
    bookmarks: [],
  };

  try {
    const current = window.localStorage.getItem(STORAGE_KEY);
    const raw = current ?? window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    const book = books.find((item) => item.id === parsed.bookId) ?? book30;
    const journey = book.journeys.find((item) => item.id === parsed.journeyId)
      ?? book.journeys.find((item) => item.id === book.defaultJourneyId)
      ?? book.journeys[0];
    const node = journey?.nodes.find((item) => item.id === parsed.nodeId);
    const resolvedNode = node ?? journey.nodes[0];
    const normalizeKeys = (keys: unknown) =>
      Array.isArray(keys)
        ? keys.filter((item): item is string => typeof item === "string").map((item) =>
            item.split(":").length === 2 ? `21:${item}` : item)
        : [];
    const normalizedVisited = normalizeKeys(parsed.visited);
    const currentKey = ideaKey(book.id, journey.id, resolvedNode.id);
    return {
      bookId: book.id,
      journeyId: journey.id,
      nodeId: resolvedNode.id,
      depth: current && depthOptions.some((item) => item.id === parsed.depth) ? parsed.depth! : "glance",
      visited: normalizedVisited.includes(currentKey) ? normalizedVisited : [...normalizedVisited, currentKey],
      bookmarks: normalizeKeys(parsed.bookmarks),
    };
  } catch {
    return fallback;
  }
}

function SystemApp() {
  const [saved, setSaved] = useState<SavedState>(initialState);
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [activeTaxonomy, setActiveTaxonomy] = useState("all");
  const [activeProcess, setActiveProcess] = useState("all");
  const book = books.find((item) => item.id === saved.bookId) ?? book30;
  const journey = book.journeys.find((item) => item.id === saved.journeyId)
    ?? book.journeys.find((item) => item.id === book.defaultJourneyId)
    ?? book.journeys[0];
  const node = journey.nodes.find((item) => item.id === saved.nodeId) ?? journey.nodes[0];
  const chapter = book.chapters.find((item) => item.id === node.chapterId)!;
  const nodeKey = ideaKey(book.id, journey.id, node.id);
  const isBookmarked = saved.bookmarks.includes(nodeKey);
  const positions = mapPositions[journey.nodes.length as 4 | 5 | 6];
  const relatedConcepts = useMemo(
    () => book.conceptNodes.filter((concept) => chapter.relatedNodes.includes(concept.id)),
    [book, chapter],
  );
  const concept = book.conceptNodes.find((item) => item.id === activeConcept) ?? null;
  const totalNodes = book.journeys.reduce((total, item) => total + item.nodes.length, 0);
  const visitedInBook = saved.visited.filter((item) => item.startsWith(`${book.id}:`)).length;
  const bookmarksInBook = saved.bookmarks.filter((item) => item.startsWith(`${book.id}:`)).length;
  const deepReading = chapter.deep ?? fallbackDeepReading(chapter, node, book);
  const activeTaxonomyGroup = book.taxonomy?.groups.find((group) => group.id === activeTaxonomy);
  const activeProcessStage = book.process?.stages.find((stage) => stage.id === activeProcess);
  const activeSectionGroup = activeTaxonomyGroup ?? activeProcessStage;
  const displayedChapters = activeSectionGroup
    ? book.chapters.filter((item) => activeSectionGroup.chapterIds.includes(item.id))
    : book.chapters;

  useEffect(() => {
    document.body.classList.add("system-page");
    return () => document.body.classList.remove("system-page");
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  const selectBook = (bookId: number) => {
    setLibraryOpen(false);
    const nextBook = books.find((item) => item.id === bookId);
    if (!nextBook) return;
    const nextJourney = nextBook.journeys.find((item) => item.id === nextBook.defaultJourneyId) ?? nextBook.journeys[0];
    const nextNode = nextJourney.nodes[0];
    const key = ideaKey(nextBook.id, nextJourney.id, nextNode.id);
    setActiveConcept(null);
    setActiveTaxonomy("all");
    setActiveProcess("all");
    setSaved((current) => ({
      ...current,
      bookId: nextBook.id,
      journeyId: nextJourney.id,
      nodeId: nextNode.id,
      depth: "glance",
      visited: current.visited.includes(key) ? current.visited : [...current.visited, key],
    }));
  };

  const selectJourney = (next: Journey) => {
    const first = next.nodes[0];
    const key = ideaKey(book.id, next.id, first.id);
    setActiveConcept(null);
    if (activeTaxonomy !== "all") {
      setActiveTaxonomy(book.taxonomy?.groups.find((group) => group.chapterIds.includes(first.chapterId))?.id ?? "all");
    }
    if (activeProcess !== "all") {
      setActiveProcess(book.process?.stages.find((stage) => stage.chapterIds.includes(first.chapterId))?.id ?? "all");
    }
    setSaved((current) => ({
      ...current,
      journeyId: next.id,
      nodeId: first.id,
      visited: current.visited.includes(key) ? current.visited : [...current.visited, key],
    }));
  };

  const selectNode = (next: JourneyNode) => {
    const key = ideaKey(book.id, journey.id, next.id);
    setActiveConcept(null);
    if (activeTaxonomy !== "all") {
      setActiveTaxonomy(book.taxonomy?.groups.find((group) => group.chapterIds.includes(next.chapterId))?.id ?? "all");
    }
    if (activeProcess !== "all") {
      setActiveProcess(book.process?.stages.find((stage) => stage.chapterIds.includes(next.chapterId))?.id ?? "all");
    }
    setSaved((current) => ({
      ...current,
      nodeId: next.id,
      visited: current.visited.includes(key) ? current.visited : [...current.visited, key],
    }));
  };

  const selectChapter = (chapterId: number) => {
    const nextJourney = book.journeys.find((item) => item.nodes.some((itemNode) => itemNode.chapterId === chapterId));
    const nextNode = nextJourney?.nodes.find((item) => item.chapterId === chapterId);
    if (!nextJourney || !nextNode) return;
    const key = ideaKey(book.id, nextJourney.id, nextNode.id);
    setActiveConcept(null);
    if (activeTaxonomy !== "all") {
      setActiveTaxonomy(book.taxonomy?.groups.find((group) => group.chapterIds.includes(chapterId))?.id ?? "all");
    }
    if (activeProcess !== "all") {
      setActiveProcess(book.process?.stages.find((stage) => stage.chapterIds.includes(chapterId))?.id ?? "all");
    }
    setSaved((current) => ({
      ...current,
      journeyId: nextJourney.id,
      nodeId: nextNode.id,
      visited: current.visited.includes(key) ? current.visited : [...current.visited, key],
    }));
  };

  const toggleBookmark = () => {
    setSaved((current) => ({
      ...current,
      bookmarks: current.bookmarks.includes(nodeKey)
        ? current.bookmarks.filter((item) => item !== nodeKey)
        : [...current.bookmarks, nodeKey],
    }));
  };

  return (
    <div className="system-app system-warm" style={{ "--journey": journey.color } as CSSProperties}>
      <a className="system-skip" href="#system-main">Skip to concept map</a>

      <header className="system-topbar">
        <div className="system-brand" aria-label="Ihya concept edition">
          <span className="brand-glyph" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>
            <strong>Ihya</strong>
            <small>Concept edition</small>
          </span>
        </div>

        <div className="book-identity">
          <button
            className="library-trigger"
            onClick={() => setLibraryOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={libraryOpen}
          >
            <ListBullets size={14} weight="bold" />
            <span>Book {book.id} of 40</span>
            <em>{books.length} prepared</em>
          </button>
          <strong>{book.title}</strong>
        </div>

        <div className="system-status" aria-label="Saved reading progress">
          <span className="status-meter"><i style={{ width: `${(visitedInBook / totalNodes) * 100}%` }} /></span>
          <span><strong>{visitedInBook}</strong> of {totalNodes} ideas seen</span>
          <BookmarkSimple size={18} weight={bookmarksInBook ? "fill" : "regular"} />
          <span>{bookmarksInBook}</span>
        </div>
      </header>

      {libraryOpen && (
        <Library
          available={books}
          currentBookId={book.id}
          visited={saved.visited}
          bookmarks={saved.bookmarks}
          onSelectBook={selectBook}
          onClose={() => setLibraryOpen(false)}
        />
      )}

      <main className="system-workspace" id="system-main">
        <aside className="question-panel" aria-label="Learning journeys">
          <div className="panel-kicker">
            <Compass size={17} weight="duotone" />
            <span>Start with a question</span>
          </div>
          <h1>Learn by structure,<br />not page count.</h1>
          <p className="question-intro">Choose the confusion you want Ghazali to resolve.</p>

          <nav className="question-list">
            {book.journeys.map((item) => {
              const isActive = item.id === journey.id;
              const seen = item.nodes.filter((itemNode) => saved.visited.includes(ideaKey(book.id, item.id, itemNode.id))).length;
              return (
                <button
                  className={isActive ? "question-card active" : "question-card"}
                  key={item.id}
                  onClick={() => selectJourney(item)}
                  aria-current={isActive ? "step" : undefined}
                  style={{ "--card-color": item.color } as CSSProperties}
                >
                  <span className="question-visual" aria-hidden="true">
                    <img src={item.image.replace(".jpg", "-thumb.jpg")} alt="" loading="lazy" />
                    <span className="question-number">{item.number}</span>
                  </span>
                  <span className="question-copy">
                    <strong>{item.question}</strong>
                    <small>{item.minutes} min path · {seen}/{item.nodes.length} seen</small>
                  </span>
                  <ArrowRight size={18} weight="bold" />
                </button>
              );
            })}
          </nav>

          <div className="method-note">
            <Info size={18} weight="duotone" />
            <p><strong>Not a quiz.</strong> Every view is the same source-grounded idea at a different resolution.</p>
          </div>
        </aside>

        {saved.depth !== "deep" && (
        <section className="map-panel" aria-labelledby="journey-question">
          <header className="map-header">
            <div>
              <span className="journey-label">Journey {journey.number} · {journey.title}</span>
              <h2 id="journey-question">{journey.question}</h2>
              <p>{journey.description}</p>
            </div>
            <figure className="journey-illustration" key={journey.id}>
              <img src={journey.image} alt={journey.imageAlt} />
              <span className="illustration-shine" aria-hidden="true" />
              <figcaption>
                <span><Sparkle size={14} weight="fill" /> Symbolic plate</span>
                <p>{journey.payoff}</p>
              </figcaption>
            </figure>
          </header>

          <div className="mechanism-map" aria-label={`${journey.question} concept map`}>
            <span className="map-caption"><i /> Mechanism map · select any stage</span>
            <svg className="route-line" viewBox="0 0 1000 500" aria-hidden="true" preserveAspectRatio="none">
              <defs>
                <marker id="route-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
              </defs>
              <path className="route-shadow" d="M110 125 C230 125 250 125 350 125 S535 125 610 125 S805 125 850 235 S780 382 645 385 S440 385 330 385" />
              <path className="route-main" markerEnd="url(#route-arrow)" d="M110 125 C230 125 250 125 350 125 S535 125 610 125 S805 125 850 235 S780 382 645 385 S440 385 330 385" />
            </svg>

            {journey.nodes.map((item, index) => {
              const [x, y] = positions[index];
              const isActive = item.id === node.id;
              const wasVisited = saved.visited.includes(ideaKey(book.id, journey.id, item.id));
              return (
                <button
                  className={`map-node${isActive ? " active" : ""}${wasVisited ? " visited" : ""}`}
                  style={{ "--node-x": `${x}%`, "--node-y": `${y}%` } as CSSProperties}
                  key={item.id}
                  onClick={() => selectNode(item)}
                  aria-pressed={isActive}
                >
                  <span className="node-orb">
                    <span className="node-step">{String(index + 1).padStart(2, "0")}</span>
                    {glyphFor(item.glyph)}
                    {wasVisited && <Check className="visited-check" size={14} weight="bold" />}
                  </span>
                  <strong>{item.label}</strong>
                  <small>{item.micro}</small>
                </button>
              );
            })}

            <div className="concept-dock">
              <span>Concepts in this section</span>
              <div>
                {relatedConcepts.map((item) => (
                  <button
                    className={activeConcept === item.id ? "active" : ""}
                    key={item.id}
                    onClick={() => setActiveConcept((current) => current === item.id ? null : item.id)}
                    aria-pressed={activeConcept === item.id}
                  >
                    <i data-concept={item.id} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {concept && (
              <aside className="concept-popover" aria-live="polite">
                <button aria-label="Close concept explanation" onClick={() => setActiveConcept(null)}><X size={16} /></button>
                <span>{concept.kicker}</span>
                <strong>{concept.label}</strong>
                <p>{concept.description}</p>
              </aside>
            )}
          </div>
        </section>
        )}

        {saved.depth !== "deep" && (
        <aside className="depth-panel" aria-label="Explanation depth">
          <div className="depth-heading">
            <span>Choose resolution</span>
            <strong>Same idea. More depth.</strong>
          </div>
          <div className="depth-tabs" role="tablist" aria-label="Reading depth">
            {depthOptions.map((option) => (
              <button
                key={option.id}
                className={saved.depth === option.id ? "active" : ""}
                onClick={() => setSaved((current) => ({ ...current, depth: option.id }))}
                role="tab"
                aria-selected={saved.depth === option.id}
              >
                <span className="depth-full">{option.label}</span>
                <span className="depth-short">{option.short}</span>
              </button>
            ))}
          </div>

          <article className="explanation-card" role="tabpanel">
            <header>
              <span>Section {chapter.id} · stage {journey.nodes.indexOf(node) + 1} of {journey.nodes.length}</span>
              <h2>{node.label}</h2>
              <p>{node.micro}</p>
            </header>

            {saved.depth === "glance" && (
              <div className="depth-content glance-content">
                <p className="big-idea">{node.summary}</p>
                <div className="do-not-collapse">
                  <span>Keep this distinction</span>
                  <strong>{node.guardrail}</strong>
                </div>
                <button className="continue-button" onClick={() => setSaved((current) => ({ ...current, depth: "understand" }))}>
                  Understand why <ArrowRight size={17} weight="bold" />
                </button>
              </div>
            )}

            {saved.depth === "understand" && (
              <div className="depth-content understand-content">
                <p>{chapter.overview}</p>
                {chapter.visualModel && (
                  <ConceptModel
                    key={`compact:${book.id}:${chapter.id}`}
                    model={chapter.visualModel}
                    compact
                  />
                )}
                <div className="core-points">
                  <span>Three things to hold</span>
                  {chapter.points.map((point, index) => (
                    <div key={point}><i>{index + 1}</i><p>{point}</p></div>
                  ))}
                </div>
                <button className="continue-button" onClick={() => setSaved((current) => ({ ...current, depth: "deep" }))}>
                  Follow the full distinction <ArrowRight size={17} weight="bold" />
                </button>
              </div>
            )}

            {saved.depth === "sources" && (
              <div className="depth-content source-content">
                <div className="grounding-label">
                  <BookOpenText size={21} weight="duotone" />
                  <p><strong>Grounded to Book {book.id}, section {chapter.id}</strong><span>{chapter.formalTitle}</span></p>
                </div>
                <p>This prototype uses original English synthesis. It is designed to preserve the section's distinctions while guiding the reader back to primary and published texts.</p>
                {book.editorialNote && <p className="editorial-note"><Shield size={16} weight="duotone" /> {book.editorialNote}</p>}
                <div className="source-list">
                  {book.sources.map((source, index) => (
                    <a href={source.url} key={`${source.label}:${index}`} target="_blank" rel="noreferrer">
                      <span><strong>{source.label}</strong><small>{source.note}</small></span>
                      <ArrowRight size={16} weight="bold" />
                    </a>
                  ))}
                </div>
                <p className="source-caution"><Info size={16} /> It does not claim to replace scholarly verification of the Arabic text or a full published translation.</p>
              </div>
            )}
          </article>

          <button className={isBookmarked ? "bookmark-action active" : "bookmark-action"} onClick={toggleBookmark}>
            <BookmarkSimple size={19} weight={isBookmarked ? "fill" : "regular"} />
            {isBookmarked ? "Saved to your return list" : "Save this distinction"}
          </button>
        </aside>
        )}

        {saved.depth === "deep" && (
          <section className="deep-reader" aria-labelledby="deep-reader-title">
            <header className="deep-reader-top">
              <div>
                <span>Book {book.id} · Section {chapter.id} · Journey {journey.number}</span>
                <h2 id="deep-reader-title">{chapter.formalTitle}</h2>
              </div>
              <div className="deep-reader-controls">
                <div className="depth-tabs deep-reader-tabs" role="tablist" aria-label="Reading depth">
                  {depthOptions.map((option) => (
                    <button
                      key={option.id}
                      className={saved.depth === option.id ? "active" : ""}
                      onClick={() => setSaved((current) => ({ ...current, depth: option.id }))}
                      role="tab"
                      aria-selected={saved.depth === option.id}
                    >
                      <span className="depth-full">{option.label}</span>
                      <span className="depth-short">{option.short}</span>
                    </button>
                  ))}
                </div>
                <button
                  className="deep-close"
                  onClick={() => setSaved((current) => ({ ...current, depth: "understand" }))}
                  aria-label="Return to the concept map"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
            </header>

            <div className="deep-reader-body">
              <aside className="deep-reader-summary">
                <figure>
                  <img src={journey.image} alt={journey.imageAlt} />
                  <figcaption><Sparkle size={14} weight="fill" /> Journey {journey.number} symbolic plate</figcaption>
                </figure>
                <div className="deep-stage-label">
                  <span>Selected stage</span>
                  <strong>{String(journey.nodes.indexOf(node) + 1).padStart(2, "0")} / {String(journey.nodes.length).padStart(2, "0")}</strong>
                </div>
                <h3>{node.label}</h3>
                <p>{node.summary}</p>
                <div className="deep-guardrail">
                  <span>Do not collapse this</span>
                  <strong>{node.guardrail}</strong>
                </div>
                <button className={isBookmarked ? "bookmark-action active" : "bookmark-action"} onClick={toggleBookmark}>
                  <BookmarkSimple size={19} weight={isBookmarked ? "fill" : "regular"} />
                  {isBookmarked ? "Saved to your return list" : "Save this distinction"}
                </button>
              </aside>

              <article className="deep-reader-article">
                <header className="deep-thesis">
                  <span>The argument</span>
                  <h3>{deepReading.thesis}</h3>
                  <p>{deepReading.context}</p>
                </header>

                {chapter.visualModel && (
                  <ConceptModel
                    key={`deep:${book.id}:${chapter.id}`}
                    model={chapter.visualModel}
                  />
                )}

                {book.relationLens && (
                  <WorldLens
                    key={`lens:${book.id}:${chapter.id}`}
                    lens={book.relationLens}
                    chapterId={chapter.id}
                    onSelectChapter={selectChapter}
                  />
                )}

                {book.wealthAudit && (
                  <WealthAudit
                    key={`wealth-audit:${book.id}:${chapter.id}`}
                    audit={book.wealthAudit}
                    chapterId={chapter.id}
                    onSelectChapter={selectChapter}
                  />
                )}

                {book.audienceChamber && (
                  <AudienceChamber
                    key={`audience-chamber:${book.id}`}
                    chamber={book.audienceChamber}
                    chapterId={chapter.id}
                    onSelectChapter={selectChapter}
                  />
                )}

                {book.solitudeTest && (
                  <SolitudeTest
                    key={`solitude-test:${book.id}`}
                    test={book.solitudeTest}
                    chapterId={chapter.id}
                    onSelectChapter={selectChapter}
                  />
                )}

                {book.instrument && (
                  <InstrumentPanel
                    key={`instrument:${book.id}`}
                    instrument={book.instrument}
                    onSelectChapter={selectChapter}
                  />
                )}

                {book.dutyFinder && (
                  <DutyFinder
                    key={`duty-finder:${book.id}`}
                    test={book.dutyFinder}
                    onSelectChapter={selectChapter}
                  />
                )}

                {book.repentanceCheck && (
                  <RepentanceCheck
                    key={`repentance-check:${book.id}`}
                    test={book.repentanceCheck}
                    onSelectChapter={selectChapter}
                  />
                )}

                {book.foodMeasures && (
                  <FoodMeasures
                    key={`food-measures:${book.id}`}
                    test={book.foodMeasures}
                    onSelectChapter={selectChapter}
                  />
                )}

                {book.faultMirrors && (
                  <FaultMirrors
                    key={`fault-mirrors:${book.id}`}
                    test={book.faultMirrors}
                    onSelectChapter={selectChapter}
                  />
                )}

                {book.mirrorObstructions && (
                  <MirrorObstructions
                    key={`mirror-obstructions:${book.id}`}
                    test={book.mirrorObstructions}
                    onSelectChapter={selectChapter}
                  />
                )}

                {book.substitutionTest && (
                  <SubstitutionTest
                    key={`substitution-test:${book.id}`}
                    test={book.substitutionTest}
                    chapterId={chapter.id}
                    onSelectChapter={selectChapter}
                  />
                )}

                <section className="reasoning-section" aria-labelledby="reasoning-heading">
                  <div className="deep-section-heading">
                    <span>Reasoning sequence</span>
                    <h4 id="reasoning-heading">Follow how the claim is built</h4>
                  </div>
                  <div className="reasoning-moves">
                    {deepReading.moves.map((move, index) => (
                      <div className="reasoning-move" key={move.title}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div><strong>{move.title}</strong><p>{move.body}</p></div>
                      </div>
                    ))}
                  </div>
                </section>

                {deepReading.closeReading && deepReading.closeReading.length > 0 && (
                  <section className="close-reading-section" aria-labelledby="close-reading-heading">
                    <div className="deep-section-heading">
                      <span>Closer reading</span>
                      <h4 id="close-reading-heading">Stay with what the argument changes</h4>
                    </div>
                    <div className="close-reading-grid">
                      {deepReading.closeReading.map((item, index) => (
                        <article key={item.title}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <h5>{item.title}</h5>
                          <p>{item.body}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                )}

                <section className="deep-distinction" aria-labelledby="distinction-heading">
                  <div className="deep-section-heading">
                    <span>Key distinction</span>
                    <h4 id="distinction-heading">{deepReading.distinction.title}</h4>
                  </div>
                  <div className="distinction-pair">
                    <div>
                      <span>{deepReading.distinction.firstLabel}</span>
                      <p>{deepReading.distinction.first}</p>
                    </div>
                    <div>
                      <span>{deepReading.distinction.secondLabel}</span>
                      <p>{deepReading.distinction.second}</p>
                    </div>
                  </div>
                </section>

                <div className="deep-practice-grid">
                  <section className="misreading-note">
                    <span><Shield size={16} weight="duotone" /> Common misreading</span>
                    <p>{deepReading.misreading}</p>
                  </section>
                  <section className="observation-note">
                    <span><Eye size={16} weight="duotone" /> Observe in life</span>
                    <p>{deepReading.observation}</p>
                  </section>
                </div>

                {deepReading.selfAudit && deepReading.selfAudit.length > 0 && (
                  <section className="self-audit" aria-labelledby="self-audit-heading">
                    <div className="deep-section-heading">
                      <span>Carry into observation</span>
                      <h4 id="self-audit-heading">Questions for honest self-reading</h4>
                    </div>
                    <ol>
                      {deepReading.selfAudit.map((question) => <li key={question}>{question}</li>)}
                    </ol>
                  </section>
                )}

                <section className="deep-grounding" aria-labelledby="grounding-heading">
                  <div className="deep-section-heading">
                    <span>Source anchor</span>
                    <h4 id="grounding-heading">{deepReading.sourceAnchor}</h4>
                  </div>
                  <p>This page uses original English synthesis. Use these links to inspect the primary text and edition record.</p>
                  {book.editorialNote && <p className="deep-editorial-note"><Shield size={15} weight="duotone" /> {book.editorialNote}</p>}
                  <div className="deep-source-links">
                    {book.sources.map((source, index) => (
                      <a href={source.url} key={`${source.label}:${index}`} target="_blank" rel="noreferrer">
                        <span><strong>{source.label}</strong><small>{source.note}</small></span>
                        <ArrowRight size={16} weight="bold" />
                      </a>
                    ))}
                  </div>
                </section>
              </article>
            </div>
          </section>
        )}
      </main>

      <footer className={`sequence-rail${book.taxonomy ? " has-taxonomy" : ""}${book.process ? " has-process" : ""}`} aria-label="Reading section sequence">
        <div className="sequence-title">
          <ListBullets size={18} weight="duotone" />
          <span>
            <strong>{book.taxonomy?.title ?? book.process?.title ?? "Text sequence"}</strong>
            <small>{book.taxonomy || book.process ? "Editorial navigation · source order preserved" : `Jump to any of the ${book.chapters.length} sections`}</small>
          </span>
        </div>
        <div className="sequence-center">
          {book.taxonomy && (
            <div className="taxonomy-filters" aria-label="Filter sections by speech mechanism">
              <button className={activeTaxonomy === "all" ? "active" : ""} onClick={() => setActiveTaxonomy("all")}>All {book.chapters.length}</button>
              {book.taxonomy.groups.map((group) => (
                <button
                  key={group.id}
                  className={activeTaxonomy === group.id ? "active" : ""}
                  style={{ "--filter-color": group.color } as CSSProperties}
                  onClick={() => setActiveTaxonomy(group.id)}
                  title={group.description}
                >
                  {group.label}
                </button>
              ))}
            </div>
          )}
          {book.process && (
            <div className="process-path" aria-label="Filter sections by moral state">
              <button className={activeProcess === "all" ? "active all-stage" : "all-stage"} onClick={() => setActiveProcess("all")}>All {book.chapters.length}</button>
              {book.process.stages.map((stage, index) => (
                <span className="process-step" key={stage.id}>
                  {index > 0 && <ArrowRight size={11} weight="bold" aria-hidden="true" />}
                  <button
                    className={activeProcess === stage.id ? "active" : ""}
                    style={{ "--filter-color": stage.color } as CSSProperties}
                    onClick={() => setActiveProcess(stage.id)}
                    title={stage.description}
                  >
                    <i>{String(index + 1).padStart(2, "0")}</i>
                    <span>{stage.label}</span>
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="sequence-track">
            {displayedChapters.map((item) => (
              <button
                key={item.id}
                className={item.id === chapter.id ? "active" : ""}
                onClick={() => selectChapter(item.id)}
                aria-label={`Section ${item.id}: ${item.shortTitle}`}
                title={item.shortTitle}
              >
                <span>{item.id}</span>
                <i />
              </button>
            ))}
          </div>
        </div>
        <div className="sequence-current">
          <span>{String(chapter.id).padStart(2, "0")}</span>
          <p><small>Current section</small><strong>{chapter.shortTitle}</strong></p>
        </div>
      </footer>
    </div>
  );
}

export default SystemApp;
