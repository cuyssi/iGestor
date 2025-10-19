import { TurnLabel } from "../../components/commons/TurnLabel";

export const Fieldsets = ({ text, children }) => {
    const dayLabels = ["Hoy", "Mañana", "P.Mañana"];

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        return `${day}/${month}`;
    };

    return (
        <fieldset className="flex w-full justify-center mt-4 text-center px-2 py-4 space-x-2 border border-blue-200 rounded">
            <legend className="subtext-dynamic">{text}</legend>
            {children.slice(0, 3).map((turn, i) => (
                <div
                    key={i}
                    className="flex flex-col w-1/3 items-center justify-between gap-2 py-4 h-full border border-dynamic rounded shadow-lg"
                >
                    <TurnLabel turn={turn.title} />
                    <p className="font-semibold text-dynamic text-xl">{formatDate(turn.start)}</p>
                    <p className="text-base subtext-dynamic font-semibold">{dayLabels[i] || ""}</p>
                </div>
            ))}
        </fieldset>
    );
};
