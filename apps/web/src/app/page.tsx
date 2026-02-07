import { CodeBlock } from "@/components/code-block";
import { Section } from "@/components/section";
import { Github } from "lucide-react";
import Link from "next/link";
import { URLS } from "./constant/urls";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto py-24 space-y-12 px-6 lg:px-0">

        {/* Hero Section */}
        <header className="space-y-8 py-12">
          <div className="inline-block px-3 py-1 text-xs font-mono border border-accent/20 bg-accent/5 text-accent rounded-full">
            v1.0.0
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl leading-[0.9]">
            Turn components into <br />
            shareable <span className="text-accent">registries.</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-xl max-w-2xl font-medium">
            The Universal Component Registry CLI. Build registries that are <span className="text-foreground">100% compatible</span> with the shadcn cli.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href="/docs"
              className="px-4 py-2 bg-accent text-background font-bold rounded-md hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <a
              href={URLS.GITHUB}
              className="flex items-center gap-2 px-4 py-2 border border-border text-foreground font-bold rounded-md hover:bg-accent/10 hover:text-accent transition-colors"
            >
              <Github className="size-3.5" />
              GitHub
            </a>
          </div>
        </header>

        {/* Quick Preview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-12">
            <Section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight">Shadcn CLI Compatible.</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Regify generates the exact JSON structure required by shadcn, making it the easiest way to share your components.
                  </p>
                  <Link href="/docs" className="inline-block text-xs font-mono text-accent hover:underline">
                    Explore Commands →
                  </Link>
                </div>
                <CodeBlock
                  cli={`regify generate --input ./src/components`}
                  api={`import { regify } from "regify";\n\nconst result = await regify({\n  input: "./src/components",\n  output: "./registry"\n});`}
                />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}
