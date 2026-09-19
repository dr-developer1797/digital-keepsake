import { motion } from "motion/react";

export function SectionTitle({
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
