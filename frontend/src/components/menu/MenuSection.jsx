import { ContainerMenu } from "./ContainerMenu";
import { ButtonTheme } from "../theme/ButtonTheme";

export const MenuSection = () => {
    return (
        <div className="mt-8 flex flex-col justify-center items-center space-y-2 z-70">
            <ContainerMenu text="Tema" className="relative flex items-center">
                <ButtonTheme />
            </ContainerMenu>
            <ContainerMenu link="/settings?mode=view" text="Ver patrón" />
            <ContainerMenu link="/settings?mode=config" text="Añadir patrón" />
        </div>
    );
};
