"use strict";
// let numberArray = [9, 2, 5, 6, 4, 3, 7, 2, 10, 1, 1, 1, 10, 8];
let arrayOfThings = [];
const tree = new Tree(arrayOfThings);
let leftPointer = 0;
let rightPointer = arrayOfThings.length - 1;
let pivot = arrayOfThings[Math.floor((leftPointer + rightPointer) / 2)];
let mode = 'LEFT_POINTER';
let done = false;
function lessThanClicked() {
    if (leftPointer <= rightPointer && !done) {
        if (mode === 'LEFT_POINTER' && leftPointer <= rightPointer) {
            leftPointer++;
        }
        else if (mode === 'RIGHT_POINTER') {
            swapLeftWithRight();
            mode = 'LEFT_POINTER';
            leftPointer++;
            rightPointer--;
        }
    }
    else if (leftPointer > rightPointer && !done) {
        resetBattle();
    }
    else if (done) {
        window.log(`DONE!`);
    }
    else {
        window.log(`SHOULD NOT GET HERE!`);
    }
    updateVisuals();
}
function greaterThanClicked() {
    if (leftPointer <= rightPointer && !done) {
        if (mode === 'LEFT_POINTER') {
            mode = 'RIGHT_POINTER';
        }
        else {
            rightPointer--;
        }
    }
    else if (leftPointer > rightPointer && !done) {
        resetBattle();
    }
    else if (done) {
        window.log(`DONE!`);
    }
    else {
        window.log(`SHOULD NOT GET HERE!`);
    }
    updateVisuals();
}
function equalToClicked() {
    if (leftPointer <= rightPointer && !done) {
        if (mode === 'LEFT_POINTER') {
            mode = 'RIGHT_POINTER';
        }
        else if (mode === 'RIGHT_POINTER') {
            swapLeftWithRight();
            mode = 'LEFT_POINTER';
            leftPointer++;
            rightPointer--;
        }
    }
    else if (leftPointer > rightPointer && !done) {
        resetBattle();
    }
    else if (done) {
        window.log(`DONE!`);
    }
    else {
        window.log(`SHOULD NOT GET HERE!`);
    }
    updateVisuals();
}
function swapLeftWithRight() {
    let leftValue = arrayOfThings[leftPointer];
    arrayOfThings[leftPointer] = arrayOfThings[rightPointer];
    arrayOfThings[rightPointer] = leftValue;
}
function battleFinished(finalArray) {
    const answerStage = document.getElementById('answer-stage');
    const sortStage = document.getElementById('sort-stage');
    answerStage.style.display = 'flex';
    sortStage.style.display = 'none';
    const outputTextArea = document.getElementById('output');
    outputTextArea.value = finalArray.join(', ');
}
function resetBattle() {
    const nextArray = tree.getNextNodeArray(arrayOfThings, leftPointer, leftPointer + 1);
    if (nextArray) {
        arrayOfThings = nextArray;
        leftPointer = 0;
        rightPointer = arrayOfThings.length - 1;
        pivot = arrayOfThings[Math.floor((leftPointer + rightPointer) / 2)];
        mode = 'LEFT_POINTER';
        setOriginalArray();
        updateVisuals();
        window.log(`Resetting with: ${JSON.stringify(arrayOfThings)}, leftPointer: ${leftPointer}, rightPointer: ${rightPointer}, pivotPointer: ${Math.floor((leftPointer + rightPointer) / 2)}, pivotValue: ${pivot}`);
    }
    else {
        battleFinished(tree.getFinalArray());
        done = true;
    }
}
function updateLeftPointerIndexValue() {
    updateElement('left-pointer-index', `Left Pointer Index: ${leftPointer}`);
}
function updateLeftPointerValueValue() {
    updateElement('left-pointer-value', `Left Pointer Value: ${arrayOfThings[leftPointer]}`);
}
function updateRightPointerIndexValue() {
    updateElement('right-pointer-index', `Right Pointer Index: ${rightPointer}`);
}
function updateRightPointerValueValue() {
    updateElement('right-pointer-value', `Right Pointer Value: ${arrayOfThings[rightPointer]}`);
}
function updatePivotValue() {
    updateElement('pivot-pointer-value', `Pivot Pointer Value: ${pivot}`);
}
function updateArrayValue() {
    updateElement('array-value', `${JSON.stringify(arrayOfThings)}`);
}
function updateTitle() {
    let currentPointer = mode === 'LEFT_POINTER' ? leftPointer : rightPointer;
    let mainQuestionElement = document.getElementById('main-question');
    let comparisonElement = document.createElement('strong');
    mainQuestionElement.innerHTML = `Is ${arrayOfThings[currentPointer]} greater than `;
    comparisonElement.innerHTML = `${pivot}?`;
    mainQuestionElement.appendChild(comparisonElement);
}
function updateCurrentMode() {
    updateElement('current-mode', `Current Mode: ${mode}`);
}
function updateIsDone() {
    updateElement('is-done', `Done: ${done}`);
}
function setOriginalArray() {
    updateElement('original-array', `${JSON.stringify(arrayOfThings)} <-- Original`);
}
function updateElement(id, value) {
    try {
        let element = document.getElementById(id);
        element.innerHTML = value;
    }
    catch (e) {
        // element is probably off, swallow the error
    }
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
function handleSortButtonClick() {
    const sortInput = document.getElementById('input');
    const inputContainer = document.getElementById('input-stage');
    const sortContainer = document.getElementById('sort-stage');
    const inputValues = sortInput.value;
    const parsedArray = inputValues.split(',').map((value) => value.trim());
    arrayOfThings = parsedArray;
    inputContainer.style.display = 'none';
    sortContainer.style.display = 'flex';
    rightPointer = arrayOfThings.length - 1;
    pivot = arrayOfThings[Math.floor((leftPointer + rightPointer) / 2)];
    setOriginalArray();
    updateVisuals();
}
window.onload = function () {
    const sortInput = document.getElementById('input');
    sortInput.value = "1, 2, 5, 6, 4, 3, 7, 5, 10, 1, 1, 1, 10, 8";
};
window.quicksort = function (arr, left = 0, right = arr.length - 1) {
    if (left >= right)
        return;
    const pivot = arr[Math.floor((left + right) / 2)];
    const index = window.partition(arr, left, right, pivot);
    // window.log(`Run ${window.partitionRun} index: ${index}`)
    window.quicksort(arr, left, index - 1);
    window.quicksort(arr, index, right);
    return arr;
};
window.partition = function (arr, left, right, pivot) {
    window.partitionRun++;
    const runLeft = left;
    const runRight = right;
    const runPivot = pivot;
    window.log(`Begin Run: ${window.partitionRun} - ${JSON.stringify(arr.slice(runLeft, runRight + 1))}, left: ${runLeft}, right: ${runRight}, pivot: ${runPivot}`);
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
    window.log(`End Run: ${window.partitionRun} - ${JSON.stringify(arr.slice(runLeft, runRight + 1))}, left: ${runLeft}, right: ${runRight}, pivot: ${runPivot}`);
    return left;
};
window.partitionRun = 0;
window.debugEnabled = false;
window.enableDebug = function () {
    const debugRowOne = document.getElementById('debug-row');
    debugRowOne.style.display = 'block';
    window.debugEnabled = true;
    updateVisuals();
};
window.disableDebug = function () {
    const debugRowOne = document.getElementById('debug-row');
    debugRowOne.style.display = 'none';
    window.debugEnabled = false;
};
window.log = function (content) {
    if (window.debugEnabled) {
        console.log(content);
    }
};
