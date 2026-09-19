import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Particles } from "@/components/Particles";
import { SpotifyPlaylistEmbed } from "@/components/SpotifyPlaylistEmbed";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useThemeContext } from "@/components/ThemeProvider";

export const Route = createFileRoute("/soundtrack")({
  head: () => ({
    meta: [
      { title: "Our soundtrack — Saloniii" },
      {
        name: "description",
        content: "A small room for the music — part of a handcrafted digital memory book.",
      },
      { property: "og:title", content: "Our soundtrack — Saloniii" },
      {
        property: "og:description",
        content: "Sit here. Press play.",
      },
    ],
  }),
  component: SoundtrackPage,
});

function SoundtrackPage() {
  const { dark } = useThemeContext();

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground gradient-warm">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <Particles count={28} />

      <Link
        to="/"
        className="fixed left-5 top-5 z-40 inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm text-foreground/80 shadow-card transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to the letter
      </Link>

      <ThemeToggle />

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <p className="font-script text-2xl text-primary md:text-3xl">press play</p>
          <h1 className="mt-2 font-display text-4xl font-light leading-tight md:text-6xl">
            <span className="gradient-text">Our soundtrack</span>
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">Sit here. Press play.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-[2rem] glass p-3 shadow-card md:p-4"
        >
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch">
            <div
              className="hidden shrink-0 md:flex md:items-center md:justify-center md:pl-2"
              aria-hidden
            >
              <div
                className="h-40 w-40 rounded-full shadow-glow"
                style={{
                  background:
                    "conic-gradient(from 210deg, oklch(0.78 0.13 15), oklch(0.85 0.10 50), oklch(0.92 0.05 20), oklch(0.72 0.15 15))",
                }}
              >
                <div className="flex h-full w-full items-center justify-center p-3">
                  <div className="h-full w-full rounded-full border border-white/30 bg-background/20 backdrop-blur-sm" />
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <SpotifyPlaylistEmbed dark={dark} />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 text-center font-script text-xl text-muted-foreground md:text-2xl"
        >
          Made for long drives with no destination
        </motion.p>
      </main>
    </div>
  );
}
