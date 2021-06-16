import HighLightCard from './HighLightCard';
import { Grid } from '@material-ui/core';
import React from 'react';

export default function HighLight({ report }) {
  const data = report && report.length ? report[report.length -1] : [];
  const summary = [
    {
      title: 'Số ca nhiễm',
      count: data.Confirmed,
      type: 'confirmed', 
    },
    {
      title: 'Khỏi',
      count: data.Recovered,
      type: 'recovered', 
    },
    {
      title: 'Tử vong',
      count: data.Deaths,
      type: 'death', 
    },
  ]

  return (
    <Grid container spacing={3} >
      {
        summary.map(item => 
          <Grid item sm={4} xs={12} key={item.type} >
            <HighLightCard title={item.title} count={item.count} type={item.type} />
          </Grid> 
        )
      }
    </Grid>
  );
}
