export const createBlock = (type = "work") => ({
    type,
    shift: "",
    days: 1,
    startTime: { hour: "09", minute: "00" },
    endTime: { hour: "17", minute: "00" },
    splitShift: {
        mañana: { hour: "09", minute: "00", endHour: "13", endMinute: "00" },
        tarde: { hour: "16", minute: "00", endHour: "20", endMinute: "00" },
    },
    id: crypto.randomUUID(),
});
