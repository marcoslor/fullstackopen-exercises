/**
 * A function that calculates BMI (Body Mass Index) based on the height and weight of a person.
 * The BMI is used to determine whether a person is underweight, normal, overweight or obese.
 * 
 * @param height The height of the person (in cm)
 * @param weight The weight of the person (in kg)
 * @returns A string describing the BMI category of the person
 */
const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height / 100) ** 2;
    if (bmi < 16) {
        return 'Underweight (Severe thinness)';
    }
    if (bmi < 17) {
        return 'Underweight (Moderate thinness)';
    }
    if (bmi < 18.5) {
        return 'Underweight (Mild thinness)';
    }
    if (bmi < 25) {
        return 'Normal range';
    }
    if (bmi < 30) {
        return 'Overweight (Pre-obese)';
    }
    if (bmi < 35) {
        return 'Obese (Class I)';
    }
    if (bmi < 40) {
        return 'Obese (Class II)';
    }
    return 'Obese (Class III)';
};

export default calculateBmi;