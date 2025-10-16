import { useState, useEffect } from "react";
import { WorkShifts, BreakBlock } from "./TurnBlock";
import { useSettings } from "./useSettings";
import { createBlock } from "../../utils/blocks";
import { ButtonDefault } from "../../components/buttons/ButtonDefault";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTurns, addTurn, updateTurn } from "./turnsSlice";

const shiftColors = {
    mañanas: "bg-blue-500",
    tardes: "bg-yellow-400",
    partido: "bg-pink-400",
    noches: "bg-purple-500",
    descanso: "bg-green-500",
};

export const Settings = () => {
    const { confirmedBlocks, setConfirmedBlocks, saveBlock, removeLastBlock, saveToDB } = useSettings();
    const [activeWork, setActiveWork] = useState(createBlock("work"));
    const [activeRest, setActiveRest] = useState(createBlock("rest"));

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode") || "config";

    const dispatch = useDispatch();
    const { turns, loading } = useSelector((state) => state.turns);

    useEffect(() => {
        if (mode === "view") {
            dispatch(fetchTurns());
        }
    }, [dispatch, mode]);

    const renderDots = () => {
        const blocksToRender = mode === "view" ? turns : confirmedBlocks;

        if (!blocksToRender || !blocksToRender.length) return null;

        return blocksToRender.flatMap((block, index) => {
            const color = shiftColors[block.type] || (block.type === "rest" ? shiftColors.descanso : "bg-gray-400");
            const count =
                mode === "view" ? block.days || 1 : block.type === "work" ? block.workDays || 1 : block.restDays || 1;

            return Array.from({ length: count }).map((_, i) => (
                <div
                    key={`${index}-${i}`}
                    className={`w-9 h-9 rounded-full ${color} border border-gray-600 flex justify-center items-center text-white`}
                    title={`${block.shift || block.type || "descanso"} día ${i + 1}`}
                >
                    {block.type?.[0].toUpperCase() || "D"}
                </div>
            ));
        });
    };

    if (mode === "view" && loading) return <p>Cargando patrón...</p>;

    console.log("🔎 mode actual:", mode);
    console.log("🌀 turns desde Redux:", turns);

    return (
        <div className="mt-8 flex flex-col space-y-4 w-full h-full p-4 items-center">
            {mode === "view" ? (
                <div className="w-full">
                    <h1 className="text-center text-2xl text-gray-500">Patrón actual</h1>
                    <div className="mt-8 flex flex-wrap gap-2 w-full justify-center">{renderDots()}</div>

                    <fieldset className="border border-gray-200 mt-6 p-4">
                        <legend className="px-2 text-gray-500">Leyenda</legend>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-6 h-6 rounded-full bg-blue-500 border border-gray-600"></div>
                            <p>
                                Mañanas: {turns.find((t) => t.type === "mañanas")?.start_time || "--"} -{" "}
                                {turns.find((t) => t.type === "mañanas")?.end_time || "--"}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-6 h-6 rounded-full bg-yellow-400 border border-gray-600"></div>
                            <p>
                                Tardes: {turns.find((t) => t.type === "tardes")?.start_time || "--"} -{" "}
                                {turns.find((t) => t.type === "tardes")?.end_time || "--"}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-6 h-6 rounded-full bg-pink-400 border border-gray-600"></div>
                            <p>
                                Partido: {turns.find((t) => t.type === "partido")?.morning_start_time || "--"} -{" "}
                                {turns.find((t) => t.type === "partido")?.afternoon_end_time || "--"}
                            </p>
                        </div>
                    </fieldset>
                </div>
            ) : (
                <>
                    <WorkShifts
                        data={activeWork}
                        handlers={{
                            handleChange: (field, val) => setActiveWork((prev) => ({ ...prev, [field]: val })),
                            handleTimeChange: (timeType, field, val) =>
                                setActiveWork((prev) => ({
                                    ...prev,
                                    [timeType]: { ...prev[timeType], [field]: val },
                                })),
                            handleSplitChange: (part, field, val) =>
                                setActiveWork((prev) => ({
                                    ...prev,
                                    splitShift: {
                                        ...prev.splitShift,
                                        [part]: { ...prev.splitShift[part], [field]: val },
                                    },
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

                    <div className="flex flex-wrap h-[20%] gap-2 w-full justify-center">{renderDots()}</div>

                    <div className="flex flex-col justify-between gap-3 p-3">
                        <ButtonDefault
                            onClick={removeLastBlock}
                            className="bg-orange-400 w-full text-white text-base"
                            text="Eliminar último bloque"
                        />
                        <ButtonDefault
                            onClick={removeLastBlock}
                            className="bg-red-500 w-full text-white text-base"
                            text="Eliminar patrón"
                        />
                        <ButtonDefault
                            onClick={saveToDB}
                            className="bg-green-600 w-full text-white text-base"
                            text="Guardar y repetir patrón"
                        />
                    </div>
                </>
            )}
        </div>
    );
};
