interface Window {
    quicksort: (arr: number[], left: number, right: number) => void
    partition: (arr: number[], left: number, right: number, pivot: number) => number
}