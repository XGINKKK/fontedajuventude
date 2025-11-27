"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StepCardProps {
    title: React.ReactNode;
    children: React.ReactNode;
}

export function StepCard({ title, children }: StepCardProps) {
    return (
        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden ring-1 ring-black/5">
            <CardHeader className="text-center pb-6 pt-8 px-6">
                <CardTitle className="text-2xl md:text-3xl font-extrabold text-zinc-800 leading-tight">{title}</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-8 pt-2">
                {children}
            </CardContent>
        </Card>
    );
}
