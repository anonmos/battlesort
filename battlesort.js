// arrays to sort
var numArray = [9, 2, 5, 6, 4, 3, 7, 2, 10, 1, 1, 1, 10, 8];
var objArray = [{name:'Item 1', color:'blue'},
              {name:'Item 12', color:'red'},
              {name:'Item 4', color:'green'},
              {name:'Item 7', color:'yellow'},
              {name:'Item 11', color:'blue'},
              {name:'Item 3', color:'red'},
              {name:'Item 10', color:'green'},
              {name:'Item 6', color:'yellow'},
              {name:'Item 8', color:'blue'},
              {name:'Item 9', color:'red'},
              {name:'Item 5', color:'green'},
              {name:'Item 2', color:'yellow'}
              ]



// Quicksort with Hoare’s partitioning scheme
// https://itnext.io/a-sort-of-quick-guide-to-quicksort-and-hoares-partitioning-scheme-in-javascript-7792112c6d1
function quicksort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;
  const pivot = arr[Math.floor((left + right) / 2)];
  const index = partition(arr, left, right, pivot);
  quicksort(arr, left, index - 1);
  quicksort(arr, index, right);
  return arr;
}

// Original Partition Function
function partition(arr, left, right, pivot) {
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
  return left;
}


// ************************** HERE THAR BE DRAGONS ***********************************

// Buttons
const buttonA = document.querySelector('#button_A');
const buttonB = document.querySelector('#button_B');


// Updated to use battlePartition, otherwise unchanged
function battleQuicksort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;
  const pivot = arr[Math.floor((left + right) / 2)];
  const index = battlePartition(arr, left, right, pivot);
  quicksort(arr, left, index - 1);
  quicksort(arr, index, right);
  return arr;
}

// New Partition Function (using buttons)
function battlePartition(arr, left, right, pivot) {
  while (left <= right) {
    while (battleClick(pivot,arr[left]) && left <= right) { // Replaced logic with function (does not work)
      left++;
    }
    while (battleClick(arr[right],pivot)) { // Replaced logic with function (does not work)
      right--;
    }
    if (left <= right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  return left;
}

// Function to make user select a winner
const battleClick = (itemA,itemB) => {
  // Set the Button Text
  buttonA.innerHTML = itemA.name;
  buttonB.innerHTML = itemB.name;
  
  new Promise((resolve, reject) => {
    // Listen for itemA Clicked 
    buttonA.addEventListener('click', () => {
      // ItemA > ItemB?
      resolve(1);
    });
    // Listen for itemB Clicked 
    buttonB.addEventListener('click', () => {
      // ItemA > ItemB?
      resolve(0);
    });
  }).then(result => {
    return result;
    //console.log(result);
  });
}




// // Resorting Original
// const resort = () => {
//   new Promise((resolve, reject) => {
//     buttonA.addEventListener('click', () => {
//       resolve(buttonA.innerHTML);
//     });
//     buttonB.addEventListener('click', () => {
//       resolve(buttonB.innerHTML);
//     });
//   }).then(result => {
//     const sortedArray = quicksort(objArray);
//     console.log(sortedArray);
//     resort();
//   });
// }


// // New Resort
// function userButtonChoice(itemA,itemB) {
//   // Set the Button Text
//   buttonA.innerHTML = itemA.name;
//   buttonB.innerHTML = itemB.name;
  
//   new Promise((resolve, reject) => {
//     // itemA Clicked 
//     buttonA.addEventListener('click', () => {
//       // ItemA > ItemB?
//       resolve(1);
//     });
//     // itemB Clicked 
//     buttonB.addEventListener('click', () => {
//       // // ItemA > ItemB?
//       resolve(0);
//     });
//   }).then(result => {
//     return result;
//     //console.log(result);
//   });
// }


// Old Stuff *******************************

// const userButtonChoice = (lesserItem,greaterItem) => {
//   // Set the Button Text
//   buttonA.innerHTML = lesserItem.name;
//   buttonB.innerHTML = greaterItem.name;
  
//   new Promise((resolve, reject) => {
//     buttonA.addEventListener('click', () => {
//       resolve(buttonA.innerHTML);
//     });
//     buttonB.addEventListener('click', () => {
//       resolve(buttonB.innerHTML);
//     });
//   }).then(result => {
//     const sortedArray = quicksort(objArray);
//     console.log(sortedArray);
//     resort();
//   });
// }



// Basic implementation (pivot is the first element of the array)
// function quicksortBasic(array) {
//   if(array.length < 2) {
//     return array;
//   }

//   var pivot = array[0];
//   var lesser = [];
//   var greater = [];

//   for(var i = 1; i < array.length; i++) {
//     if(array[i] < pivot) {    // here is where the button click needs to decide it
//       lesser.push(array[i]);
//     } else {
//       greater.push(array[i]);
//     }
//   }

//   return quicksortBasic(lesser).concat(pivot, quicksortBasic(greater));
// }

// console.log(quicksortBasic(array.slice())); // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]





