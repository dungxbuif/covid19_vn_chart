import React from 'react';
import LineChart from './Charts/LineChart';
import Grid from '@material-ui/core/Grid';
import HighMaps from './Charts/HighMaps';
import mapData from '@highcharts/map-collection/countries/vn/vn-all.geo.json';

export default function Summary({ history, perday }) {
   return (
      <div className="my-5">
         <Grid item sm={12} xs={12}>
            <HighMaps mapData={mapData} />
         </Grid>
         <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
               <LineChart data={history} kind={'history'} />
            </Grid>

            <Grid item sm={6} xs={12}>
               <LineChart data={perday} kind={'perday-confirmed'} />
            </Grid>

            <Grid item sm={6} xs={12}>
               <LineChart data={perday} kind={'perday-death'} />
            </Grid>
         </Grid>
      </div>
   );
}
