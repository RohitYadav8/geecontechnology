import { FloatingBlob } from "./floating-blob";

/**
 * Ambient background layer for the page: grid pattern, radial glow,
 * and two floating blobs (same pattern as the Products page).
 * Render this as the first child inside a `relative overflow-hidden` container.
 */
export function BackgroundEffects() {
    return (
        <>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 dark:opacity-10" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,.15),transparent_60%)]" />
            <FloatingBlob className="-right-20 top-10 h-72 w-72" color="bg-blue-400/10" duration={16} />
            <FloatingBlob className="-left-16 top-96 h-64 w-64" color="bg-cyan-300/10" duration={20} />
        </>
    );
}
