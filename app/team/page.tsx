'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Background from '@/components/Background';

/* -----------------------------------
   🎉 Confetti (gold • lithium • nickel)
   - Fires on page load
   - Fires on any click (non-blocking)
------------------------------------ */
function ConfettiCelebration() {
    // store the confetti function when dynamically loaded on client
    const confettiRef = useRef<null | ((opts?: any) => void)>(null);

    // colors: gold, lithium (mint), nickel (slate)
    const COLORS = ['#FFD54A', '#A7F3D0', '#94A3B8'];

    const burst = (confetti: (opts?: any) => void, power = 1) => {
        const base = { colors: COLORS, disableForReducedMotion: true };
        confetti({ ...base, particleCount: Math.round(140 * power), spread: 70, origin: { y: 0.6 } });
        confetti({ ...base, particleCount: Math.round(80 * power), angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ ...base, particleCount: Math.round(80 * power), angle: 120, spread: 55, origin: { x: 1 } });
    };

    useEffect(() => {
        let cancelled = false;
        let confettiFn: ((opts?: any) => void) | null = null;

        // lazy-load only on the client
        (async () => {
            const { default: confetti } = await import('canvas-confetti');
            if (cancelled) return;
            confettiFn = confetti;
            confettiRef.current = confetti;

            // initial celebration on page open
            burst(confetti, 0.9);
            setTimeout(() => burst(confetti, 0.6), 500);
        })();

        // click anywhere to celebrate (doesn't block UI)
        const onClick = (e: MouseEvent) => {
            const fn = confettiRef.current;
            if (!fn) return;
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            fn({
                particleCount: 120,
                spread: 70,
                origin: { x, y },
                colors: COLORS,
                disableForReducedMotion: true,
            });
            setTimeout(() => {
                fn({
                    particleCount: 60,
                    spread: 60,
                    ticks: 120,
                    decay: 0.91,
                    origin: { x, y },
                    colors: COLORS,
                    disableForReducedMotion: true,
                });
            }, 120);
        };

        window.addEventListener('click', onClick);
        return () => {
            cancelled = true;
            window.removeEventListener('click', onClick);
        };
    }, []);

    return null; // no DOM needed; canvas-confetti handles its own canvas
}

/* ---------- shared header (Logo + Nav) ---------- */
const Logo = () => (
    <div className="flex items-center gap-2">
        <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 shadow-md" />
        <span className="font-bold tracking-wide">LYTHOS</span>
    </div>
);

const Nav = () => (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Logo />
            <nav className="hidden items-center gap-6 text-sm md:flex">
                <a href="/" className="hover:text-emerald-400">Home</a>
                <a href="/#datasources" className="hover:text-emerald-400">Space Data</a>
                <a href="/#regions" className="hover:text-emerald-400">Regions (A + B)</a>
                <a href="/#policy" className="hover:text-emerald-400">Policy & Justice</a>
                <a href="/#knowyourcarbon" className="hover:text-emerald-400">Know Your Carbon</a> {/* ← restored */}
                <a href="/#roadmap" className="hover:text-emerald-400">Roadmap</a>
                <a href="/#resources" className="hover:text-emerald-400">Resources</a>
                <a href="/team" className="hover:text-emerald-400">Team</a>
                <a
                    href="/#contact"
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 font-medium text-white shadow hover:bg-emerald-700"
                >
                    Try Demo
                </a>
            </nav>

        </div>
    </header>
);

const Footer = () => (
    <footer id="contact" className="border-t border-neutral-800 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <Logo />
                <div className="text-sm text-neutral-300">
                    Built at <span className="font-medium">BramHacks</span> — Team XO — Asma, Sohel, Harman, Navrose · LYTHOS · A+B Regions (Northern Ontario Nickel & NWT Lithium)
                </div>
            </div>
        </div>
    </footer>
);

/* ---------- team content ---------- */
type Member = {
    name: string;
    role: string;
    bio: string;
    img: string;
    linkedin?: string;
    github?: string;
    website?: string;
};

