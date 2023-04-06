import React from "react";
import { Tooltip, ResponsiveContainer, Pie, PieChart } from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip-graph">
                <p className="label">{`${payload[0].name} : ${payload[0].value}kg`}</p>
            </div>
        );
    }

    return null;
};

const PoidsGraphStat = (props: { workouts: any[] }) => {
    let data: any = [];

    function createDataObject(workout: any) {
        let poidsNumber = 0;
        let poidsValue = 0;
        workout.exercise.forEach((exercise: any) => {
            poidsValue += parseInt(exercise.weight.replace("kg", ""));
            poidsNumber++;
        });
        poidsValue = poidsValue / poidsNumber;
        poidsValue = Math.round(poidsValue * 100) / 100;

        let dataObjectToAdd = { name: workout.name, poids: poidsValue };
        data.push(dataObjectToAdd);
    }
    data = [];

    props.workouts.map((row: any) => createDataObject(row));

    return (
        <>
            <ResponsiveContainer>
                <PieChart>
                    <Pie dataKey="poids" data={data} fill="#1a1a1b" label />
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
            <h3>Poids moyen en kg</h3>
        </>
    );
};

export default PoidsGraphStat;
