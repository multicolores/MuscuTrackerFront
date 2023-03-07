export function transformSecondsToMinutes(value: string) {
    let baseSeconds = parseInt(value);

    let minutes = Math.floor(baseSeconds / 60);
    let secondes = baseSeconds - minutes * 60;

    if (minutes === 0) {
        return secondes.toString() + "s";
    } else if (secondes === 0) {
        return minutes.toString() + "min";
    } else {
        return minutes.toString() + "min" + secondes.toString() + "s";
    }
}

export function transformMinutesStringToSecondes(baseMinutes: string) {
    let minutes;
    let secondes;

    if (baseMinutes.includes("min") && baseMinutes.includes("s")) {
        minutes = parseInt(baseMinutes.split("min")[0]);
        secondes = parseInt(baseMinutes.split("s")[0].split("min")[1]);
        return (minutes * 60 + secondes).toString();
    } else if (baseMinutes.includes("min")) {
        minutes = parseInt(baseMinutes.split("min")[0]);
        return (minutes * 60).toString();
    } else return baseMinutes.split("s")[0];
}

export function add15secondes(baseMinutes: string) {
    let value = parseInt(transformMinutesStringToSecondes(baseMinutes));
    value += 15;
    return transformSecondsToMinutes(value.toString());
}

export function remove15secondes(baseMinutes: string) {
    let value = parseInt(transformMinutesStringToSecondes(baseMinutes));
    value -= 15;
    return transformSecondsToMinutes(value.toString());
}
