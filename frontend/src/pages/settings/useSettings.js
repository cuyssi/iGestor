import { useState } from "react";
import { createTurn } from "../../services/turnsServices";

export const useSettings = () => {
    const [confirmedBlocks, setConfirmedBlocks] = useState([]);

    const saveBlock = (block) => {
        setConfirmedBlocks((prev) => [...prev, block]);
    };

    const removeLastBlock = () => {
        setConfirmedBlocks((prev) => prev.slice(0, -1));
    };

    const repeatPattern = () => {
        setConfirmedBlocks((prev) => [...prev, ...prev]);
    };

    const saveToDB = async () => {
        try {
            let baseDate = new Date(); // fecha inicial (hoy)

            for (const block of confirmedBlocks) {
                const { shift, startTime, endTime, splitShift, workDays, restDays, type } = block;
                const days = type === "work" ? workDays : restDays;

                let shiftData = {
                    date: baseDate.toISOString().split(".")[0],
                    type: shift || "normal",
                    days,
                };

                if (shift === "partido") {
                    shiftData = {
                        ...shiftData,
                        morning_start_time: `${splitShift.mañana.hour}:${splitShift.mañana.minute}`,
                        morning_end_time: `${splitShift.mañana.endHour}:${splitShift.mañana.endMinute}`,
                        afternoon_start_time: `${splitShift.tarde.hour}:${splitShift.tarde.minute}`,
                        afternoon_end_time: `${splitShift.tarde.endHour}:${splitShift.tarde.endMinute}`,
                        type: "partido",
                    };
                } else {
                    shiftData = {
                        ...shiftData,
                        start_time: `${startTime.hour}:${startTime.minute}`,
                        end_time: `${endTime.hour}:${endTime.minute}`,
                    };
                }

                await createTurn(shiftData);

                // avanzamos la fecha base según los días trabajados o descansados
                baseDate.setDate(baseDate.getDate() + days);
            }

            alert("Shifts saved successfully!");
        } catch (error) {
            console.error("Error saving shifts:", error);
            alert("Error saving shifts");
        }
    };

    return {
        confirmedBlocks,
        saveBlock,
        removeLastBlock,
        repeatPattern,
        saveToDB,
    };
};
