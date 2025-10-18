const shiftColors = {
    mañanas: "bg-blue-400",
    tardes: "bg-yellow-400",
    partido: "bg-orange-400",
    noches: "bg-purple-500",
    descanso: "bg-green-500",
};

export const RenderDots = (blocksToRender) => {
    if (!blocksToRender || !blocksToRender.length) return null;
    console.log("🔎 blocksToRender:", blocksToRender);

    return blocksToRender.flatMap((block, index) => {
        const color = shiftColors[block.shift];
        console.log("🔵 Renderizando bloque:", block, "con color:", color);
        const count = block.days;
        console.log("🔢 Días en el bloque:", count);

        return Array.from({ length: count }).map((_, i) => (
            <div
                key={`${index}-${i}`}
                className={`w-9 h-9 rounded-full ${color} border border-gray-500 flex justify-center items-center text-white shadow-[0_4px_8px_rgba(0,0.5,0.5,0.5)]`}
                title={`${block.shift} día ${i + 1}`}
            >
                {block.shift?.[0].toUpperCase()}
            </div>
        ));
    });
};
