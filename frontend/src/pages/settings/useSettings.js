import { useState } from "react";
import { createTurn } from "../../services/turnsServices";
import { useSelector } from "react-redux";

export const useSettings = () => {
    const [confirmedBlocks, setConfirmedBlocks] = useState([]);
    const { turns, loading } = useSelector((state) => state.turns);

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
            let baseDate = new Date();

            for (const block of confirmedBlocks) {
                const { shift, startTime, endTime, splitShift, days } = block;

                let shiftData = {
                    date: baseDate.toISOString().split(".")[0],
                    shift: shift,
                    days,
                };

                if (shift === "partido") {
                    shiftData = {
                        ...shiftData,
                        morning_start_time: `${splitShift.mañana.hour}:${splitShift.mañana.minute}`,
                        morning_end_time: `${splitShift.mañana.endHour}:${splitShift.mañana.endMinute}`,
                        afternoon_start_time: `${splitShift.tarde.hour}:${splitShift.tarde.minute}`,
                        afternoon_end_time: `${splitShift.tarde.endHour}:${splitShift.tarde.endMinute}`,
                        night_start_time: `${splitShift.noche.hour}:${splitShift.noche.minute}`,
                        night_end_time: `${splitShift.noche.endHour}:${splitShift.noche.endMinute}`,
                        shift: "partido",
                    };
                } else {
                    shiftData = {
                        ...shiftData,
                        start_time: `${startTime.hour}:${startTime.minute}`,
                        end_time: `${endTime.hour}:${endTime.minute}`,
                    };
                }

                await createTurn(shiftData);

                baseDate.setDate(baseDate.getDate() + days);
            }

            alert("Patrón guardado!");
        } catch (error) {
            console.error("Error saving shifts:", error);
            alert("Error saving shifts");
        }
    };

    return {
        turns,
        loading,
        confirmedBlocks,
        setConfirmedBlocks,
        saveBlock,
        removeLastBlock,
        repeatPattern,
        saveToDB,
    };
};
