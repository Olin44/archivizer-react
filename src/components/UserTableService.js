import React, {useEffect, useState} from 'react';
import axios from "axios";
import SimpleUserTable from "./simple_users_table_component";
import authHeader from "../services/auth-header";

const USER_SERVICE_URL = 'http://localhost:8080/api/users1';
function UserTableReactHooks() {
    const options = {
        custom: true,
        page: 0,
        sizePerPageList: [ {
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: 'All', value: 20
        } ],
        sizePerPage: 10,
        pageStartIndex: 0,
        paginationSize: 3,
        prePage: 'Prev',
        nextPage: 'Next',
        firstPage: 'First',
        lastPage: 'Last',
        paginationPosition: 'top'
    }

    const [data, setData] = useState({users: [], isFetching: false, options: options});
    let config = {
        headers: authHeader()
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setData({users: data.users, isFetching: true, options: options});
                const response = await axios.get(USER_SERVICE_URL + '?pageNo=' + options.page + '&pageSize=' + options.sizePerPage , config);
                setData({users: response.data, isFetching: false, options: options});
            } catch (e) {
                console.log(e);
                setData({users: data.users, isFetching: false, options: options});
            }
        };
        fetchUsers();
    }, []);

    return <SimpleUserTable data={data.users}
                            isFetching={data.isFetching}
                            options={data.options}
    />
}
export default UserTableReactHooks;