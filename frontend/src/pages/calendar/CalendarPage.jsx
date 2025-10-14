import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useCalendarTurns } from "./useCalendarTurns";
import { useState } from "react";
import { ModalCalendar } from "./ModalCalendar";

export const CalendarPage = () => {
    const { events, loading } = useCalendarTurns();
    const [openModal, setOpenModal] = useState(false);
    const [selectedTurn, setSelectedTurn] = useState(null);

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

    if (loading) return <p>Cargando calendario...</p>;

    return (
        <div className="p-4">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                firstDay={1}
                locale={esLocale}
                headerToolbar={{ right: "prev,next" }}
                contentHeight={"auto"}
                fixedWeekCount={false}
                events={events}
                eventContent={(arg) => (
                    <div
                        style={{
                            backgroundColor:
                                arg.event.title === "M"
                                    ? "#27D6F5"
                                    : arg.event.title === "T"
                                    ? "#F2C950"
                                    : arg.event.title === "P"
                                    ? "#F07E3A"
                                    : "#9EF252",
                            borderRadius: "6px",
                            width: "100%",
                            height: "auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            textAlign: "center",
                            padding: "10px",
                        }}
                    >
                        {arg.event.title}
                    </div>
                )}
                eventClick={handleEventClick}
            />
            {selectedTurn && (
                <ModalCalendar isOpen={openModal} onClose={() => setOpenModal(false)} selectedTurn={selectedTurn} />
            )}
        </div>
    );
};
