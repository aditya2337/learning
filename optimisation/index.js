const { performance , PerformanceObserver} = require('perf_hooks');

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntriesByName('My Special Benchmark'))
})

obs.observe({ entryTypes: ['measure']  })

performance.mark('start')

function add(a, b) {
  return a + b
}

performance.mark('end')

performance.measure('My Special Benchmark', 'start', 'end');


