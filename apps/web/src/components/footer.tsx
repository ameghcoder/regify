import { URLS } from '@/app/constant/urls'
import React from 'react'

const Footer = () => {
    return (
        <footer className="px-8 py-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-muted-foreground text-sm font-mono">
                    &copy; {new Date().getFullYear()} Regify. Built for speed.
                </p>
                <div className="flex gap-6">
                    <a href={URLS.GITHUB} className="text-muted-foreground hover:text-accent transition-colors text-sm font-mono">Github</a>
                    <a href={URLS.NPM} className="text-muted-foreground hover:text-accent transition-colors text-sm font-mono">NPM</a>
                </div>
            </div>
            <strong className="text-muted-foreground text-sm font-mono">Created with ❤️ by <a href="https://x.com/yrjdev">Yashraj</a></strong>
        </footer>
    )
}

export default Footer