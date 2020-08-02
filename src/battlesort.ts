import Tree from "./lib/tree"
import Logger from "./lib/logger"

enum COMPARISONS {
    PIVOT_GREATER = 'PIVOT_GT',
    COMPARISON_GREATER = 'COMPARISON_GT',
    EQUAL = 'EQ'
}
type POINTER_MODE = 'LEFT_POINTER' | 'RIGHT_POINTER'

export type Displayables = {comparison: string | number, pivot: string | number, isDone: boolean}
export type BattlesortClass = Battlesort

export default class Battlesort {
    private arrayOfThings: Array<number | string> = []
    private originalArrayOfThings: Array<number | string> = []
    private tree = new Tree(this.arrayOfThings)
    private leftPointer = 0
    private rightPointer = this.arrayOfThings.length - 1
    private pivot = this.arrayOfThings[Math.floor((this.leftPointer + this.rightPointer) / 2)]
    private pivotPointerIndex = Math.floor((this.leftPointer + this.rightPointer) / 2)
    private mode: POINTER_MODE = 'LEFT_POINTER'
    private done = false
    private skips = 0
    
    private autoSortTracker: {[key: string]: {[key: string]: COMPARISONS}} = {}
    private actionTracker: COMPARISONS[] = []
    
    constructor(itemList: Array<number | string>, private finishedCallback: (finishedArray: Array<number | string>) => void, logging = false) {
        this.originalArrayOfThings = [...itemList]
        this.resetBattlesortState()

        if (logging) {
            this.enableLogging()
        }
    }

    private resetBattlesortState(): void {
        this.arrayOfThings = [...this.originalArrayOfThings]
        this.tree = new Tree(this.arrayOfThings)
        this.leftPointer = 0
        this.rightPointer = this.arrayOfThings.length - 1
        this.pivot = this.arrayOfThings[Math.floor((this.leftPointer + this.rightPointer) / 2)]
        this.pivotPointerIndex = Math.floor((this.leftPointer + this.rightPointer) / 2)
        this.mode = 'LEFT_POINTER'
        this.done = false
        this.skips = 0

        this.autoSortTracker = {}
        this.actionTracker = []
    }

    private setNewBattle() {
        const nextArray = this.tree.getNextNodeArray(this.arrayOfThings, this.leftPointer, this.leftPointer + 1)

        if (nextArray) {
            this.arrayOfThings = nextArray as number[]
            this.leftPointer = 0
            this.rightPointer = this.arrayOfThings.length - 1
            this.pivot = this.arrayOfThings[Math.floor((this.leftPointer + this.rightPointer) / 2)]
            this.pivotPointerIndex = Math.floor((this.leftPointer + this.rightPointer) / 2)
            this.mode = 'LEFT_POINTER'
            Logger.log(`Resetting with: ${JSON.stringify(this.arrayOfThings)}, leftPointer: ${this.leftPointer}, rightPointer: ${this.rightPointer}, pivotPointer: ${Math.floor((this.leftPointer + this.rightPointer) / 2)}, pivotValue: ${this.pivot}`)
        } else {
            Logger.log(`Battle finished!`)
            Logger.log(`Clicks saved: ${this.skips}`)
            this.finishedCallback(this.tree.getFinalArray())
            this.done = true
        }
    }

    private autoSort(): boolean {
        const pointer = this.mode === "LEFT_POINTER" ? this.leftPointer : this.rightPointer
        const pointerValue = this.arrayOfThings[pointer].toString()
        const stringPivot = this.pivot.toString()
    
        let sortAction: COMPARISONS | undefined = undefined
    
        if (this.autoSortTracker[stringPivot] && this.autoSortTracker[stringPivot][pointerValue]) {
            sortAction = this.autoSortTracker[stringPivot][pointerValue]
        }
    
        if (!sortAction && this.autoSortTracker[pointerValue] && this.autoSortTracker[pointerValue][stringPivot]) {
            sortAction = this.getReverseComparison(this.autoSortTracker[pointerValue][stringPivot])
        }
    
        if (!sortAction && pointerValue === stringPivot) {
            sortAction = COMPARISONS.EQUAL
        }
    
        if (sortAction === COMPARISONS.PIVOT_GREATER) {
            this.pivotItemGreater(true)
            this.skips++
        } else if (sortAction === COMPARISONS.COMPARISON_GREATER) {
            this.comparisonItemGreater(true)
            this.skips++
        } else if (sortAction === COMPARISONS.EQUAL) {
            this.itemsEqual(true)
            this.skips++
        }
    
        return sortAction !== undefined
     }

     private swapLeftWithRight() {
        let leftValue = this.arrayOfThings[this.leftPointer]
        this.arrayOfThings[this.leftPointer] = this.arrayOfThings[this.rightPointer]
        this.arrayOfThings[this.rightPointer] = leftValue
    }

    private getReverseComparison(comparison: COMPARISONS): COMPARISONS {
        let rval = COMPARISONS.EQUAL
    
        if (comparison === COMPARISONS.PIVOT_GREATER) {
            rval = COMPARISONS.COMPARISON_GREATER
        } else if (comparison === COMPARISONS.COMPARISON_GREATER) {
            rval = COMPARISONS.PIVOT_GREATER
        }
    
        return rval
    }

