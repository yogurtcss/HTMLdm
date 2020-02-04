import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

/* 2020-02-04 19:55:03
* 后端返回的数据格式：class java.util.ArrayList 数组嗷！
* [ User{id=41, userName='老王', birthday=Wed Feb 28 01:47:08 CST 2018, sex='男', address='北京'},
    User{id=42, userName='小二王', birthday=Fri Mar 02 23:09:37 CST 2018, sex='女', address='北京金燕龙'},
    User{id=43, userName='小二王', birthday=Sun Mar 04 19:34:34 CST 2018, sex='女', address='北京金燕龙'},
    User{id=45, userName='传智播客', birthday=Sun Mar 04 20:04:06 CST 2018, sex='男', address='北京金燕龙'},
    User{id=46, userName='老王', birthday=Thu Mar 08 01:37:26 CST 2018, sex='男', address='北京'}
]
*  */
export default function CustomizedTables( props ) { //传入形参是 props
    const classes = useStyles();
    const {rows} = props;
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>id</StyledTableCell>
                        <StyledTableCell align="right">userName</StyledTableCell>
                        <StyledTableCell align="right">birthday</StyledTableCell>
                        <StyledTableCell align="right">sex</StyledTableCell>
                        <StyledTableCell align="right">address</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.userName}</StyledTableCell>
                            <StyledTableCell align="right">{row.birthday}</StyledTableCell>
                            <StyledTableCell align="right">{row.sex}</StyledTableCell>
                            <StyledTableCell align="right">{row.address}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
