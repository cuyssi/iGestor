/**─────────────────────────────────────────────────────────────────────────────┐
 * Componente Timer: selector de hora y minutos.                                │
 *                                                                              │
 * Props:                                                                       │
 *   • hour: string → valor de la hora en formato "HH" (00-23).                 │
 *   • minute: string → valor de los minutos en formato "MM" (00-59).           │
 *   • onChange: función (field, value) → se llama al cambiar hora o minutos.   │
 *                 `field` es "hour" o "minute", `value` es el nuevo string.    │
 *                                                                              │
 * Autor: Ana Castro                                                            │
└──────────────────────────────────────────────────────────────────────────────*/

export function Timer({ hour, minute, onChange }) {
    return (
        <div className="flex justify-center gap-6 px-4 items-center mt-2">
            <div className="flex flex-col">
                <p className=" font-poppins text-orange-400 font-semibold text-sm">Hora:</p>
                <div className="flex items-center border-2 border-gray-400 bg-gray-200 rounded-lg">
                    <button
                        type="button"
                        onClick={() => onChange("hour", String((+hour + 23) % 24).padStart(2, "0"))}
                        className="px-1 text-gray-900 bg-gray-200 hover:bg-gray-400 rounded-tl-lg rounded-bl-lg"
                    >
                        –
                    </button>
                    <input
                        type="tel"
                        name="hour"
                        value={hour}
                        onChange={(e) => {
                            let val = Math.max(0, Math.min(23, Number(e.target.value)));
                            onChange("hour", String(val).padStart(2, "0"));
                        }}
                        className="text-center w-12 border-x subbg-dynamic border-gray-600 rounded-lg font-normal"
                    />
                    <button
                        type="button"
                        onClick={() => onChange("hour", String((+hour + 1) % 24).padStart(2, "0"))}
                        className="px-1 text-gray-900 bg-gray-200 hover:bg-gray-400 rounded-tr-lg rounded-br-lg"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex flex-col">
                <p className=" font-poppins text-orange-400 font-semibold text-sm">Minutos:</p>
                <div className="flex bg-gray-200 items-center justify-center border-2 border-gray-400 rounded-lg">
                    <button
                        type="button"
                        onClick={() => onChange("minute", String((+minute + 59) % 60).padStart(2, "0"))}
                        className="px-1 text-gray-900 bg-gray-200 hover:bg-gray-400 rounded-tl-lg rounded-bl-lg"
                    >
                        –
                    </button>
                    <input
                        type="tel"
                        name="minute"
                        value={minute}
                        onChange={(e) => {
                            let val = Math.max(0, Math.min(59, Number(e.target.value)));
                            onChange("minute", String(val).padStart(2, "0"));
                        }}
                        className="text-center w-12 subbg-dynamic border-x border-gray-600 rounded-lg font-normal"
                    />
                    <button
                        type="button"
                        onClick={() => onChange("minute", String((+minute + 1) % 60).padStart(2, "0"))}
                        className="px-1 text-gray-900 bg-gray-200 hover:bg-gray-400 rounded-tr-lg rounded-br-lg"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}
