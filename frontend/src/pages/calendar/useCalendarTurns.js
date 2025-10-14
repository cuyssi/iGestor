import { useEffect, useState } from "react";
import { getTurns } from "../../services/turnsServices";

const getTurnForDate = (date, pattern, startDate) => {
    const totalCycleDays = pattern.reduce((sum, block) => sum + block.days, 0);
    const diffDays = Math.floor((date - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const cycleDay = ((diffDays % totalCycleDays) + totalCycleDays) % totalCycleDays;
    let accumulated = 0;

    for (const block of pattern) {
        accumulated += block.days;
        if (cycleDay < accumulated) return block;
    }

    return null;
};

export const useCalendarTurns = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTurns = async () => {
            try {
                setLoading(true);
                const turns = await getTurns();
                if (!turns || !turns.length) return;

                const ordered = turns.sort((a, b) => new Date(a.date) - new Date(b.date));
                const startDate = new Date(ordered[0].date);
                const mapped = [];
                const today = new Date();
                const startRange = new Date(today);
                startRange.setFullYear(today.getFullYear() - 1);
                const endRange = new Date(today);
                endRange.setFullYear(today.getFullYear() + 2);

                for (let d = new Date(startRange); d <= endRange; d.setDate(d.getDate() + 1)) {
                    const turn = getTurnForDate(d, ordered, startDate);
                    if (!turn) continue;

                    const dateStr = d.toISOString().split("T")[0];
                    if (turn.type === "partido") {
                        mapped.push({
                            title: "P",
                            start: `${dateStr}T${turn.morning_start_time || "09:00"}`,
                            end: `${dateStr}T${turn.afternoon_end_time || "20:00"}`,
                            morning_start: turn.morning_start_time,
                            morning_end: turn.morning_end_time,
                            afternoon_start: turn.afternoon_start_time,
                            afternoon_end: turn.afternoon_end_time,
                        });
                    } else if (turn.type === "mañanas") {
                        mapped.push({
                            title: "M",
                            start: `${dateStr}T${turn.start_time}`,
                            end: `${dateStr}T${turn.end_time}`,
                        });
                    } else if (turn.type === "tardes") {
                        mapped.push({
                            title: "T",
                            start: `${dateStr}T${turn.start_time}`,
                            end: `${dateStr}T${turn.end_time}`,
                        });
                    } else {
                        mapped.push({
                            title: "D",
                            start: `${dateStr}T00:00`,
                            end: `${dateStr}T23:59`,
                        });
                    }
                }

                setEvents(mapped);
            } catch (error) {
                console.error("Error fetching turns for calendar:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTurns();
    }, []);

    return { events, loading };
};
