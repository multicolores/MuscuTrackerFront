import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const Graphique = (props: any) => {
    let data: any = [];

    function createdataObject(row: any) {
        let repNumber = 0;
        for (let i = 2; i < row.length; i++) {
            repNumber += row[i];
        }
        if (repNumber != 0) {
            let dataObjectToAdd = { weight: row[0], reps: repNumber };
            data.push(dataObjectToAdd);
        }
    }
    props.data.map((row: any) => createdataObject(row));
    data.reverse();
    return (
        <>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                {/* <XAxis /> */}
                <XAxis dataKey="weight" />
                {/* <XAxis dataKey="name" /> */}
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Line type="monotone" dataKey="reps" stroke="#000000" />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
        </>
    );
};

export default Graphique;
