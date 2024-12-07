import { decrement, increment, readInput } from "../core.js";

const OBSTACLE = "#";
const GUARD = "^";
const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;
const DIRECTION_COUNT = 4;

function advance(state, i, c) {
  if (c === OBSTACLE) {
    const next = increment(state.direction) % DIRECTION_COUNT;

    return {
      ...state,
      direction: next
      // This would be in case we wanted to solve part 2.
      // turns: Object.assign({ [i]: next }, state.turns)
    };
  }

  return {
    ...state,
    index: i
  };
}

export async function part1() {
  const input = await readInput("inputs/day6.txt");
  const stridei = input.indexOf("\n");
  let state = {
    index: input.indexOf(GUARD),
    direction: UP
  };

  let used = new Set();

  loop:
  while (true) {
    // let x = Math.floor(state.index / (stridei + 1));
    // let y = state.index % (stridei + 1);

    // console.log(`At (${x}, ${y})`);
    used.add(state.index);

    switch (state.direction) {
      case LEFT:
        if (state.index % (stridei + 1) === 0) {
          break loop;
        }

        const li = decrement(state.index);
        state = advance(state, li, input[li]);

        break;
      case RIGHT:
        if (state.index % (stridei + 1) === stridei) {
          break loop;
        }

        const ri = increment(state.index);
        state = advance(state, ri, input[ri]);

        break;
      case UP:
        if (state.index < stridei + 1) {
          break loop;
        }

        const ui = state.index - stridei - 1;
        state = advance(state, ui, input[ui]);

        break;
      case DOWN:
        if (input.length - stridei + 1 < state.index) {
          break loop;
        }

        const di = state.index + stridei + 1;
        state = advance(state, di, input[di]);

        break;
    }
  }

  console.log(used.size);
}
