# SIMULATOR

from functools import reduce
from operator import __or__

from modsim import propagate
from store import QRangeStore


class Simulator:
    """
    A Simulator is used to simulate the propagation of agents in the universe.
    This class is *not* pure. It mutates the data store in place and maintains internal state.

    It is given an initial state of the following form:
    ```
    {
        'agentId': {
            'time': <time of instantiation>,
            'timeStep': <time step for propagation>,
            **otherSimulatedProperties,
        },
        **otherAgents,
    }
    ```

    Args:
        store (QRangeStore): The data store in which to save the simulation results.
        init (dict): The initial state of the universe.
    """

    def __init__(self, store: QRangeStore, init: dict):
        self.store = store
        store[-999999999, 0] = init
        self.init = init
        self.times = {agentId: state["time"] for agentId, state in init.items()}

    def read(self, t):
        try:
            data = self.store[t]
        except IndexError:
            data = []
        return reduce(__or__, data, {}) # combine all data into one dictionary

    def simulate(self, iterations: int = 500):
        for _ in range(iterations):
            for agentId in self.init:
                t = self.times[agentId]
                universe = self.read(t - 0.001)
                if set(universe) == set(self.init):
                    newState = propagate(agentId, universe)
                    self.store[t, newState["time"]] = {agentId: newState}
                    self.times[agentId] = newState["time"]
