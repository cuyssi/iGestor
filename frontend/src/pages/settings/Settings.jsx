import { useState } from "react";
import { WorkShifts, BreakBlock } from "./TurnBlock";
import { useSettings } from "./useSettings";
import { createBlock } from "../../utils/blocks";
import { ButtonDefault } from "../../components/buttons/ButtonDefault";
import { useLocation } from "react-router-dom";
import { RenderDots } from "../../components/commons/RenderDots";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
    const { turns, loading, confirmedBlocks, saveBlock, removeLastBlock, saveToDB } = useSettings();
    const [activeBlock, setActiveBlock] = useState(createBlock());
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode") || "config";
    const navigate = useNavigate();

    if (mode === "view" && loading) return <p>Cargando patrón...</p>;

    console.log("🔎 mode actual:", mode);
    console.log("🌀 turns desde Redux:", turns);

    return (
        <div className="w-full h-full flex flex-col p-4 subbg-dynamic space-y-4 items-center">
            {mode === "view" ? (
                !turns || turns.length === 0 ? (
                    <div>
                        <h1 className="mt-8 text-center text-2xl text-red-400">Aún no tienes ningún patrón guardado</h1>
                        <div className="p-4 w-full">
                            <ButtonDefault
                                className="mt-10 w-full h-auto text-blue-400"
                                onClick={() => navigate("/settings?mode=config")}
                                text="Crear patrón nuevo"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        <h1 className="text-center text-2xl text-gray-500">Patrón actual</h1>
                        <div className="mt-8 flex flex-wrap gap-2 w-full justify-center">{RenderDots(turns)}</div>

                        <fieldset className="border border-gray-200 mt-6 p-4">
                            <legend className="px-2 text-gray-500">Leyenda</legend>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-6 h-6 rounded-full bg-blue-500 border border-gray-600"></div>
                                <p>
                                    Mañanas: {turns.find((t) => t.shift === "mañanas")?.start_time || "--"} -{" "}
                                    {turns.find((t) => t.shift === "mañanas")?.end_time || "--"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-6 h-6 rounded-full bg-yellow-400 border border-gray-600"></div>
                                <p>
                                    Tardes: {turns.find((t) => t.shift === "tardes")?.start_time || "--"} -{" "}
                                    {turns.find((t) => t.shift === "tardes")?.end_time || "--"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-6 h-6 rounded-full bg-pink-400 border border-gray-600"></div>
                                <p>
                                    Partido: {turns.find((t) => t.shift === "partido")?.morning_start_time || "--"} -{" "}
                                    {turns.find((t) => t.shift === "partido")?.afternoon_end_time || "--"}
                                </p>
                            </div>
                        </fieldset>

                        <div className="absolute bottom-4 w-full bg-green-400 flex justify-center">
                            <ButtonDefault
                                onClick={removeLastBlock}
                                className="bg-red-400 w-full text-white text-base"
                                text="Eliminar patrón"
                            />
                        </div>
                    </div>
                )
            ) : (
                <>
                    <WorkShifts
                        data={activeBlock}
                        handlers={{
                            handleChange: (field, val) => setActiveBlock((prev) => ({ ...prev, [field]: val })),
                            handleTimeChange: (timeShift, field, val) =>
                                setActiveBlock((prev) => ({
                                    ...prev,
                                    [timeShift]: { ...prev[timeShift], [field]: val },
                                })),
                            handleSplitChange: (part, field, val) =>
                                setActiveBlock((prev) => ({
                                    ...prev,
                                    splitShift: {
                                        ...prev.splitShift,
                                        [part]: { ...prev.splitShift[part], [field]: val },
                                    },
                                })),
                        }}
                        saveBlocks={() => {
                            saveBlock(activeBlock);
                            setActiveBlock(createBlock());
                        }}
                    />

                    <BreakBlock
                        data={activeBlock}
                        handlers={{
                            handleChange: (field, val) => setActiveBlock((prev) => ({ ...prev, [field]: val })),
                        }}
                        saveBlocks={() => {
                            saveBlock({ ...activeBlock, shift: "descanso" });
                            setActiveBlock(createBlock());
                        }}
                    />

                    <div className="flex flex-wrap h-[20%] gap-2 w-full justify-center">
                        {RenderDots(confirmedBlocks)}
                    </div>

                    <div className="flex flex-col justify-between gap-3 p-3">
                        <ButtonDefault
                            onClick={removeLastBlock}
                            className="bg-orange-400 w-full text-white text-base"
                            text="Eliminar último bloque"
                        />

                        <ButtonDefault
                            onClick={saveToDB}
                            className="bg-green-400 w-full text-white text-base"
                            text="Guardar y repetir patrón"
                        />
                    </div>
                </>
            )}
        </div>
    );
};
