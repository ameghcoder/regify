import { CodeBlock, SingleCodeBlock } from "@/components/code-block";
import { Section } from "@/components/section";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "regify init",
    description: "Prepare your project for registry generation with regify init.",
};

export default function InitDocs() {
    return (
        <div className="space-y-12">
            <header className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">regify init</h1>
                <p className="text-muted-foreground text-lg font-medium">
                    Prepare your project for registry generation.
                </p>
            </header>

            <Section>
                <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                        The <code className="text-foreground">init</code> command creates a <code className="text-foreground">regify.json</code> configuration file in your root directory. This file is the source of truth for your component registry.
                    </p>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">What it does</h3>
                        <ul className="space-y-3">
                            <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                <span className="text-accent shrink-0 mt-1">•</span>
                                <span>
                                    <strong className="text-foreground block font-semibold mb-1">Configuration Setup</strong>
                                    Sets up default values for your registry json files
                                </span>
                            </li>
                            <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                <span className="text-accent shrink-0 mt-1">•</span>
                                <span>
                                    <strong className="text-foreground block font-semibold mb-1">Output Directory</strong>
                                    Specifies where your generated registry JSON files will be stored.
                                </span>
                            </li>
                            <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                <span className="text-accent shrink-0 mt-1">•</span>
                                <span>
                                    <strong className="text-foreground block font-semibold mb-1">Dependency Mapping</strong>
                                    Allows you to map local registryDependencies to their remote registry URLs.
                                </span>
                            </li>
                            <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                <span className="text-accent shrink-0 mt-1">•</span>
                                <span>
                                    <strong className="text-foreground block font-semibold mb-1">Base Path</strong>
                                    Sets a default base path for your component source files (e.g., &apos;src/components&apos;).
                                </span>
                            </li>
                            <SingleCodeBlock
                                code={`// 👉 regify.json - your config file
{
    ...
    basePath: "src/components"
    ...
    registryDependencies: [
        "btn-provider": "https://r.yourdomain.com/r/btn-provider.json",  // 👉 your remote registry json files, you can add as many files as you want\t
        ...
    ]
    ...
}

// 👉 Now it will be used like this in your generate registry json
{
    "name": "button",
    "type": "registry:ui",
    ...
    "registryDependencies": [
        "https://r.yourdomain.com/r/btn-provider.json",  // 👉 your remote registry json files
    ],
    "files": [
        {
        "path": "src/components/button", // 👉 basePath + "/button"
        "content": "\"use client\" ...", // content of your component file
        "type": "registry:ui"
        }
    ]
}`}
                            />
                        </ul>
                    </div>

                    <div className="pt-4">
                        <h3 className="text-xl font-bold mb-4">Usage</h3>
                        <CodeBlock
                            cli={`regify init`}
                            api={`// Programmatic init is usually not required.\n// Simply ensure a regify.json exists in your CWD.`}
                        />
                    </div>
                </div>
            </Section>
        </div>
    );
}