    private trackComparison(comparison: COMPARISONS, wasHumanClick: boolean) {
        const pointer = this.mode === "LEFT_POINTER" ? this.leftPointer : this.rightPointer
        const stringPointerValue = this.arrayOfThings[pointer].toString()
        const stringPivot = this.pivot.toString()
    
        if (!this.autoSortTracker[stringPivot]) {
            this.autoSortTracker[stringPivot] = {}
        }
    
        if (!this.autoSortTracker[stringPivot][stringPointerValue]) {
            this.autoSortTracker[stringPivot][stringPointerValue] = comparison
        }
    
        if (!this.autoSortTracker[stringPointerValue]) {
            this.autoSortTracker[stringPointerValue] = {}
        }
    
        if (!this.autoSortTracker[stringPointerValue][stringPivot]) {
            this.autoSortTracker[stringPointerValue][stringPivot] = this.getReverseComparison(comparison)
        }
    
        if (wasHumanClick) {
            this.actionTracker.push(comparison)
        }
    }

    public getDisplayables(): Displayables {
        let currentPointer = this.mode === 'LEFT_POINTER' ? this.leftPointer : this.rightPointer
        return {comparison: this.arrayOfThings[currentPointer], pivot: this.pivot, isDone: this.done}
    }

    public undo(): Displayables {
        const previousActions = this.actionTracker.slice(0, this.actionTracker.length - 1)
        this.resetBattlesortState()
    
        previousActions.forEach((action) => {
            if (action === COMPARISONS.PIVOT_GREATER) {
                this.pivotItemGreater()
            } else if (action === COMPARISONS.COMPARISON_GREATER) {
                this.comparisonItemGreater()
            } else if (action === COMPARISONS.EQUAL) {
                this.itemsEqual()
            }
        })

        return this.getDisplayables()
    }

    public itemsEqual(autoSortActive = false): Displayables {
        this.trackComparison(COMPARISONS.EQUAL, !autoSortActive)
        if (this.leftPointer <= this.rightPointer && !this.done) {
            if (this.mode === 'LEFT_POINTER') {
                this.mode = 'RIGHT_POINTER'
            } else if (this.mode === 'RIGHT_POINTER') {
                this.swapLeftWithRight()
                this.mode = 'LEFT_POINTER'
                this.leftPointer++
                this.rightPointer--
            }
        } else if (this.leftPointer > this.rightPointer && !this.done) {
            this.setNewBattle()
        } else if (this.done) {
            Logger.log(`DONE!`)
        } else {
            Logger.log(`SHOULD NOT GET HERE!`)
        }
    
        if (!autoSortActive) {
            let shouldContinueAutoSorting = this.autoSort()
    
            while (shouldContinueAutoSorting && !this.done) {
                shouldContinueAutoSorting = this.autoSort()
            }
        }
    
        return this.getDisplayables()
    }

    public comparisonItemGreater(autoSortActive = false): Displayables {
        this.trackComparison(COMPARISONS.COMPARISON_GREATER, !autoSortActive)
        if (this.leftPointer <= this.rightPointer && !this.done) {
            if (this.mode === 'LEFT_POINTER') {
                this.mode = 'RIGHT_POINTER'
            } else {
                this.rightPointer--
            }
        } else if (this.leftPointer > this.rightPointer && !this.done) {
            this.setNewBattle()
        } else if (this.done) {
            Logger.log(`DONE!`)
        } else {
            Logger.log(`SHOULD NOT GET HERE!`)
        }
    
        if (!autoSortActive) {
            let shouldContinueAutoSorting = this.autoSort()
    
            while (shouldContinueAutoSorting && !this.done) {
                shouldContinueAutoSorting = this.autoSort()
            }
        }
    
        return this.getDisplayables()
    }

    public pivotItemGreater(autoSortActive = false): Displayables {
        this.trackComparison(COMPARISONS.PIVOT_GREATER, !autoSortActive)
        if (this.leftPointer <= this.rightPointer && !this.done) {
            if (this.mode === 'LEFT_POINTER' && this.leftPointer <= this.rightPointer) {
                this.leftPointer++
            } else if (this.mode === 'RIGHT_POINTER') {
                this.swapLeftWithRight()
                this.mode = 'LEFT_POINTER'
                this.leftPointer++
                this.rightPointer--
            }
        } else if (this.leftPointer > this.rightPointer && !this.done) {
            this.setNewBattle()
        }
        else if (this.done) {
            Logger.log(`DONE!`)
        } else {
            Logger.log(`SHOULD NOT GET HERE!`)
        }
    
        if (!autoSortActive) {
            let shouldContinueAutoSorting = this.autoSort()
    
            while (shouldContinueAutoSorting && !this.done) {
                shouldContinueAutoSorting = this.autoSort()
            }
        }
    
        return this.getDisplayables()
    }

    public getFinalSortedValues() {
        return this.done ? this.tree.getFinalArray() : []
    }

    public getDebugValues() {
        return {leftPointer: this.leftPointer, leftPointerValue: this.arrayOfThings[this.leftPointer], rightPointer: this.rightPointer, rightPointerValue: this.arrayOfThings[this.rightPointer], pivot: this.pivotPointerIndex, pivotValue: this.pivot, arrayOfThings: this.arrayOfThings, mode: this.mode, done: this.done}
    }

    public enableLogging() {
        Logger.enabled = true
    }

    public disableLogging() {
        Logger.enabled = false
    }
}