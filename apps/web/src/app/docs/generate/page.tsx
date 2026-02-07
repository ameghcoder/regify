import { CodeBlock } from "@/components/code-block";
import { Section } from "@/components/section";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "regify generate",
    description: "Learn how to use regify generate to transform components into shareable registries.",
};

export default function GenerateDocs() {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">regify generate</h1>
                <p className="text-muted-foreground text-lg font-medium">
                    Transform your components into shareable JSON registries.
                </p>
            </header>

            <Section>
                <div className="space-y-8">
                    <p className="text-muted-foreground leading-relaxed">
                        The <code className="text-foreground">generate</code> command is the core of Regify. It scans your source files, extracts their metadata, and packages them into a format that is 100% compatible with the shadcn CLI.
                    </p>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Command Options</h3>
                        <div className="grid gap-4">
                            <div className="p-4 border border-border rounded-md bg-muted/10">
                                <div className="flex gap-2 items-center mb-1">
                                    <code className="text-accent font-bold">--input</code>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest px-1.5 py-0.5 border border-border rounded">Required</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    The path to the input file or directory to scan. Supports .ts, .tsx, .js, .jsx.
                                </p>
                            </div>

                            <div className="p-4 border border-border rounded-md bg-muted/10">
                                <div className="flex gap-2 items-center mb-1">
                                    <code className="text-accent font-bold">--output</code>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Override the default output directory defined in your regify.json.
                                </p>
                            </div>

                            <div className="p-4 border border-border rounded-md bg-muted/10">
                                <div className="flex gap-2 items-center mb-1">
                                    <code className="text-accent font-bold">--name</code>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Specify a custom name for the generated registry file. Defaults to the filename. Only work if input is a file.
                                </p>
                            </div>

                            <div className="p-4 border border-border rounded-md bg-muted/10">
                                <div className="flex gap-2 items-center mb-1">
                                    <code className="text-accent font-bold">--rawjson</code>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Output raw JSON to console. If true, the --output flag will be ignored.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Examples</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-sm font-medium mb-3 text-muted-foreground">Generating from a directory:</p>
                                <CodeBlock
                                    cli={`regify generate --input ./src/components`}
                                    api={`import { regify } from "regify";\n\nconst result = await regify({\n  input: "./src/components",\n  output: "./registry"\n});`}
                                />
                            </div>

                            <div>
                                <p className="text-sm font-medium mb-3 text-muted-foreground">Generating a specific component:</p>
                                <CodeBlock
                                    cli={`regify generate --input ./src/components/button.tsx --name my-button`}
                                    api={`import { regify } from "regify";\n\nconst result = await regify({\n  input: "./src/components/button.tsx",\n  name: "my-button"\n});`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
