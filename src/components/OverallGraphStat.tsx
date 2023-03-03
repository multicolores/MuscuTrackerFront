import React from "react";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const OverallGraphStat = (props: { workouts: any[] }) => {
    let data: any = [];

    function createDataObject(workout: any) {
        let repNumber = 0;
        workout.exercise.forEach((exercise: any) => {
            exercise.repetition.forEach((repetition: any) => {
                for (let i = 2; i < repetition.length; i++) {
                    repNumber += repetition[i];
                }
            });
        });

        let dataObjectToAdd = { name: workout.name, reps: repNumber };
        data.push(dataObjectToAdd);
    }
    data = [];

    props.workouts.map((row: any) => createDataObject(row));

    return (
        <>
            <BarChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reps" fill="#181817" />
            </BarChart>
        </>
    );
};

export default OverallGraphStat;
