import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Download, Sparkles, Heart } from "lucide-react";

const GRADIENTS = [
  { id: "rose", label: "Rose", from: "#f4b8c4", to: "#c44569" },
  { id: "peach", label: "Peach", from: "#fcd5a8", to: "#e8a87c" },
  { id: "sunset", label: "Sunset", from: "#ffd6a5", to: "#ff6b6b" },
  { id: "lavender", label: "Lavender", from: "#d6c5e8", to: "#9b72cf" },
];

export function MemoryCardMaker() {
  const [name, setName] = useState("[Her Name]");
  const [message, setMessage] = useState("To the most extraordinary human I know — happy birthday.");
  const [gradient, setGradient] = useState(GRADIENTS[0]);
  const previewRef = useRef<HTMLDivElement>(null);

  const drawAndDownload = async () => {
    const W = 1200;
    const H = 1500;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // background gradient
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, gradient.from);
    bg.addColorStop(1, gradient.to);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // soft radial glow
    const glow = ctx.createRadialGradient(W / 2, H * 0.25, 50, W / 2, H * 0.25, W * 0.7);
    glow.addColorStop(0, "rgba(255,255,255,0.45)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // confetti dots
    for (let i = 0; i < 70; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.15 + Math.random() * 0.5})`;
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 6 + 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // inner card
    const padding = 80;
    const cardX = padding;
    const cardY = padding;
    const cardW = W - padding * 2;
    const cardH = H - padding * 2;
    const radius = 60;

    ctx.fillStyle = "rgba(255,255,255,0.18)";
    roundRect(ctx, cardX, cardY, cardW, cardH, radius);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 2;
    roundRect(ctx, cardX, cardY, cardW, cardH, radius);
    ctx.stroke();

    // kicker
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "italic 500 56px 'Caveat', 'Brush Script MT', cursive";
    ctx.textAlign = "center";
    ctx.fillText("a little note for", W / 2, 320);

    // name
    ctx.fillStyle = "#ffffff";
    ctx.font = "300 160px 'Fraunces', 'Times New Roman', serif";
    wrapText(ctx, name, W / 2, 500, cardW - 160, 170);

    // divider
    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 80, 700);
    ctx.lineTo(W / 2 + 80, 700);
    ctx.stroke();

    // heart
    drawHeart(ctx, W / 2, 700, 22, "#ffffff");

    // message
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = "400 48px 'Inter', system-ui, sans-serif";
    wrapText(ctx, message, W / 2, 880, cardW - 220, 70);

    // footer kicker
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "italic 500 52px 'Caveat', cursive";
    ctx.fillText("happy birthday 🎉", W / 2, H - 240);

    // signature line
    ctx.font = "500 28px 'Inter', system-ui, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText("— a corner of the internet, made for you —", W / 2, H - 170);

    // download
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `birthday-card-${name.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "memory"}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="font-script text-2xl text-primary">a little keepsake</p>
          <h2 className="mt-2 text-4xl font-light leading-tight md:text-6xl">
            <span className="gradient-text">Make a shareable card</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Type her name, pick a color, download a birthday card to share or save forever.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl glass p-8 shadow-card"
          >
            <label className="block">
              <span className="font-script text-xl text-primary">Her name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={28}
                className="mt-2 w-full rounded-2xl border border-border bg-background/60 px-5 py-3 text-lg font-display focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g. Sophie"
              />
            </label>

            <label className="mt-6 block">
              <span className="font-script text-xl text-primary">Your message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                maxLength={160}
                className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/60 px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="A line straight from the heart…"
              />
              <span className="mt-1 block text-right text-xs text-muted-foreground">{message.length}/160</span>
            </label>

            <div className="mt-6">
              <p className="font-script text-xl text-primary">Pick a palette</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {GRADIENTS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGradient(g)}
                    aria-label={g.label}
                    className={`h-12 w-12 rounded-2xl shadow-soft transition-transform hover:scale-110 ${
                      gradient.id === g.id ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""
                    }`}
                    style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={drawAndDownload}
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-rose px-6 py-4 text-base font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download card as image
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Saves a 1200×1500 PNG, ready to text, post, or print.
            </p>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div
              ref={previewRef}
              className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] p-6 shadow-glow"
              style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
            >
              {/* sparkle dots */}
              <div className="pointer-events-none absolute inset-0">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute rounded-full bg-white/60"
                    style={{
                      left: `${(i * 37) % 100}%`,
                      top: `${(i * 53) % 100}%`,
                      width: 3 + (i % 4),
                      height: 3 + (i % 4),
                      opacity: 0.3 + (i % 5) * 0.12,
                    }}
                  />
                ))}
              </div>

              <div className="relative flex h-full flex-col items-center justify-between rounded-[1.5rem] border border-white/40 bg-white/15 p-6 text-center text-white backdrop-blur-sm">
                <div className="pt-4">
                  <p className="font-script text-xl text-white/90">a little note for</p>
                  <p className="mt-3 break-words font-display text-4xl font-light leading-tight md:text-5xl">{name}</p>
                  <div className="mx-auto mt-4 flex items-center gap-2">
                    <span className="h-px w-8 bg-white/60" />
                    <Heart className="h-3.5 w-3.5 fill-white text-white" />
                    <span className="h-px w-8 bg-white/60" />
                  </div>
                </div>

                <p className="px-2 text-sm leading-relaxed text-white/95 md:text-base">{message}</p>

                <div>
                  <p className="font-script text-2xl text-white/95">happy birthday 🎉</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
                    made just for you
                  </p>
                </div>
              </div>

              <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/25 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur">
                <Sparkles className="h-3 w-3" /> Preview
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----- canvas helpers ----- */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(" ");
  let line = "";
  const lines: string[] = [];
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
}

function drawHeart(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  const topY = cy - size / 2;
  ctx.moveTo(cx, topY + size / 4);
  ctx.bezierCurveTo(cx, topY, cx - size / 2, topY, cx - size / 2, topY + size / 4);
  ctx.bezierCurveTo(cx - size / 2, topY + size / 2, cx, topY + size * 0.75, cx, topY + size);
  ctx.bezierCurveTo(cx, topY + size * 0.75, cx + size / 2, topY + size / 2, cx + size / 2, topY + size / 4);
  ctx.bezierCurveTo(cx + size / 2, topY, cx, topY, cx, topY + size / 4);
  ctx.fill();
}
