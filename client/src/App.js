import { getReportByCountry, getReportPerDay, getVaccines } from './apis';
import Typography from '@material-ui/core/Typography';
import HighLight from './components/HighLight';
import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Summary from './components/Summary';
import TableVaccine from './components/TableVaccine';
import moment from 'moment';
import '@fontsource/roboto';
import 'moment/locale/vi';

moment.locale('vi');

function App() {
   const [history, setHistory] = useState([]);
   const [perday, setPerDay] = useState([]);
   const [vaccine, setVaccine] = useState([]);

   useEffect(() => {
      getReportByCountry().then((res) => {
         setHistory(res.data);
      });

      getReportPerDay().then((res) => {
         setPerDay(res.data);
      });
      getVaccines().then((res) => {
         setVaccine(res.data);
      });
   }, []);

   return (
      <Container style={{ marginTop: 20 }}>
         <Typography variant="h2" components="h2">
            Số liệu COVID-19
         </Typography>
         <Typography>{moment().format('LLL')}</Typography>
         <HighLight history={history} />
         <Summary history={history} perday={perday} />
         <Typography variant="h3" components="h3">
            Số liệu tiêm chủng vaccines ngừa COVID-19
         </Typography>
         <TableVaccine vaccine={vaccine} />
      </Container>
   );
}

export default App;
