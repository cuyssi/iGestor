// TurnBlock.jsx
import { Container } from "../../components/commons/Container";
import { Timer } from "../../components/commons/Timer";
import { Counter } from "../../components/commons/Counter";

export const WorkShifts = ({ data, handlers, saveBlocks }) => {
    const { handleChange, handleTimeChange, handleSplitChange } = handlers;

    return (
        <Container w="100%" h="auto">
            <div className="flex flex-col gap-4 text-base subtext-dynamic">
                <div className="flex justify-between items-center">
                    <p>Turno</p>
                    <select
                        value={data.shift}
                        onChange={(e) => handleChange("shift", e.target.value)}
                        className="text-yellow-600 border border-dynamic rounded px-2 py-1 bg-dynamic"
                    >
                        <option value="">-- Selecciona --</option>
                        <option value="mañanas">Mañanas</option>
                        <option value="tardes">Tardes</option>
                        <option value="partido">Partido</option>
                        <option value="noches">Noches</option>
                    </select>
                </div>

                <div className="flex justify-between items-center">
                    <p>Días seguidos</p>
                    <Counter
                        value={Number(data.workDays)}
                        onChange={(val) => handleChange("workDays", val)}
                        min={1}
                        max={31}
                    />
                </div>

                {data.shift === "partido" ? (
                    <div className="flex flex-col gap-4">
                        {["mañana", "tarde"].map((part) => (
                            <fieldset key={part} className="border border-dynamic rounded p-2">
                                <legend className="px-2 text-sm text-dynamic">Turno partido: {part}</legend>

                                <p>Comienzo turno</p>
                                <Timer
                                    hour={data.splitShift[part].hour}
                                    minute={data.splitShift[part].minute}
                                    onChange={(field, value) => handleSplitChange(part, field, value)}
                                />

                                <p>Fin de turno</p>
                                <Timer
                                    hour={data.splitShift[part].endHour}
                                    minute={data.splitShift[part].endMinute}
                                    onChange={(field, value) =>
                                        handleSplitChange(part, field === "hour" ? "endHour" : "endMinute", value)
                                    }
                                />
                            </fieldset>
                        ))}
                    </div>
                ) : data.shift ? (
                    <div className="flex flex-col gap-2">
                        <p>Comienzo turno</p>
                        <Timer
                            hour={data.startTime.hour}
                            minute={data.startTime.minute}
                            onChange={(field, value) => handleTimeChange("startTime", field, value)}
                        />

                        <p>Fin de turno</p>
                        <Timer
                            hour={data.endTime.hour}
                            minute={data.endTime.minute}
                            onChange={(field, value) => handleTimeChange("endTime", field, value)}
                        />
                    </div>
                ) : null}

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={saveBlocks}
                        className="w-30 p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </Container>
    );
};

export const BreakBlock = ({ data, handlers, saveBlocks }) => {
    const { handleChange } = handlers;

    return (
        <Container w="100%" h="auto" className="flex flex-col">
            <div className="flex justify-between items-center text-base subtext-dynamic">
                <p>Días descansos</p>
                <Counter
                    value={Number(data.restDays)}
                    onChange={(val) => handleChange("restDays", val)}
                    min={1}
                    max={31}
                />
            </div>
            <div className="mt-8 flex justify-center">
                <button
                    onClick={saveBlocks}
                    className="w-30 p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Guardar
                </button>
            </div>
        </Container>
    );
};
