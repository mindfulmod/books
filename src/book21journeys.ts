import { assetUrl } from "./assetUrl";
import type { Journey } from "./systemTypes";

export const book21Journeys: Journey[] = [
  {
    id: "identity",
    number: "01",
    question: "What is the heart?",
    title: "Build a map of the inside",
    description:
      "Learn Ghazali's key words, then see how the senses, desire, anger, reason and action are arranged around the heart that leads them.",
    payoff: "You leave with a working map of what is going on inside you.",
    image: assetUrl("assets/system/journey-heart.jpg"),
    imageAlt: "Symbolic painted compass surrounded by four balanced coloured medallions and flowering plants.",
    minutes: 6,
    color: "#3567a6",
    nodes: [
      {
        id: "name-the-faculty",
        label: "Name the heart",
        micro: "Meaning before pictures",
        summary:
          "Ghazali's main subject is the part of you that knows, notices, leads and is spoken to by God — not just the organ in your chest.",
        guardrail: "One word can mean the body part or the inner self.",
        chapterId: 1,
        glyph: "name",
      },
      {
        id: "map-the-forces",
        label: "Map its forces",
        micro: "Senses, drives, movement",
        summary:
          "The heart leads through powers you can see, like hands and eyes, and powers inside, like memory, imagination, thinking, desire and anger.",
        guardrail: "A force isn't bad just because it exists.",
        chapterId: 2,
        glyph: "forces",
      },
      {
        id: "see-the-order",
        label: "See the order",
        micro: "Leader, adviser, supplier",
        summary:
          "Ghazali's pictures of a city and a rider ask who is steering whom. Reason should advise, and desire and anger should serve good goals.",
        guardrail: "Fixing yourself means putting things in the right order, not wiping out every urge.",
        chapterId: 3,
        glyph: "order",
      },
      {
        id: "add-knowledge-will",
        label: "Add knowledge & will",
        micro: "See what's good, then choose it",
        summary:
          "Knowledge understands meanings and where things lead. Will can go after what the mind sees is good, even when desire pulls the other way.",
        guardrail: "An urge isn't right just because it's fast.",
        chapterId: 4,
        glyph: "know",
      },
      {
        id: "watch-character-form",
        label: "Watch character form",
        micro: "What rules you again and again becomes your character",
        summary:
          "Anger, desire and cleverness can go good or bad, depending on what is in charge of you and what each has been trained to serve.",
        guardrail: "The animal pictures describe patterns, not what a person is forever.",
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
      "Follow Ghazali's pictures of the mirror, the pool and the polished wall, and keep his lines between learning, inspiration and revelation.",
    payoff: "You see why knowledge needs both studying and a prepared heart.",
    image: assetUrl("assets/system/journey-knowing.jpg"),
    imageAlt: "Symbolic painted reservoir receiving clear water beside a polished brass mirror reflecting light.",
    minutes: 7,
    color: "#21867e",
    nodes: [
      {
        id: "receive-the-form",
        label: "The picture appears",
        micro: "The heart as mirror",
        summary:
          "Knowing something is like its picture appearing in a mirror. The heart, the thing known and its picture in the heart are three different things.",
        guardrail: "The mirror picture doesn't mean every impression is true.",
        chapterId: 6,
        glyph: "receive",
      },
      {
        id: "clear-obstructions",
        label: "Clear what's in the way",
        micro: "Rust, curtain, direction",
        summary:
          "Like a mirror, the heart can fail to show things because it isn't finished, it is rusty, it faces the wrong way, something hangs in front of it, or it doesn't know where to look.",
        guardrail: "Seeing clearly takes preparation and facing the right way.",
        chapterId: 6,
        glyph: "clear",
      },
      {
        id: "distinguish-knowledge",
        label: "Sort the kinds",
        micro: "Built in, learned, religious",
        summary:
          "Ghazali separates what you know without being taught from what you learn, and what reason grasps from what religion teaches.",
        guardrail: "The sorting gives learning a place you can't do without.",
        chapterId: 7,
        glyph: "know",
      },
      {
        id: "learn-by-evidence",
        label: "Learn through evidence",
        micro: "Teaching, thinking, reasoning",
        summary:
          "Ordinary learning works through effort, teaching, evidence and thinking things through — a path whose steps you can follow.",
        guardrail: "Nothing here gives you permission to skip proper study.",
        chapterId: 8,
        glyph: "learn",
      },
      {
        id: "prepare-for-disclosure",
        label: "Get ready for insight",
        micro: "The pool and the polished wall",
        summary:
          "The pool and the polished wall compare filling up through the senses with clearing away what's in the way, so insight can shine out from within.",
        guardrail: "Ghazali doesn't throw out either studying or purifying the heart.",
        chapterId: 9,
        glyph: "prepare",
      },
      {
        id: "read-in-register",
        label: "Read it the right way",
        micro: "Evidence from religion",
        summary:
          "Ghazali backs up knowledge given directly to the heart with the Quran and reports, while keeping prophets, saints and scholars clearly apart.",
        guardrail: "Inspiration is never treated as the same as a prophet's revelation.",
        chapterId: 10,
        glyph: "witness",
      },
    ],
  },
  {
    id: "action",
    number: "03",
    question: "How does a thought become an action?",
    title: "Slow down the moment of choice",
    description:
      "Pull apart the steps that feel like they happen all at once. The aim isn't to fear every thought, but to see where you have more and more say.",
    payoff: "You find earlier, clearer points where you can step in.",
    image: assetUrl("assets/system/journey-action.jpg"),
    imageAlt: "A luminous seed travelling through six coloured brass gates before becoming a clear outward footprint.",
    minutes: 5,
    color: "#c85b42",
    nodes: [
      {
        id: "prompting-arrives",
        label: "A thought arrives",
        micro: "Something occurs to the heart",
        summary:
          "Thoughts and urges keep visiting the heart. A passing whisper is where things start, not yet a choice.",
        guardrail: "A thought showing up isn't the same as taking it on.",
        chapterId: 11,
        glyph: "arrive",
      },
      {
        id: "impulse-gains-leverage",
        label: "It gets a grip",
        micro: "Desire and anger argue for it",
        summary:
          "A harmful whisper often uses desire or anger you already have, and makes an urge look attractive or sensible.",
        guardrail: "Whispers work through what is already going on inside you.",
        chapterId: 11,
        glyph: "leverage",
      },
      {
        id: "attention-holds",
        label: "You keep it around",
        micro: "The thought is entertained",
        summary:
          "Ghazali separates the first thought, which you didn't choose, from later steps where attention and desire give it a firmer place.",
        guardrail: "The steps help show where blame lies. They aren't a stopwatch.",
        chapterId: 13,
        glyph: "attend",
      },
      {
        id: "judgment-assents",
        label: "You agree with it",
        micro: "The idea is welcomed",
        summary:
          "Agreeing goes deeper than just noticing a thought. Your judgment has started to treat it as something to follow.",
        guardrail: "Ghazali separates a judgment you choose from one that just happens, and doesn't treat them the same.",
        chapterId: 13,
        glyph: "assent",
      },
      {
        id: "resolve-commits",
        label: "You decide",
        micro: "The intention points toward doing it",
        summary:
          "Deciding is more and more your choice, and it matters morally. Inside, you commit to carrying it out.",
        guardrail: "Ghazali still says you are forgiven for what you didn't choose.",
        chapterId: 13,
        glyph: "resolve",
      },
      {
        id: "action-follows",
        label: "The action follows",
        micro: "What's inside becomes visible",
        summary:
          "The action carries out what was decided inside. Your hands and feet take into the world the order set up within.",
        guardrail: "The section keeps the steps apart. It doesn't blur them into one.",
        chapterId: 13,
        glyph: "act",
      },
    ],
  },
  {
    id: "change",
    number: "04",
    question: "What makes change last?",
    title: "Turn what you learn into daily care",
    description:
      "Go from naming the pattern to guarding its doors, spotting it early, and backing the better voice when your heart is torn.",
    payoff: "You swap one dramatic fix for honest, steady watchfulness.",
    image: assetUrl("assets/system/journey-change.jpg"),
    imageAlt: "A painted brass compass encircled by blue and coral currents and a flowering pomegranate branch.",
    minutes: 6,
    color: "#86577f",
    nodes: [
      {
        id: "name-ruling-pattern",
        label: "Name the pattern",
        micro: "What keeps taking charge?",
        summary:
          "Ghazali's pictures of anger, desire, trickery and wisdom make repeating patterns easy to see, so they can be controlled instead of mistaken for who you are.",
        guardrail: "A repeating pattern isn't something you can never change.",
        chapterId: 5,
        glyph: "pattern",
      },
      {
        id: "find-entrances",
        label: "Find the entrances",
        micro: "Know your weak doors",
        summary:
          "Anger, desire, envy, greed, rushing, suspicion, and love of money or status are some of the doors that keep clouding judgment.",
        guardrail: "The work is watching yourself, not diagnosing other people.",
        chapterId: 12,
        glyph: "guard",
      },
      {
        id: "interrupt-earlier",
        label: "Step in earlier",
        micro: "Spot it before it recruits you",
        summary:
          "A prepared heart can spot a whisper and push it away before it gets your imagination, judgment, decision and action on its side.",
        guardrail: "Catching it early is easier than stopping it late.",
        chapterId: 11,
        glyph: "attend",
      },
      {
        id: "remember-without-panic",
        label: "Remember God without panicking",
        micro: "Being there isn't being in charge",
        summary:
          "Some whispers stop once they are exposed. Others stay but lose their power. A thought that keeps coming back doesn't prove that remembering God has failed.",
        guardrail: "Ask whether the thought is in charge, is persuading you, or is being refused.",
        chapterId: 14,
        glyph: "remember",
      },
      {
        id: "support-better-influence",
        label: "Back the better voice",
        micro: "Torn hearts can turn",
        summary:
          "Many hearts stay torn and change depending on which voice gets support. A heart trained to listen to good lets good lead to more good.",
        guardrail: "One slip doesn't end the contest, and neither does one insight.",
        chapterId: 15,
        glyph: "steady",
      },
      {
        id: "repeat-care",
        label: "Repeat the care",
        micro: "Keep it steady",
        summary:
          "Because the heart changes so fast, Ghazali's closing picture calls for care again and again, not one moment of insight and then forgetting.",
        guardrail: "Lasting change is watchfulness made into a habit.",
        chapterId: 15,
        glyph: "act",
      },
    ],
  },
];
