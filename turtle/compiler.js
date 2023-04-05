let t

const COMMANDS = {
  "FORWARD": "fd",
  "BACKWARD": "bk",
  "RIGHT": "rt",
  "LEFT": "lt",
  "SETXY": "setxy",
  "SETY": "sety",
  "SETX": "setx",
  "HOME": "home",
  "CLEAN": "cs",
  "CLEARSCREEN": "ct cs",
  "CENTERTURTLE": "ct",
  "HIDETURTLE": "ht",
  "SHOWTURTLE": "st",
  "PENUP": "pu",
  "PENDOWN": "pd",
  "REPEAT": "repeat",
  // "PENWIDTH": "pw",
  // "PENCOLOR": "pc",
  // "FILL": "fill",
}

const INSTRUCTION_CODE = Object.freeze({
  "fd": 1,
  "bk": 1,
  "rt": 1,
  "lt": 1,
  "setxy": [0, 1],
  "sety": 1,
  "setx": 1,
  "home": 0,
  "cs": 0,
  "ct": 0,
  "ht": 0,
  "st": 0,
  "pu": 0,
  "pd": 0,
  "repeat": [1, -1]
})

const INSTRUCTIONS = Object.keys(INSTRUCTION_CODE);

function getInstructions(tokens) {
  let instructions = []
  let errors = []

  for (let i = 0; i < tokens.length - 1; i++) {
    let token = tokens[i];
    let obj = {}
    let value;
    if (INSTRUCTIONS.includes(token)) {
      obj.instruction = token;
    } else {
      errors.push(`Turtle doesn't understand what ${tokens[i]} is.`)
    }

    if (INSTRUCTION_CODE[token] == 1) {
      if (tokens[i + 1] != undefined && !isNaN(tokens[i + 1])) {
        value = tokens[i + 1];
        obj.value = value;
        i++;
      } else {
        errors.push(`Turtle doesn't understand what ${tokens[i + 1]} is.`)
      }
    } else if (INSTRUCTION_CODE[token] == 0) {
      obj.value = undefined;
    } else if (INSTRUCTION_CODE[token] instanceof Array) {
      let arr = INSTRUCTION_CODE[token];
      value = []
      if (arr[0] == 1) {
        if (tokens[i + 1] != undefined && !isNaN(tokens[i + 1])) {
          if (typeof (tokens[i + 1]) != "number") {
            errors.push(`Turtle doesn't understand what ${tokens[i + 1]} is.`)
            value.push(NaN);
          } else
            value.push(tokens[i + 1]);
          i++;
        } else {
          errors.push(`Turtle doesn't understand what ${tokens[i + 1]} is.`)
        }
      } else value.push(0)
      if (arr[1] == 1) {
        let j = i + 2;
        let nTokens = [];
        while (tokens[j] != ']') {
          nTokens.push(tokens[j]);
          j++;
        }
        value.push(nTokens);
        i = j++;
      }
      else {
        let j = i + 2;
        let insTokens = [];
        let c = 0
        while (tokens[j] != ']' || c != 0) {
          if (tokens[j] == '[') c++;
          if (tokens[j] == ']') c--;
          insTokens.push(tokens[j]);
          j++;
        }
        console.log(insTokens);
        let [ins, e] = getInstructions(insTokens);
        if (e.length > 0) errors.push(...e)

        value.push(ins);
        i = j++;
      }
      obj.value = value;
    }
    instructions.push(obj);

  }
  return [instructions, errors]


}

function getCleanedTokens(tokens) {
  let errors = []
  let cleanedTokens = []
  let lowercaseCommands = Object.keys(COMMANDS).map(command => COMMANDS[command]);
  tokens.forEach(token => {
    // remove \n
    if (token.includes("\n")) token = token.replace("\n", "")

    // Check if token contains '[' or ']'
    if (token.includes('[')) {
      if (token.length == 1)
        cleanedTokens.push(token);
      else {
        let [command, ...args] = token.split('[');
        if (command != '') cleanedTokens.push(...getCleanedTokens([command])[0]);
        cleanedTokens.push('[');
        if (args.length > 0) cleanedTokens.push(...getCleanedTokens(args)[0]);
      }
    }
    else if (token.includes(']')) {
      if (token.length == 1)
        cleanedTokens.push(token);
      else {
        let [command, ...args] = token.split(']');

        if (command != '') cleanedTokens.push(...getCleanedTokens([command])[0]);
        cleanedTokens.push(']');
        if (args.length > 0) cleanedTokens.push(...getCleanedTokens(args)[0]);
      }
    }
    else {

      if (lowercaseCommands.includes(token.toLowerCase())) { // Check if token is a short command
        cleanedTokens.push(token.toLowerCase());
      }
      else if (token != '' && !isNaN(token)) { // Check if token is a number
        cleanedTokens.push(parseInt(token));
      }
      else if (Object.keys(COMMANDS).includes(token.toUpperCase())) { // Check if token is a long command
        if (token.toUpperCase() === "CLEARSCREEN") cleanedTokens.push(...COMMANDS[token.toUpperCase()].split(" "))
        else
          cleanedTokens.push(COMMANDS[token.toUpperCase()]);
      } else if (token != '') {
        errors.push(`Turtle doesn't understand what ${token} is.`)

      }
    }
  });

  return [cleanedTokens, errors]

}

function compileCode(code) {
  let tokens = code.split(" ");
  let errors = [];
  let [cleanedTokens, e1] = getCleanedTokens(tokens);
  if (e1.length > 0) errors.push(...e1);
  console.log(cleanedTokens);
  console.log(errors);
  if (errors.length > 0) return [undefined, errors];
  let [instructions, e2] = getInstructions(cleanedTokens);
  if (e2.length > 0) errors.push(...e2);
  console.log(JSON.stringify(instructions));
  console.log(errors);
  if (errors.length > 0) return [undefined, errors];
  return [instructions, errors];
}

class A {
  constructor() {
    this.a = 1;
  }

  fd = (value) => {
    console.log("fd", value)
  }

}

function runner() {
  let code = "repeat 4 [ fd 50 rt 90  ]"
  // compileCode(code)

  let instructions = [
    {
      instruction: "fd",
      value: 50
    }
  ]
  t = new A();
  instructions.forEach(ins => {
    console.log(ins);
    let func = ins.instruction;
    let value = ins.value;
    console.log(func, value)
    console.log(t)
    t[func](value);
  });


}

runner()
