import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import CountUp from 'react-countup';
import React from 'react';

const useStyles = makeStyles({
  wrapper: (props) => {
    switch(props.type){
      case 'confirmed': return { borderLeft: '5px solid #c9302c' }
      case 'recovered': return { borderLeft: '5px solid #28a745' }
      default: return { borderLeft: '5px solid gray' }
    } 
  },
  title: {
    fontSize: 18, marginBottom: 5
  },
  count: {
    fontWeight: 'bold',
    fontSize: 18,
  }
}); 

export default function HighLightCard({ title, count, type }) {
  const styles = useStyles({ type });

  return (
    <Card className={styles.wrapper} >
      <CardContent>
        <Typography components='p' variant='body2' className={styles.title} >
          {title}
        </Typography>
        <Typography components='span' variant='body2' className={styles.count} >
          <CountUp end={count || 0} duration={2} separator=' ' />
        </Typography>
      </CardContent>
    </Card>
  )
}
