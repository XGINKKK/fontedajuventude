"use client";

import React from "react";
import { motion } from "framer-motion";

interface BMIChartProps {
    bmi: number;
}

export function BMIChart({ bmi }: BMIChartProps) {
    // BMI Categories
    // Underweight: < 18.5
    // Normal: 18.5 - 24.9
    // Overweight: 25 - 29.9
    // Obesity: > 30

    // Map BMI to a percentage position on the curve (0 to 100)
    // We'll define the range 15 to 35 for the chart visualization
    const minBMI = 15;
    const maxBMI = 35;
    const percentage = Math.min(Math.max((bmi - minBMI) / (maxBMI - minBMI) * 100, 0), 100);

    return (
        <div className="w-full space-y-6">
            {/* BMI Categories Legend */}
            <div className="grid grid-cols-4 gap-2 text-center">
                <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#8BC34A] shadow-sm" />
                    <span className="text-[10px] font-bold text-zinc-700 leading-tight">Abaixo do Peso</span>
                    <span className="text-[9px] text-zinc-400">Menor que 18,5</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#FFD54F] shadow-sm" />
                    <span className="text-[10px] font-bold text-zinc-700 leading-tight">Peso Ideal</span>
                    <span className="text-[9px] text-zinc-400">Entre 18,5 e 24,9</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF9800] shadow-sm" />
                    <span className="text-[10px] font-bold text-zinc-700 leading-tight">Acima do Peso</span>
                    <span className="text-[9px] text-zinc-400">Entre 25 e 29,9</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#F44336] shadow-sm" />
                    <span className="text-[10px] font-bold text-zinc-700 leading-tight">Obesidade</span>
                    <span className="text-[9px] text-zinc-400">Acima de 29,9</span>
                </div>
            </div>

            {/* Chart Title */}
            <div className="text-center pt-4">
                <h4 className="text-sm font-bold text-zinc-800">
                    Índice de Massa Corpórea (IMC) após calculo do seu peso e altura
                </h4>
            </div>

            {/* SVG Chart */}
            <div className="relative w-full h-48">
                <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8BC34A" />   {/* Green */}
                            <stop offset="30%" stopColor="#8BC34A" />
                            <stop offset="45%" stopColor="#FFD54F" />   {/* Yellow */}
                            <stop offset="60%" stopColor="#FF9800" />   {/* Orange */}
                            <stop offset="100%" stopColor="#F44336" />  {/* Red */}
                        </linearGradient>
                    </defs>

                    {/* Curve Path - A smooth hill shape */}
                    <path
                        d="M0,180 C50,150 100,140 150,160 C200,180 250,100 300,60 C350,20 400,20 400,20 L400,200 L0,200 Z"
                        fill="url(#chartGradient)"
                        opacity="0.6"
                    />
                    <path
                        d="M0,180 C50,150 100,140 150,160 C200,180 250,100 300,60 C350,20 400,20 400,20"
                        fill="none"
                        stroke="url(#chartGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />

                    {/* Reference Lines/Labels */}
                    {/* 18.5 */}
                    <line x1="120" y1="0" x2="120" y2="200" stroke="#e5e7eb" strokeDasharray="4 4" />
                    <g transform="translate(120, 140)">
                        <rect x="-15" y="-25" width="30" height="20" rx="4" fill="white" stroke="#e5e7eb" />
                        <text x="0" y="-12" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#374151">18,5</text>
                        <circle cx="0" cy="8" r="4" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                    </g>

                    {/* 25 */}
                    <line x1="240" y1="0" x2="240" y2="200" stroke="#e5e7eb" strokeDasharray="4 4" />
                    <g transform="translate(240, 100)">
                        <rect x="-15" y="-25" width="30" height="20" rx="4" fill="white" stroke="#e5e7eb" />
                        <text x="0" y="-12" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#374151">25</text>
                        <circle cx="0" cy="15" r="4" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                    </g>

                    {/* 30 */}
                    <line x1="350" y1="0" x2="350" y2="200" stroke="#e5e7eb" strokeDasharray="4 4" />
                    <g transform="translate(350, 40)">
                        <rect x="-15" y="-25" width="30" height="20" rx="4" fill="white" stroke="#e5e7eb" />
                        <text x="0" y="-12" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#374151">30</text>
                        <circle cx="0" cy="6" r="4" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                    </g>


                    {/* User BMI Indicator */}
                    {/* We need to calculate the position on the curve for the user's BMI */}
                    {/* This is a simplified approximation for visual effect */}
                    <motion.g
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        {/* 
                            We need to map BMI to X,Y coordinates on the curve.
                            Curve approximation:
                            0-150 (BMI 15-20): M0,180 C50,150 100,140 150,160
                            150-400 (BMI 20-35): C200,180 250,100 300,60 C350,20 400,20 400,20
                         */}

                        {/* Dynamic positioning logic would be complex in pure SVG without a library. 
                             For this prototype, we'll use a simplified linear interpolation for X 
                             and a lookup for Y based on the curve shape. 
                         */}

                        <foreignObject x={0} y={0} width="400" height="200">
                            <div className="w-full h-full relative">
                                <div
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                                    style={{
                                        left: `${percentage}%`,
                                        top: '50%' // Simplified top position, ideally should follow curve
                                    }}
                                >
                                    <div className="bg-[#D500F9] text-white text-[10px] font-bold px-3 py-1 rounded-full mb-2 shadow-lg whitespace-nowrap">
                                        Seu IMC é {bmi}
                                    </div>
                                    <div className="w-4 h-4 rounded-full bg-white border-4 border-[#D500F9] shadow-sm" />
                                </div>
                            </div>
                        </foreignObject>
                    </motion.g>
                </svg>
            </div>
        </div>
    );
}
