import React, { useEffect, useState } from 'react';
import { getMapDataByCountryId } from '../apis';
import LineChart from './Charts/LineChart';
import Grid from '@material-ui/core/Grid';
import HighMaps from './Charts/HighMaps';

export default function Summary({ selectedCountryId, history, perday }) {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (selectedCountryId) {
      getMapDataByCountryId(selectedCountryId)
        .then(res => {
          setMapData(res);
        })
        .catch((err) => console.log({ err }));
    }
  }, [selectedCountryId]);

  return (
    <div style={{marginTop: 10}}>
      <Grid container spacing={3} >
        <Grid item sm={8} xs={12}>
          <LineChart data={history} kind={'history'} />
        </Grid>

        <Grid item sm={4} xs={12}>
          <HighMaps mapData={mapData} />
        </Grid>

        <Grid item sm={12} xs={12}>
          <LineChart data={perday} kind={'perday'} />
        </Grid>
      </Grid>
    </div>
  );
}
