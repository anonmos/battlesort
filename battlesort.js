"use strict";
var COMPARISONS;
(function (COMPARISONS) {
    COMPARISONS["PIVOT_GREATER"] = "PIVOT_GT";
    COMPARISONS["COMPARISON_GREATER"] = "COMPARISON_GT";
    COMPARISONS["EQUAL"] = "EQ";
})(COMPARISONS || (COMPARISONS = {}));
let arrayOfThings = [];
let originalArrayOfThings = [];
let tree = new Tree(arrayOfThings);
let leftPointer = 0;
let rightPointer = arrayOfThings.length - 1;
let pivot = arrayOfThings[Math.floor((leftPointer + rightPointer) / 2)];
let pivotPointerIndex = Math.floor((leftPointer + rightPointer) / 2);
let mode = 'LEFT_POINTER';
let done = false;
let skips = 0;
let autoSortTracker = {};
let actionTracker = [];
function pivotButtonClicked(autoSortActive = false) {
    trackComparison(COMPARISONS.PIVOT_GREATER, !autoSortActive);
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
    if (!autoSortActive) {
        let shouldContinueAutoSorting = autoSort();
        while (shouldContinueAutoSorting && !done) {
            shouldContinueAutoSorting = autoSort();
        }
    }
    updateVisuals();
}
function comparisonButtonClicked(autoSortActive = false) {
    trackComparison(COMPARISONS.COMPARISON_GREATER, !autoSortActive);
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
    if (!autoSortActive) {
        let shouldContinueAutoSorting = autoSort();
        while (shouldContinueAutoSorting && !done) {
            shouldContinueAutoSorting = autoSort();
        }
    }
    updateVisuals();
}
function equalToClicked(autoSortActive = false) {
    trackComparison(COMPARISONS.EQUAL, !autoSortActive);
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
    if (!autoSortActive) {
        let shouldContinueAutoSorting = autoSort();
        while (shouldContinueAutoSorting && !done) {
            shouldContinueAutoSorting = autoSort();
        }
    }
    updateVisuals();
}
function trackComparison(comparison, wasHumanClick) {
    const pointer = mode === "LEFT_POINTER" ? leftPointer : rightPointer;
    const pointerValue = arrayOfThings[pointer].toString();
    const stringPivot = pivot.toString();
    if (!autoSortTracker[stringPivot]) {
        autoSortTracker[stringPivot] = {};
    }
    if (!autoSortTracker[stringPivot][pointerValue]) {
        autoSortTracker[stringPivot][pointerValue] = comparison;
    }
    if (!autoSortTracker[pointerValue]) {
        autoSortTracker[pointerValue] = {};
    }
    if (!autoSortTracker[pointerValue][stringPivot]) {
        autoSortTracker[pointerValue][stringPivot] = getReverseComparison(comparison);
    }
    if (wasHumanClick) {
        actionTracker.push(comparison);
    }
}
function handleUndo() {
    arrayOfThings = originalArrayOfThings.map((item) => item);
    tree = new Tree(arrayOfThings);
    leftPointer = 0;
    rightPointer = arrayOfThings.length - 1;
    mode = 'LEFT_POINTER';
    pivot = arrayOfThings[Math.floor((leftPointer + rightPointer) / 2)];
    pivotPointerIndex = Math.floor((leftPointer + rightPointer) / 2);
    autoSortTracker = {};
    skips = 0;
    const previousActions = actionTracker.slice(0, actionTracker.length - 1);
    actionTracker = [];
    previousActions.forEach((action) => {
        if (action === COMPARISONS.PIVOT_GREATER) {
            pivotButtonClicked();
        }
        else if (action === COMPARISONS.COMPARISON_GREATER) {
            comparisonButtonClicked();
        }
        else if (action === COMPARISONS.EQUAL) {
            equalToClicked();
        }
    });
    updateVisuals();
}
function swapLeftWithRight() {
    let leftValue = arrayOfThings[leftPointer];
    arrayOfThings[leftPointer] = arrayOfThings[rightPointer];
    arrayOfThings[rightPointer] = leftValue;
}
function autoSort() {
    const pointer = mode === "LEFT_POINTER" ? leftPointer : rightPointer;
    const pointerValue = arrayOfThings[pointer].toString();
    const stringPivot = pivot.toString();
    let sortAction = undefined;
    if (autoSortTracker[stringPivot] && autoSortTracker[stringPivot][pointerValue]) {
        sortAction = autoSortTracker[stringPivot][pointerValue];
    }
    if (!sortAction && autoSortTracker[pointerValue] && autoSortTracker[pointerValue][stringPivot]) {
        sortAction = getReverseComparison(autoSortTracker[pointerValue][stringPivot]);
    }
    if (!sortAction && pointerValue === stringPivot) {
        sortAction = COMPARISONS.EQUAL;
    }
    if (sortAction === COMPARISONS.PIVOT_GREATER) {
        pivotButtonClicked(true);
        skips++;
    }
    else if (sortAction === COMPARISONS.COMPARISON_GREATER) {
        comparisonButtonClicked(true);
        skips++;
    }
    else if (sortAction === COMPARISONS.EQUAL) {
        equalToClicked(true);
        skips++;
    }
    return sortAction !== undefined;
}
function getReverseComparison(comparison) {
    let rval = COMPARISONS.EQUAL;
    if (comparison === COMPARISONS.PIVOT_GREATER) {
        rval = COMPARISONS.COMPARISON_GREATER;
    }
    else if (comparison === COMPARISONS.COMPARISON_GREATER) {
        rval = COMPARISONS.PIVOT_GREATER;
    }
    return rval;
}
function battleFinished(finalArray) {
    const answerStage = document.getElementById('answer-stage');
    const sortStage = document.getElementById('sort-stage');
    answerStage.style.display = 'flex';
    sortStage.style.display = 'none';
    const outputTextArea = document.getElementById('output');
    outputTextArea.value = finalArray.reverse().join('\n');
    window.log(`Clicks saved: ${skips}`);
    document.removeEventListener('keydown', keyEventHandler);
}
function resetBattle() {
    const nextArray = tree.getNextNodeArray(arrayOfThings, leftPointer, leftPointer + 1);
    if (nextArray) {
        arrayOfThings = nextArray;
        leftPointer = 0;
        rightPointer = arrayOfThings.length - 1;
        pivot = arrayOfThings[Math.floor((leftPointer + rightPointer) / 2)];
        pivotPointerIndex = Math.floor((leftPointer + rightPointer) / 2);
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
function simulateButtonPress(button) {
    let buttonId = 'equal-button';
    if (button === COMPARISONS.PIVOT_GREATER) {
        buttonId = 'pivot-button';
    }
    else if (button === COMPARISONS.COMPARISON_GREATER) {
        buttonId = 'comparison-button';
    }
    let buttonElement = document.getElementById(buttonId);
    buttonElement.classList.add('active');
    setTimeout(() => {
        buttonElement.classList.remove('active');
    }, 100);
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
function updatePivotValues() {
    updateElement('pivot-pointer-index', `Pivot Pointer Index: ${pivotPointerIndex}`);
    updateElement('pivot-pointer-value', `Pivot Pointer Value: ${pivot}`);
}
function updateArrayValue() {
    updateElement('array-value', `${JSON.stringify(arrayOfThings)}`);
}
function updateChoices() {
    let currentPointer = mode === 'LEFT_POINTER' ? leftPointer : rightPointer;
    const pivotButton = document.getElementById('pivot-button');
    const comparisonButton = document.getElementById('comparison-button');
    pivotButton.innerText = pivot.toString();
    comparisonButton.innerText = arrayOfThings[currentPointer].toString();
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
function keyEventHandler(event) {
    const keyName = event.key;
    window.log(`Handling key: ${keyName}`);
    if (keyName === 'Control') {
        // Don't do anything on "just" a control press
        return;
    }
    if (event.key === 'ArrowRight') {
        pivotButtonClicked();
        simulateButtonPress(COMPARISONS.PIVOT_GREATER);
    }
    else if (event.key === 'ArrowLeft') {
        comparisonButtonClicked();
        simulateButtonPress(COMPARISONS.COMPARISON_GREATER);
    }
    else if (event.key === 'ArrowDown') {
        equalToClicked();
        simulateButtonPress(COMPARISONS.EQUAL);
    }
    if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
        handleUndo();
    }
}
function updateVisuals() {
    updateLeftPointerIndexValue();
    updateRightPointerIndexValue();
    updateLeftPointerValueValue();
    updateRightPointerValueValue();
    updatePivotValues();
    updateArrayValue();
    updateChoices();
    updateCurrentMode();
    updateIsDone();
}
function handleSortButtonClick() {
    const sortInput = document.getElementById('input');
    const inputContainer = document.getElementById('input-stage');
    const sortContainer = document.getElementById('sort-stage');
    const inputValues = sortInput.value;
    let parsedArray = inputValues.split('\n');
    if (parsedArray.length === 1) {
        parsedArray = inputValues.split(',');
    }
    parsedArray = parsedArray.map((item) => item.trim()).filter((item) => item.toString().length > 0);
    originalArrayOfThings = parsedArray.map((item) => item);
    arrayOfThings = parsedArray;
    inputContainer.style.display = 'none';
    sortContainer.style.display = 'flex';
    rightPointer = arrayOfThings.length - 1;
    pivot = arrayOfThings[Math.floor((leftPointer + rightPointer) / 2)];
    pivotPointerIndex = Math.floor((leftPointer + rightPointer) / 2);
    setOriginalArray();
    updateVisuals();
    document.addEventListener('keydown', keyEventHandler);
}
function reverseFinalOrder() {
    let MODE = '\n';
    const outputTextArea = document.getElementById('output');
    let finalValuesArray = outputTextArea.value.split('\n').map((item) => item.trim());
    if (finalValuesArray.length === 1) {
        finalValuesArray = outputTextArea.value.split(',').map((item) => item.trim());
        MODE = ', ';
    }
    outputTextArea.value = finalValuesArray.reverse().map((item) => item.trim()).join(MODE).trim();
}
function swapDelineator() {
    let MODE = ',';
    const outputTextArea = document.getElementById('output');
    let finalValuesArray = outputTextArea.value.split(',');
    if (finalValuesArray.length === 1) {
        finalValuesArray = outputTextArea.value.split('\n').map((item) => item.trim());
        MODE = '\n';
    }
    outputTextArea.value = MODE === ',' ? finalValuesArray.map((item) => item.trim()).join('\n').trim() : finalValuesArray.map((item) => item.trim()).join(', ').trim();
}
window.onload = function () {
    const sortInput = document.getElementById('input');
    sortInput.value = "Do dishes\nRake leaves\nVaccum, dust, sweep\nPet cat\nWalk dog\nBake a pie\nRead a book\nPlant a tree\nMake bed\nMop kitchen";
};
window.setDebugInputValues = function () {
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
window.triggerBattleFinished = function () {
    battleFinished(arrayOfThings);
};
window.log = function (content) {
    if (window.debugEnabled) {
        console.log(content);
    }
};
