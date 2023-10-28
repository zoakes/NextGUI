import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const RTChartComponent = props => {
	const {
		serie = [], // pass in {id: 'id', data: []}
        websocket_url = "google.com", // bullshit intermediate.
        def_colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});
			chart.timeScale().fitContent();

            const seriesInstances = [];
            
            let series_by_id = {};
            props.series.forEach((serie) => {
                const newSeries = chart.addAreaSeries({
                    lineColor: lineColor,
                    topColor: areaTopColor,
                    bottomColor: areaBottomColor,
                });
    
                newSeries.setData(serie.data);
                seriesInstances.push(newSeries);
                series_by_id[serie.id] = newSeries;
                });

			window.addEventListener('resize', handleResize);

            // -------------------------- WEBSOCKET ----------------------------------- 

            const socket = new WebSocket(yourWebSocketURL);

            socket.onopen = (event) => {
                // Handle connection opened
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const id = data.id;
                const data_update_arr = data.data
                // NOW -- we need to UPDATE our arrays.
                data_update_arr.forEach(val => {
                    series_by_id[id].update(val)
                })
            };

            socket.onerror = (error) => {
                console.error('WebSocket Error:', error);
            };

            socket.onclose = (event) => {
                if (event.wasClean) {
                    console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
                } else {
                    console.error('Connection died');
                }
            };

			return () => {
				window.removeEventListener('resize', handleResize);
                // seriesInstances.forEach(s => chart.removeSeries(s)); // think chart.remove does this?
				chart.remove();
                socket.close(); // Cleanup on component unmount
			};
		},
		[serie, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};


