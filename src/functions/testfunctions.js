//all options need to have both ingredients
const validatePair = (firstIngredient, secondIngredient, options) => {
  for (var option of options) {
    if (!option.includes(firstIngredient) || !option.includes(secondIngredient))
      return false;
  }
  return true;
};

//for two ingredient potions BOTH ingredients must be found in every option for it to make a valid potion
const twoIngredientPotions = (uniqueIngredients, options) => {
  return uniqueIngredients.flatMap((uniqueI, index) => {
    return uniqueIngredients
      .slice(index + 1)
      .filter((currentI) => validatePair(uniqueI, currentI, options))
      .map((match) => [uniqueI, match]);
  });
};

const hasIngredient = (ingredient, option) => {
  return option.includes(ingredient) ? 1 : 0;
};

//check to see what ingredient combinations are found in each option
const validateTrio = (
  firstIngredient,
  secondIngredient,
  thirdIngredient,
  options
) => {
  const counter = [];
  for (var i = 0; i < options.length; i++) {
    counter[i] = counter[i]
      ? counter[i] + hasIngredient(firstIngredient, options[i])
      : hasIngredient(firstIngredient, options[i]);

    counter[i] = counter[i]
      ? counter[i] + hasIngredient(secondIngredient, options[i])
      : hasIngredient(secondIngredient, options[i]);

    counter[i] = counter[i]
      ? counter[i] + hasIngredient(thirdIngredient, options[i])
      : hasIngredient(thirdIngredient, options[i]);
  }
  return counter;
};

//checking to see if each option has at least 2 ingredients
const shouldAdd = (counter) => {
  for (var i = 0; i < counter.length; i++) {
    if (counter[i] < 2) {
      return false;
    }
  }
  return true;
};

//all options must have at least 2 ingredients from their array for a valid potion
//create all possible combinations and see if they make a valid potion
const threeIngredientPotions = (uniqueIngredients, options) => {
  const answers = [];
  for (var i = 0; i < uniqueIngredients.length - 2; i++) {
    for (var j = i + 1; j < uniqueIngredients.length - 1; j++) {
      for (var k = j + 1; k < uniqueIngredients.length; k++) {
        const counter = validateTrio(
          uniqueIngredients[i],
          uniqueIngredients[j],
          uniqueIngredients[k],
          options
        );
        if (shouldAdd(counter)) {
          answers.push([
            uniqueIngredients[i],
            uniqueIngredients[j],
            uniqueIngredients[k],
          ]);
        }
      }
    }
  }
  return answers;
};

const sendByGroup = (userQuery) => {
  //make a set using all arrays
  //iterate through that set selecting 2/3 items

  //remove duplicates
  const ingredientsArray = Array.from(new Set(userQuery.flat(1)));

  const pairs = twoIngredientPotions(ingredientsArray, userQuery);

  const trios = threeIngredientPotions(ingredientsArray, userQuery);

  console.log(pairs.concat(trios));
};

const userQuery = [
  // restoreHealth
  [
    "Blisterwort",
    "Blue Dartwing",
    "Blue Mountain Flower",
    "Butterfly Wing",
    "Charred Skeever Hide",
    "Daedra Heart",
    "Eye of Sabre Cat",
    "Imp Stool",
    "Rock Warbler Egg",
    "Swamp Fungal Pod",
    "Wheat",
  ],
  //   resistPoison
  [
    "Beehive Husk",
    "Charred Skeever Hide",
    "Falmer Ear",
    "Garlic",
    "Grass Pod",
    "Mudcrab Chitin",
    "Slaughterfish Egg",
    "Thistle Branch",
    "Troll Fat",
  ],
  //   restoreStamina
  [
    "Bear Claws",
    "Bee",
    "Charred Skeever Hide",
    "Eye of Sabre Cat",
    "Hawk Beak",
    "Histcarp",
    "Honeycomb",
    "Large Antlers",
    "Mudcrab Chitin",
    "Orange Dartwing",
    "Pearl",
    "Pine Thrush Egg",
    "Powdered Mammoth Tusk",
    "Purple Mountain Flower",
    "Sabre Cat Tooth",
    "Silverside Perch",
    "Small Pearl",
    "Torchbug Thorax",
    "Wisp Wrappings",
  ],
  //   cureDisease
  ["Charred Skeever Hide", "Hawk Feathers", "Mudcrab Chitin", "Vampire Dust"],
];

