"use strict";
// let numberArray = [9, 2, 5, 6, 4, 3, 7, 2, 10, 1, 1, 1, 10, 8];
let numberArray = [1, 2, 5, 6, 4, 3, 7, 5, 10, 1, 1, 1, 10, 8];
const tree = new Tree(numberArray);
let leftPointer = 0;
let rightPointer = numberArray.length - 1;
let pivot = numberArray[Math.floor((leftPointer + rightPointer) / 2)];
let mode = 'LEFT_POINTER';
let done = false;
function lessThanClicked() {
    if (mode === 'LEFT_POINTER' && leftPointer <= rightPointer && !done) {
        leftPointer++;
    }
    else if (mode === 'RIGHT_POINTER' && leftPointer <= rightPointer && !done) {
        if (leftPointer <= rightPointer) {
            swapLeftWithRight();
            mode = 'LEFT_POINTER';
            leftPointer++;
            rightPointer--;
        }
        else {
            resetBattle();
        }
    }
    else if (done) {
        console.log(`DONE!`);
    }
    else {
        console.log(`SHOULD NOT GET HERE!`);
    }
    updateVisuals();
}
function greaterThanClicked() {
    if (mode === 'LEFT_POINTER' && leftPointer <= rightPointer && !done) {
        mode = 'RIGHT_POINTER';
    }
    else if (mode === 'RIGHT_POINTER' && leftPointer <= rightPointer && !done) {
        rightPointer--;
    }
    else if (!done) {
        resetBattle();
    }
    else if (done) {
        console.log(`DONE!`);
    }
    else {
        console.log(`SHOULD NOT GET HERE!`);
    }
    updateVisuals();
}
function equalToClicked() {
    if (mode === 'LEFT_POINTER') {
        mode = 'RIGHT_POINTER';
    }
    else {
        mode = 'LEFT_POINTER';
    }
    updateVisuals();
}
function swapLeftWithRight() {
    let leftValue = numberArray[leftPointer];
    numberArray[leftPointer] = numberArray[rightPointer];
    numberArray[rightPointer] = leftValue;
}
function resetBattle() {
    console.log(`Storing array: ${JSON.stringify(numberArray)}`);
    const nextArray = tree.getNextNodeArray(numberArray, leftPointer, leftPointer + 1);
    if (nextArray) {
        numberArray = nextArray;
        leftPointer = 0;
        rightPointer = numberArray.length - 1;
        pivot = numberArray[Math.floor((leftPointer + rightPointer) / 2)];
        mode = 'LEFT_POINTER';
    }
    else {
        numberArray = tree.getFinalArray();
        done = true;
    }
}
function updateLeftPointerIndexValue() {
    let element = document.getElementById('left-pointer-index');
    element.innerHTML = `Left Pointer Index: ${leftPointer}`;
}
function updateLeftPointerValueValue() {
    let element = document.getElementById('left-pointer-value');
    element.innerHTML = `Left Pointer Value: ${numberArray[leftPointer]}`;
}
function updateRightPointerIndexValue() {
    let element = document.getElementById('right-pointer-index');
    element.innerHTML = `Right Pointer Index: ${rightPointer}`;
}
function updateRightPointerValueValue() {
    let element = document.getElementById('right-pointer-value');
    element.innerHTML = `Right Pointer Value: ${numberArray[rightPointer]}`;
}
function updatePivotValue() {
    let element = document.getElementById('pivot-pointer-value');
    element.innerHTML = `Pivot Pointer Value: ${numberArray[pivot]}`;
}
function updateArrayValue() {
    let element = document.getElementById('array-value');
    element.innerHTML = `${JSON.stringify(numberArray)}`;
}
function updateTitle() {
    let currentPointer = mode === 'LEFT_POINTER' ? leftPointer : rightPointer;
    let mainQuestionElement = document.getElementById('main-question');
    let comparisonElement = document.createElement('strong');
    mainQuestionElement.innerHTML = `Is ${numberArray[currentPointer]} greater than `;
    comparisonElement.innerHTML = `${numberArray[pivot]}`;
    mainQuestionElement.appendChild(comparisonElement);
}
function updateCurrentMode() {
    let element = document.getElementById('current-mode');
    element.innerHTML = `Current Mode: ${mode}`;
}
function updateIsDone() {
    let element = document.getElementById('is-done');
    element.innerHTML = `Done: ${done}`;
}
function setOriginalArray() {
    let element = document.getElementById('original-array');
    element.innerHTML = `${JSON.stringify(numberArray)} <-- Original`;
}
function updateVisuals() {
    updateLeftPointerIndexValue();
    updateRightPointerIndexValue();
    updateLeftPointerValueValue();
    updateRightPointerValueValue();
    updatePivotValue();
    updateArrayValue();
    updateTitle();
    updateCurrentMode();
    updateIsDone();
}
window.onload = function () {
    setOriginalArray();
    updateVisuals();
};
window.quicksort = function (arr, left = 0, right = arr.length - 1) {
    if (left >= right)
        return;
    const pivot = arr[Math.floor((left + right) / 2)];
    const index = window.partition(arr, left, right, pivot);
    window.quicksort(arr, left, index - 1);
    window.quicksort(arr, index, right);
    return arr;
};
window.partition = function (arr, left, right, pivot) {
    const runLeft = left;
    const runRight = right;
    const runPivot = pivot;
    while (left <= right) {
        while (arr[left] < pivot && left <= right) { // Replace  `arr[left] < pivot`  with button click to select which is greater
            left++;
        }
        while (arr[right] > pivot) { // Replace  `arr[right] > pivot`  with button click to select which is greater
            right--;
        }
        if (left <= right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }
    window.partitionRun++;
    console.log(`Run: ${window.partitionRun} - ${JSON.stringify(arr.slice(0, runRight + 1))}, left: ${runLeft}, right: ${runRight}, pivot: ${runPivot}`);
    return left;
};
window.partitionRun = 0;
