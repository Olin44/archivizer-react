import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {CheckSquare, CheckSquareFill, PencilFill} from "react-bootstrap-icons";
import QualificationsService from "../../services/qualifications.service";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AuthService from "../../services/auth.service";
import Fab from "@material-ui/core/Fab";

function createData(id, type, description, archivizeAfter, canBeDeleted) {
    console.log(id, type, description, archivizeAfter, canBeDeleted)
    let archivizeAfterAsString = null;
    if(archivizeAfter != null) {
        archivizeAfterAsString = 'Day: ' + archivizeAfter['day'] + ' Months: ' + archivizeAfter['month'] + ' Years: ' + archivizeAfter['year'];
    } else {
        archivizeAfterAsString = 'Undefined';
    }
    console.log(id, type, description, archivizeAfterAsString, canBeDeleted)
    return {id, type, description, archivizeAfterAsString, canBeDeleted: canBeDeleted};
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
    { id: 'id', numeric: false, disablePadding: true, label: 'Id' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Code' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'archivizeAfter', numeric: false, disablePadding: false, label: 'Archivize after' },
    { id: 'canBeDeleted', numeric: false, disablePadding: false, label: 'Can by deleted'},
];

function getHeadCells(){
    console.log(AuthService.getCurrentUser().roles);
    if(!AuthService.getCurrentUser().roles.includes("ROLE_ADMIN")){
        return headCells;
    } else {
        return headCells.slice().concat(
            [    {id: 'action_create', numeric: false, disablePadding: true, label: 'Create'},
                {id: 'action_update', numeric: false, disablePadding: true, label: 'Update'},
                {id: 'action_delete', numeric: false, disablePadding: true, label: 'Delete'}]);
    }
}

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
                {getHeadCells().map((headCell) => (
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
                    Qualifications
                </Typography>
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
            size: 0,
            floatingButtonStyle : {
            margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed',
        }
        }
    }

    fetchDataFromApi(page, rowsPerPage){
        function mapDataFromApiToRows(response){
            let tempRow;
            let tempRows = [];
            for(let i = 0; i < response.length; i++)
            {
                tempRow = createData(response[i]['id'], response[i]['type'], response[i]['description'], response[i]['archivizeAfterResponse'], response[i]['canBeDeleted']);
                console.log(tempRow)
                tempRows.push(tempRow);
            }
            console.log(tempRows);
            return tempRows;
        }
        QualificationsService.getAllWithPagination(page, rowsPerPage)
            .then(response => this.setState({rows: mapDataFromApiToRows(response.data)}));
    }

    fetchLanguagesCountFromAp(){
        QualificationsService.getCount()
            .then(response => {console.log(response.data['count']); this.setState({size: response.data['count']})});
    }

    componentDidMount(){
        this.fetchLanguagesCountFromAp();
        this.fetchDataFromApi(this.state.page, this.state.rowsPerPage);
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
        this.fetchDataFromApi(newPage, this.state.rowsPerPage);
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        let newRowsPerPage = parseInt(event.target.value, 10);{
            if (newRowsPerPage > this.state.size){
                newRowsPerPage = this.state.size;
                this.setState({page : 0});
            }
        }
        this.setState({rowsPerPage: newRowsPerPage});
        this.fetchDataFromApi(0, newRowsPerPage);
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
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="left">{row.type}</TableCell>
                                                <TableCell align="left">{row.description}</TableCell>
                                                <TableCell align="left">{row.archivizeAfterAsString}</TableCell>
                                                <TableCell align="left">{this.formatYesNo(row.canBeDeleted)}</TableCell>
                                                { AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") ?
                                                    <TableCell align="left"> <a href={`/qualification/`}>
                                                    <AddIcon/>
                                                </a></TableCell> : null}
                                                { AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") ?
                                                    <TableCell align="left"> <a href={`/qualification/${row.id}`}>
                                                    <PencilFill/>
                                                </a></TableCell> : null}
                                                { AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") ?
                                                    <TableCell>
                                                    <DeleteIcon onClick={(e) =>this.handleDelete(e, row.id)}/>
                                                </TableCell> : null}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, this.state.size].sort((a, b) => a - b)}
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
                <div onClick={() => console.log('speed A')} style={this.state.floatingButtonStyle}>
                    <Fab color="secondary" aria-label="Create" style={this.state.floatingButtonStyle} onClick={this.createButtonAction.bind(this)}>
                        <AddIcon />
                    </Fab>
                </div>
            </div>

        );
    }

    createButtonAction(){
        const downloadLink = document.createElement("a");
        downloadLink.href = `/qualification/`
        downloadLink.click();
    }

    handleDelete = (e, id) => {
        console.log(id);
        e.preventDefault();
        QualificationsService
            .deleteById(id)
            .then(r => alert('Qualification deleted!'))
            .catch(error => {if( error.response ){
                let violationsString = ''
                console.log(error.response.data['violations'].length);
                for (let i=0; i < error.response.data['violations'].length; i++) {
                    violationsString = violationsString
                        .concat('File id: ' + error.response.data['violations'][i]['id'])
                        .concat(', ')
                        .concat('File title: ' +  error.response.data['violations'][i]['title'])
                        .concat('.\n');
                }
                alert(error.response.data['message'].toString().concat(': Related files exist!') + '\n' + violationsString);
            }});

    }
}
