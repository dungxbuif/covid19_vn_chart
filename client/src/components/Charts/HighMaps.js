import React, { useEffect, useRef, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import Highcharts from 'highcharts';
import { cloneDeep } from 'lodash';
import { getDetailVnLocal } from '../../apis';

// Load Highcharts modules
highchartsMap(Highcharts);

const initOptions = {
  chart: {
    height: '500',
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0,'#FFF'],
      [0.2, '#FFC4AA'],
      [0.4, '#FF8A66'],
      [0.6, '#FF392B'],
      [0.8, '#B71525'],
      [1, '	#7A0826'],
    ],
  },
  tooltip: {
    useHTML: true,
    pointFormat: '<div style="text-align: center;text-transform: uppercase;color:black">'
      +'<span style="text-align: center;"><b>{point.name}</b></span></div>'
      +'<div style="color:black"> <b>Nhiễm bệnh: <span >{point.value}</span></b> <br/>'
      +'<b>Phục hồi: <span >{point.socakhoi}</span> </b><br/> '
      +'<b>Tử vong: <span >{point.socatuvong}</span></b>	</div>'
   },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'bottom',
  },
  series: [
    {
      name: 'CHI TIẾT CA BỆNH',
      joinBy: ['hc-key', 'hc-key'],
    },
  ],
};

const HighMaps = ({ mapData }) => {
  console.log(mapData)
  const [options, setOptions] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      getDetailVnLocal().then(res=>{
        const detailData = res.data;
        // mapData.features.map((feature, index) => ({
        //   key: feature.properties['hc-key'],
        //   value: index,
        // }));
        console.log(detailData)

        detailData.forEach(ele => {
          mapData.features.forEach(ele2=>{
            if(ele2.properties['hc-key'] == ele['hc-key']){
              ele2.properties['name'] == ele['name'];
              ele2.properties['name'] == ele['woe-name']
            }
          });
        })
        
        setOptions(() => ({
          ...initOptions,
          title: {
            text: 'Việt Nam',
          },
          series: [
            { ...initOptions.series[0], mapData: mapData, data: detailData },
          ],
        }));

        if (!mapLoaded) setMapLoaded(true);
      })
      
    }
  }, [mapData, mapLoaded]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData,
      });
    }
  }, [options, mapData]);

  if (!mapLoaded) return null;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={cloneDeep(options)}
      constructorType={'mapChart'}
      ref={chartRef}
    />
  );
};

HighMaps.defaultProps = {
  mapData: {},
};

export default React.memo(HighMaps);

