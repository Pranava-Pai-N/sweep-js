"use client";

import { useState } from "react";
import { toast } from "sonner";
import { featureList, defaultTargets, useCases } from "@/data/data";
import Link from "next/link";
import Image from "next/image";

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied command to clipboard!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error: any) {
      console.error("Failed to copy", error);
      toast.error(`Failed to copy to clipboard`);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="inline-flex items-center gap-2 rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white active:scale-95"
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          <span className="text-emerald-400">Copied!</span>
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" />
          </svg>
          <span>{label || "Copy"}</span>
        </>
      )}
    </button>
  );
}

export default function Home() {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }


  return (
    <main className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-emerald-500 selection:text-black">
      <header className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white p-1 shadow-sm">
              <Image
                src="/assets/logo.webp"
                alt="sweep-js logo"
                width={20}
                height={20}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-mono text-sm font-semibold tracking-wide text-zinc-200">
              sweep-js
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-extrabold">
            <Link
              href="#usage"
              className="rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 font-mono text-xs font-medium text-zinc-200 shadow-sm transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              Usage
            </Link>

            <div className="h-3.5 w-px bg-zinc-800" />

            <Link
              href="https://github.com/Pranava-Pai-N/sweep-js"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-xs font-medium text-zinc-300 shadow-sm transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              GitHub
            </Link>
            <Link
              href="https://www.npmjs.com/package/sweep-js"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-medium text-red-400 shadow-sm transition hover:border-emerald-500/40 hover:bg-emerald-500/20"
            >
              npm
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-20">

        <section className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
            A Zero-Config CLI for space management
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Reclaim your disk space, instantly.
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            A lightweight CLI for sweeping bloated build directories like{" "}
            <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
              node_modules
            </code>
            ,{" "}
            <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
              .next
            </code>
            , and{" "}
            <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-xs text-zinc-300">
              dist
            </code>{" "}
            without searching through project subfolders.
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
              <span className="text-xs font-semibold text-zinc-400">Run directly via NPX</span>
              <span className="font-mono text-[11px] text-zinc-500">Zero install required</span>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-3">
              <code className="font-mono text-xs font-medium text-emerald-400">
                npx sweep-js sweep
              </code>
              <CopyButton text="npx sweep-js sweep" />
            </div>
          </div>

          <div className="mt-6">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Default targets
            </span>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
              {defaultTargets.map((target) => (
                <span
                  key={target}
                  className="rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-xs text-zinc-300"
                >
                  {target}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureList.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition hover:border-zinc-700"
            >
              <h2 className="text-sm font-semibold text-zinc-100">{item.title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">{item.body}</p>
            </article>
          ))}
        </section>

        <section id="usage" className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
          <div className="border-b border-zinc-800/80 pb-4">
            <h2 className="text-lg font-semibold text-white">CLI Commands</h2>
            <p className="mt-0.5 text-xs text-zinc-400">
              Run commands directly or specify custom targets with flags.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-zinc-400">Sweep Current Folder</span>
                <CopyButton text="sweep-js sweep" />
              </div>
              <code className="font-mono text-xs text-emerald-400 block mt-2">
                sweep-js sweep
              </code>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-zinc-400">Target External Path</span>
                <CopyButton text="sweep-js sweep /path/to/project" />
              </div>
              <code className="font-mono text-xs text-emerald-400 block mt-2">
                sweep-js sweep /path/to/project
              </code>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-zinc-400">Custom Target Filter</span>
                <CopyButton text="sweep-js sweep -t .next dist" />
              </div>
              <code className="font-mono text-xs text-emerald-400 block mt-2">
                sweep-js sweep -t .next dist
              </code>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm transition duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold tracking-tight text-white">Common Workflows</h3>
            </div>

            <ul className="mt-5 space-y-3">
              {useCases.map((item) => (
                <li key={item} className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm transition duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0 1 12 2.714Z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold tracking-tight text-white">Built Safe By Default</h3>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-zinc-400">
              <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[11px] text-zinc-200">
                sweep-js
              </code>{" "}
              only targets directories explicitly provided in flags or defaults. Built-in system protection blocks root paths and prevents accidental deletion of source files.
            </p>

            <div className="mt-6 border-t border-zinc-800/80 pt-4">
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                Tech Stack
              </span>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {["Node.js", "TypeScript", "Commander", "Chalk", "tsx"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-zinc-800/80 bg-zinc-950/80 px-2.5 py-1 font-mono text-[11px] font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </section>

        <footer className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800/80 pt-8 text-xs text-zinc-500">
          <div>
            Maintained by{" "}
            <Link
              href="https://pranava-pai.live"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 underline hover:text-white"
            >
              Pranava Pai N.
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/Pranava-Pai-N" target="_blank" rel="noreferrer" className="hover:text-zinc-300">
              GitHub
            </Link>
            <Link href="https://pranava-pai.live" target="_blank" rel="noreferrer" className="hover:text-zinc-300">
              Portfolio
            </Link>
          </div>
          <button
            onClick={handleScroll}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white active:scale-95"
          >
            <span>Back to top</span>
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          </button>

        </footer>
      </div>
    </main>
  );
}
