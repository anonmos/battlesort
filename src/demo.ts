import {BattlesortClass} from "./battlesort"

let battlesort: BattlesortClass | undefined

function pivotButtonClicked(isKeypress = false) {
    const displayableUpdate = battlesort!.pivotItemGreater()
    
    if (isKeypress) {
        simulateButtonPress('pivot-button')
    }

    updateVisuals(displayableUpdate.comparison, displayableUpdate.pivot, displayableUpdate.isDone)
}

function comparisonButtonClicked(isKeypress = false) {
    const displayableUpdate = battlesort!.comparisonItemGreater()

    if (isKeypress) {
        simulateButtonPress('comparison-button')
    }

    updateVisuals(displayableUpdate.comparison, displayableUpdate.pivot, displayableUpdate.isDone)
}

function equalToClicked(isKeypress = false) {
    const displayableUpdate = battlesort!.itemsEqual()

    if (isKeypress) {
        simulateButtonPress('equal-button')
    }

    updateVisuals(displayableUpdate.comparison, displayableUpdate.pivot, displayableUpdate.isDone)
}

function handleUndo() {
    const displayableUpdate = battlesort!.undo()
    updateVisuals(displayableUpdate.comparison, displayableUpdate.pivot, displayableUpdate.isDone)
}

function simulateButtonPress(buttonId: 'equal-button' | 'pivot-button' | 'comparison-button') {
    let buttonElement = document.getElementById(buttonId)
    buttonElement!.classList.add('active')

    setTimeout(() => {
        buttonElement!.classList.remove('active')
    }, 100)
}

function updateElement(id: string, value: string) {
    try {
        let element = document.getElementById(id)
        element!.innerHTML = value
    } catch (e) {
        // element is probably hidden, swallow the error
    }
}

function updateVisuals(comparisonValue?: string | number, pivotValue?: string | number, done = false) {
    updateDebugValues()

    if (!done) {
        updateChoices(comparisonValue, pivotValue)
    }
}

function updateDebugValues(initialize = false) {
    const debugValues = battlesort?.getDebugValues()
    updateElement('left-pointer-index', `Left Pointer Index: ${debugValues?.leftPointer}`)
    updateElement('left-pointer-value', `Left Pointer Value: ${debugValues?.leftPointerValue}`)
    updateElement('right-pointer-index', `Right Pointer Index: ${debugValues?.rightPointer}`)
    updateElement('right-pointer-value', `Right Pointer Value: ${debugValues?.rightPointerValue}`)
    updateElement('pivot-pointer-index', `Pivot Pointer Index: ${debugValues?.pivot}`)
    updateElement('pivot-pointer-value', `Pivot Pointer Value: ${debugValues?.pivotValue}`)
    updateElement('array-value', `${JSON.stringify(debugValues?.arrayOfThings)}`)
    updateElement('current-mode', `Current Mode: ${debugValues?.mode}`)
    updateElement('is-done', `Done: ${debugValues?.done}`)

    if (initialize) {
        updateElement('original-array', `${JSON.stringify(debugValues?.arrayOfThings)} <-- Original`)
    }
}

function updateChoices(comparisonValue?: string | number, pivotValue?: string | number) {
    const comparisonButton: HTMLButtonElement = document.getElementById('comparison-button') as HTMLButtonElement
    comparisonButton!.innerText = comparisonValue!.toString()

    const pivotButton: HTMLButtonElement = document.getElementById('pivot-button') as HTMLButtonElement
    pivotButton!.innerText = pivotValue!.toString()
}

function keyEventHandler(event: KeyboardEvent) {
    const keyName = event.key
    window.log(`Handling key: ${keyName}`)

    if (keyName === 'Control') {
        // Don't do anything on "just" a control press
        return
    }

    if (event.key === 'ArrowRight') {
        pivotButtonClicked(true)
    } else if (event.key === 'ArrowLeft') {
        comparisonButtonClicked(true)
    } else if (event.key === 'ArrowDown') {
        equalToClicked(true)
    }

    if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
        handleUndo()
    }
}

