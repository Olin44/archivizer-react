import React, {useEffect, useState} from 'react';
import axios from "axios";
import SimpleUserTable from "./simple_users_table_component";
import authHeader from "../services/auth-header";

const USER_SERVICE_URL = 'http://localhost:8080/api/users';
function UserTableReactHooks() {
    const [data, setData] = useState({users: [], isFetching: false});
    let config = {
        headers: authHeader()
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setData({users: data.users, isFetching: true});
                const response = await axios.get(USER_SERVICE_URL, config);
                setData({users: response.data, isFetching: false});
            } catch (e) {
                console.log(e);
                setData({users: data.users, isFetching: false});
            }
        };
        fetchUsers();
    }, []);

    return <SimpleUserTable data={data.users}
                            isFetching={data.isFetching}
    />
}
export default UserTableReactHooks;