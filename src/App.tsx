import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  ArrowsClockwise,
  BookmarkSimple,
  BookOpenText,
  Books,
  Brain,
  Check,
  CheckCircle,
  Compass,
  Drop,
  Eye,
  Heart,
  Info,
  MapTrifold,
  Moon,
  Path,
  ShieldCheck,
  Sparkle,
  Sun,
  Waves,
  Wind,
  X,
} from "@phosphor-icons/react";
import {
  architectureSources,
  chapters,
  contentSources,
  quarters,
  type RouteStyle,
} from "./data";
import {
  visualStories,
  visualStoryForChapter,
  type VisualStory,
  type VisualStoryId,
} from "./visuals";
import { assetUrl } from "./assetUrl";

type Theme = "light" | "dark";
type ReadingLayerId = "orient" | "model" | "read" | "verify";

type SavedState = {
  bookmarks: number[];
  read: number[];
  selectedChapter: number;
  theme: Theme;
};

const STORAGE_KEY = "revival-showcase-state-v2";
const LEGACY_STORAGE_KEY = "revival-showcase-state-v1";

const getInitialRoute = (): RouteStyle =>
  window.location.pathname.includes("world") || window.location.pathname.includes("mixed")
    ? "world"
    : "isfahan";

const getInitialState = (): SavedState => {
  const fallback: SavedState = {
    bookmarks: [],
    read: [],
    selectedChapter: 1,
    theme: "light",
  };

  try {
    const currentValue = window.localStorage.getItem(STORAGE_KEY);
    const value = currentValue ?? window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!value) return fallback;
    const parsed = JSON.parse(value) as Partial<SavedState>;
    return {
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      read: Array.isArray(parsed.read) ? parsed.read : [],
      selectedChapter:
        typeof parsed.selectedChapter === "number" ? parsed.selectedChapter : 1,
      theme:
        currentValue && (parsed.theme === "dark" || parsed.theme === "light")
          ? parsed.theme
          : fallback.theme,
    };
  } catch {
    return fallback;
  }
};

const routeContent = {
  isfahan: {
    label: "Isfahan",
    eyebrow: "A reading courtyard",
    title: "The inner life, arranged around a quiet center.",
    description:
      "The four quarters become four directions. Each book is a vaulted threshold, while the reading surface keeps one concept in view at a time.",
    primaryImage: assetUrl("assets/isfahan-taj-dome.jpg"),
    primaryAlt: "Brick geometry inside the Taj al-Mulk dome at the Friday Mosque of Isfahan",
    insetImage: assetUrl("assets/isfahan-courtyard.jpg"),
    insetAlt: "Courtyard and south vaulted hall at the Friday Mosque of Isfahan",
    caption: "Friday Mosque of Isfahan, north dome and four-sided courtyard",
  },
  world: {
    label: "Global",
    eyebrow: "A luminous reading hall",
    title: "Many architectural lineages, held in one clear system.",
    description:
      "Makkah supplies the dominant ceiling language. Córdoba shapes the reading rhythm, while Selimiye contributes a centered, illuminated focus.",
    primaryImage: assetUrl("assets/makkah-ceiling-spa.jpg"),
    primaryAlt: "Octagonal ceiling coffers in a current expansion of the Grand Mosque of Makkah",
    insetImage: assetUrl("assets/makkah-interior.jpg"),
    insetAlt: "A large arch framing the central court of the Grand Mosque of Makkah",
    caption: "Grand Mosque of Makkah, current expansion interior",
  },
} satisfies Record<RouteStyle, Record<string, string>>;

const quarterMeta = {
  worship: { numeral: "I", range: "01–10", shortTitle: "Worship", icon: Sparkle },
  customs: { numeral: "II", range: "11–20", shortTitle: "Customs", icon: Compass },
  perils: { numeral: "III", range: "21–30", shortTitle: "Perils", icon: ShieldCheck },
  deliverance: { numeral: "IV", range: "31–40", shortTitle: "Deliverance", icon: Sun },
} as const;

