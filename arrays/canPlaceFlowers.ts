/**
You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.

Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and false otherwise.

 

Example 1:

Input: flowerbed = [1,0,0,0,1], n = 1
Output: true
Example 2:

Input: flowerbed = [1,0,0,0,1], n = 2
Output: false
 

Constraints:

1 <= flowerbed.length <= 2 * 104
flowerbed[i] is 0 or 1.
There are no two adjacent flowers in flowerbed.
0 <= n <= flowerbed.length
*/

const canPlaceFlowers = (flowerbed: number[], n: number): boolean => {
    let currentFlowerCount = 0;
    let isPreviousPlotFlowers = false;

    for (let i = 0; i < flowerbed.length; i++) {
        const currentPlot = flowerbed[i];
        if (currentPlot === 1) {
            isPreviousPlotFlowers = true;
            continue;
        }

        const nextPlot = flowerbed[i+1];
        if (isPreviousPlotFlowers === true || nextPlot === 1) {
            isPreviousPlotFlowers = false;
            continue;
        }

        currentFlowerCount += 1;
        isPreviousPlotFlowers = true;
    }

    return currentFlowerCount >= n;
};

const test = () => {
    let flowerbed: number[] = [1, 0, 0, 0, 1];
    let n: number = 1;
    console.log(canPlaceFlowers(flowerbed, n));

    flowerbed = [1, 0, 0, 0, 1];
    n = 2;
    console.log(canPlaceFlowers(flowerbed, n));
    
    flowerbed = [1,0,0,0,0,1];
    n = 2;
    console.log(canPlaceFlowers(flowerbed, n));
};

test();