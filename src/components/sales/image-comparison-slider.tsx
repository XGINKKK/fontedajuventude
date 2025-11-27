"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronsLeftRight } from "lucide-react";

interface ImageComparisonSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
}

export function ImageComparisonSlider({
    beforeImage,
    afterImage,
    beforeLabel = "ANTES",
    afterLabel = "DEPOIS",
}: ImageComparisonSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        let clientX;

        if ("touches" in event) {
            clientX = event.touches[0].clientX;
        } else {
            clientX = (event as MouseEvent).clientX;
        }

        const position = ((clientX - containerRect.left) / containerRect.width) * 100;
        setSliderPosition(Math.min(100, Math.max(0, position)));
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        const handleWindowMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging) handleMove(e);
        };
        const handleWindowUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener("mousemove", handleWindowMove);
            window.addEventListener("mouseup", handleWindowUp);
            window.addEventListener("touchmove", handleWindowMove);
            window.addEventListener("touchend", handleWindowUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleWindowMove);
            window.removeEventListener("mouseup", handleWindowUp);
            window.removeEventListener("touchmove", handleWindowMove);
            window.removeEventListener("touchend", handleWindowUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize group"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* After Image (Background) */}
            <img
                src={afterImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
            />
            <div className="absolute top-4 right-4 bg-[#E91E63] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                {afterLabel}
            </div>

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                    {beforeLabel}
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E91E63] text-white p-2 rounded-full shadow-xl border-2 border-white transition-transform group-hover:scale-110">
                    <ChevronsLeftRight className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}
