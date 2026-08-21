import {
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
import { chapters, conceptNodes, contentSources } from "./data";

type Depth = "glance" | "understand" | "deep" | "sources";
type Glyph = "name" | "forces" | "order" | "know" | "pattern" | "receive" | "clear" | "learn" | "prepare" | "witness" | "arrive" | "leverage" | "attend" | "assent" | "resolve" | "act" | "guard" | "remember" | "steady";

type JourneyNode = {
  id: string;
  label: string;
  micro: string;
  summary: string;
  guardrail: string;
  chapterId: number;
  glyph: Glyph;
};

type Journey = {
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

type SavedState = {
  journeyId: string;
  nodeId: string;
  depth: Depth;
  visited: string[];
  bookmarks: string[];
};

const journeys: Journey[] = [
  {
    id: "identity",
    number: "01",
    question: "What is the heart?",
    title: "Build the inner model",
    description:
      "Separate Ghazali's key terms, then see how perception, desire, anger, reason, and action are ordered around the governing heart.",
    payoff: "You leave with a working map of the human interior.",
    image: assetUrl("assets/system/journey-heart.jpg"),
    imageAlt: "Symbolic painted compass surrounded by four balanced coloured medallions and flowering plants.",
    minutes: 6,
    color: "#3567a6",
    nodes: [
      {
        id: "name-the-faculty",
        label: "Name the faculty",
        micro: "Meaning before metaphor",
        summary:
          "Ghazali's main subject is the subtle human faculty that knows, perceives, directs, and is morally addressed—not merely the bodily organ.",
        guardrail: "One word can carry bodily and inward meanings.",
        chapterId: 1,
        glyph: "name",
      },
      {
        id: "map-the-forces",
        label: "Map its forces",
        micro: "Perception, impulse, movement",
        summary:
          "The heart governs through visible powers such as limbs and senses, and inward powers such as memory, imagination, thought, appetite, and anger.",
        guardrail: "A force is not blameworthy simply because it exists.",
        chapterId: 2,
        glyph: "forces",
      },
      {
        id: "see-the-order",
        label: "See the order",
        micro: "Governor, adviser, provisioner",
        summary:
          "Ghazali's city and rider analogies ask which faculty is directing which: reason should advise, while appetite and anger should serve disciplined ends.",
        guardrail: "Reform means right order, not erasing every impulse.",
        chapterId: 3,
        glyph: "order",
      },
      {
        id: "add-knowledge-will",
        label: "Add knowledge & will",
        micro: "See the good; choose it",
        summary:
          "Knowledge can grasp meanings and consequences; will can pursue what judgment recognizes as good even when immediate appetite resists.",
        guardrail: "The speed of an impulse does not give it authority.",
        chapterId: 4,
        glyph: "know",
      },
      {
        id: "watch-character-form",
        label: "Watch character form",
        micro: "Repeated rule becomes disposition",
        summary:
          "Anger, appetite, and intelligence take different moral directions according to what rules the self and what each faculty is trained to serve.",
        guardrail: "The animal images name patterns, not fixed human identities.",
        chapterId: 5,
        glyph: "pattern",
      },
    ],
  },
  {
    id: "knowing",
    number: "02",
    question: "How does knowing happen?",
    title: "Trace knowledge into the heart",
    description:
      "Follow Ghazali's mirror, reservoir, and polished-wall models while preserving his distinctions between learning, inspiration, and revelation.",
    payoff: "You see why knowledge needs both acquisition and preparation.",
    image: assetUrl("assets/system/journey-knowing.jpg"),
    imageAlt: "Symbolic painted reservoir receiving clear water beside a polished brass mirror reflecting light.",
    minutes: 7,
    color: "#21867e",
    nodes: [
      {
        id: "receive-the-form",
        label: "Receive the form",
        micro: "The heart as mirror",
        summary:
          "Knowledge is likened to an intelligible form appearing in a mirror: the heart, the reality known, and its presence in the heart remain distinct.",
        guardrail: "The mirror analogy does not make every impression true.",
        chapterId: 6,
        glyph: "receive",
      },
      {
        id: "clear-obstructions",
        label: "Clear obstructions",
        micro: "Corrosion, veil, direction",
        summary:
          "Like a mirror, the heart may fail to receive clearly through incompleteness, corrosion, wrong direction, an intervening veil, or not knowing where to turn.",
        guardrail: "Clarity requires preparation and correct direction.",
        chapterId: 6,
        glyph: "clear",
      },
      {
        id: "distinguish-knowledge",
        label: "Distinguish kinds",
        micro: "Native, learned, religious",
        summary:
          "Ghazali distinguishes basic judgments from acquired knowledge, and knowledge grasped through reason from knowledge received through religious teaching.",
        guardrail: "The classification gives acquired learning a necessary place.",
        chapterId: 7,
        glyph: "know",
      },
      {
        id: "learn-by-evidence",
        label: "Learn by evidence",
        micro: "Instruction, reflection, inference",
        summary:
          "Ordinary learning proceeds through effort, instruction, evidence, reflection, and inference—the route whose steps a learner can trace.",
        guardrail: "The account never licenses neglect of disciplined learning.",
        chapterId: 8,
        glyph: "learn",
      },
      {
        id: "prepare-for-disclosure",
        label: "Prepare for disclosure",
        micro: "Reservoir and polished wall",
        summary:
          "The reservoir and polished wall compare gathering through the senses with removing veils and preparing the heart for inward disclosure.",
        guardrail: "Ghazali does not discard either knowledge or purification.",
        chapterId: 9,
        glyph: "prepare",
      },
      {
        id: "read-in-register",
        label: "Read in its register",
        micro: "Religious testimony",
        summary:
          "Ghazali supports inwardly granted knowledge from scripture and religious reports, within a framework that distinguishes prophecy, sainthood, and learning.",
        guardrail: "Inspiration is not presented as prophetic revelation.",
        chapterId: 10,
        glyph: "witness",
      },
    ],
  },
  {
    id: "action",
    number: "03",
    question: "How does a thought become an action?",
    title: "Slow down the moral moment",
    description:
      "Pull apart the stages that feel instantaneous. The point is not fear of every thought, but seeing where influence becomes increasingly voluntary.",
    payoff: "You gain earlier, more precise places to intervene.",
    image: assetUrl("assets/system/journey-action.jpg"),
    imageAlt: "A luminous seed travelling through six coloured brass gates before becoming a clear outward footprint.",
    minutes: 5,
    color: "#c85b42",
    nodes: [
      {
        id: "prompting-arrives",
        label: "A prompting arrives",
        micro: "Something occurs to the heart",
        summary:
          "The heart is continually visited by thoughts and inclinations. A passing suggestion is the beginning of the analysis, not yet a chosen act.",
        guardrail: "Occurrence is not the same as adoption.",
        chapterId: 11,
        glyph: "arrive",
      },
      {
        id: "impulse-gains-leverage",
        label: "It gains leverage",
        micro: "Desire and anger make a case",
        summary:
          "A destructive suggestion often exploits existing desire or anger and makes an impulse appear attractive or reasonable.",
        guardrail: "Influence works through the heart's existing organization.",
        chapterId: 11,
        glyph: "leverage",
      },
      {
        id: "attention-holds",
        label: "Attention holds it",
        micro: "The thought is entertained",
        summary:
          "Ghazali separates the first involuntary occurrence from later stages in which attention and inclination give the thought a more settled place.",
        guardrail: "The stages clarify responsibility; they are not a stopwatch.",
        chapterId: 13,
        glyph: "attend",
      },
      {
        id: "judgment-assents",
        label: "Judgment assents",
        micro: "The proposal is welcomed",
        summary:
          "Assent marks a deeper adoption than merely noticing a thought: judgment has begun to receive the proposal as one to follow.",
        guardrail: "A thought can be noticed and refused without being endorsed.",
        chapterId: 13,
        glyph: "assent",
      },
      {
        id: "resolve-commits",
        label: "Resolve commits",
        micro: "Intention points toward doing",
        summary:
          "Resolve is increasingly voluntary and morally significant: the person commits inwardly toward carrying the adopted intention out.",
        guardrail: "Ghazali still preserves pardon for what is not chosen.",
        chapterId: 13,
        glyph: "resolve",
      },
      {
        id: "action-follows",
        label: "Action follows",
        micro: "The inward order becomes visible",
        summary:
          "Action is the outward execution of the inwardly adopted direction. Limbs carry into the world the order established within.",
        guardrail: "The chapter distinguishes stages; it does not collapse them.",
        chapterId: 13,
        glyph: "act",
      },
    ],
  },
  {
    id: "change",
    number: "04",
    question: "What makes change last?",
    title: "Turn insight into repeated care",
    description:
      "Move from naming the pattern to guarding its entrances, recognizing it early, and supporting the better influence when the heart is contested.",
    payoff: "You replace one dramatic fix with an honest practice of vigilance.",
    image: assetUrl("assets/system/journey-change.jpg"),
    imageAlt: "A painted brass compass encircled by blue and coral currents and a flowering pomegranate branch.",
    minutes: 6,
    color: "#86577f",
    nodes: [
      {
        id: "name-ruling-pattern",
        label: "Name the pattern",
        micro: "What repeatedly takes rule?",
        summary:
          "Ghazali's images of anger, appetite, cunning, and wisdom make recurring directions visible so that they can be governed rather than mistaken for identity.",
        guardrail: "A recurring pattern is not an unchangeable essence.",
        chapterId: 5,
        glyph: "pattern",
      },
      {
        id: "find-entrances",
        label: "Find the entrances",
        micro: "Know the vulnerable gates",
        summary:
          "Anger, appetite, envy, greed, haste, suspicion, and attachment to wealth or status are among the recurring entrances that cloud judgment.",
        guardrail: "The work is self-watchfulness, not diagnosing other people.",
        chapterId: 12,
        glyph: "guard",
      },
      {
        id: "interrupt-earlier",
        label: "Interrupt earlier",
        micro: "Recognition before recruitment",
        summary:
          "A prepared heart can recognize and resist a suggestion before it recruits imagination, judgment, resolve, and action.",
        guardrail: "Early recognition is easier than late interruption.",
        chapterId: 11,
        glyph: "attend",
      },
      {
        id: "remember-without-panic",
        label: "Remember without panic",
        micro: "Presence is not dominion",
        summary:
          "Some promptings cease when exposed; others remain but lose power. A recurring thought does not itself prove that remembrance has failed.",
        guardrail: "Ask whether the thought rules, persuades, or is refused.",
        chapterId: 14,
        glyph: "remember",
      },
      {
        id: "support-better-influence",
        label: "Support the better influence",
        micro: "Contested hearts can turn",
        summary:
          "Many hearts remain contested and change according to which influence receives support; trained receptivity lets good lead toward further good.",
        guardrail: "Neither one lapse nor one insight ends the contest.",
        chapterId: 15,
        glyph: "steady",
      },
      {
        id: "repeat-care",
        label: "Repeat the care",
        micro: "Steadiness is maintained",
        summary:
          "Because the heart changes rapidly, Ghazali's closing model calls for repeated care rather than a single moment of insight followed by neglect.",
        guardrail: "Lasting change is vigilance made regular.",
        chapterId: 15,
        glyph: "act",
      },
    ],
  },
];

const depthOptions: Array<{ id: Depth; label: string; short: string }> = [
  { id: "glance", label: "30 seconds", short: "30s" },
  { id: "understand", label: "Understand", short: "Core" },
  { id: "deep", label: "Go deep", short: "Deep" },
  { id: "sources", label: "Grounding", short: "Source" },
];

const mapPositions = {
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

const STORAGE_KEY = "ihya-system-state-v1";

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
  }
}

function initialState(): SavedState {
  const fallback: SavedState = {
    journeyId: "action",
    nodeId: "prompting-arrives",
    depth: "glance",
    visited: ["action:prompting-arrives"],
    bookmarks: [],
  };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    const journey = journeys.find((item) => item.id === parsed.journeyId);
    const node = journey?.nodes.find((item) => item.id === parsed.nodeId);
    if (!journey || !node) return fallback;
    return {
      journeyId: journey.id,
      nodeId: node.id,
      depth: depthOptions.some((item) => item.id === parsed.depth) ? parsed.depth! : "glance",
      visited: Array.isArray(parsed.visited) ? parsed.visited : [],
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
    };
  } catch {
    return fallback;
  }
}

