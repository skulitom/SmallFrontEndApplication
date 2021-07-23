export const calculateAge = (dob: string) => {
    const dateParts = dob.split('/');
    // convert date from UK format to US
    const birthDate = new Date(+dateParts[2], +dateParts[1], +dateParts[0]);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);
    return Math.abs(age.getUTCFullYear() - 1970);
};

export const getAverageArray = (arrayValues: number[], arrayCounter: number[]) => {
    let averageArray: number[] = new Array(arrayValues.length).fill(0);
    for (const [i, value] of Object.entries(arrayValues)) {
        if (arrayCounter[i] > 0) {
            averageArray[i] = value / arrayCounter[i];
        }
    }
    return averageArray;
};