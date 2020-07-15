interface Window {
    quicksort: (arr: number[], left: number, right: number) => void
    partition: (arr: number[], left: number, right: number, pivot: number) => number
    partitionRun: number
    enableDebug: () => void
    debugEnabled: boolean
    disableDebug: () => void
    log: (logContent: string) => void
    triggerBattleFinished: () => void
    setDebugInputValues: () => void
}