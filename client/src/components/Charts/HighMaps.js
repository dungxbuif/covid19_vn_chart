import React, { useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import Highcharts from "highcharts";
import { cloneDeep } from "lodash";
import { getDetailVnLocal } from "../../apis";

// Load Highcharts modules
highchartsMap(Highcharts);

const initOptions = {
    chart: {
        height: "500",
    },
    title: {
        text: null,
    },
    mapNavigation: {
        enabled: true,
    },
    legend: {
        title: {
            text: "Số ca mắc ",
            style: {
                color:
                    // theme
                    (Highcharts.defaultOptions &&
                        Highcharts.defaultOptions.legend &&
                        Highcharts.defaultOptions.legend.title &&
                        Highcharts.defaultOptions.legend.title.style &&
                        Highcharts.defaultOptions.legend.title.style.color) ||
                    "black",
            },
        },
        y: 100,
        x: 10,
        align: "right",
        verticalAlign: "top",
        floating: true,
        layout: "vertical",
        valueDecimals: 0,
        backgroundColor:
            // theme
            (Highcharts.defaultOptions &&
                Highcharts.defaultOptions.legend &&
                Highcharts.defaultOptions.legend.backgroundColor) ||
            "rgba(255, 255, 255, 0.85)",
        symbolRadius: 0,
        symbolHeight: 14,
    },
    colors: ["#FFF", "#FFC4AA", "#FF8A66", "#FF392B", "#B71525", "#7A0826"],
    colorAxis: {
        dataClassColor: "category",
        dataClasses: [
            {
                name: "0",
            },
            {
                from: 1,
                to: 100,
            },
            {
                from: 101,
                to: 1000,
            },
            {
                from: 1001,
                to: 3000,
            },
            {
                from: 3000,
                to: 6000,
            },
            {
                from: 6001,
            },
        ],
    },
    tooltip: {
        useHTML: true,
        pointFormat:
            '<div style="text-align: center;color:black">' +
            '<span style="text-align: center;"><b>{point.localname}</b></span></div>' +
            '<div style="color:black"> <b>Nhiễm bệnh: <span >{point.value}</span></b> <br/>' +
            "<b>Phục hồi: <span >{point.socakhoi}</span> </b><br/> " +
            "<b>Tử vong: <span >{point.socatuvong}</span></b>	</div>",
    },
    series: [
        {
            name: "SỐ LIỆU CÁC CA BỆNH",
            joinBy: ["hc-key", "hc-key"],
        },
    ],
};

const HighMaps = ({ mapData }) => {
    const [options, setOptions] = useState({});
    const [mapLoaded, setMapLoaded] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
            getDetailVnLocal().then((res) => {
                const detailData = res.data;

                setOptions(() => ({
                    ...initOptions,
                    title: {
                        text: "Việt Nam",
                    },
                    series: [
                        {
                            ...initOptions.series[0],
                            mapData: mapData,
                            data: detailData,
                        },
                    ],
                }));

                if (!mapLoaded) setMapLoaded(true);
            });
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
            constructorType={"mapChart"}
            ref={chartRef}
        />
    );
};

HighMaps.defaultProps = {
    mapData: {},
};

export default React.memo(HighMaps);
