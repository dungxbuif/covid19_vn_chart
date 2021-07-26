// import CountrySelector from "./components/CountrySelector";
import {
   getReportByCountry,
   getReportPerDay,
   getProvineVaccineAllocate,
   getProvineVaccineDetail,
} from './apis';
import Typography from '@material-ui/core/Typography';
import HighLight from './components/HighLight';
import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Summary from './components/Summary';
// import { sortBy } from "lodash";
import moment from 'moment';
import '@fontsource/roboto';
import 'moment/locale/vi';

moment.locale('vi');

function App() {
   // const [countries, setCountries] = useState([]);
   // const [selectedCountryID, setSelectedCountryID] = useState("vn");
   const [history, setHistory] = useState([]);
   const [perday, setPerDay] = useState([]);
   const [vaccine, setVaccine] = useState([]);

   // const getVaccines = async () => {
   //    let allo = await getProvineVaccineAllocate();
   //    let detail = await getProvineVaccineDetail();
   //    console.log(allo, detail);
   // };
   // const handleOnChange = (e) => {
   //     setSelectedCountryID(e.target.value);
   // };

   useEffect(() => {
      //   getCountries().then(res => {
      //     const countries = sortBy(res.data, 'Country');
      //     setCountries(countries);
      //     setSelectedCountryID('vn');
      //   })
      getReportByCountry().then((res) => {
         setHistory(res.data);
      });

      getReportPerDay().then((res) => {
         setPerDay(res.data);
      });
      // getVaccines();
   }, []);

   // useEffect(() => {
   // if (selectedCountryID) {
   // const { Slug } = countries.find(
   //   country => country.ISO2.toLowerCase() === selectedCountryID
   // );
   // getReportByCountry().then((res) => {
   //     setHistory(res.data);
   // });

   // getReportPerDay().then((res) => {
   //     setPerDay(res.data);
   // });
   // }
   // }, [selectedCountryID]);

   return (
      <Container style={{ marginTop: 20 }}>
         <Typography variant="h2" components="h2">
            Số liệu COVID-19
         </Typography>
         <Typography>{moment().format('LLL')}</Typography>
         {/* <CountrySelector c`ountries={countries} handleOnChange={handleOnChange} value={selectedCountryID} /> */}
         <HighLight history={history} />
         <Summary
            history={history}
            perday={perday}
            // selectedCountryId={selectedCountryID}
            selectedCountryId={'vn'}
         />
      </Container>
   );
}

export default App;
