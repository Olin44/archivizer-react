import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import React, {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../services/auth-header";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import {CheckSquare, CheckSquareFill, PencilFill} from "react-bootstrap-icons";

function formatYesNo(rowContent, row){
    console.log(row);
    return row.active ? <CheckSquareFill/> : <CheckSquare/>;

}

const columns = [
    {
        dataField: 'id',
        text: 'id'
    },
    {
        dataField: 'login',
        text: 'login',
        filter: textFilter()
    },
    {
        dataField: 'email',
        text: 'email',
        sort: true
    },
    {
        dataField: 'isActive',
        text: 'isActive',
        sort: true,
        align: 'center',
        formatter: (rowContent, row) => {
            return (
                formatYesNo(rowContent, row)
            );
        }
    },
    {
        dataField: 'actions',
        text: 'ACTIONS',
        align: 'center',
        formatter: (rowContent, row) => {
            return (
                <a href={`/users/id=${row.id}`}>
                    <PencilFill/>
                </a>
                // <a href={`/users/id=${row.id}`}>
                //     <PencilFill/>
                // </a>
            )
        }
    },
];

export default function SimpleUsersTable(){

    let defaultOptions =
        {pageStartIndex: '',
        }

    let USER_SERVICE_URL = 'http://localhost:8080/api/users1';
    let config = {
        headers: authHeader()
    }
    const [isLoading, setLoading] = useState(true);

    const [sizePerPage, setSizePerPage] = useState(5);
    const [page, setPage] = useState(0);
    const[data, setData] = useState([]);
    let [options, setOptions ] = useState(defaultOptions);

    let handleTableChange = (type, { page, sizePerPage }) => {
        setTimeout(() => {
            setPage(page);
            setSizePerPage(sizePerPage);
        }, 50);
    }

    let onSizePerPageChange = (type, { sizePerPage, page }) => {
        setTimeout(() => {
            setPage(page);
            setSizePerPage(sizePerPage);
        }, 50);
    }

    useEffect(() => {
        console.log(page, data, sizePerPage);
        const fetchUsers = async () => {
            try{
                setData(data)
                setLoading(true);
                const response = await axios.get(USER_SERVICE_URL + '?pageNo=' + page + '&pageSize=' + sizePerPage, config)
                setData(response.data);
                setLoading(false);

            } catch (e){
                console.log(e);
                setData(data);
                setLoading(false);
            }
        }
        fetchUsers();
    }, [sizePerPage, page, options])
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    console.log(options);

    return(
    <PaginationProvider
        pagination={ paginationFactory(defaultOptions) }
    >
        {
            ({
                 paginationProps,
                 paginationTableProps
             }) => (
                <div>
                    <PaginationListStandalone
                        { ...paginationProps }
                    />
                    <BootstrapTable
                        remote
                        keyField="id"
                        data={data}
                        columns={columns}
                        filter={filterFactory()}
                        onTableChange={handleTableChange}
                        onSizePerPageChange = {onSizePerPageChange}
                        { ...paginationTableProps }
                    />
                </div>
            )
        }
    </PaginationProvider>
    );
}