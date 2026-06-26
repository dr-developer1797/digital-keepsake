import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Heart,
  Sparkles,
  Star,
  Cake,
  Gift,
  Music,
  Coffee,
  Camera,
  Smile,
  Shield,
  Laugh,
  HandHeart,
  Brain,
  Rocket,
  MapPin,
  Plane,
  Mountain,
  Utensils,
  BookOpen,
  Sun,
  Moon,
  X,
  ChevronDown,
} from "lucide-react";
import { MemoryCardMaker } from "@/components/MemoryCardMaker";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Saloniii — A Letter in Pixels" },
      {
        name: "description",
        content: "A handcrafted digital memory book for someone truly special.",
      },
      { property: "og:title", content: "Happy Birthday, Saloniii" },
      {
        property: "og:description",
        content: "A handcrafted digital memory book for someone truly special.",
      },
    ],
  }),
  component: BirthdayPage,
});

/* ---------------------------------------------------------------- */
/*  THEME TOGGLE                                                     */
/* ---------------------------------------------------------------- */
function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

/* ---------------------------------------------------------------- */
/*  FLOATING PARTICLES                                               */
/* ---------------------------------------------------------------- */
function Particles({ count = 24 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 6 + 2,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 8,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-primary/30 animate-float-slow"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}

function Stars({ count = 60 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-foreground animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  REUSABLE SECTION WRAPPER                                         */
/* ---------------------------------------------------------------- */
function SectionTitle({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-16 max-w-2xl text-center"
    >
      <p className="font-script text-2xl text-primary">{kicker}</p>
      <h2 className="mt-2 text-4xl font-light leading-tight md:text-6xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground md:text-lg">{subtitle}</p>}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/*  HERO                                                             */
/* ---------------------------------------------------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden gradient-warm"
    >
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <Particles count={30} />

      <motion.div style={{ y, opacity }} className="relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm shadow-soft"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-foreground/80">A letter, in pixels</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-light leading-[1.05] tracking-tight md:text-8xl"
        >
          Happy Birthday,
          <br />
          <span className="gradient-text italic">Saloniii</span>
          <span className="ml-2 inline-block animate-pulse-glow">🎉</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mt-8 max-w-xl text-base text-muted-foreground md:text-xl"
        >
          A small corner of the internet dedicated to someone truly special.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <a
            href="#about"
            className="group inline-flex items-center gap-2 rounded-full gradient-rose px-8 py-4 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:scale-105 hover:shadow-soft"
          >
            Start the Journey
            <Heart className="h-4 w-4 transition-transform group-hover:scale-125" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 animate-bounce text-muted-foreground" />
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  ABOUT                                                            */
/* ---------------------------------------------------------------- */
const aboutItems = [
  { icon: Heart, label: "Name", value: "Saloniii" },
  {
    icon: Coffee,
    label: "Favorite Things",
    value: "Long walks, beach days, surprise dates, KitKat, soft toys, and Zara... ofc",
  },
  { icon: Star, label: "Dreams", value: "To become a data analyst and make her father proud" },
  { icon: Smile, label: "Fun Fact", value: "She can school you anytime, anywhere" },
];

function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="a little about her"
          title="The girl behind the glow"
          subtitle="Everything she is, in a few softly-drawn lines."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {aboutItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl glass p-8 shadow-card"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-sunset shadow-soft">
                  <item.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <p className="font-script text-xl text-primary">{item.label}</p>
                <p className="mt-2 text-lg text-foreground/85">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  TIMELINE                                                         */
/* ---------------------------------------------------------------- */
const memories = [
  {
    date: "🌱 Chapter 1",
    title: "The Stranger",
    story:
      "Two people who had absolutely no idea they'd one day have enough inside jokes to build an entire website.",
  },
  {
    date: "💬 Chapter 2",
    title: "One Message Became Hundreds",
    story: "It started with a simple conversation. Somehow... neither of us stopped replying.",
  },
  {
    date: "☕ Chapter 3",
    title: "Twilight Conversations",
    story:
      "When the world went quiet, you made mine feel full. Phone calls past midnight, packages in the mail, never alone.",
  },
  {
    date: "😂 Chapter 4",
    title: "The Era of Inside",
    story:
      "Ma Lady Queen Victoria KitKat Paglu Samba Pagal...Nobody else gets them. That's the point..",
  },
  {
    date: "✨ Chapter 5",
    title: "Another candle, another chapter & today",
    story:
      "A birthday. A website. A reminder that someone out there remembers even the smallest things about you.",
  },
];

function Timeline() {
  return (
    <section className="relative py-32" style={{ background: "var(--gradient-warm)" }}>
      <div className="mx-auto max-w-4xl px-6">
        <SectionTitle
          kicker="moments in time"
          title="Our little timeline"
          subtitle="A few of the chapters that made the whole story."
        />

        <div className="relative">
          {/* spine */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:left-1/2" />

          <div className="space-y-20">
            {memories.map((m, i) => (
              <TimelineItem key={i} item={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }: { item: (typeof memories)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2"
      >
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/40 blur-md" />
          <div className="relative h-4 w-4 rounded-full gradient-rose shadow-glow" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`ml-12 w-full md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}
      >
        <div className="overflow-hidden rounded-3xl bg-card shadow-card">
          <div className="aspect-[16/10] gradient-sunset relative">
            <div className="absolute inset-0 flex items-center justify-center text-primary-foreground/70">
              <Camera className="h-10 w-10" />
            </div>
            <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-xs text-foreground/80">
              Photo placeholder
            </span>
          </div>
          <div className="p-6">
            <p className="font-script text-lg text-primary">{item.date}</p>
            <h3 className="mt-1 text-2xl font-medium">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.story}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  REASONS                                                          */
/* ---------------------------------------------------------------- */
const reasons = [
  { icon: HandHeart, title: "Kind", text: "The softest heart in the room, always." },
  { icon: Shield, title: "Strong", text: "Quiet, steady, unshakeable in the storm." },
  { icon: Laugh, title: "Funny", text: "Sends voice notes that double as stand-up." },
  { icon: Heart, title: "Supportive", text: "Shows up, every single time, in every way." },
  { icon: Brain, title: "Intelligent", text: "A mind that asks better questions than mine." },
  { icon: Rocket, title: "Ambitious", text: "Dreams the kind of dreams that scare you a little." },
];

function Reasons() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="reasons, plural"
          title="Why you're so amazing"
          subtitle="An incomplete list, because the full one wouldn't fit on the internet."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-card transition-shadow hover:shadow-glow"
            >
              <div
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
                style={{ background: "var(--gradient-rose)" }}
              />
              <div className="relative">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-rose shadow-soft">
                  <r.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-medium">{r.title}</h3>
                <p className="mt-2 text-muted-foreground">{r.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  GALLERY                                                          */
/* ---------------------------------------------------------------- */
function Gallery() {
  const photos = useQuery(api.gallery.listPhotos);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-32" style={{ background: "var(--gradient-warm)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          kicker="favorite moments"
          title="A little gallery of us"
          subtitle="Click any photo to zoom in."
        />

        {photos === undefined ? (
          /* Loading skeleton */
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {Array.from({ length: 17 }).map((_, i) => (
              <div
                key={i}
                className="block w-full overflow-hidden rounded-2xl bg-primary/10 animate-pulse"
                style={{ height: [220, 320, 280, 360, 240, 300][i % 6] }}
              />
            ))}
          </div>
        ) : (
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {photos.map((g, i) => (
              <motion.button
                key={g._id}
                onClick={() => setOpen(i)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="block w-full overflow-hidden rounded-2xl shadow-card"
              >
                <img
                  src={g.url ?? undefined}
                  alt={g.label}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {open !== null && photos && photos[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-black/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full glass text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={photos[open].url ?? undefined}
                alt={photos[open].label}
                className="w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  BIRTHDAY WISH (typed)                                            */
/* ---------------------------------------------------------------- */
function BirthdayWish() {
  const message =
    "Wishing you a year as soft as a Sunday morning, as bright as the laugh you have, and as full as the love you give to everyone around you. You deserve all of it, and more.";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [text, setText] = useState("");
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(message.slice(0, i));
      if (i >= message.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="font-script text-3xl text-primary">a birthday wish</p>
        <h2 className="mt-4 text-3xl font-light md:text-5xl">For the year ahead</h2>

        <div className="mx-auto mt-12 min-h-[12rem] max-w-2xl">
          <p className="font-script text-3xl leading-relaxed text-foreground/85 md:text-4xl">
            {text}
            <span
              className="ml-1 inline-block w-0.5 bg-primary align-middle animate-blink"
              style={{ height: "0.9em" }}
            />
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  FUN FACTS (flip cards)                                           */
/* ---------------------------------------------------------------- */
const facts = [
  { front: "🌙 Yah mat bolna 'Sone ja rahi hu'.", back: "(I already know the answer)" },
  { front: "👑 Ma Lady", back: "Started as My Lady,Ended with 'What is this ma lady?' 😂" },
  {
    front: "👸 Queen Victoria",
    back: "Ma lady bola toh sach ma Queen Victoria jaisa harkat karna lagi.",
  },
  {
    front: "☕ Coffee Treaty",
    back: "Her: Stop sipping coffee. Me: 'Coffee is the only thing keeping me alive.'",
  },
  { front: "🤍 Pagal.", back: "At this point, it's basically our second names." },
  {
    front: "🎬 Movie Rule",
    back: "'Kuch bhi faltu movie nahi chahiye.' 'It should teach something.'",
  },
  { front: "😴 Good Night...", back: "...which somehow always became another conversation." },
  { front: "📞 Call par aa jao.", back: "Typing was optional" },
  { front: "😂 Aavai kuch bhi.", back: "One of the oldest phrases in our chat." },
  { front: "👟 Samba Nahi Chahiye.", back: "The search lasted longer than the decision." },
  { front: "💬 Kkrh??", back: "Probably the most frequently asked question." },
  { front: "🍫 KitKat Drink", back: "Who knew KitKat could become an entire conversation?" },
];

function FunFacts() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="fun facts"
          title="Things only we know"
          subtitle="Tap a card. Some secrets are too good to be on the front."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f, i) => (
            <FlipCard key={i} front={f.front} back={f.back} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ front, back, delay }: { front: string; back: string; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      onClick={() => setFlipped((f) => !f)}
      className="group relative h-56 w-full [perspective:1200px]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl glass p-6 shadow-card [backface-visibility:hidden]">
          <Sparkles className="mb-3 h-6 w-6 text-primary" />
          <p className="font-display text-2xl">{front}</p>
          <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
            Tap to reveal
          </p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-3xl gradient-rose p-6 text-center shadow-glow [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="font-script text-2xl leading-snug text-primary-foreground">{back}</p>
        </div>
      </motion.div>
    </motion.button>
  );
}

/* ---------------------------------------------------------------- */
/*  FUTURE ADVENTURES                                                */
/* ---------------------------------------------------------------- */
const adventures = [
  {
    icon: Plane,
    title: "Tokyo in spring",
    text: "Cherry blossoms, tiny coffee shops, getting lost on purpose.",
  },
  {
    icon: Mountain,
    title: "A real road trip",
    text: "Coast to coast, with terrible snacks and excellent playlists.",
  },
  {
    icon: Utensils,
    title: "That cooking class",
    text: "We've talked about it for two years. This is the year.",
  },
  {
    icon: BookOpen,
    title: "Start the book club",
    text: "Just us two. One book a month. Wine encouraged.",
  },
  { icon: MapPin, title: "A weekend, no plans", text: "Just a hotel, a map, and zero agendas." },
];

function Future() {
  return (
    <section className="relative py-32" style={{ background: "var(--gradient-warm)" }}>
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle
          kicker="what's next"
          title="Future adventures"
          subtitle="The things we keep saying we'll do. Consider this the contract."
        />
        <div className="relative">
          <div className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent md:left-8" />
          <div className="space-y-8">
            {adventures.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative flex items-start gap-6 rounded-3xl glass p-6 pl-20 shadow-card md:pl-24"
              >
                <div className="absolute left-2 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full gradient-rose shadow-glow md:left-4">
                  <a.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-medium md:text-2xl">{a.title}</h3>
                  <p className="mt-1 text-muted-foreground">{a.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  SURPRISE                                                         */
/* ---------------------------------------------------------------- */
function Surprise() {
  const [open, setOpen] = useState(false);

  const fire = () => {
    const colors = ["#e8a87c", "#c44569", "#f0d78c", "#ffb3c1", "#ff6b6b"];
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors });
    setTimeout(
      () => confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0 }, colors }),
      200,
    );
    setTimeout(
      () => confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 }, colors }),
      400,
    );
  };

  const handleOpen = () => {
    setOpen(true);
    fire();
  };

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionTitle
          kicker="psst..."
          title="A little surprise"
          subtitle="Go on. You know you want to."
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full gradient-rose px-10 py-5 text-primary-foreground shadow-glow"
        >
          <Gift className="h-5 w-5 transition-transform group-hover:rotate-12" />
          <span className="text-base font-medium">Click for a Surprise</span>
          <Sparkles className="h-5 w-5 transition-transform group-hover:scale-125" />
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-card p-10 text-center shadow-glow"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center">
                <CakeIllustration />
              </div>

              <p className="font-script text-3xl text-primary">Surprise!</p>
              <h3 className="mt-2 text-3xl font-medium">Make a wish</h3>
              <p className="mt-4 text-muted-foreground">
                You've made every ordinary day feel like a celebration. Today, the celebration is
                finally yours. Blow out the candles — I'm pretty sure they all come true.
              </p>

              <button
                onClick={fire}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background transition-transform hover:scale-105"
              >
                <Sparkles className="h-4 w-4" /> More confetti, please
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CakeIllustration() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      <defs>
        <linearGradient id="cake" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.85 0.10 30)" />
          <stop offset="100%" stopColor="oklch(0.72 0.15 15)" />
        </linearGradient>
      </defs>
      {/* plate */}
      <ellipse cx="60" cy="100" rx="48" ry="6" fill="oklch(0.9 0.02 50)" />
      {/* tiers */}
      <rect x="20" y="70" width="80" height="28" rx="4" fill="url(#cake)" />
      <rect x="30" y="48" width="60" height="24" rx="4" fill="oklch(0.92 0.05 20)" />
      <rect x="40" y="30" width="40" height="20" rx="4" fill="url(#cake)" />
      {/* drips */}
      <path
        d="M22 70 Q26 78 30 70 Q34 78 38 70 Q42 78 46 70 Q50 78 54 70 Q58 78 62 70 Q66 78 70 70 Q74 78 78 70 Q82 78 86 70 Q90 78 94 70 Q98 78 98 70"
        fill="oklch(0.92 0.05 20)"
      />
      {/* candle */}
      <rect x="58" y="14" width="4" height="16" fill="oklch(0.55 0.14 15)" />
      {/* flame */}
      <path d="M60 6 Q56 11 60 14 Q64 11 60 6" fill="oklch(0.85 0.18 70)">
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1;1.15;1"
          dur="1.2s"
          repeatCount="indefinite"
          additive="sum"
        />
      </path>
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/*  FINAL MESSAGE                                                    */
/* ---------------------------------------------------------------- */
function FinalMessage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-foreground text-background">
      <Stars count={70} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.55 0.14 15 / 0.35), transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative z-10 mx-auto max-w-2xl px-6 text-center"
      >
        <Heart className="mx-auto mb-8 h-10 w-10 text-primary animate-pulse-glow" />
        <p className="font-script text-3xl text-background/80">a final word</p>
        <h2 className="mt-4 font-display text-4xl font-light leading-tight md:text-6xl">
          Thank you for being
          <br />
          part of my life.
        </h2>
        <p className="mx-auto mt-8 max-w-lg text-base text-background/70 md:text-lg">
          Some people make the world feel a little warmer just by being in it. You are one of them.
          Happy birthday, my favorite human.
        </p>

        <div className="mt-16 flex flex-col items-center gap-2">
          <div className="h-px w-16 bg-background/30" />
          <p className="text-sm text-background/60">Made with</p>
          <Heart className="h-4 w-4 fill-primary text-primary" />
          <p className="font-script text-2xl text-background">by me</p>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  PAGE                                                             */
/* ---------------------------------------------------------------- */
function BirthdayPage() {
  const { dark, toggle } = useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="fixed right-5 top-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full glass shadow-card transition-transform hover:scale-110"
      >
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <Hero />
      <About />
      <Timeline />
      <Reasons />
      <Gallery />
      <BirthdayWish />
      <FunFacts />
      <Future />
      <Surprise />
      <MemoryCardMaker />
      <FinalMessage />
    </div>
  );
}
