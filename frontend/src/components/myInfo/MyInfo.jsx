import { Container } from "../commons/Container";
export const MyInfo = () => {
    return (
        <Container w="90%" h="80%">
            <h2 className="text-dynamic font-semibold">Mi información</h2>
            <section className="mt-4 flex justify-between items-center">
                <h3 className="subtext-dynamic">Próximos turnos:</h3>
                <p className="text-blue-400 text-xs">Ver todos</p>
            </section>
            <Container w="100%" className="flex-1" />

            <section>
                <h3 className="subtext-dynamic">Próximos descansos:</h3>
                <Container w="100%" />
            </section>
        </Container>
    );
};
