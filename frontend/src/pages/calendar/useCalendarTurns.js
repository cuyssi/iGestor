import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

const getTurnForDate = (date, pattern, startDate) => {
    const totalDays = pattern.reduce((sum, block) => sum + block.days, 0);
    const diffDays = Math.floor((date - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const dayInCycle = ((diffDays % totalDays) + totalDays) % totalDays;

    let acc = 0;
    for (const block of pattern) {
        acc += block.days;
        if (dayInCycle < acc) return block;
    }
    return null;
};

export const useCalendarTurns = () => {
    const { turns, loading: reduxLoading } = useSelector((state) => state.turns);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!turns || !turns.length) {
            setEvents([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const mapped = [];
        const ordered = [...turns].sort((a, b) => new Date(a.date) - new Date(b.date));
        const startDate = new Date(ordered[0].date);
        const endRange = new Date();
        endRange.setFullYear(endRange.getFullYear() + 2);

        let currentDate = new Date(startDate);
        while (currentDate <= endRange) {
            const block = getTurnForDate(currentDate, ordered, startDate);
            if (block) {
                const dateStr = currentDate.toISOString().split("T")[0];

                if (block.shift === "partido") {
                    mapped.push({
                        title: "P",
                        start: `${dateStr}T${block.morning_start_time}`,
                        end: `${dateStr}T${block.afternoon_end_time}`,
                        morning_start: block.morning_start_time,
                        morning_end: block.morning_end_time,
                        afternoon_start: block.afternoon_start_time,
                        afternoon_end: block.afternoon_end_time,
                    });
                } else if (block.shift === "mañanas") {
                    mapped.push({
                        title: "M",
                        start: `${dateStr}T${block.start_time}`,
                        end: `${dateStr}T${block.end_time}`,
                    });
                } else if (block.shift === "tardes") {
                    mapped.push({
                        title: "T",
                        start: `${dateStr}T${block.start_time}`,
                        end: `${dateStr}T${block.end_time}`,
                    });
                } else {
                    mapped.push({
                        title: "D",
                        start: `${dateStr}T00:00`,
                        end: `${dateStr}T23:59`,
                    });
                }
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }
        setEvents(mapped);
        setLoading(reduxLoading);
    }, [turns, reduxLoading]);

    const upcomingTurns = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const next3Days = [];
        for (let i = 0; i < 3; i++) {
            const day = new Date(today);
            day.setDate(today.getDate() + i);
            next3Days.push(day);
        }

        return events
            .filter((e) => {
                const eventDate = new Date(e.start);
                eventDate.setHours(0, 0, 0, 0);
                return next3Days.some((d) => d.getTime() === eventDate.getTime());
            })
            .sort((a, b) => new Date(a.start) - new Date(b.start));
    }, [events]);

    const upcomingRests = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const rests = events
            .filter((e) => e.title === "D")
            .filter((e) => new Date(e.start) >= today)
            .sort((a, b) => new Date(a.start) - new Date(b.start));

        return rests.slice(0, 3);
    }, [events]);

    return { events, upcomingTurns, upcomingRests, loading };
};
