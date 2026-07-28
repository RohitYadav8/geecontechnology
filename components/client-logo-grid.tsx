"use client";

import { motion } from "motion/react";
import { ClientCard } from "./client-card";
import type { Client } from "../lib/clients-data";

const ROW_VARIANTS = [
    { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }, // fade up
    { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }, // slide left
    { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } }, // scale
    { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }, // fade right
];

const COLS = 4;

export function ClientLogoGrid({ clients }: { clients: Client[] }) {
    const rows: Client[][] = [];
    for (let i = 0; i < clients.length; i += COLS) rows.push(clients.slice(i, i + COLS));

    return (
        <div className="space-y-6">
            {rows.map((row, rowIndex) => (
                <motion.div
                    key={rowIndex}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    variants={ROW_VARIANTS[rowIndex % ROW_VARIANTS.length]}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                >
                    {row.map((client) => (
                        <ClientCard key={client.id} client={client} />
                    ))}
                </motion.div>
            ))}
        </div>
    );
}
