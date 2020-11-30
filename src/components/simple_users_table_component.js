import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from 'react-bootstrap-table2-editor';
import { PencilFill, CheckSquare, CheckSquareFill } from 'react-bootstrap-icons';

function formatYesNo(rowContent, row){
    console.log(row);
    return row.active ? <CheckSquareFill/> : <CheckSquare/>;

}

const options = {
    page: 2,
    sizePerPageList: [ {
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }, {
        text: 'All', value: 20
    } ],
    sizePerPage: 5,
    pageStartIndex: 0,
    paginationSize: 3,
    prePage: 'Prev',
    nextPage: 'Next',
    firstPage: 'First',
    lastPage: 'Last',
    paginationPosition: 'top'
};

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

const SimpleUserTable = (props) => {
    return (
        <div className="container">
            <div className="row" className="hdr">
                <div className="col-sm-12 btn btn-info">
                    Users table
                </div>
            </div>
            <div className="container" style={{marginTop: 50}}>
                <BootstrapTable
                    striped
                    hover
                    keyField='id'
                    data={props.data}
                    columns={columns}
                    filter={filterFactory()}
                    pagination={paginationFactory(options)}
                />
                <p>{props.isFetching ? 'Fetching users...' : ''}</p>
            </div>
        </div>
    );
}

export default SimpleUserTable;