import { useState } from "react";
import { WorkShifts, BreakBlock } from "./TurnBlock";
import { useSettings } from "./useSettings";
import { createBlock } from "../../utils/blocks";

const shiftColors = {
    mañanas: "bg-blue-500",
    tardes: "bg-yellow-400",
    partido: "bg-pink-400",
    noches: "bg-purple-500",
    descanso: "bg-green-500",
};

export const Settings = () => {
    const { confirmedBlocks, saveBlock, removeLastBlock, repeatPattern, saveToDB } = useSettings();
    const [activeWork, setActiveWork] = useState(createBlock("work"));
    const [activeRest, setActiveRest] = useState(createBlock("rest"));

    const renderDots = () => {
        console.log("Confirmed blocks:", confirmedBlocks);
        return confirmedBlocks.flatMap((block, index) => {
            const color = shiftColors[block.shift] || (block.type === "rest" ? shiftColors.descanso : "bg-gray-400");
            const count = block.type === "work" ? block.workDays : block.restDays;

            console.log(`Block ${index}: type=${block.type}, count=${count}`);

            return Array.from({ length: count }).map((_, i) => (
                <div
                    key={`${index}-${i}`}
                    className={`w-4 h-4 rounded-full ${color} border border-gray-600`}
                    title={`${block.shift || "descanso"} día ${i + 1}`}
                />
            ));
        });
    };

    return (
        <div className="flex flex-col space-y-4 w-full h-full p-4 items-center">
            <WorkShifts
                data={activeWork}
                handlers={{
                    handleChange: (field, val) => setActiveWork((prev) => ({ ...prev, [field]: val })),
                    handleTimeChange: (timeType, field, val) =>
                        setActiveWork((prev) => ({ ...prev, [timeType]: { ...prev[timeType], [field]: val } })),
                    handleSplitChange: (part, field, val) =>
                        setActiveWork((prev) => ({
                            ...prev,
                            splitShift: { ...prev.splitShift, [part]: { ...prev.splitShift[part], [field]: val } },
                        })),
                }}
                saveBlocks={() => {
                    saveBlock(activeWork);
                    setActiveWork(createBlock("work"));
                }}
            />

            <BreakBlock
                data={activeRest}
                handlers={{
                    handleChange: (field, val) => setActiveRest((prev) => ({ ...prev, [field]: val })),
                }}
                saveBlocks={() => {
                    saveBlock(activeRest);
                    setActiveRest(createBlock("rest"));
                }}
            />

            <div className="flex flex-wrap gap-2 mt-6 p-4 border-t border-gray-500 w-full justify-center">
                {renderDots()}
            </div>

            <div className="flex gap-3 mt-4">
                <button onClick={removeLastBlock} className="px-4 py-2 bg-red-500 text-white rounded">
                    Eliminar último bloque
                </button>
                <button onClick={repeatPattern} className="px-4 py-2 bg-yellow-500 text-white rounded">
                    Repetir patrón
                </button>
                <button onClick={saveToDB} className="px-4 py-2 bg-green-600 text-white rounded">
                    Guardar todo en DB
                </button>
            </div>
        </div>
    );
};
