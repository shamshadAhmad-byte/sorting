const arrayContainer = document.getElementById('array-container');
const algorithmSelect = document.getElementById('algorithm-select');
const sortButton = document.getElementById('sort-btn');
const shuffleButton = document.getElementById('shuffle-btn');

let array = [];

// Generate a random array
function generateArray(size = 50) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    createBars();
}

// Create bars for the array
function createBars() {
    arrayContainer.innerHTML = ''; // Clear previous bars
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.style.width = '10px';
        arrayContainer.appendChild(bar);
    });
}

// Utility function to pause execution
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';
            if (array[j] > array[j + 1]) {
                // Swap values
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                // Swap heights visually
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
                await sleep(50);
            }
            bars[j].style.backgroundColor = '#007bff';
            bars[j + 1].style.backgroundColor = '#007bff';
        }
        bars[array.length - i - 1].style.backgroundColor = 'green';
    }
}

// Selection Sort
async function selectionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = 'red';
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'yellow';
            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = '#007bff';
                }
                minIndex = j;
            }
            await sleep(50);
            bars[j].style.backgroundColor = '#007bff';
        }
        if (minIndex !== i) {
            // Swap values
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            // Swap heights visually
            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIndex].style.height = `${array[minIndex] * 3}px`;
        }
        bars[i].style.backgroundColor = 'green';
    }
}

// Insertion Sort
async function insertionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = 'red';
        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = 'yellow';
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            j--;
            await sleep(50);
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[i].style.backgroundColor = 'green';
    }
}

// Quick Sort
async function quickSort(start = 0, end = array.length - 1) {
    if (start >= end) return;
    const index = await partition(start, end);
    await Promise.all([
        quickSort(start, index - 1),
        quickSort(index + 1, end),
    ]);
}

async function partition(start, end) {
    const bars = document.getElementsByClassName('bar');
    let pivotIndex = start;
    const pivotValue = array[end];
    bars[end].style.backgroundColor = 'red';
    
    for (let i = start; i < end; i++) {
        bars[i].style.backgroundColor = 'yellow';
        if (array[i] < pivotValue) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[pivotIndex].style.height = `${array[pivotIndex] * 3}px`;
            pivotIndex++;
            await sleep(50);
        }
        bars[i].style.backgroundColor = '#007bff';
    }
    
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    bars[pivotIndex].style.height = `${array[pivotIndex] * 3}px`;
    bars[end].style.height = `${array[end] * 3}px`;
    
    bars[pivotIndex].style.backgroundColor = 'green';
    bars[end].style.backgroundColor = '#007bff';

    return pivotIndex;
}

// Merge Sort
async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await Promise.all([
        mergeSort(start, mid),
        mergeSort(mid + 1, end),
    ]);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const bars = document.getElementsByClassName('bar');
    let left = start;
    let right = mid + 1;
    const tempArray = [];

    while (left <= mid && right <= end) {
        bars[left].style.backgroundColor = 'yellow';
        bars[right].style.backgroundColor = 'yellow';
        await sleep(50);

        if (array[left] < array[right]) {
            tempArray.push(array[left++]);
        } else {
            tempArray.push(array[right++]);
        }

        bars[left - 1].style.backgroundColor = '#007bff';
        bars[right - 1].style.backgroundColor = '#007bff';
    }

    while (left <= mid) {
        tempArray.push(array[left++]);
    }
    while (right <= end) {
        tempArray.push(array[right++]);
    }

    for (let i = 0; i < tempArray.length; i++) {
        array[start + i] = tempArray[i];
        bars[start + i].style.height = `${array[start + i] * 3}px`;
        bars[start + i].style.backgroundColor = 'green';
        await sleep(50);
    }
}

// Shuffle the array
function shuffleArray() {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    createBars();
}

// Event listeners
sortButton.addEventListener('click', () => {
    const selectedAlgorithm = algorithmSelect.value;
    switch (selectedAlgorithm) {
        case 'bubble':
            bubbleSort();
            break;
        case 'selection':
            selectionSort();
            break;
        case 'insertion':
            insertionSort();
            break;
        case 'merge':
            mergeSort();
            break;
        case 'quick':
            quickSort();
            break;
        default:
            break;
    }
});

shuffleButton.addEventListener('click', shuffleArray);

// Initialize the array
generateArray();
