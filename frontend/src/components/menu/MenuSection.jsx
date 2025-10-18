import { ContainerMenu } from "./ContainerMenu";
import { ButtonTheme } from "../theme/ButtonTheme";
import { useSelector } from "react-redux";

export const MenuSection = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <div className="mt-8 flex flex-col justify-center items-center space-y-2 text-gray-600 z-70">
            <ContainerMenu text="Tema" className="relative flex items-center">
                <ButtonTheme />
            </ContainerMenu>
            {isAuthenticated ? (
                <>
                    <ContainerMenu link="/settings?mode=view" text="Ver patrón actual" />
                    <ContainerMenu link="/settings?mode=config" text="Añadir patrón nuevo" />
                </>
            ) : (
                ""
            )}
        </div>
    );
};
