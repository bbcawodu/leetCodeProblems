/**
DESCRIPTION (inspired by Leetcode.com)
Write a function to calculate the total amount of water trapped between bars on an elevation map, where each bar's width is 1. The input is given as an array of n non-negative integers height representing the height of each bar.

Example:

3
4
1
2
2
5
1
0
2
2
1
3
6
5
4
8
7
10
9
Count:
10
height = [3, 4, 1, 2, 2, 5, 1, 0, 2]
Output:

10
*/

function trappingWater(height: number[]): number {
    let totalWater = 0;

    let left = 0;
    let right = height.length - 1;
    let leftOfLeftMax = 0;
    let rightOfRightMax = height.length - 1;
    
    while (left < right) {
        if (height[leftOfLeftMax] < height[rightOfRightMax]) {
            left++;
            if (height[left] >= height[leftOfLeftMax]) {
                leftOfLeftMax = left;
            } else {
                totalWater += height[leftOfLeftMax] - height[left];
            }
        } else {
            right--;
            if (height[right] >= height[rightOfRightMax]) {
                rightOfRightMax = right;
            } else {
                totalWater += height[rightOfRightMax] - height[right];
            }
        }
    }

    return totalWater;
}

function trappingWaterSlow(height: number[]): number {
    if (height.length < 2) {
        return 0;
    }
    let totalWater = 0;

    let tallestIndex: number;
    let secondTallestIndex: number;
    if (height[1] > height[0]) {
        tallestIndex = 1;
        secondTallestIndex = 0;
    } else {
        tallestIndex = 0;
        secondTallestIndex = 1;
    }
    
    for (let i = 2; i < height.length; i++) {
        let indicesChanged = false;
        if (height[i] === height[tallestIndex] && height[i] === height[secondTallestIndex]) {
            secondTallestIndex = Math.max(tallestIndex, secondTallestIndex);
            tallestIndex = i;
            indicesChanged = true;
        } else if (height[i] >= height[tallestIndex]) {
            secondTallestIndex = tallestIndex;
            tallestIndex = i;
            indicesChanged = true;
        } else if (height[i] >= height[secondTallestIndex]) {
            secondTallestIndex = i;
            indicesChanged = true;
        }

        if (!indicesChanged) {
            continue;
        }

        let rightIndex = Math.max(tallestIndex, secondTallestIndex);
        let leftIndex = Math.min(tallestIndex, secondTallestIndex);
        if (rightIndex - leftIndex <= 1) {
            continue;
        }

        for (let j = leftIndex + 1; j < rightIndex; j++) {
            let newWater = height[secondTallestIndex] - height[j];
            if (leftIndex === tallestIndex) {
                for (let k = rightIndex+1; k < height.length; k++) {
                    if (height[k] >= height[secondTallestIndex]) {
                        newWater = 0;
                        break;
                    }
                }
            }

            totalWater += newWater;
        }
    }

    return totalWater;
}

let height = [5,2,1,2,1,3];
console.log(trappingWater(height));