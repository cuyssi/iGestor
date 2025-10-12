import { ContainerMenu } from "./ContainerMenu";
import { ButtonTheme } from "../../theme/ButtonTheme";

export const MenuSection = () => {
    return (
        <div className="mt-4 flex flex-col justify-center items-center">
            <ContainerMenu text="Tema" className="relative flex items-center">
                <ButtonTheme />
            </ContainerMenu>
        </div>
    );
};