sendByGroup(userQuery);

/********************************************************************************* */
// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

//given ingredients find intersection in effects
/* POTION OUTCOME
Fortify Carry Weight
Regenerate Stamina
Fortify Illusion
Weakness to Magic
Restore Magicka
*/

//powtions
/*
 * alphabetically gets first ingredient
 * alphabetically checks effects list for matches
 */

//check in order of recieved ingredients
//look at first effect, check to see if any other ingredients have effect

//check two ingredients first then using the matches with 2 find any other ingredient that fits
//using the two ingredients, iterate through remaining and find all overlapping effects
const ingredients = [
  {
    name: "Butterfly Wing",
    dlc: "base",
    effects: [
      "Restore Health",
      "Lingering Damage Stamina",
      "Fortify Barter",
      "Damage Magicka",
    ],
  },
  {
    name: "Mora Tapinella",
    dlc: "base",
    effects: [
      "Restore Magicka",
      "Lingering Damage Health",
      "Regenerate Stamina",
      "Fortify Illusion",
    ],
  },
  {
    name: "Scaly Pholiata",
    dlc: "base",
    effects: [
      "Weakness to Magic",
      "Fortify Illusion",
      "Regenerate Stamina",
      "Fortify Carry Weight",
    ],
  },
  {
    name: "Creep Cluster",
    dlc: "base",
    effects: [
      "Restore Magicka",
      "Fortify Carry Weight",
      "Damage Stamina Regen",
      "Weakness to Magic",
    ],
  },
  {
    name: "Imp Stool",
    dlc: "base",
    effects: [
      "Damage Health",
      "Paralysis",
      "Lingering Damage Health",
      "Restore Health",
    ],
  },
];

const hasIntersection = (firstArray, secondArray) => {
  return firstArray.some((item) => secondArray.includes(item));
};

const getSetDifference = (
  firstIngredient,
  secondIngredient,
  thirdIngredient
) => {
  //remove effects from first found in second. Add effects from second not found in first
  var uniqueEffects = firstIngredient.effects
    .filter((effect) => !secondIngredient.effects.includes(effect))
    .concat(
      secondIngredient.effects.filter(
        (effect) => !firstIngredient.effects.includes(effect)
      )
    );

  return hasIntersection(uniqueEffects, thirdIngredient.effects);
};

const addsEffectToPotion = (pair, third) => {
  //check all combinations of matches if there is an effect added with each combination, a new effect will be added to potion
  return (
    getSetDifference(pair[0], pair[1], third) &&
    getSetDifference(pair[0], third, pair[1]) &&
    getSetDifference(pair[1], third, pair[0])
  );
};

//if the first and third ingredient match effects, they already made a pair. Remove the second instance
const checkDuplicate = (
  [firstIngredient, secondIngredient],
  lastIngredient,
  allIngredients
) => {
  return hasIntersection(firstIngredient.effects, lastIngredient.effects)
    ? allIngredients.indexOf(secondIngredient) <
        allIngredients.indexOf(lastIngredient)
    : true;
};

const makePairs = (allIngredients) => {
  return allIngredients.flatMap((ingredient, index) => {
    //loop through remaining ingredients and filter based on matching effects
    //then create pairs using filtered results
    return allIngredients
      .slice(index + 1)
      .filter((next) => hasIntersection(ingredient.effects, next.effects))
      .map((match) => [ingredient, match]);
  });
};

const makeTrios = (allIngredients, pairs) => {
  return pairs.flatMap((pair) => {
    const startingPoint = allIngredients.indexOf(pair[0]);
    //start at next index in ingredients list, remove the paired ingredient. remove ingredients that do not add new effects, remove duplicates
    return allIngredients
      .slice(startingPoint + 1)
      .filter((ingredient) => ingredient !== pair[1])
      .filter((third) => addsEffectToPotion(pair, third))
      .filter((ingredient) => checkDuplicate(pair, ingredient, allIngredients))
      .map((match) => pair.concat(match));
  });
};

//userQuery is array of objects
const findPotions = (userQuery) => {
  const pairs = makePairs(userQuery);
  // console.log(JSON.stringify(pairs,null,2));
  const trios = makeTrios(userQuery, pairs);
  // console.log(JSON.stringify(trios,null,2));

  console.log(JSON.stringify(pairs.concat(trios), null, 2));
};

findPotions(ingredients);
