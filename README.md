# silly-graphs
Yet another js graph creator, but silly
## Usage
First include silly-graphs.js as a script on you webpage,

then you need a `<canvas>` element to create a `new SillyGraph(  )` object which will use it.

To display data simply call `.load(graphData)` on your sillyGraph, the `graphData` is explained below

## graphData

graphData is an object with the following attributes (all of which are optional if you like empty graphs)

### `axisX` and similarly `axisY` 
These are used for defining axis labels, they can heve one of two formats:
  1. `labels` as an array of values to be used directly
  2. `labels` as the number of labels between (including) `min` and `max` these values are calculated and rounded
     
in both cases you may optionally provide a `labelTemplate` as a string, where each `#` is replaced with the propper label value

(I'm sorry if you wanted to use a # in your label)

### `points`
an array of objects that have `x` and `y` values stored inside, they define the points of the graph, which will be connected with lines
They try to adjust the scale to that of labes for each axis, but if it's not provided they default to relative to canvas size 

### `config` 
config relates only to points, it can have `color` and `lineWidth` attributes

