export const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = (state) => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

export const bigPlantControl = storeState();
export const smallPlantControl = storeState();

export const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value,
    });
  };
};

export const feed = changeState("food")(1);
// const goodFood = changeState("food")(100);

const canVineWhip = (plant) => ({
  vinewhip: () => {
    return `The ${plant.name || plant} whips with its vines.`;
  },
});

const glowInDark = (plant) => {
  const obj = {
    glow: function () {
      return `The ${plant.name || plant} glows in the dark.`;
    },
  };
  return obj;
};

const vineWhippingGlowingPlant = (name) => {
  let plant = {
    name,
  };
  return { ...plant, ...canVineWhip(plant), ...glowInDark(plant) };
};

const bigPlant = vineWhippingGlowingPlant("bigPlant");
const smallPlant = glowInDark("smallPlant");
console.log(smallPlant.glow());
console.log(bigPlant.vinewhip());
