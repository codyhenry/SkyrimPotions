//return ingredients that make up a certain potion if it exists
const findTwoIngredientPotions = (ingredients, effects, answers) => {
  //select two ingredients
  for (var i = 0; i < ingredients.length - 1; i++) {
    for (var j = 1; j < ingredients.length; j++) {
      //check if each effect has these two items
      for (var k = 0; k < effects.size; k++) {
        if (
          effects[k].includes(ingredients[i]) &&
          effects[k].includes(ingredients[j])
        ) {
          answers.push([ingredients[i], ingredients[j]]);
        }
      }
    }
  }
};

const findThreeIngredientPotions = (ingredients, effects, answers) => {
  var addFlag = true;
  // var printFlag = false;
  for (var i = 0; i < ingredients.length - 2; i++) {
    for (var j = i + 1; j < ingredients.length - 1; j++) {
      for (var k = j + 1; k < ingredients.length; k++) {
        var count = Array(effects.length).fill(0);
        addFlag = true;
        for (var l = 0; l < effects.length; l++) {
          // if(ingredients[i] === "Charred Skeever Hide" && ingredients[j] == "Garlic" && ingredients[k] === "Eye of Sabre Cat"){printFlag = true}
          if (effects[l].includes(ingredients[i])) {
            // printFlag && console.log("ingredient " + ingredients[i] + " found in " + l);
            count[l]++;
            // printFlag && console.log("array " + l + " count is: " + count[l]);
          }
          if (effects[l].includes(ingredients[j])) {
            // printFlag && console.log("ingredient " + ingredients[j] + " found in " + l);
            count[l]++;
            //   printFlag && console.log("array " + l + " count is: " + count[l]);
          }
          if (effects[l].includes(ingredients[k])) {
            // printFlag && console.log("ingredient " + ingredients[k] + " found in " + l);
            count[l]++;
            // printFlag && console.log("array " + l + " count is: " + count[l]);
          }
        }
        // printFlag = false;
        for (var x = 0; x < count.length; x++) {
          if (count[x] < 2) {
            addFlag = false;
            break;
          }
        }
        if (addFlag) {
          answers.push([ingredients[i], ingredients[j], ingredients[k]]);
        }
      }
    }
  }
};

//get all the chosen arrays
const sendByGroup = (userQuery) => {
  var answerArray = [];

  //userQuery will be a 2d array
  const ingredientsSet = new Set(userQuery.flat(1));
  const ingredientsArray = Array.from(ingredientsSet);

  findTwoIngredientPotions(ingredientsArray, userQuery, answerArray);
  findThreeIngredientPotions(ingredientsArray, userQuery, answerArray);

  //make answerArray the context
  console.log(answerArray);
};

sendByGroup();
