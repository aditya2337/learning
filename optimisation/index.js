const { performance , PerformanceObserver} = require('perf_hooks');

performance.mark('start')

class Point {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
}

var iterations = 100000

while (iterations--) {
  const point = new Point(2, 4, 5)
  delete point.z

  JSON.stringify(point)
}
// function add(a, b) {
//   return a + b
// }

performance.mark('end')

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntriesByName('My Special Benchmark'))
})

obs.observe({ entryTypes: ['measure']  })


performance.measure('My Special Benchmark', 'start', 'end');


