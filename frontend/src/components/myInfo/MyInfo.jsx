import { Fieldsets } from "../commons/Fieldsets";
import { useCalendarTurns } from "../../pages/calendar/useCalendarTurns";

export const MyInfo = () => {
    const { upcomingTurns, upcomingRests } = useCalendarTurns();
    
    return (
        <div className="flex flex-col w-full space-y-6">
            <Fieldsets text="Mis próximos turnos" children={upcomingTurns} />
            <Fieldsets text="Próximos descansos" children={upcomingRests} />
        </div>
    );
};
