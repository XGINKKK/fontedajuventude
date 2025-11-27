"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SelectionCardProps {
    selected?: boolean;
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    multiSelect?: boolean;
    imageSrc?: string;
}

export function SelectionCard({ selected, onClick, children, className, multiSelect, imageSrc }: SelectionCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "relative cursor-pointer rounded-2xl border-2 p-4 transition-all duration-200 ease-in-out flex items-center shadow-sm hover:shadow-md",
                selected
                    ? "border-primary bg-primary/5 shadow-primary/10"
                    : "border-border bg-white hover:border-primary/50 hover:bg-slate-50",
                multiSelect && "hover:bg-primary/5",
                className
            )}
        >
            {imageSrc && (
                <div className="mr-4 flex-shrink-0">
                    <img
                        src={imageSrc}
                        alt=""
                        className="w-16 h-16 rounded-xl object-cover border border-black/5 shadow-sm"
                    />
                </div>
            )}
            <div className="flex-1">{children}</div>
            {selected && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-1 shadow-sm"
                >
                    <Check className="w-4 h-4" />
                </motion.div>
            )}
        </motion.div>
    );
}
