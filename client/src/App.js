import CountrySelector from "./components/CountrySelector";
import { getCountries, getReportByCountry } from "./apis";
import Typography from '@material-ui/core/Typography';
import HighLight from "./components/HighLight";
import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import Summary from "./components/Summary";
import { sortBy } from "lodash";
import moment from "moment";
import '@fontsource/roboto';
import 'moment/locale/vi';

moment.locale('vi');

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState('');
  const [report, setReport] = useState([]);
  const handleOnChange = (e) => {
    setSelectedCountryID(e.target.value);
  };

  useEffect(() => {
    getCountries().then(res => {
      const countries = sortBy(res.data, 'Country');
      setCountries(countries);
      setSelectedCountryID('vn');
    })
  }, []);

  useEffect(() => {
    if (selectedCountryID) {
      const { Slug } = countries.find(
        country => country.ISO2.toLowerCase() === selectedCountryID
      );
      getReportByCountry(Slug)
        .then(res => {
          setReport(res.data);
        });
    }
  }, [countries, selectedCountryID]);


  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant='h2' components='h2' >
        Số liệu COVID-19
      </Typography>
      <Typography>
        {moment().format('LLL')}
      </Typography>
      {/* <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryID} /> */}
      <HighLight report={report} />
      <Summary report={report} selectedCountryId={selectedCountryID} />
    </Container>
  );


}

export default App;
