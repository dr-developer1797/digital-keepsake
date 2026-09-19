import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Music } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";

export function SoundtrackTeaser() {
  return (
    <section className="relative py-32" style={{ background: "var(--gradient-warm)" }}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="press play"
          title="Our soundtrack"
          subtitle="The songs that already feel like us."
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-xl rounded-3xl glass p-8 text-center shadow-card md:p-10"
        >
          <p className="text-muted-foreground md:text-lg">
            A small room for the music. Open it when you are ready.
          </p>
          <Link
            to="/soundtrack"
            className="group mt-8 inline-flex items-center gap-2 rounded-full gradient-rose px-8 py-4 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:scale-105 hover:shadow-soft"
          >
            Open the soundtrack
            <Music className="h-4 w-4 transition-transform group-hover:scale-110" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