function SystemApp() {
  const [saved, setSaved] = useState<SavedState>(initialState);
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const journey = journeys.find((item) => item.id === saved.journeyId) ?? journeys[2];
  const node = journey.nodes.find((item) => item.id === saved.nodeId) ?? journey.nodes[0];
  const chapter = chapters.find((item) => item.id === node.chapterId)!;
  const nodeKey = `${journey.id}:${node.id}`;
  const isBookmarked = saved.bookmarks.includes(nodeKey);
  const positions = mapPositions[journey.nodes.length as 5 | 6];
  const relatedConcepts = useMemo(
    () => conceptNodes.filter((concept) => chapter.relatedNodes.includes(concept.id)),
    [chapter],
  );
  const concept = conceptNodes.find((item) => item.id === activeConcept) ?? null;
  const totalNodes = journeys.reduce((total, item) => total + item.nodes.length, 0);

  useEffect(() => {
    document.body.classList.add("system-page");
    return () => document.body.classList.remove("system-page");
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  const selectJourney = (next: Journey) => {
    const first = next.nodes[0];
    const key = `${next.id}:${first.id}`;
    setActiveConcept(null);
    setSaved((current) => ({
      ...current,
      journeyId: next.id,
      nodeId: first.id,
      visited: current.visited.includes(key) ? current.visited : [...current.visited, key],
    }));
  };

  const selectNode = (next: JourneyNode) => {
    const key = `${journey.id}:${next.id}`;
    setActiveConcept(null);
    setSaved((current) => ({
      ...current,
      nodeId: next.id,
      visited: current.visited.includes(key) ? current.visited : [...current.visited, key],
    }));
  };

  const selectChapter = (chapterId: number) => {
    const nextJourney = journeys.find((item) => item.nodes.some((itemNode) => itemNode.chapterId === chapterId));
    const nextNode = nextJourney?.nodes.find((item) => item.chapterId === chapterId);
    if (!nextJourney || !nextNode) return;
    const key = `${nextJourney.id}:${nextNode.id}`;
    setActiveConcept(null);
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
          <span>Book 21 of 40</span>
          <strong>The Wonders of the Heart</strong>
        </div>

        <div className="system-status" aria-label="Saved reading progress">
          <span className="status-meter"><i style={{ width: `${(saved.visited.length / totalNodes) * 100}%` }} /></span>
          <span><strong>{saved.visited.length}</strong> of {totalNodes} ideas seen</span>
          <BookmarkSimple size={18} weight={saved.bookmarks.length ? "fill" : "regular"} />
          <span>{saved.bookmarks.length}</span>
        </div>
      </header>

      <main className="system-workspace" id="system-main">
        <aside className="question-panel" aria-label="Learning journeys">
          <div className="panel-kicker">
            <Compass size={17} weight="duotone" />
            <span>Start with a question</span>
          </div>
          <h1>Learn by structure,<br />not page count.</h1>
          <p className="question-intro">Choose the confusion you want Ghazali to resolve.</p>

          <nav className="question-list">
            {journeys.map((item) => {
              const isActive = item.id === journey.id;
              const seen = item.nodes.filter((itemNode) => saved.visited.includes(`${item.id}:${itemNode.id}`)).length;
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
              const wasVisited = saved.visited.includes(`${journey.id}:${item.id}`);
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
              <span>Forces in this section</span>
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

            {saved.depth === "deep" && (
              <div className="depth-content deep-content">
                <div className="formal-title">
                  <span>In the text's sequence</span>
                  <strong>{chapter.formalTitle}</strong>
                </div>
                <p>{chapter.overview}</p>
                <ul>
                  {chapter.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <blockquote>
                  <span>Reflect</span>
                  {chapter.reflection}
                </blockquote>
                <details className="self-explain">
                  <summary>Pause and put the distinction in your own words</summary>
                  <p>What changes between this stage and the one before it? If you cannot say it simply yet, revisit the mechanism map.</p>
                </details>
              </div>
            )}

            {saved.depth === "sources" && (
              <div className="depth-content source-content">
                <div className="grounding-label">
                  <BookOpenText size={21} weight="duotone" />
                  <p><strong>Grounded to Book 21, section {chapter.id}</strong><span>{chapter.formalTitle}</span></p>
                </div>
                <p>This prototype uses original English synthesis. It is designed to preserve the section's distinctions while guiding the reader back to primary and published texts.</p>
                <div className="source-list">
                  {contentSources.map((source) => (
                    <a href={source.url} key={source.url} target="_blank" rel="noreferrer">
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
      </main>

      <footer className="sequence-rail" aria-label="Original section sequence">
        <div className="sequence-title">
          <ListBullets size={18} weight="duotone" />
          <span><strong>Text sequence</strong><small>Jump to any of the 15 sections</small></span>
        </div>
        <div className="sequence-track">
          {chapters.map((item) => (
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
        <div className="sequence-current">
          <span>{String(chapter.id).padStart(2, "0")}</span>
          <p><small>Current section</small><strong>{chapter.shortTitle}</strong></p>
        </div>
      </footer>
    </div>
  );
}

export default SystemApp;
