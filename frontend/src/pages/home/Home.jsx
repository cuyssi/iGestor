import { MyInfo } from "../../components/myInfo/MyInfo";
import { useSelector } from "react-redux";

export const Home = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="mt-4 flex flex-col w-full h-[100%] px-3 subbg-dynamic border-none space-y-6 overflow-y-auto">
            {user ? (
                <h1 key={user.id} className="text-dynamic text-xl">
                    Hola {user.name}!
                </h1>
            ) : (
                <h1>Hola, bienvenido!</h1>
            )}

            <MyInfo />
        </div>
    );
};
