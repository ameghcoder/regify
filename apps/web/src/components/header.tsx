"use client";

import { URLS } from "@/app/constant/urls";
import { HeartPlus, Star, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="font-bold tracking-tighter text-xl shrink-0" onClick={() => setIsMenuOpen(false)}>
                        <Image src="/favicon-96x96.png" alt="Regify Logo" className="h-8 w-auto" width={48} height={48} priority />
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/docs"
                            className="text-sm font-mono text-muted-foreground hover:text-accent transition-colors"
                        >
                            Docs
                        </Link>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <a
                        href={URLS.GITHUB}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-muted-foreground rounded-md border border-border px-3 py-1.5 hover:text-accent hover:bg-accent/10 transition-colors flex items-center gap-2"
                    >
                        <Star className="fill-accent text-accent" size={14} />
                        <span>Star on GitHub</span>
                    </a>
                    <a
                        href={URLS.GITHUB_ISSUES}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-muted-foreground rounded-md border border-border px-3 py-1.5 hover:text-accent hover:bg-accent/10 transition-colors flex items-center gap-2"
                    >
                        <HeartPlus className="fill-accent text-accent" size={14} />
                        <span>Contribute</span>
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-muted-foreground"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-b border-border bg-background px-6 py-6 space-y-6">
                    <nav className="flex flex-col gap-4">
                        <Link
                            href="/docs"
                            className="text-sm font-medium hover:text-accent transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Documentation
                        </Link>
                        <Link
                            href="/docs/init"
                            className="text-sm font-medium hover:text-accent transition-colors pl-4 border-l border-border"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            regify init
                        </Link>
                        <Link
                            href="/docs/generate"
                            className="text-sm font-medium hover:text-accent transition-colors pl-4 border-l border-border"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            regify generate
                        </Link>
                    </nav>
                    <div className="flex flex-col gap-3 pt-6 border-t border-border">
                        <a
                            href={URLS.GITHUB}
                            className="text-xs font-mono flex items-center gap-2 py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Star className="fill-accent text-accent" size={14} />
                            Star on GitHub
                        </a>
                        <a
                            href={URLS.GITHUB_ISSUES}
                            className="text-xs font-mono flex items-center gap-2 py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <HeartPlus className="fill-accent text-accent" size={14} />
                            Contribute
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
