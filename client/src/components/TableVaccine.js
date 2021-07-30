import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import './TableVaccine.scss';
import CountUp from 'react-countup';
import _ from 'lodash';
const useRowStyles = makeStyles({
   root: {
      '& > *': {
         borderBottom: 'unset',
      },
   },
});

function Row(props) {
   const { row } = props;
   // const [open, setOpen] = React.useState(false);
   const classes = useRowStyles();

   return (
      <>
         <TableRow className={classes.root}>
            <TableCell component="th" scope="row" className="py-2">
               {row.tinh}
            </TableCell>
            <TableCell className="py-2" align="center">
               <CountUp end={row.danso || 0} duration={3} separator="." />
            </TableCell>
            <TableCell className="py-2" align="center">
               <CountUp end={row.tiemmui1 || 0} duration={3} separator="." />
            </TableCell>
            <TableCell className="py-2" align="center">
               <CountUp end={row.tiemmui2 || 0} duration={3} separator="." />
            </TableCell>
            <TableCell className="py-2" align="center">
               <CountUp
                  end={row.tongmuidatiem || 0}
                  duration={3}
                  separator="."
               />
            </TableCell>
            <TableCell className="py-2" align="center">
               <CountUp
                  end={row.tongsovaccineduocphan || 0}
                  duration={3}
                  separator="."
               />
            </TableCell>
            <TableCell className="py-2" align="center">
               <CountUp end={row.sodiemtiem || 0} duration={3} separator="." />
            </TableCell>
            <TableCell className="py-2" align="center">
               <CountUp
                  end={row.soloaivaccinephanphoi || 0}
                  duration={3}
                  separator="."
               />
            </TableCell>
            {/* <TableCell className="py-2" align="right">
               {open ? 'Thu gọn ' : 'Chi tiết '}
               <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
               >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell> */}
         </TableRow>
         {/* <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box
                     margin={1}
                     style={{ borderTop: '1px solid rgb(234 234 234)' }}
                  >
                     <Typography variant="h6" gutterBottom component="div">
                        Các loại vaccines được phân bổ
                     </Typography>
                     <Table size="small" aria-label="purchases">
                        <TableHead className=".bg-info">
                           <TableRow>
                              {row.dsvaccine.map((ele) => (
                                 <TableCell
                                    key={ele.id}
                                    className="text-white bg-info"
                                 >
                                    {ele.name}
                                 </TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           <TableRow>
                              {row.dsvaccine.map((ele) => (
                                 <TableCell
                                    key={ele.id}
                                    component="th"
                                    scope="row"
                                 >
                                    <CountUp
                                       end={ele.totalAllocated || 0}
                                       duration={3}
                                       separator="."
                                    />
                                 </TableCell>
                              ))}
                           </TableRow>
                        </TableBody>
                     </Table>
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow> */}
      </>
   );
}

export default function TableVaccine({ vaccine }) {
   const tmpDdata = [...vaccine];
   const data = _.orderBy(tmpDdata, 'danso', 'desc');
   return (
      <TableContainer component={Paper} className="my-5 wrap">
         <Table aria-label="collapsible table">
            <TableHead>
               <TableRow>
                  <TableCell className="text-white bg-dark py-3">
                     Tỉnh/Thành phố
                  </TableCell>
                  <TableCell className="text-white bg-dark py-3" align="center">
                     Dân số
                  </TableCell>
                  <TableCell className="text-white bg-dark py-3" align="center">
                     Tiêm mũi 1
                  </TableCell>
                  <TableCell className="text-white bg-dark py-3" align="center">
                     Tiêm mũi 2
                  </TableCell>
                  <TableCell className="text-white bg-dark py-3" align="center">
                     Đã tiêm
                  </TableCell>
                  <TableCell className="text-white bg-dark py-3" align="center">
                     Được phân
                  </TableCell>
                  <TableCell className="text-white bg-dark py-3" align="center">
                     Số điểm tiêm
                  </TableCell>
                  <TableCell className="text-white bg-dark py-3" align="center">
                     Dự kiến phân phối
                  </TableCell>
                  {/* <TableCell className="text-white bg-dark py-3" /> */}
               </TableRow>
            </TableHead>
            <TableBody>
               {data.map((item) => (
                  <Row key={item.matinh} row={item} />
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
