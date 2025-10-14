import { useEffect, useState } from "react";
import { getTurns } from "../../services/turnsServices";

export const useCalendarTurns = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTurns = async () => {
            try {
                setLoading(true);
                const turns = await getTurns();
                console.log("🔍 Turns desde backend:", turns);

                const ordered = turns.sort((a, b) => new Date(a.date) - new Date(b.date));
                const mapped = [];

                ordered.forEach((turn) => {
                    const baseDate = new Date(turn.date);

                    for (let i = 0; i < turn.days; i++) {
                        const dayDate = new Date(baseDate);
                        dayDate.setDate(baseDate.getDate() + i);
                        const dateStr = dayDate.toISOString().split("T")[0];

                        if (turn.type === "partido") {
                            mapped.push({
                                title: "P",
                                start: turn.morning_start_time
                                    ? `${dateStr}T${turn.morning_start_time}`
                                    : `${dateStr}T00:00`,
                                end: turn.afternoon_end_time
                                    ? `${dateStr}T${turn.afternoon_end_time}`
                                    : `${dateStr}T23:59`,
                                morning_start: turn.morning_start_time,
                                morning_end: turn.morning_end_time,
                                afternoon_start: turn.afternoon_start_time,
                                afternoon_end: turn.afternoon_end_time,
                                allDay: false,
                            });
                        } else if (turn.type === "mañanas") {
                            mapped.push({
                                title: "M",
                                start: new Date(`${dateStr}T${turn.start_time}`),
                                end: new Date(`${dateStr}T${turn.end_time}`),
                                allDay: false,
                            });
                        } else if (turn.type === "tardes") {
                            mapped.push({
                                title: "T",
                                start: new Date(`${dateStr}T${turn.start_time}`),
                                end: new Date(`${dateStr}T${turn.end_time}`),
                                allDay: false,
                            });
                        } else {
                            mapped.push({
                                title: "D",
                                start: new Date(`${dateStr}T00:00`),
                                end: new Date(`${dateStr}T23:59`),
                                allDay: true,
                            });
                        }
                    }
                });

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
