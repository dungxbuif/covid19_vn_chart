import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import HighLight from "./components/HighLight";
import Summary from "./components/Summary";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryID,setSelectedCountryID] = useState('');
  const [report, setReport] =useState([]);
  const handleOnChange = (e) => {
    setSelectedCountryID(e.target.value);
  };

  useEffect(()=>{ 
    getCountries().then(res =>{
        setCountries(res.data);
        setSelectedCountryID('vn');
    })
  }, []);

  useEffect(() => {
    if(selectedCountryID){
      const { slug } = countries.find(
        country => country.ISO2.toLowerCase() === selectedCountryID
      );
      
      getReportByCountry(slug)
        .then(res => setReport(res.data));
    }
  },[countries,selectedCountryID]);

  
  return <>
    <CountrySelector countries={countries} handleOnChange={handleOnChange} />
    <HighLight report={report} />
    {/* <Summary report={report} /> */}
  </>;
}

export default App;
