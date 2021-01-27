var myScore = 0,
  compScore = 0,
  draw = 0;

var currentMaxScore = 0;
var maxScore = parseInt(window.location.search.slice(1, 3));

var pairs = [{
  first: "rock",
  second: "scissors"
}, {
  first: "scissors",
  second: "paper"
}, {
  first: "paper",
  second: "rock"
}, {
  first: "rock",
  second: "lizard"
}, {
  first: "lizard",
  second: "spock"
}, {
  first: "spock",
  second: "scissors"
}, {
  first: "scissors",
  second: "lizard"
}, {
  first: "lizard",
  second: "paper"
}, {
  first: "paper",
  second: "spock"
}, {
  first: "spock",
  second: "rock"
}];

$("#after-match").addClass("hide");
$("#select-points").addClass("hide");
$("#play-btn").addClass("hide");

$(".easy-mode-select-btn").click(function() {
  $("#select-points form").attr("action", "easy-game.html" + window.location.search);
})

$(".hard-mode-select-btn").click(function() {
  $("#select-points form").attr("action", "hard-game.html" + window.location.search);
})

$(".mode-card .mode-select-btn").click(function() {
  $("#select-points").removeClass("hide");
  $("#play-btn").removeClass("hide");
});

$(".easy-mode-select-btn").click(function(){
  $(".easy-mode-card").addClass("pressed");
  $(".hard-mode-card").removeClass("pressed");
});

$(".hard-mode-select-btn").click(function(){
  $(".hard-mode-card").addClass("pressed");
  $(".easy-mode-card").removeClass("pressed");
});

$(".rps-icon").click(function(event) {

  var myChoiceIcon = event.target.classList[0];
  myChoiceIcon = myChoiceIcon.slice(0, myChoiceIcon.length - 5);
  if (currentMaxScore < maxScore) {
    setAnimationOnButton(myChoiceIcon);
    playSound();
    updateScore(myChoiceIcon);
  }
});


function setAnimationOnButton(icon) {
  $("." + icon + "-icon").addClass("pressed");
  setTimeout(function() {
    $("." + icon + "-icon").removeClass("pressed");
  }, 100);
}

function playSound(){
  var sound=new Audio("sounds/icon-select-sound.mp3");
  sound.play();
}

function updateScore(myChoice) {
  var compChoice = chooseRandom();

  imageTransition();
  updateHandImage(myChoice, compChoice);

  var c = 0;
  for (var i = 0; i < 10; i++) {
    if (myChoice === pairs[i].first && compChoice === pairs[i].second) {
      myScore++;
      c++;
      break;
    } else if (myChoice === pairs[i].second && compChoice === pairs[i].first) {
      compScore++;
      c++;
      break;
    }
  }

  if (c === 0)
    draw++;

  setTimeout(function() {
    $(".myScore").text(myScore);
    $(".compScore").text(compScore);
  }, 500);


  currentMaxScore = Math.max(myScore, compScore);
  if (currentMaxScore === maxScore) {
    setTimeout(function() {
      $(".hand").slideUp();
      declareResult();
    }, 1200);
  }
}

//function for selecting a random number 1,2 or 3 that denotes rock, paper and scissors respectively.
function chooseRandom() {

  //Find mode of game (easy or hard) using html file name
  var path = window.location.pathname;
  var page = path.split("/").pop();
  var mode = page.slice(0, 4);

  if (mode === "easy") {
    var compChoice = Math.floor(Math.random() * 3) + 1;
    switch (compChoice) {
      case 1:
        return "rock";
      case 2:
        return "paper";
      case 3:
        return "scissors";
      default:
        console.log("error selecting random number");
    }
  } else {
    var compChoice = Math.floor(Math.random() * 5) + 1;
    switch (compChoice) {
      case 1:
        return "rock";
      case 2:
        return "paper";
      case 3:
        return "scissors";
      case 4:
        return "lizard";
      case 5:
        return "spock";
      default:
        console.log("error selecting random number");
    }
  }
}
  function imageTransition() {

    $(".hand-image").addClass("invisible");
    setTimeout(function() {
      $(".hand-image").removeClass("invisible");
    }, 500);

  }

  function updateHandImage(myChoice, compChoice) {

    $(".myHand").attr("src", "images/" + myChoice + ".jpg");
    $(".compHand").attr("src", "images/" + compChoice + ".jpg");

  }

  function declareResult() {
    if (myScore > compScore)
      $(".result").text("You won :D")
    else if (compScore > myScore)
      $(".result").text("You lost :(")
    else
      $(".result").text("It's a tie!")

    $("#after-match").removeClass("hide");
  }

  $(".btn-play-again").click(function() {
    location.reload();
  });
