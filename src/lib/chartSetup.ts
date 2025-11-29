"use client";

import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
} from "chart.js";

ChartJS.register(
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
);