const readingLayers = [
  {
    id: "orient",
    number: "01",
    label: "Orient",
    title: "See the book before the section.",
    description:
      "The section rail and visual atlas preserve the shape of the whole book while one argument is in focus.",
    icon: MapTrifold,
  },
  {
    id: "model",
    number: "02",
    label: "Explore",
    title: "Touch the parts of an analogy.",
    description:
      "Labelled visual models turn relationships in the text into something that can be inspected without presenting the image as the source itself.",
    icon: Eye,
  },
  {
    id: "read",
    number: "03",
    label: "Read",
    title: "Move from the short path to detail.",
    description:
      "Begin with a concise paraphrase and its argument map, then open the practical thread when more depth is useful.",
    icon: BookOpenText,
  },
  {
    id: "verify",
    number: "04",
    label: "Verify",
    title: "Keep interpretation attached to its source.",
    description:
      "The grounding ledger separates primary text, edition cross-checks, concise editorial copy, and visual interpretation.",
    icon: Books,
  },
] satisfies Array<{
  id: ReadingLayerId;
  number: string;
  label: string;
  title: string;
  description: string;
  icon: typeof Books;
}>;

function StoryGlyph({ storyId, index = 0, size = 20 }: { storyId: VisualStoryId; index?: number; size?: number }) {
  const iconSets = {
    lexicon: [BookOpenText, Compass, Heart],
    city: [Eye, Brain, Path],
    mirror: [Eye, Sparkle, Compass],
    reservoir: [Waves, Drop, Heart],
    fortress: [Path, ShieldCheck, Eye],
    conditions: [Sparkle, ArrowsClockwise, Compass],
  } satisfies Record<VisualStoryId, Array<typeof Heart>>;
  const Icon = iconSets[storyId][index % iconSets[storyId].length];
  return <Icon size={size} weight="regular" aria-hidden="true" />;
}

