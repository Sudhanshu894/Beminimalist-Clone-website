function getBotResponse(input) {
    if (input == "rock") {
      return "paper";
    } else if (input == "paper") {
      return "scissors";
    } else if (input == "scissors") {
      return "rock";
    }
    if (input == "hello" || input.includes("hi")) {
      return "Hello there!";
    } else if (input == "bye") {
      return "Talk to you later!";
    } else {
      return "Try asking something else!";
    }
  }