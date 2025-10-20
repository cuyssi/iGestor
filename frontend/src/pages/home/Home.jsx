import { MyInfo } from "../../components/myInfo/MyInfo";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openModal } from "../../components/register/modalRegisterSlice";
import { openDrawer } from "../../components/drawer/DrawerSlice";

export const Home = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    return (
        <div className="mt-4 flex flex-col w-full h-[100%] px-3 subbg-dynamic border-none space-y-6 overflow-y-auto">
            {user ? (
                <div>
                    <h1 key={user.id} className="text-dynamic text-2xl">
                        Hola {user.name}!
                    </h1>
                    <p className="text-yellow-600 text-sm">{user.role}</p>

                    <MyInfo />
                </div>
            ) : (
                <div>
                    <h1 className="text-dynamic text-2xl">Hola, bienvenido!</h1>
                    <p className="mt-10 text-center subtext-dynamic text-base">
                        <button className="text-blue-500" type="button" onClick={() => dispatch(openDrawer())}>
                            Inicia sesión
                        </button>
                        o
                        <button className="text-blue-500" type="button" onClick={() => dispatch(openModal())}>
                            Registrate
                        </button>
                        para empezar
                    </p>
                </div>
            )}
        </div>
    );
};
