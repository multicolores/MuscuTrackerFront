import React from "react";

import { Tooltip, ResponsiveContainer, Pie, PieChart } from "recharts";
import {
    transformMinutesStringToSecondes,
    transformSecondsToMinutes,
} from "../servicesFunctions/handleTime";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const value = transformSecondsToMinutes(payload[0].value);

        return (
            <div className="custom-tooltip-graph">
                <p className="label">{`${payload[0].name} : ${value}`}</p>
            </div>
        );
    }

    return null;
};

const RecupGraphStat = (props: { workouts: any[] }) => {
    let data: any = [];

    function createDataObject(workout: any) {
        let recupNumber = 0;
        let serieNumber = 0;
        workout.exercise.forEach((exercise: any) => {
            exercise.repetition.map((serie: any) => {
                if (serie[1]) {
                    recupNumber += parseInt(
                        transformMinutesStringToSecondes(serie[1])
                    );
                    serieNumber++;
                }
            });
        });
        let moyenneRecup = recupNumber / serieNumber;
        moyenneRecup = Math.round(moyenneRecup * 100) / 100;

        let dataObjectToAdd = { name: workout.name, poids: moyenneRecup };
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
            <h3>Temps de récupération moyen</h3>
        </>
    );
};

export default RecupGraphStat;
