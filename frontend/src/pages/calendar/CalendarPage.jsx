import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useCalendarTurns } from "./useCalendarTurns";
import { useState, useRef } from "react";
import { ModalCalendar } from "./ModalCalendar";

export const CalendarPage = () => {
    const { events, loading } = useCalendarTurns();
    const [openModal, setOpenModal] = useState(false);
    const [selectedTurn, setSelectedTurn] = useState(null);
    const [title, setTitle] = useState("");
    const calendarRef = useRef(null);

    const handleEventClick = (clickInfo) => {
        const ev = clickInfo.event;
        setSelectedTurn({
            turn: ev.title,
            turn_start:
                ev.extendedProps?.morning_start ||
                ev.start?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            turn_end:
                ev.extendedProps?.afternoon_end ||
                ev.end?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            morning_start: ev.extendedProps?.morning_start,
            morning_end: ev.extendedProps?.morning_end,
            afternoon_start: ev.extendedProps?.afternoon_start,
            afternoon_end: ev.extendedProps?.afternoon_end,
        });
        setOpenModal(true);
    };

    const goPrev = () => {
        calendarRef.current.getApi().prev();
    };

    const goNext = () => {
        calendarRef.current.getApi().next();
    };

    if (loading) return <p>Cargando calendario...</p>;

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between items-center mb-2">
                <button className="bg-gray-200 px-2 py-1 rounded" onClick={goPrev}>
                    &lt;
                </button>

                <div className="text-center">
                    <div className="text-xl font-bold">{title.split(" ")[0]}</div>
                    <div className="text-lg">{title.split(" ")[1]}</div>
                </div>

                <button className="bg-gray-200 px-2 py-1 rounded" onClick={goNext}>
                    &gt;
                </button>
            </div>

            <FullCalendar
                timeZone="local"
                initialDate={new Date()}
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                firstDay={1}
                locale={esLocale}
                headerToolbar={false}
                contentHeight="auto"
                fixedWeekCount={false}
                events={events}
                eventClick={handleEventClick}
                eventContent={(arg) => (
                    <div
                        style={{
                            color: "#6B7280",
                            backgroundColor:
                                arg.event.title === "M"
                                    ? "#93C5FD"
                                    : arg.event.title === "T"
                                    ? "#FDE047"
                                    : arg.event.title === "N"
                                    ? "#C4B5FD"
                                    : arg.event.title === "P"
                                    ? "##FDBA74"
                                    : "#86EFAC",
                            borderRadius: "6px",
                            width: "100%",
                            height: "auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            textAlign: "center",
                            padding: "5px",
                        }}
                    >
                        {arg.event.title}
                    </div>
                )}
                datesSet={(info) => {
                    const firstDay = info.view.currentStart;
                    const monthName = firstDay.toLocaleString("es-ES", { month: "long" });
                    const year = firstDay.getFullYear();
                    const formatted = monthName.charAt(0).toUpperCase() + monthName.slice(1) + " " + year;
                    setTitle(formatted);
                }}
            />

            {selectedTurn && (
                <ModalCalendar isOpen={openModal} onClose={() => setOpenModal(false)} selectedTurn={selectedTurn} />
            )}
        </div>
    );
};
