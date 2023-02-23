interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hoursLog: number[], target: number) => {
    if (hoursLog.length === 0) {
        throw new Error("You must provide at least one exercise log");
    }
    const totalHours = hoursLog.reduce((a, b) => a + b, 0);
    const trainingDays = hoursLog.filter(h => h > 0).length;
    const average = totalHours / hoursLog.length;
    const success = average >= target;
    const rating = success ? 3 : (average >= (target * 0.7) ? 2 : 1);
    const ratingDescription = {
        1: 'You need to work harder',
        2: 'Not too bad but could be better',
        3: 'You are doing great!'
    }
    return {
        periodLength: hoursLog.length,
        trainingDays,
        success,
        rating,
        ratingDescription: ratingDescription[rating],
        target,
        average
    } as Result;
}

export default calculateExercises ;