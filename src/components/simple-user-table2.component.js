import React, {Component} from 'react';
import PropTypes, {object} from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList';
import UserService from "../services/users.service";
import {CheckSquare, CheckSquareFill, PencilFill} from "react-bootstrap-icons";
import CheckBoxIcon from '@material-ui/icons/CheckBox';

function createData(id, login, email, isActive) {
    return { id, login, email, isActive };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'login', numeric: false, disablePadding: true, label: 'Login' },
    { id: 'email', numeric: false, disablePadding: false, label: 'email' },
    { id: 'isActive', numeric: false, disablePadding: false, label: 'isActive' },
    // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
    {id: 'action', numeric: false, disablePadding: true, label: 'Actions'}
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.func.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, selectedList } = props;

    function handleClick(event) {
        console.log(selectedList);
        console.log(numSelected);
        UserService.activateUsersAccounts(selectedList)
            .then(window.location.reload(true));
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Users
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Activate selected users accounts">
                    <IconButton aria-label="activate selected accounts" onClick={(event) => handleClick(event)}>
                        <CheckBoxIcon
                        />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selectedList: PropTypes.arrayOf(PropTypes.number).isRequired
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default class EnhancedTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            order:'asc',
            orderBy: 'id',
            selected: [],
            page: 0,
            dense:false,
            rowsPerPage: 5,
            classes: useStyles,
            size: 0};
    }

    fetchDataAboutUsersFromApi(page, rowsPerPage){
        function mapDataFromApiToRows(response){
            let tempRow;
            let tempRows = [];
            for(let i = 0; i < response.length; i++)
            {
                tempRow = createData(response[i]['id'], response[i]['login'], response[i]['email'], response[i]['active']);
                tempRows.push(tempRow);
                console.log(response[i]);
            }
            return tempRows;
        }
        UserService.getUsers(page, rowsPerPage)
            .then(response => this.setState({rows: mapDataFromApiToRows(response.data)}));
    }

    fetchUsersCountFromAp(){
        UserService.getUsersListCount()
            .then(response => {console.log(response.data['usersCount']); this.setState({size: response.data['usersCount']})});
    }

    componentDidMount(){
        this.fetchUsersCountFromAp();
        this.fetchDataAboutUsersFromApi(this.state.page, this.state.rowsPerPage);
    }

    handleRequestSort = (event, property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setState({order: isAsc ? 'desc' : 'asc'});
        this.setState({orderBy: property});
    };

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
            this.setState({selected: this.state.rows.map((n) => n.name)});
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, name) => {
        const selectedIndex = this.state.selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(this.state.selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(this.state.selected.slice(1));
        } else if (selectedIndex === this.state.selected.length - 1) {
            newSelected = newSelected.concat(this.state.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                this.state.selected.slice(0, selectedIndex),
                this.state.selected.slice(selectedIndex + 1),
            );
        }
        console.log(newSelected);
        this.setState({selected: newSelected});
    };

    handleChangePage = (event, newPage) => {
        console.log(newPage);
        this.fetchDataAboutUsersFromApi(newPage, this.state.rowsPerPage);
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        let newRowsPerPage = parseInt(event.target.value, 10)
        this.setState({rowsPerPage: newRowsPerPage});
        this.fetchDataAboutUsersFromApi(0, newRowsPerPage);

    };

    handleChangeDense = (event) => {
        this.setState({dense: event.target.checked});
    };


    formatYesNo(isActive){
        return isActive ? <CheckSquareFill/> : <CheckSquare/>;

    }

    isSelected = (name) => this.state.selected.indexOf(name) !== -1;
    render() {
        return (
            <div className={this.state.classes.root}>
                <Paper className={this.state.classes.paper}>
                    <EnhancedTableToolbar
                        numSelected = {this.state.selected.length}
                        selectedList =  {this.state.selected}/>
                    <TableContainer>
                        <Table
                            className={this.state.classes.table}
                            aria-labelledby="tableTitle"
                            size={this.state.dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={this.state.classes}
                                numSelected={this.state.selected.length}
                                order={this.state.order}
                                orderBy={this.state.orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={this.state.rows.length}
                            />
                            <TableBody>
                                {stableSort(this.state.rows, getComparator(this.state.order, this.state.orderBy))
                                    .map((row, index) => {
                                        const isItemSelected = this.isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => this.handleClick(event, row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{'aria-labelledby': labelId}}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.login}
                                                </TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{this.formatYesNo(row.isActive)}</TableCell>
                                                <TableCell align="left"> <a href={`/users/id=${row.id}`}>
                                                    <PencilFill/>
                                                </a></TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={this.state.size}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={this.state.dense} onChange={this.handleChangeDense}/>}
                    label="Dense padding"
                />
            </div>
        );
    }
}