function LexiconPlate({
  story,
  selected,
  onSelect,
}: {
  story: VisualStory;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const icons = [Heart, Wind, Compass, Brain];

  return (
    <div className="lexicon-plate">
      <div className="lexicon-center" aria-hidden="true">
        <BookOpenText size={34} weight="regular" />
        <span>Several meanings</span>
      </div>
      {story.nodes.map((item, index) => {
        const Icon = icons[index];
        return (
          <button
            type="button"
            key={item.id}
            className={`lexicon-node lexicon-node-${index + 1} ${selected === item.id ? "active" : ""}`}
            aria-pressed={selected === item.id}
            onClick={() => onSelect(item.id)}
          >
            <Icon size={25} weight="regular" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function ConditionsPlate({
  story,
  selected,
  onSelect,
}: {
  story: VisualStory;
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="conditions-plate">
      {story.nodes.map((item, index) => (
        <button
          type="button"
          key={item.id}
          className={`condition-state condition-state-${index + 1} ${selected === item.id ? "active" : ""}`}
          aria-pressed={selected === item.id}
          onClick={() => onSelect(item.id)}
        >
          <span className="condition-heart" aria-hidden="true">
            <Heart size={54} weight={index === 1 ? "duotone" : "regular"} />
          </span>
          <strong>{item.label}</strong>
          <small>{index === 0 ? "receptive" : index === 1 ? "overruled" : "changing"}</small>
        </button>
      ))}
    </div>
  );
}

function App() {
  const initial = useMemo(getInitialState, []);
  const [route, setRoute] = useState<RouteStyle>(getInitialRoute);
  const [theme, setTheme] = useState<Theme>(initial.theme);
  const [selectedChapter, setSelectedChapter] = useState(initial.selectedChapter);
  const [selectedNode, setSelectedNode] = useState("heart-term");
  const [bookmarks, setBookmarks] = useState<number[]>(initial.bookmarks);
  const [read, setRead] = useState<number[]>(initial.read);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [activeQuarter, setActiveQuarter] = useState("perils");
  const [selectedBookId, setSelectedBookId] = useState(21);
  const [activeReadingLayer, setActiveReadingLayer] = useState<ReadingLayerId>("orient");
  const [notice, setNotice] = useState("Progress is saved on this device.");
  const noticeTimer = useRef<number | null>(null);
  const chapterListRef = useRef<HTMLDivElement>(null);
  const visualAtlasRef = useRef<HTMLElement>(null);
  const readingPanelRef = useRef<HTMLElement>(null);

  const chapter = chapters.find((item) => item.id === selectedChapter) ?? chapters[0];
  const visualStory = visualStoryForChapter(chapter.id);
  const node = visualStory.nodes.find((item) => item.id === selectedNode) ?? visualStory.nodes[0];
  const copy = routeContent[route];
  const activeQuarterData = quarters.find((item) => item.id === activeQuarter) ?? quarters[0];
  const activeQuarterDetails = quarterMeta[activeQuarterData.id as keyof typeof quarterMeta];
  const selectedBook =
    activeQuarterData.books.find((item) => item.id === selectedBookId) ?? activeQuarterData.books[0];
  const selectedBookReady = selectedBook.id === 21;
  const chapterPosition = chapters.findIndex((item) => item.id === chapter.id);
  const previousChapter = chapterPosition > 0 ? chapters[chapterPosition - 1] : undefined;
  const nextChapter = chapterPosition < chapters.length - 1 ? chapters[chapterPosition + 1] : undefined;
  const hasReadingState = selectedChapter !== 1 || read.length > 0 || bookmarks.length > 0;
  const activeLayer =
    readingLayers.find((item) => item.id === activeReadingLayer) ?? readingLayers[0];

  useEffect(() => {
    const onPopState = () => setRoute(getInitialRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ bookmarks, read, selectedChapter, theme } satisfies SavedState),
    );
  }, [bookmarks, read, selectedChapter, theme]);

  useEffect(() => {
    if (!visualStory.nodes.some((item) => item.id === selectedNode)) {
      setSelectedNode(visualStory.nodes[0].id);
    }
  }, [selectedNode, visualStory]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSourcesOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (window.innerWidth > 760) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = (container: HTMLElement | null, selector: string) => {
      const item = container?.querySelector<HTMLElement>(selector);
      if (!container || !item) return;
      container.scrollTo({
        left: item.offsetLeft - (container.clientWidth - item.clientWidth) / 2,
        behavior: reduced ? "auto" : "smooth",
      });
    };
    reveal(chapterListRef.current, `[data-chapter-id="${selectedChapter}"]`);
    reveal(visualAtlasRef.current, `[data-story-id="${visualStory.id}"]`);
  }, [selectedChapter, visualStory.id]);

  useEffect(() => {
    readingPanelRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [selectedChapter]);

  const announce = (message: string) => {
    setNotice(message);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(
      () => setNotice("Progress is saved on this device."),
      2400,
    );
  };

  const changeRoute = (nextRoute: RouteStyle) => {
    if (nextRoute === route) return;
    const path = nextRoute === "world" ? "/world" : "/isfahan";
    window.history.pushState({}, "", path);
    setRoute(nextRoute);
  };

  const enterBook = () => {
    document.getElementById("study")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  const enterLibrary = () => {
    document.getElementById("library")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  const chooseQuarter = (quarterId: string) => {
    const quarter = quarters.find((item) => item.id === quarterId) ?? quarters[0];
    setActiveQuarter(quarter.id);
    setSelectedBookId(quarter.books[0].id);
  };

  const toggleBookmark = () => {
    const isSaved = bookmarks.includes(chapter.id);
    setBookmarks((items) =>
      isSaved ? items.filter((id) => id !== chapter.id) : [...items, chapter.id],
    );
    announce(isSaved ? "Bookmark removed." : `Section ${chapter.id} bookmarked.`);
  };

  const toggleRead = () => {
    const isRead = read.includes(chapter.id);
    setRead((items) =>
      isRead ? items.filter((id) => id !== chapter.id) : [...items, chapter.id],
    );
    announce(isRead ? "Section marked unread." : `Section ${chapter.id} marked read.`);
  };

  const chooseChapter = (id: number) => {
    setSelectedChapter(id);
    setSelectedNode(visualStoryForChapter(id).nodes[0].id);
  };

  return (
    <div className={`app route-${route}`} data-theme={theme}>
      <a className="skip-link" href="#main-content">
        Skip to reading
      </a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="The Revival home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-copy">
            <strong>The Revival</strong>
            <small>Interactive reading</small>
          </span>
        </a>

        <nav className="direction-switch" aria-label="Architectural direction">
          <button
            type="button"
            className={route === "isfahan" ? "active" : ""}
            onClick={() => changeRoute("isfahan")}
            aria-pressed={route === "isfahan"}
          >
            Isfahan
          </button>
          <button
            type="button"
            className={route === "world" ? "active" : ""}
            onClick={() => changeRoute("world")}
            aria-pressed={route === "world"}
          >
            Global
          </button>
        </nav>

        <div className="top-actions">
          <button className="text-action" type="button" onClick={enterLibrary}>
            <MapTrifold size={19} weight="regular" />
            <span>40-book library</span>
          </button>
          <button className="text-action" type="button" onClick={() => setSourcesOpen(true)}>
            <Info size={19} weight="regular" />
            <span>Sources</span>
          </button>
          <button
            className="icon-action"
            type="button"
            aria-label={theme === "dark" ? "Use light appearance" : "Use dark appearance"}
            title={theme === "dark" ? "Use light appearance" : "Use dark appearance"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="hero-description">{copy.description}</p>

            <div className="book-intro">
              <span className="book-number">21</span>
              <div>
                <small>First interactive book</small>
                <strong>The Wonders of the Heart</strong>
              </div>
            </div>

            <div className="hero-actions">
              <button className="primary-action" type="button" onClick={enterBook}>
                {hasReadingState ? `Continue at section ${String(chapter.id).padStart(2, "0")}` : "Open Book 21"}
                <ArrowDown size={18} />
              </button>
              <button className="secondary-action" type="button" onClick={enterLibrary}>
                Explore all 40 books
              </button>
            </div>

            <div className="saved-summary" aria-live="polite">
              <BookmarkSimple size={17} weight={bookmarks.length ? "fill" : "regular"} />
              <span>
                {bookmarks.length} saved, {read.length} of 15 sections read
              </span>
            </div>
          </div>

          <figure className="hero-architecture">
            <div className="architecture-photo">
              <img src={copy.primaryImage} alt={copy.primaryAlt} fetchPriority="high" decoding="async" />
            </div>
            <div className="architecture-inset">
              <img src={copy.insetImage} alt={copy.insetAlt} loading="lazy" decoding="async" />
              <span>Built reference</span>
            </div>
            <figcaption>
              <span>{copy.caption}</span>
              <button type="button" onClick={() => setSourcesOpen(true)}>
                See the architectural ledger
                <ArrowSquareOut size={15} />
              </button>
            </figcaption>
          </figure>
        </section>

        <section className="library-section" id="library" aria-labelledby="library-title">
          <div className="library-intro">
            <div>
              <p className="eyebrow">The complete work</p>
              <h2 id="library-title">Forty books, held in one visible journey.</h2>
              <p>
                The Revival is arranged as four quarters of ten books. Move between the
                quarters, inspect every title, and enter an interactive book only after its
                source preparation is complete.
              </p>
            </div>
            <div className="library-total" aria-label="40 books in four quarters">
              <strong>40</strong>
              <span>books</span>
              <small>four quarters</small>
            </div>
          </div>

          <div className="quarter-arcade" role="tablist" aria-label="Quarters of The Revival">
            {quarters.map((quarter) => {
              const details = quarterMeta[quarter.id as keyof typeof quarterMeta];
              const QuarterIcon = details.icon;
              const selected = activeQuarter === quarter.id;

              return (
                <button
                  type="button"
                  role="tab"
                  key={quarter.id}
                  aria-selected={selected}
                  className={selected ? "active" : ""}
                  onClick={() => chooseQuarter(quarter.id)}
                >
                  <span className="quarter-vault" aria-hidden="true">
                    <QuarterIcon size={25} weight="regular" />
                    <em>{details.numeral}</em>
                  </span>
                  <span className="quarter-tab-copy">
                    <small>Books {details.range}</small>
                    <strong>{details.shortTitle}</strong>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="library-court">
            <aside className="quarter-focus" aria-label={`${activeQuarterDetails.shortTitle} overview`}>
              <div className="quarter-rosette" aria-hidden="true">
                <span>{activeQuarterDetails.numeral}</span>
              </div>
              <p className="quarter-kicker">{activeQuarterData.title}</p>
              <h3>{activeQuarterDetails.shortTitle}</h3>
              <p className="quarter-description">{activeQuarterData.focus}</p>
              <div className="quarter-readiness">
                <span>
                  {activeQuarterData.id === "perils" ? "1 of 10 prepared" : "Source preparation"}
                </span>
                <progress
                  max={10}
                  value={activeQuarterData.id === "perils" ? 1 : 0}
                  aria-label={
                    activeQuarterData.id === "perils"
                      ? "1 of 10 books prepared in this quarter"
                      : "No books prepared in this quarter yet"
                  }
                />
              </div>
            </aside>

            <div
              className="library-books"
              role="tabpanel"
              aria-label={`${activeQuarterDetails.shortTitle} books`}
            >
              <header>
                <span>Ten books</span>
                <small>Select a title to inspect it</small>
              </header>
              <div className="library-book-list">
                {activeQuarterData.books.map((book) => {
                  const ready = book.id === 21;
                  const selected = selectedBook.id === book.id;

                  return (
                    <button
                      type="button"
                      key={book.id}
                      className={`${selected ? "active" : ""} ${ready ? "ready" : ""}`}
                      aria-pressed={selected}
                      onClick={() => setSelectedBookId(book.id)}
                    >
                      <span className="library-book-number" aria-hidden="true">
                        {String(book.id).padStart(2, "0")}
                      </span>
                      <span className="library-book-title">{book.title}</span>
                      <span className="library-book-status">
                        {ready ? "Ready" : "Mapped"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <article className="book-preview" key={selectedBook.id} aria-live="polite">
              {selectedBookReady ? (
                <figure className="book-preview-mosaic">
                  <img
                    className="preview-main"
                    src={assetUrl("assets/heart-city-concept-luminous-thumb.jpg")}
                    alt="Luminous inner-city visual model from The Wonders of the Heart"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={assetUrl("assets/heart-mirror-obstructions-luminous-thumb.jpg")}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={assetUrl("assets/reservoir-knowledge-luminous-thumb.jpg")}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>Visual models inside Book 21</figcaption>
                </figure>
              ) : (
                <div className="book-preview-seal" aria-hidden="true">
                  <span>Book</span>
                  <strong>{String(selectedBook.id).padStart(2, "0")}</strong>
                  <small>{activeQuarterDetails.numeral}</small>
                </div>
              )}

              <div className="book-preview-copy">
                <div className={`availability ${selectedBookReady ? "ready" : ""}`}>
                  <span aria-hidden="true" />
                  {selectedBookReady ? "Interactive edition available" : "Source preparation"}
                </div>
                <p>Book {String(selectedBook.id).padStart(2, "0")}</p>
                <h3>{selectedBook.title}</h3>
                <p className="book-preview-description">
                  {selectedBookReady
                    ? "Fifteen concise sections, six interactive visual models, section bookmarks, and saved reading progress are ready to use."
                    : "This title is positioned in the complete structure. Its interactive edition will remain closed until its source text, outline, and English copy have completed review."}
                </p>

                {selectedBookReady ? (
                  <>
                    <div className="book-preview-progress">
                      <span>{read.length} of 15 sections read</span>
                      <progress
                        max={15}
                        value={read.length}
                        aria-label={`${read.length} of 15 Book 21 sections read`}
                      />
                    </div>
                    <button className="primary-action" type="button" onClick={enterBook}>
                      {hasReadingState ? "Continue Book 21" : "Begin Book 21"}
                      <ArrowRight size={18} />
                    </button>
                  </>
                ) : (
                  <button className="secondary-action" type="button" disabled>
                    Opens after source review
                  </button>
                )}
              </div>
            </article>
          </div>
        </section>

        <section className="method-section" aria-labelledby="method-title">
          <div className="method-artboard">
            <header>
              <span>{activeLayer.number}</span>
              <small>{activeLayer.label}</small>
            </header>

            <div className="method-frame" key={activeLayer.id}>
              {activeLayer.id === "orient" && (
                <div className="method-orbit" aria-label="A visual overview of fifteen sections">
                  <span className="orbit-label orbit-label-top">Meanings</span>
                  <span className="orbit-label orbit-label-right">Knowledge</span>
                  <span className="orbit-label orbit-label-bottom">Change</span>
                  <span className="orbit-label orbit-label-left">Character</span>
                  <div className="orbit-center">
                    <strong>15</strong>
                    <small>sections</small>
                  </div>
                </div>
              )}

              {activeLayer.id === "model" && (
                <figure className="method-model-preview">
                  <img
                    src={assetUrl("assets/reservoir-knowledge-luminous.jpg")}
                    alt="Reservoir visual model with streams, a central basin, clearing, and an underground spring"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="model-point model-point-one">Streams</span>
                  <span className="model-point model-point-two">Reservoir</span>
                  <span className="model-point model-point-three">Spring</span>
                </figure>
              )}

              {activeLayer.id === "read" && (
                <article className="method-page-preview" aria-label={`Preview of section ${chapter.id}`}>
                  <header>
                    <span>Book 21</span>
                    <span>Section {String(chapter.id).padStart(2, "0")}</span>
                  </header>
                  <h3>{chapter.shortTitle}</h3>
                  <p>{chapter.overview}</p>
                  <div>
                    <span aria-hidden="true">
                      <StoryGlyph storyId={visualStory.id} size={18} />
                    </span>
                    <strong>{chapter.points?.[0]}</strong>
                  </div>
                </article>
              )}

              {activeLayer.id === "verify" && (
                <div className="method-source-stack" aria-label="Four-part source trail">
                  <div>
                    <span>01</span>
                    <strong>Primary text</strong>
                    <small>Terms and sequence</small>
                  </div>
                  <div>
                    <span>02</span>
                    <strong>Edition cross-check</strong>
                    <small>Structure and titles</small>
                  </div>
                  <div>
                    <span>03</span>
                    <strong>Editorial layer</strong>
                    <small>Concise English paraphrase</small>
                  </div>
                  <div>
                    <span>04</span>
                    <strong>Visual interpretation</strong>
                    <small>Clearly marked reading aid</small>
                  </div>
                </div>
              )}
            </div>

            <div className="method-art-caption" aria-live="polite">
              <strong>{activeLayer.title}</strong>
              <span>{activeLayer.description}</span>
            </div>
          </div>

          <div className="method-copy">
            <p className="eyebrow">Interactive reading, not gamification</p>
            <h2 id="method-title">Read at the depth you have time for.</h2>
            <p className="method-intro">
              There are no quizzes or detours. Every interaction either shortens the path to
              understanding, reveals more detail, or makes the source boundary clearer.
            </p>

            <nav className="reading-layer-tabs" aria-label="Reading depths">
              {readingLayers.map((layer) => {
                const LayerIcon = layer.icon;
                const selected = activeLayer.id === layer.id;

                return (
                  <button
                    type="button"
                    key={layer.id}
                    className={selected ? "active" : ""}
                    aria-pressed={selected}
                    onClick={() => setActiveReadingLayer(layer.id)}
                  >
                    <span className="layer-number">{layer.number}</span>
                    <span className="layer-icon" aria-hidden="true">
                      <LayerIcon size={20} weight="regular" />
                    </span>
                    <span className="layer-copy">
                      <small>{layer.label}</small>
                      <strong>{layer.title}</strong>
                    </span>
                    <ArrowRight size={17} aria-hidden="true" />
                  </button>
                );
              })}
            </nav>
          </div>
        </section>

        <section className="study-section" id="study">
          <div className="study-heading">
            <div>
              <p className="eyebrow">Book 21 study surface</p>
              <h2>Hold the whole argument while reading one part.</h2>
            </div>
            <div className="progress-block">
              <span>{read.length} of 15 read</span>
              <progress max={15} value={read.length} aria-label={`${read.length} of 15 sections read`} />
            </div>
          </div>

          <nav ref={visualAtlasRef} className="visual-atlas" aria-label="Visual chapter map">
            {visualStories.map((story) => (
              <button
                type="button"
                key={story.id}
                data-story-id={story.id}
                className={story.id === visualStory.id ? "active" : ""}
                aria-current={story.id === visualStory.id ? "step" : undefined}
                onClick={() => chooseChapter(story.chapterIds[0])}
              >
                <span className={`atlas-preview atlas-preview-${story.id}`} aria-hidden="true">
                  {story.asset ? (
                    <img src={story.thumbnail ?? story.asset} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <StoryGlyph storyId={story.id} size={28} />
                  )}
                </span>
                <span className="atlas-copy">
                  <strong>{story.navLabel}</strong>
                  <small>{story.scope}</small>
                </span>
              </button>
            ))}
          </nav>

          <div className="study-grid">
            <aside className="chapter-rail" aria-label="Book 21 sections">
              <div className="rail-heading">
                <span>Quarter of Perils</span>
                <strong>15 sections</strong>
              </div>
              <div ref={chapterListRef} className="chapter-list">
                {chapters.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    data-chapter-id={item.id}
                    className={item.id === chapter.id ? "active" : ""}
                    onClick={() => chooseChapter(item.id)}
                    aria-current={item.id === chapter.id ? "step" : undefined}
                  >
                    <span className="chapter-index">
                      {read.includes(item.id) ? <Check size={13} weight="bold" /> : item.id}
                    </span>
                    <span className="chapter-label">{item.shortTitle}</span>
                    {bookmarks.includes(item.id) && (
                      <BookmarkSimple className="saved-icon" size={14} weight="fill" aria-label="Bookmarked" />
                    )}
                  </button>
                ))}
              </div>
            </aside>

            <section className="concept-panel" aria-labelledby="concept-title">
              <div className="panel-heading">
                <div>
                  <span>Interactive visual model</span>
                  <h3 id="concept-title">{visualStory.title}</h3>
                </div>
                <small>{visualStory.scope}</small>
              </div>

              <div className="concept-visual">
                <figure className={`concept-figure story-${visualStory.id}`}>
                  {visualStory.asset ? (
                    <>
                      <img
                        key={visualStory.asset}
                        src={visualStory.asset}
                        alt={visualStory.alt}
                        loading="lazy"
                        decoding="async"
                      />
                      {visualStory.nodes.map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          style={{ left: `${item.x}%`, top: `${item.y}%` }}
                          className={`concept-hotspot ${selectedNode === item.id ? "active" : ""}`}
                          aria-pressed={selectedNode === item.id}
                          onClick={() => setSelectedNode(item.id)}
                        >
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </>
                  ) : visualStory.id === "lexicon" ? (
                    <LexiconPlate
                      story={visualStory}
                      selected={selectedNode}
                      onSelect={setSelectedNode}
                    />
                  ) : (
                    <ConditionsPlate
                      story={visualStory}
                      selected={selectedNode}
                      onSelect={setSelectedNode}
                    />
                  )}
                </figure>
                <div className="concept-caption">
                  <Info size={15} weight="regular" aria-hidden="true" />
                  <span>{visualStory.caption}</span>
                </div>
              </div>

              <div className="concept-explanation" key={`${visualStory.id}-${node.id}`}>
                <div className="concept-number" aria-hidden="true">
                  {String(visualStory.nodes.findIndex((item) => item.id === node.id) + 1).padStart(2, "0")}
                </div>
                <div>
                  <span>{node.kicker}</span>
                  <h4>{node.label}</h4>
                  <p>{node.description}</p>
                </div>
              </div>

              <div className="related-nodes">
                <span>Explore this model</span>
                <div>
                  {visualStory.nodes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={selectedNode === item.id ? "active" : ""}
                      onClick={() => setSelectedNode(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <article ref={readingPanelRef} className="reading-panel" key={chapter.id}>
              <header>
                <div className="section-meta">
                  <span>Section {String(chapter.id).padStart(2, "0")}</span>
                  <span>Concise paraphrase</span>
                </div>
                <div className="chapter-title-lockup">
                  <span className="chapter-emblem" aria-hidden="true">
                    <StoryGlyph storyId={visualStory.id} size={28} />
                  </span>
                  <div>
                    <h2>{chapter.shortTitle}</h2>
                    <p className="formal-title">{chapter.formalTitle}</p>
                  </div>
                </div>
              </header>

              <div className="reading-body">
                <p className="lead">{chapter.overview}</p>
                <div className="visual-takeaway">
                  <h3>Argument in one view</h3>
                  <div className="takeaway-flow">
                    {(chapter.points ?? []).map((point, index) => (
                      <div className="takeaway-node" key={point}>
                        <span className="takeaway-icon">
                          <StoryGlyph storyId={visualStory.id} index={index} size={19} />
                        </span>
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <details>
                  <summary>
                    Read the practical thread
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{chapter.reflection}</p>
                </details>

                <button className="source-link" type="button" onClick={() => setSourcesOpen(true)}>
                  <Books size={17} />
                  How this section is sourced
                </button>
              </div>

              <nav className="chapter-pager" aria-label="Move between Book 21 sections">
                <button
                  type="button"
                  disabled={!previousChapter}
                  onClick={() => previousChapter && chooseChapter(previousChapter.id)}
                >
                  <ArrowLeft size={18} />
                  <span>
                    <small>Previous</small>
                    <strong>{previousChapter?.shortTitle ?? "Beginning of book"}</strong>
                  </span>
                </button>
                <button
                  type="button"
                  disabled={!nextChapter}
                  onClick={() => nextChapter && chooseChapter(nextChapter.id)}
                >
                  <span>
                    <small>Next</small>
                    <strong>{nextChapter?.shortTitle ?? "End of book"}</strong>
                  </span>
                  <ArrowRight size={18} />
                </button>
              </nav>

              <footer className="reading-actions">
                <button
                  type="button"
                  className={bookmarks.includes(chapter.id) ? "active" : ""}
                  onClick={toggleBookmark}
                >
                  <BookmarkSimple
                    size={18}
                    weight={bookmarks.includes(chapter.id) ? "fill" : "regular"}
                  />
                  {bookmarks.includes(chapter.id) ? "Saved" : "Save section"}
                </button>
                <button
                  type="button"
                  className={read.includes(chapter.id) ? "active" : ""}
                  onClick={toggleRead}
                >
                  <CheckCircle
                    size={18}
                    weight={read.includes(chapter.id) ? "fill" : "regular"}
                  />
                  {read.includes(chapter.id) ? "Read" : "Mark as read"}
                </button>
              </footer>
            </article>
          </div>

          <div className="study-footer">
            <div>
              <p>Reading state</p>
              <span>{notice}</span>
            </div>
            <button type="button" onClick={enterLibrary}>
              <MapTrifold size={18} />
              Return to the complete work
            </button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-identity">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <div>
            <strong>The Revival</strong>
            <p>An English interactive reading edition in development.</p>
          </div>
        </div>
        <nav aria-label="Page navigation">
          <a href="#top">Beginning</a>
          <a href="#library">Forty books</a>
          <a href="#study">Book 21</a>
          <button type="button" onClick={() => setSourcesOpen(true)}>
            Sources and method
          </button>
        </nav>
        <p className="footer-note">
          Concise reading aids remain distinct from quotations, source text, and editorial notes.
        </p>
      </footer>

      {sourcesOpen && (
        <div className="overlay source-overlay" role="presentation" onMouseDown={() => setSourcesOpen(false)}>
          <aside
            className="source-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sources-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="dialog-header">
              <div>
                <p className="eyebrow">Grounding ledger</p>
                <h2 id="sources-title">Every claim should lead somewhere.</h2>
              </div>
              <button
                className="icon-action"
                type="button"
                aria-label="Close sources"
                title="Close sources"
                onClick={() => setSourcesOpen(false)}
              >
                <X size={22} />
              </button>
            </header>

            <div className="source-note">
              <Info size={20} />
              <p>
                The reading copy is concise English paraphrase. It is not presented as a quotation or as a replacement for future editorial review. The visual plates explain analogies named in the text and are not depictions of unseen realities.
              </p>
            </div>

            <section className="source-group">
              <h3>Book 21</h3>
              {contentSources.map((source) => (
                <a key={source.label} href={source.url} target="_blank" rel="noreferrer">
                  <span>
                    <strong>{source.label}</strong>
                    <small>{source.note}</small>
                  </span>
                  <ArrowSquareOut size={18} />
                </a>
              ))}
            </section>

            <section className="source-group architecture-ledger">
              <h3>{copy.label} architecture</h3>
              {architectureSources[route].map((source) => (
                <a key={source.label} href={source.url} target="_blank" rel="noreferrer">
                  <span>
                    <strong>{source.label}</strong>
                    <small>{source.mapping}</small>
                  </span>
                  <ArrowSquareOut size={18} />
                </a>
              ))}
            </section>

            <p className="licensing-note">
              The Saudi Press Agency ceiling image is used as a direction-study reference. Clear publication rights should be confirmed before a public release. The other named photographs display their Creative Commons licenses at the linked source pages.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
