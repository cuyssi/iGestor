import { Modal } from "../../components/commons/Modal";
import { TurnLabel } from "../../components/commons/TurnLabel";

export const ModalCalendar = ({ isOpen, onClose, selectedTurn }) => {
    if (!selectedTurn) return null;

    const isPartido = selectedTurn.turn === "P";
    const isDescanso = selectedTurn.turn === "D";

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="flex flex-col w-full items-center p-6 text-center text-gray-500 text-base">
                <div className="mt-6 mx-12 text-2xl font-extrabold">
                    <TurnLabel turn={selectedTurn.turn} className="text-2xl" />
                </div>

                {isDescanso ? (
                    <div className="text-lg font-semibold text-gray-400 mt-4">
                        <p>Día libre, disfruta! 🤪</p>
                    </div>
                ) : isPartido ? (
                    <div className="mt-4 w-full flex flex-col items-start space-y-4">
                        <div>
                            <p className="text-lg font-semibold">
                                <TurnLabel turn="M" />
                            </p>
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
                        </div>

                        <div>
                            <p className="text-lg font-semibold">
                                <TurnLabel turn="T" />
                            </p>
                            <div className="px-4 w-full">
                                <p className="w-full flex justify-between">
                                    Comienzo:
                                    <span className="text-green-500 font-semibold">{selectedTurn.afternoon_start}</span>
                                </p>
                                <p className="w-full flex justify-between">
                                    Fin:
                                    <span className="text-red-400 font-semibold">{selectedTurn.afternoon_end}</span>
                                </p>
                            </div>
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
