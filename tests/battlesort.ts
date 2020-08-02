import Assert from 'power-assert'
import {suite, suiteSetup, setup, test} from 'mocha'
import Battlesort from '../src/battlesort'

suite('Battlesort tests', function() {
    let battlesort: Battlesort
    const testItemList = [1, 2, 5, 6, 4, 3, 7, 5, 10, 1, 1, 1, 10, 8]
    const sortedItemList = [...testItemList].sort((a, b) => {
        if (a > b) {
            return 1
        } else if (a < b) {
            return -1
        } else {
            return 0
        }
    })

    suiteSetup(function() {
        // No setup for the moment
    })

    setup(function() {
        battlesort = new Battlesort(testItemList, () => {})
    })

    test('Calling getDisplayables gets the pivot and first value', function() {
        const displayables = battlesort.getDisplayables()
        Assert.deepEqual(displayables, {comparison: 1, pivot: 7, isDone: false})
    })

    test('Undo steps backwards', function() {
        let currentDisplayables = battlesort.getDisplayables()
        stepForward()
        battlesort.undo()
        
        Assert.deepEqual(battlesort.getDisplayables(), currentDisplayables)
    })

    test('Textually equivalent items are never shown for comparison', function() {
        let currentDisplayables = battlesort.getDisplayables()

        while(!currentDisplayables.isDone) {
            Assert.ok(currentDisplayables.comparison !== currentDisplayables.pivot)
            stepForward()
            currentDisplayables = battlesort.getDisplayables()
        }
    })

    test('A comparison is never shown twice', function() {
        const pivots: {[key: string]: string[]} = {}
        const comparisons: {[key: string]: string[]} = {}
        let currentDisplayables = battlesort.getDisplayables()

        while(!currentDisplayables.isDone) {
            const stringPivot = currentDisplayables.pivot.toString()
            const stringComparison = currentDisplayables.comparison.toString()
            if (pivots[stringPivot]) {
                const comparisonValue = pivots[stringPivot].find((value: string) => value === stringComparison)
                Assert.ok(!comparisonValue)
            }

            if (comparisons[stringComparison]) {
                const pivotValue = comparisons[stringComparison].find((value: string) => value === stringPivot)
                Assert.ok(!pivotValue)
            }

            if (!pivots[stringPivot]) {
                pivots[stringPivot] = []
            }

            if (!comparisons[stringComparison]) {
                comparisons[stringComparison] = []
            }

            pivots[stringPivot].push(stringComparison)
            comparisons[stringComparison].push(stringPivot)
            
            stepForward()
            currentDisplayables = battlesort.getDisplayables()
        }
    })

    test('Finishing sort calls the callback', function() {
        let finishedCalled = false
        let finishCallback = () => {
            finishedCalled = true
        }
        battlesort = new Battlesort(testItemList, finishCallback)

        let currentDisplayables = battlesort.getDisplayables()

        while(!currentDisplayables.isDone) {
            stepForward()
            currentDisplayables = battlesort.getDisplayables()
        }

        Assert.ok(finishedCalled) 
    })

    test('Callback is called with sorted values', function() {
        let finalValues
        let finishCallback = (finalArray: Array<number | string>) => {
            finalValues = finalArray
        }
        battlesort = new Battlesort(testItemList, finishCallback)

        let currentDisplayables = battlesort.getDisplayables()

        while(!currentDisplayables.isDone) {
            stepForward()
            currentDisplayables = battlesort.getDisplayables()
        }

        Assert.deepEqual(finalValues, sortedItemList)
    })

    test('Final array can be independently requested with sorted final values', function() {
        let currentDisplayables = battlesort.getDisplayables()

        while(!currentDisplayables.isDone) {
            stepForward()
            currentDisplayables = battlesort.getDisplayables()
        }

        Assert.deepEqual(battlesort.getFinalSortedValues(), sortedItemList)
    })

    test('Requesting sorted values too early returns an empty array', function() {
        Assert.equal(battlesort.getFinalSortedValues().length, 0)
    })

    test('Test failing CI GitHub tag', function() {
        Assert.ok(false)
    })

    function stepForward() {
        const displayables = battlesort.getDisplayables()
        if (displayables.comparison > displayables.pivot) {
            battlesort.comparisonItemGreater()
        } else if (displayables.comparison < displayables.pivot) {
            battlesort.pivotItemGreater()
        } else {
            battlesort.itemsEqual()
        }
    }
})