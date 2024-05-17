/**
 * Calculates the average grade of a list of grade objects.
 *
 * If the total weight of weighted grades does not exceed 1 and there are unweighted grades,
 * the remaining weight is distributed to the unweighted grades.
 * Otherwise, if the total weight of weighted grades is more than 0, the grade is scaled up/down to weight 1.
 * Otherwise, (there is not enough information to calculate an average), "N/A" is returned.
 *
 * This means that unweighted grades are ignored if the total weight of weighted grades exceeds 1.
 * If a grade should not be considered when calculating an average, set its weight to 0.
 * @param grades a list of grades
 */
export function averageGrade(grades) {
    let weightedGradesTotalWeight = 0;
    let weightedGradesTotalValue = 0;

    let nonWeightedGradesSum = 0;
    let nonWeightedGradesCount = 0;

    for (let grade of grades) {
        if (!grade.value) continue;

        if (grade.weight !== null) {
            weightedGradesTotalWeight += grade.weight;
            weightedGradesTotalValue += (grade.weight * grade.value);
        } else {
            nonWeightedGradesSum += grade.value;
            nonWeightedGradesCount += 1;
        }
    }

    let result;
    if (weightedGradesTotalWeight < 1 && nonWeightedGradesCount > 0) {
        // Fill remaining weight with average of non-weighted grades
        const nonWeightedAverage = (nonWeightedGradesSum / nonWeightedGradesCount);
        const nonWeightedWeight = 1 - weightedGradesTotalWeight;
        result = weightedGradesTotalValue + (nonWeightedAverage * nonWeightedWeight);
    } else if (weightedGradesTotalWeight > 0) {
        // Scale weighted total to create a total weight of 1
        result = (weightedGradesTotalValue / weightedGradesTotalWeight)
    } else {
        return "N/A";
    }

    return result.toFixed(2);
}
