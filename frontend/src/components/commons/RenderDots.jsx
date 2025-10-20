import { shiftColors } from "../../utils/constants";

export const RenderDots = (blocksToRender) => {
    if (!blocksToRender || !blocksToRender.length) return null;

    return blocksToRender.flatMap((block, index) => {
        const color = shiftColors[block.shift];
        const count = block.days;

        return Array.from({ length: count }).map((_, i) => (
            <div
                key={`${index}-${i}`}
                className={`w-9 h-9 rounded-full ${color} border border-gray-500 flex justify-center items-center text-gray-600 font-semibold shadow-[0_4px_8px_rgba(0,0.5,0.5,0.5)]`}
                title={`${block.shift} día ${i + 1}`}
            >
                {block.shift?.[0].toUpperCase()}
            </div>
        ));
    });
};
