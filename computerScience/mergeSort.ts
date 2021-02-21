function getSortedArr(arr: number[]) {
  const arrLen = arr.length
  const m = Math.round(arrLen / 2)



}

function mergeSort(arr: number[]) {
  const arrLen = arr.length
  if (arrLen === 1) {
    return arr
  }
  const m = Math.round(arrLen / 2)

  const leftArr = arr.slice(0, m)
  const rightArr = arr.slice(m, arrLen)


  mergeSort(leftArr)
  mergeSort(rightArr)
  console.log(leftArr)
  console.log(rightArr)

  // return sortedArr
}

const dumbo = [100, 1, 2, 3, 5, 90, 78, 6]

console.log(mergeSort(dumbo))
