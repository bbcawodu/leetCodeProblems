/**
You are given an integer array cost where cost[i] is the cost of ith step on a staircase.

Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the staircase, which is the position just past the last step (index cost.length).

 

Example 1:

Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
Example 2:

Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
 

Constraints:

2 <= cost.length <= 1000
0 <= cost[i] <= 999
*/

const getMinCostClimbingStairs = (cost: number[]): number => {
    // const calculatedCosts: (null | number)[] = new Array(cost.length).fill(null);

    // getMinCostClimbingStairsRecursive(
    //     cost,
    //     cost.length - 1,
    //     calculatedCosts
    // );

    // return calculatedCosts[calculatedCosts.length - 1] ?? 0;

    return getMinCostClimbingStairsIterative(cost);
};

const getMinCostClimbingStairsIterative = (cost: number[]): number => {
    const calculatedCosts: (null | number)[] = new Array(cost.length).fill(null);

    for (let i = 0; i < cost.length; i++) {
        const costFrom1StepBack = (calculatedCosts[i - 1] ?? 0) + (
            (i === cost.length - 1) ?
                0 :
                cost[i]
        );

        const costFrom2StepsBack = cost[i]  + (calculatedCosts[i - 2] ?? 0);

        const minCost = Math.min(
            costFrom1StepBack,
            costFrom2StepsBack
        );

        calculatedCosts[i] = minCost;
    }

    return calculatedCosts[calculatedCosts.length - 1] ?? 0;
};

const getMinCostClimbingStairsRecursive = (
    cost: number[],
    currentStep: number,
    calculatedCosts: (null | number)[]
): number => {
    if (
        currentStep < 0 ||
        currentStep >= cost.length
    ) {
        return 0;
    }

    if (calculatedCosts[currentStep] !== null) {
        return calculatedCosts[currentStep];
    }

    const costFrom1StepBack = getMinCostClimbingStairsRecursive(
        cost,
        currentStep - 1,
        calculatedCosts
    ) + (
        (currentStep === cost.length - 1) ?
            0 :
            cost[currentStep]
    );

    const costFrom2StepsBack = cost[currentStep] + getMinCostClimbingStairsRecursive(
        cost,
        currentStep - 2,
        calculatedCosts
    );

    const minCost = Math.min(
        costFrom1StepBack,
        costFrom2StepsBack
    );

    calculatedCosts[currentStep] = minCost;

    return minCost;
};

const test = () => {
    let cost = [10,15,20];
    console.log(getMinCostClimbingStairs(cost)); //15

    cost = [1,100,1,1,1,100,1,1,100,1];
    console.log(getMinCostClimbingStairs(cost)); //6

    cost = [10, 15, 20, 124, 2, 33, 5];
    console.log(getMinCostClimbingStairs(cost)); // 37
};

test();