"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { URLS } from "../constant/urls";

const sidebarLinks = [
    { href: "/docs", label: "Introduction" },
    { href: "/docs/init", label: "regify init" },
    { href: "/docs/generate", label: "regify generate" },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen pt-14">
            <div className="max-w-6xl mx-auto flex gap-12 px-6">
                {/* Sidebar */}
                <aside className="w-64 shrink-0 py-12 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto hidden md:block border-r border-border/50 pr-8">
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                                GETTING STARTED
                            </h4>
                            <nav className="flex flex-col gap-2">
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`text-sm font-medium transition-colors py-1 ${isActive
                                                ? "text-accent"
                                                : "text-muted-foreground hover:text-accent"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                                RESOURCES
                            </h4>
                            <nav className="flex flex-col gap-2">
                                <a
                                    href={URLS.GITHUB}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-1"
                                >
                                    GitHub
                                </a>
                                <a
                                    href={URLS.NPM}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors py-1"
                                >
                                    NPM
                                </a>
                            </nav>
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-1 py-12 max-w-3xl w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
