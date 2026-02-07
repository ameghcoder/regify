"use client";

import { useState } from "react";

interface CodeBlockProps {
    cli: string;
    api: string;
}

export function CodeBlock({ cli, api }: CodeBlockProps) {
    const [mode, setMode] = useState<"cli" | "api">("cli");

    return (
        <div className="cross-border corner-h bg-background flex flex-col w-full overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <div className="flex gap-4">
                    <button
                        onClick={() => setMode("cli")}
                        className={`text-xs font-mono transition-colors ${mode === "cli" ? "text-accent" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        CLI
                    </button>
                    <button
                        onClick={() => setMode("api")}
                        className={`text-xs font-mono transition-colors ${mode === "api" ? "text-accent" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        API
                    </button>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-border" />
                    <div className="w-2 h-2 rounded-full bg-border" />
                    <div className="w-2 h-2 rounded-full bg-border" />
                </div>
            </div>
            <div className="p-6 font-mono text-sm overflow-x-auto selection:bg-accent/30">
                <pre className="text-foreground">
                    <code>{mode === "cli" ? cli : api}</code>
                </pre>
            </div>
        </div>
    );
}


export function SingleCodeBlock({ code }: { code: string }) {
    return (
        <div className="cross-border corner-h bg-background flex flex-col w-full overflow-hidden">
            <div className="p-6 font-mono text-sm overflow-x-auto selection:bg-accent/30">
                <pre className="text-foreground">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}