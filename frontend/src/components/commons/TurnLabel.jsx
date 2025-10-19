import { shiftColors, turnLabels } from "../../utils/constants";

export const TurnLabel = ({ turn, className = "" }) => {
    if (!turn) return null;
    const color = shiftColors[turnLabels[turn]];

    return (
        <div className={`${color} font-semibold capitalize ${className} p-1 rounded`}>
            <p>{turnLabels[turn] || turn}</p>
        </div>
    );
};
