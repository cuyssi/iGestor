import { Container } from "../commons/Container";
import { useCalendarTurns } from "../../pages/calendar/useCalendarTurns";
import { useNavigate } from "react-router-dom";

export const MyInfo = () => {
    const { upcomingTurns } = useCalendarTurns();
    const dayLabels = ["Hoy", "Mañana", "P.Mañana"];
    const navigate = useNavigate();
    const turnLabels = {
        M: "Mañanas",
        T: "Tardes",
        P: "Partido",
        D: "Descanso",
    };

    console.log(upcomingTurns);
    return (
        <Container w="90%" h="80%">
            <h2 className="text-dynamic font-semibold">Mi información</h2>
            <section className="mt-4 flex justify-between items-center">
                <h3 className="subtext-dynamic">Próximos turnos:</h3>
                <button className="text-blue-400 text-xs" onClick={() => navigate("/calendar")}>Ver todos</button>
            </section>
            <Container w="100%" h="30%" className="flex justify-between items-center gap-2 mt-4 text-center p-4">
                {upcomingTurns.slice(0, 3).map((turn, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center justify-between p-4 w-1/3 h-full border border-blue-200 rounded"
                    >
                        <p className="font-semibold text-blue-500 capitalize text-base">{turnLabels[turn.title] || turn.title}</p>
                        <p className="text-sm text-gray-400">{dayLabels[i] || ""}</p>
                    </div>
                ))}
            </Container>
        </Container>
    );
};
