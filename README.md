
# Sedaro Nano

Interview test idea: build the simplest possible version of Sedaro with:

- **sim bed**: repeatedly runs a python function of type `(state:dict, time:float, timeStep:float) -> state:dict`. maybe incorporate the naive q-range store by using 2 "engines" with different time steps.
- **data service**: output dicts are written to a json file as a list of state dicts
- **frontend**: single minimal html+js file that imports the data file and plots it (ex: plotly)
- **mod sim**: the actual python function that propagates an orbit for example but does so inaccurately with euler's method or something.

We give them a folder with 2 files: 
- a jupyter notebook that runs the sim, outputs the data, and opens the html in a browser
- an html file that plots the data

Let them improve it however they wish. This gives them an opportunity to show off their skills while also giving them a (super) high level view of what we sell.

## TODO

- Include a naive Q-Range KV Store so people can effectively do the current mini project
- Write a prompt
  - Should we provide a list of possible projects they could do, or keep it completely open-ended?
- Should we distribute it as a forked git repo so that people can build off previous submissions?


----

![newplot](https://gitlab.sedaro.com/sedaro-satellite/common/-/wikis/uploads/1cb2595d3dd16c127d4ea865bf5d1f27/newplot.png)