const team: Member[] = [
    {
        name: 'Asma Ahmed',
        role: 'Product Lead / Frontend / Data-AI',
        bio: 'Asma Ahmed - 3rd year Computer Science (HBSc) - Cloud Computing Student @ Sheridan College ',
        img: '/team/1762388925777.jpeg',
        linkedin: 'https://www.linkedin.com/in/asma-ahmed67/',
        github: 'https://github.com/asma675',
        website: 'https://asma-ahmed-portfolio-git-main-asmas-projects-beb736a4.vercel.app/',
    },
    {
        name: 'Harman Harman',
        role: 'Full-Stack / Frontend / Maps',
        bio: 'Harman Harman - 2nd year Computer System Technology - Analysis and Design @Sheridan College.',
        img: '/team/1731185807351.jpeg',
        linkedin: 'https://www.linkedin.com/in/connectharman/',
        github: 'https://github.com/CodeDepository',
    },
    {
        name: 'Sohel Shekh',
        role: 'ML / Risk Models / Maps',
        bio: 'Sohel Shekh - 2nd year Computer Systems Technology - Software Development & Network Engineering @Sheridan College.',
        img: '/team/1760693769635.jpeg',
        linkedin: 'https://www.linkedin.com/in/sohelshekh',
        github: 'https://github.com/sohelshekh',
        website: 'https://sohel.tech',
    },
    {
        name: 'Navrose Johal',
        role: 'DevOps / Maps / Cloud',
        bio: 'Navrose Johal - 2nd year Computer Systems Technology -  Software Development & Network Engineering @Sheridan College.',
        img: '/team/1712941435998.jpeg',
        linkedin: 'https://www.linkedin.com/in/navrose-singh-johal-4839a5278/',
        github: 'https://github.com/RozForCode',
        website: 'https://navrose.co/',
    },
];

export default function TeamPage() {
    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* ⭐ moving stars behind everything */}
            <Background
                colors={['#ffffff', '#e5fff4', '#bdeedd']}
                density={1000}
                spread={46}
                speed={0.1}
                alpha
                className="[mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent)]"
            />

            {/* 🎉 Confetti overlay (non-blocking; load + click) */}
            <ConfettiCelebration />

            <Nav />

            <main className="mx-auto max-w-7xl px-4 py-16">
                <header className="mb-10 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Meet the team
                    </p>
                    <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                        The people behind LYTHOS
                    </h1>
                    <p className="mx-auto mt-3 max-w-2xl text-neutral-300">
                        Four builders combining satellites, geospatial, and ML to protect land, water, and
                        communities.
                    </p>
                </header>

                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {team.map((m) => (
                        <article
                            key={m.name}
                            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 shadow-sm transition hover:shadow-md"
                        >
                            <div className="aspect-square w-full overflow-hidden rounded-xl bg-neutral-800">
                                <Image
                                    src={m.img}
                                    alt={m.name}
                                    width={600}
                                    height={600}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <h3 className="mt-4 text-lg font-semibold">{m.name}</h3>
                            <p className="text-emerald-300 text-sm font-medium">{m.role}</p>
                            <p className="mt-2 text-sm text-neutral-300">{m.bio}</p>

                            <div className="mt-3 flex flex-wrap gap-4 text-sm">
                                {m.linkedin && m.linkedin !== '#' && (
                                    <a
                                        href={m.linkedin}
                                        className="text-emerald-300 hover:underline"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        LinkedIn
                                    </a>
                                )}
                                {m.github && m.github !== '#' && (
                                    <a
                                        href={m.github}
                                        className="text-emerald-300 hover:underline"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        GitHub
                                    </a>
                                )}
                                {m.website && (
                                    <a
                                        href={m.website}
                                        className="text-emerald-300 hover:underline"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        Website
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </section>

                <section className="mt-12 rounded-2xl border border-neutral-800 bg-emerald-950/30 p-6">
                    <h2 className="text-lg font-semibold">Project roles</h2>
                    <ul className="mt-2 list-disc pl-5 text-sm text-emerald-200">
                        <li>Product & Data: scope, UX, and space-data use cases</li>
                        <li>Full-Stack & Maps: React + Leaflet, NASA/ESA WMTS integration</li>
                        <li>ML & Risk: overlays for watersheds, permafrost, biodiversity</li>
                        <li>DevOps & Cloud: builds, deploys, data pipelines</li>
                    </ul>
                </section>

                <p className="mx-auto mt-8 max-w-3xl text-center text-sm italic text-slate-400">
                    We worked cross-functionally as a team — everyone contributed across product, maps, ML,
                    and cloud — but each of us also had a primary focus domain to accelerate delivery.
                </p>
            </main>

            <Footer />
        </div>
    );
}
