import { ReactNode } from "react";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
    return (
        <section id={id} className={`cross-border corner-h py-12 px-5 sm:px-8 ${className}`}>
            {children}
        </section>
    );
}
