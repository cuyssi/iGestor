import { Modal } from "../../components/commons/Modal";

export const ModalCalendar = ({ isOpen, onClose, selectedTurn }) => {
    if (!selectedTurn) return null;

    const turnName = (selectedTurn) => {
        if (selectedTurn.turn == "M") return <span className="text-blue-500">Manaña</span>;
        if (selectedTurn.turn == "T") return <span className="text-yellow-500">Tardes</span>;
        if (selectedTurn.turn == "P") return <span className="text-orange-500">Partido</span>;
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="flex flex-col w-full items-center p-6 text-center text-gray-500 text-base">
                <p className="mt-6 mx-12 text-2xl font-extrabold">{turnName(selectedTurn)}</p>
                {selectedTurn.turn === "D" ? (
                    <div className="text-lg font-semibold text-gray-400">
                        <p className="text-2xl text-green-500 font-extrabold">Descanso</p>
                        <p className="mt-4">Día libre, disfruta! 🤪</p>
                    </div>
                ) : selectedTurn.turn === "P" ? (
                    <div className="mt-4 w-full flex flex-col items-start space-y-2">
                        <p className="text-lg text-blue-400 font-semibold">Mañanas:</p>
                        <div className="px-4 w-full">
                            <p className="w-full flex justify-between">
                                Comienzo:
                                <span className="text-green-500 font-semibold">{selectedTurn.morning_start}</span>
                            </p>
                            <p className="w-full flex justify-between">
                                Fin:
                                <span className="text-red-400 font-semibold">{selectedTurn.morning_end}</span>
                            </p>
                        </div>

                        <p className="mt-4 text-lg text-yellow-500 font-semibold">Tarde:</p>
                        <div className="px-4 w-full">
                            <p className="w-full flex justify-between">
                                Comienzo:
                                <span className=" text-green-500 font-semibold">{selectedTurn.afternoon_start}</span>
                            </p>
                            <p className="w-full flex justify-between">
                                Fin:
                                <span className="ml-2 text-red-400 font-semibold">{selectedTurn.afternoon_end}</span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-4 flex flex-col w-full items-start space-y-2">
                        <div className="px-4 w-full">
                            <p className="w-full flex justify-between">
                                Comienzo:
                                <span className="text-green-500 font-semibold">{selectedTurn.turn_start}</span>
                            </p>
                            <p className="w-full flex justify-between">
                                Fin:
                                <span className="text-red-400 font-semibold">{selectedTurn.turn_end}</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};
