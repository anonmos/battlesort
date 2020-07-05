// let numberArray = [9, 2, 5, 6, 4, 3, 7, 2, 10, 1, 1, 1, 10, 8];
let numberArray = [1, 2, 5, 6, 4, 3, 7, 5, 10, 1, 1, 1, 10, 8];
const tree = new Tree(numberArray)
let leftPointer = 0
let rightPointer = numberArray.length - 1
let pivot = numberArray[Math.floor((leftPointer + rightPointer) / 2)]
let mode: 'LEFT_POINTER' | 'RIGHT_POINTER' = 'LEFT_POINTER'
let done = false

function lessThanClicked() {
    if (leftPointer <= rightPointer && !done) {
        if (mode === 'LEFT_POINTER' && leftPointer <= rightPointer) {
            leftPointer++
        } else if (mode === 'RIGHT_POINTER') {
            swapLeftWithRight()
            mode = 'LEFT_POINTER'
            leftPointer++
            rightPointer--
        }
    } else if (leftPointer > rightPointer && !done) {
        resetBattle()
    }
    else if (done) {
        console.log(`DONE!`)
    } else {
        console.log(`SHOULD NOT GET HERE!`)
    }
    updateVisuals()
}

function greaterThanClicked() {
    if (leftPointer <= rightPointer && !done) {
        if (mode === 'LEFT_POINTER') {
            mode = 'RIGHT_POINTER'
        } else {
            rightPointer--
        }
    } else if (leftPointer > rightPointer && !done) {
        resetBattle()
    } else if (done) {
        console.log(`DONE!`)
    } else {
        console.log(`SHOULD NOT GET HERE!`)
    }

    updateVisuals()
}

function equalToClicked() {
    if (leftPointer <= rightPointer && !done) {
        if (mode === 'LEFT_POINTER') {
            mode = 'RIGHT_POINTER'
        } else if (mode === 'RIGHT_POINTER') {
            swapLeftWithRight()
            mode = 'LEFT_POINTER'
            leftPointer++
            rightPointer--
        }
    } else if (leftPointer > rightPointer && !done) {
        resetBattle()
    } else if (done) {
        console.log(`DONE!`)
    } else {
        console.log(`SHOULD NOT GET HERE!`)
    }

    updateVisuals()
}

function swapLeftWithRight() {
    let leftValue = numberArray[leftPointer]
    numberArray[leftPointer] = numberArray[rightPointer]
    numberArray[rightPointer] = leftValue
}

function resetBattle() {
    const nextArray = tree.getNextNodeArray(numberArray, leftPointer, leftPointer + 1)

    if (nextArray) {
        numberArray = nextArray as number[]
        leftPointer = 0
        rightPointer = numberArray.length - 1
        pivot = numberArray[Math.floor((leftPointer + rightPointer) / 2)]
        mode = 'LEFT_POINTER'
        setOriginalArray()
        updateVisuals()
        console.log(`Resetting with: ${JSON.stringify(numberArray)}, leftPointer: ${leftPointer}, rightPointer: ${rightPointer}, pivotPointer: ${Math.floor((leftPointer + rightPointer) / 2)}, pivotValue: ${pivot}`)
    } else {
        numberArray = tree.getFinalArray() as unknown as number[]
        done = true
    }
}

function updateLeftPointerIndexValue() {
    let element = document.getElementById('left-pointer-index')
    element!.innerHTML = `Left Pointer Index: ${leftPointer}`
}

function updateLeftPointerValueValue() {
    let element = document.getElementById('left-pointer-value')
    element!.innerHTML = `Left Pointer Value: ${numberArray[leftPointer]}`
}

function updateRightPointerIndexValue() {
    let element = document.getElementById('right-pointer-index')
    element!.innerHTML = `Right Pointer Index: ${rightPointer}`
}

function updateRightPointerValueValue() {
    let element = document.getElementById('right-pointer-value')
    element!.innerHTML = `Right Pointer Value: ${numberArray[rightPointer]}`
}

function updatePivotValue() {
    let element = document.getElementById('pivot-pointer-value')
    element!.innerHTML = `Pivot Pointer Value: ${pivot}`
}

function updateArrayValue() {
    let element = document.getElementById('array-value')
    element!.innerHTML = `${JSON.stringify(numberArray)}`
}

function updateTitle() {
    let currentPointer = mode === 'LEFT_POINTER' ? leftPointer : rightPointer
    let mainQuestionElement = document.getElementById('main-question')
    let comparisonElement = document.createElement('strong')

    mainQuestionElement!.innerHTML = `Is ${numberArray[currentPointer]} greater than `
    comparisonElement.innerHTML = `${pivot}`
    mainQuestionElement!.appendChild(comparisonElement)
}

function updateCurrentMode() {
    let element = document.getElementById('current-mode')
    element!.innerHTML = `Current Mode: ${mode}`
}

function updateIsDone() {
    let element = document.getElementById('is-done')
    element!.innerHTML = `Done: ${done}`
}

function setOriginalArray() {
    let element = document.getElementById('original-array')
    element!.innerHTML = `${JSON.stringify(numberArray)} <-- Original`
}

function updateVisuals() {
    updateLeftPointerIndexValue()
    updateRightPointerIndexValue()
    updateLeftPointerValueValue()
    updateRightPointerValueValue()
    updatePivotValue()
    updateArrayValue()
    updateTitle()
    updateCurrentMode()
    updateIsDone()
}

window.onload = function () {
    setOriginalArray()
    updateVisuals()
}

window.quicksort = function (arr: number[], left = 0, right = arr.length - 1) {
    if (left >= right) return;
    const pivot = arr[Math.floor((left + right) / 2)];
    const index = window.partition(arr, left, right, pivot);
    // console.log(`Run ${window.partitionRun} index: ${index}`)
    window.quicksort(arr, left, index - 1);
    window.quicksort(arr, index, right);
    return arr;
}

window.partition = function (arr: number[], left: number, right: number, pivot: number) {
    window.partitionRun++
    const runLeft = left
    const runRight = right
    const runPivot = pivot
    console.log(`Begin Run: ${window.partitionRun} - ${JSON.stringify(arr.slice(runLeft, runRight + 1))}, left: ${runLeft}, right: ${runRight}, pivot: ${runPivot}`)

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

    console.log(`End Run: ${window.partitionRun} - ${JSON.stringify(arr.slice(runLeft, runRight + 1))}, left: ${runLeft}, right: ${runRight}, pivot: ${runPivot}`)

    return left;
}

window.partitionRun = 0