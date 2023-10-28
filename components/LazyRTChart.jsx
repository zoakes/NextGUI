import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

// Called like: <RTChartComponent websocket_url={`ws://your-server:${algoPortMapping[componentAlgoId]}`}/>
export const RTChartComponent = props => {
    const {
        // Dont know if we can pass this, as it might try creating both within useEffect?
        labels = [], // initial series labels, can be an empty array if you expect all series to come from WebSocket
        websocket_url,
        def_colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();
    const seriesById = useRef({});

    useEffect(() => {
        // -------------------------- CHART SETUP -----------------------------------

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
        });

        // closure -- must be in useEffect.
        const addNewSeries = (label) => {
            const seriesInstance = chart.addLineSeries({
                lineColor,
                topColor: areaTopColor,
                bottomColor: areaBottomColor,
            });
            seriesById.current[label] = seriesInstance;
        };

        labels.forEach(label => {
            addNewSeries(label);
        });

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };
        window.addEventListener('resize', handleResize);

        // -------------------------- WEBSOCKET -----------------------------------

        const socket = new WebSocket(websocket_url);

        socket.onmessage = event => {
            // The event carries the 'data' property which contains the message from the server.
            // For this implementation, it's expected that the server sends JSON stringified data.

                // Expected structure:
                // [
                //     {
                //         "id": "series_id1",
                //         "data": [
                //             {"time": 123, "value": 456},
                //             ...
                //         ]
                //     },
                //     {
                //         "id": "series_id2",
                //         "data": [
                //             {"time": 789, "value": 1011},
                //             ...
                //         ]
                //     },
                //     ... potentially more series updates ...
                // ]
            const seriesUpdates = JSON.parse(event.data);
        
            // Loop through each series update in the message
            seriesUpdates.forEach(update => {
                const id = update.id;
                const dataUpdates = update.data;
        
                // If series not present + initialized, create it.
                if (!seriesById.current[id]) {
                    addNewSeries(id);
                }
                dataUpdates.forEach(val => {
                    seriesById.current[id].update(val);
                });
            });
        };

        socket.onerror = error => {
            console.error('WebSocket Error:', error);
        };

        socket.onclose = event => {
            // The 'close' event has a few properties that can provide info on the disconnection:
            // - event.wasClean: boolean indicating if the connection closed cleanly.
            // - event.code: status code indicating why the connection closed.
            // - event.reason: a human-readable string explaining why the connection closed.
            // Note: Not all disconnects will have 'event.reason' populated.
            if (event.wasClean) {
                console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
            } else {
                console.error('Connection died');
            }
        };

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove(); // Removes the chart and all series
            socket.close();
        };

    }, [labels, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor, websocket_url]);

    return <div ref={chartContainerRef} />;
};



