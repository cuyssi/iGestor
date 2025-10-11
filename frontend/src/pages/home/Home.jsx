import { MyInfo } from "../../components/myInfo/MyInfo";
import { useEffect, useState } from "react";
import { getUsers } from "../../services/usersService";

export const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((data) => setUsers(data));
    }, []);

    return (
        <div className="relative flex flex-col w-full h-[100%] justify-center items-center bg-white border-none">
            {users.map((user) => (
                <h1 key={user.id} className="absolute top-2 left-5 text-gray-500 text-xl">
                    Hola {user.name}, Buenos días!
                </h1>
            ))}
            <MyInfo />
        </div>
    );
};
