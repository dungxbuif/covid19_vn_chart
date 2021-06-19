import HighchartsReact from 'highcharts-react-official';
import { Button, ButtonGroup } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import HighCharts from 'highcharts';

const generateOptions = (data, kind) => {
  const categories = data.map(item => item.Date);
  let text = 'Tổng ca nhiễm';
  let series = 'Confirmed';
  switch (kind) {
    case 'perday-confirmed':
      text = 'Số ca nhiễm';
      break;
    case 'perday-death':
        text = 'Số ca tử vong';
        series = 'Deaths';
        break;
    default:
      break;
  }

  return {
    chart: {
      height: 500,
    },
    title: {
      text: text,
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#F3585B'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: 'right',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Tổng số ca',
        data: data.map(item => item[`${series}`]),
      },
    ],
  };
};

const LineChart = ({ data, kind }) => {
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState('2021');

  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case 'all':
        customData = data;
        break;
      case '2021':
        customData = data.slice(data.findIndex(item => item.Date === '01/01/2021'));
        break;
      case '30':
        customData = data.slice(data.length - 30);
        break;
      case '7':
        customData = data.slice(data.length - 7);
        break;
      default:
        customData = data;
        break;
    }

    setOptions(generateOptions(customData, kind));
  }, [data, reportType]);

  return (
    <div>
      <ButtonGroup size='small' style={{ display: 'flex', justifyContent: 'flex-end' }} >
        <Button color={reportType === 'all' ? 'secondary' : ''} onClick={() => setReportType('all')} >Tất cả</Button>
        <Button color={reportType === '2021' ? 'secondary' : ''} onClick={() => setReportType('2021')} >2021</Button>
        <Button color={reportType === '30' ? 'secondary' : ''} onClick={() => setReportType('30')} >30 ngày</Button>
        <Button color={reportType === '7' ? 'secondary' : ''} onClick={() => setReportType('7')} >7 ngày</Button>
      </ButtonGroup>
      <HighchartsReact highcharts={HighCharts} options={options} />
    </div>
  )
}

export default React.memo(LineChart);