function handleSortButtonClick() {
    const sortInput: HTMLTextAreaElement = document.getElementById('input') as HTMLTextAreaElement
    const inputContainer = document.getElementById('input-stage')
    const sortContainer = document.getElementById('sort-stage')
    const inputValues = sortInput.value
    let parsedArray = inputValues.split('\n')
    
    if (parsedArray.length === 1) {
        parsedArray = inputValues.split(',')
    }

    parsedArray = parsedArray.map((item) => item.trim()).filter((item) => item.toString().length > 0)

    // @ts-ignore: Expecting browsers to load this in, don't want TS to import for us
    battlesort = new Battlesort(parsedArray, handleFinishedEvent, window.debugEnabled) as BattlesortClass
    const displayables = battlesort.getDisplayables()

    inputContainer!.style.display = 'none'
    sortContainer!.style.display = 'flex'
    updateVisuals(displayables.comparison, displayables.pivot, displayables.isDone)
    document.addEventListener('keydown', keyEventHandler)
}

function handleFinishedEvent(finalArray: Array<string | number>) {
    const answerStage = document.getElementById('answer-stage')
    const sortStage = document.getElementById('sort-stage')
    answerStage!.style.display = 'flex'
    sortStage!.style.display = 'none'
    const outputTextArea: HTMLTextAreaElement = document.getElementById('output') as HTMLTextAreaElement

    outputTextArea.value = finalArray.reverse().join('\n')
    document.removeEventListener('keydown', keyEventHandler)
}

function reverseFinalOrder() {
    let MODE = '\n'
    const outputTextArea: HTMLTextAreaElement = document.getElementById('output') as HTMLTextAreaElement
    let finalValuesArray = outputTextArea.value.split('\n').map((item) => item.trim())

    if (finalValuesArray.length === 1) {
        finalValuesArray = outputTextArea.value.split(',').map((item) => item.trim())
        MODE = ', '
    }

    outputTextArea.value = finalValuesArray.reverse().map((item) => item.trim()).join(MODE).trim()
}

function swapDelineator() {
    let MODE = ','
    const outputTextArea: HTMLTextAreaElement = document.getElementById('output') as HTMLTextAreaElement
    let finalValuesArray = outputTextArea.value.split(',')

    if (finalValuesArray.length === 1) {
        finalValuesArray = outputTextArea.value.split('\n').map((item) => item.trim())
        MODE = '\n'
    }

    outputTextArea.value = MODE === ',' ? finalValuesArray.map((item) => item.trim()).join('\n').trim() : finalValuesArray.map((item) => item.trim()).join(', ').trim()
}

window.onload = function () {
    const sortInput: HTMLTextAreaElement = document.getElementById('input') as HTMLTextAreaElement
    sortInput.value = "Do dishes\nRake leaves\nVaccum, dust, sweep\nPet cat\nWalk dog\nBake a pie\nRead a book\nPlant a tree\nMake bed\nMop kitchen"
}

window.setDebugInputValues = function () {
    const sortInput: HTMLTextAreaElement = document.getElementById('input') as HTMLTextAreaElement
    sortInput.value = "1, 2, 5, 6, 4, 3, 7, 5, 10, 1, 1, 1, 10, 8"
}

window.debugEnabled = false

window.enableDebug = function() {
    const sortContainer = document.getElementById('sort-stage')
    const debugRowOne = document.getElementById('debug-row')

    debugRowOne!.style.display = 'block'
    window.debugEnabled = true
    battlesort?.enableLogging()

    if (sortContainer?.style.display === 'flex') {
        const displayValues = battlesort?.getDisplayables()
        updateVisuals(displayValues?.comparison, displayValues?.pivot, displayValues?.isDone)
    }
}

window.disableDebug = function() {
    const debugRowOne = document.getElementById('debug-row')

    debugRowOne!.style.display = 'none'
    window.debugEnabled = false
    battlesort?.disableLogging()
}

window.triggerBattleFinished = function() {
    const debugValues = battlesort!.getDebugValues()
    handleFinishedEvent(debugValues!.arrayOfThings)
}

window.log = function(content: string) {
    if (window.debugEnabled) {
        console.log(content)
    }
}