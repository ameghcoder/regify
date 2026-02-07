import { Section } from "@/components/section";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Introduction",
    description: "Learn how to use Regify to turn your components into shadcn-compliant shareable registries.",
};

export default function DocsPage() {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Introduction</h1>
                <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                    Regify is a universal CLI to build component registries that are 100% compatible with the <span className="text-foreground">shadcn cli</span>.
                </p>
            </header>

            <Section>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tight">Configuration</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            The heart of Regify is the <code className="text-foreground">regify.json</code> file. This file defines how your components are mapped, where they are stored, and their external dependencies.
                        </p>

                        <div className="bg-muted/30 rounded-lg border border-border p-6 font-mono text-xs text-muted-foreground leading-relaxed overflow-x-auto">
                            <pre>
                                {`{
  "name": "my-ui-library",
  "version": "1.0.0",
  "outputDir": "./registry",
  "basePath": "src/components",
  "registryDependencies": {
    "utils": "https://r.yourdomain.com/utils.json"
  }
}`}
                            </pre>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link
                            href="/docs/init"
                            className="group p-6 border border-border rounded-lg hover:border-accent transition-colors"
                        >
                            <h3 className="font-bold mb-2 group-hover:text-accent transition-colors">Setup Project</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Learn how to initialize your project and generate your first configuration file.
                            </p>
                        </Link>
                        <Link
                            href="/docs/generate"
                            className="group p-6 border border-border rounded-lg hover:border-accent transition-colors"
                        >
                            <h3 className="font-bold mb-2 group-hover:text-accent transition-colors">Generate Registry</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Explore the powerful generation engine and its various flags and options.
                            </p>
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    );
}
