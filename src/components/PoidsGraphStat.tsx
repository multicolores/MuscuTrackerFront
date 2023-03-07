import React from "react";

import { Tooltip, ResponsiveContainer, Pie, PieChart } from "recharts";

const PoidsGraphStat = (props: { workouts: any[] }) => {
    let data: any = [];

    function createDataObject(workout: any) {
        let poidsNumber = 0;
        workout.exercise.forEach((exercise: any) => {
            poidsNumber += parseInt(exercise.weight.replace("kg", ""));
        });

        let dataObjectToAdd = { name: workout.name, poids: poidsNumber };
        data.push(dataObjectToAdd);
    }
    data = [];

    props.workouts.map((row: any) => createDataObject(row));

    return (
        <>
            <ResponsiveContainer>
                <PieChart>
                    <Pie dataKey="poids" data={data} fill="#1a1a1b" label />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <h3>Poids total en kg</h3>
        </>
    );
};

export default PoidsGraphStat;
