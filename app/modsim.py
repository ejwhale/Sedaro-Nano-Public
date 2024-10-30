# MODELING & SIMULATION

from operator import __or__
from random import random


def propagate(agentId, universe):
    """Propagate agentId from `time` to `time + timeStep`."""
    state = universe[agentId]
    time, timeStep, x, y, vx, vy = (
        state["time"],
        state["timeStep"],
        state["x"],
        state["y"],
        state["vx"],
        state["vy"],
    )

    if agentId == "Planet":
        x += vx * timeStep
        y += vy * timeStep
    elif agentId == "Satellite":
        px, py = universe["Planet"]["x"], universe["Planet"]["y"]
        dx = px - x
        dy = py - y
        fx = dx / (dx**2 + dy**2) ** (3 / 2)
        fy = dy / (dx**2 + dy**2) ** (3 / 2)
        vx += fx * timeStep
        vy += fy * timeStep
        x += vx * timeStep
        y += vy * timeStep

    return {
        "time": time + timeStep,
        "timeStep": 0.01 + random() * 0.09,
        "x": x,
        "y": y,
        "vx": vx,
        "vy": vy,
    }
