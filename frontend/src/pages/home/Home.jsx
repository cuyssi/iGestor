import { MyInfo } from "../../components/myInfo/MyInfo";
import { useSelector, useDispatch } from "react-redux";

export const Home = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="relative flex flex-col w-full h-[100%] justify-center items-center bg-white border-none">
            {user ? (
                <h1 key={user.id} className="absolute top-2 left-5 text-gray-500 text-xl">
                    Hola {user.name}!
                </h1>
            ) : (
                ""
            )}

            <MyInfo />
        </div>
    );
};
