import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCalendarTurns } from "./useCalendarTurns";

const locales = { es };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export const CalendarPage = () => {
    const { events, loading } = useCalendarTurns();

    const eventStyleGetter = (event) => {
        let backgroundColor = "#ccc";

        if (event.title.startsWith("M")) backgroundColor = "#facc15";
        if (event.title.startsWith("T")) backgroundColor = "#34d399";
        if (event.title.startsWith("P")) backgroundColor = "#f472b6";
        if (event.title.startsWith("D")) backgroundColor = "#a1a1aa";

        return {
            style: {
                backgroundColor,
                borderRadius: "6px",
                color: "black",
                border: "none",
                padding: "4px",
                fontWeight: "bold",
                fontSize: "0.8rem",
                textAlign: "center",
            },
        };
    };

    if (loading) return <p>Loading calendar...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-dynamic">📅 Calendar of shifts</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );
};
