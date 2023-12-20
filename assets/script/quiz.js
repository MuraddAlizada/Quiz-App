document.addEventListener("DOMContentLoaded", function () {
  let startGameBtn = document.getElementById("startGameBtn");
  let startScreen = document.getElementById("startScreen");
  let questionsAnswers = document.getElementById("questionsAnswers");
  let next = document.getElementById("next");
  let score = document.getElementById("score");
  let totalScore = document.getElementById("totalScore");
  let countDown = document.getElementById("countDown");
  let count = 0;
  let scoreCount = 0;
  let duration = 20; // Updated duration to 20 seconds
  let qaBox = document.querySelectorAll(".qa_box");
  let answers = document.querySelectorAll(".qa_box .answers input");
  let progressBar = document.getElementById("progress-bar");
  let resultMessage = document.createElement("p");
  let numberOfQuestions = 5;
  let correctCount = 0;
  let incorrectCount = 0;
  let inputName = document.getElementById("inputName");
  let inputSurname = document.getElementById("inputSurname");
  let playerName = "";
  let durationTime;

  startGameBtn.addEventListener("click", function () {
    if (
      /^[a-zA-Z]+$/.test(inputName.value) &&
      /^[a-zA-Z]+$/.test(inputSurname.value)
    ) {
      playerName = `${capitalizeFirstLetter(
        inputName.value.trim()
      )} ${capitalizeFirstLetter(inputSurname.value.trim())}`;
      startScreen.style.display = "none";
      questionsAnswers.style.display = "block";
      startGame();
    } else {
      alert("Please enter valid letters for Name and Surname.");
    }
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function startGame() {
    durationTime = setInterval(function () {
      if (duration === 0) {
        console.log("Moving to the next question");
        step();
      } else {
        duration -= 1;
        countDown.innerHTML = `Remaining Time: ${duration} seconds`;
      }
    }, 1000);

    next.addEventListener("click", function () {
      console.log("Skipping to the next question");
      step();
      duration = 20; // Reset the timer to 20 seconds
      countDown.innerHTML = `Remaining Time: ${duration} seconds`;
    });

    answers.forEach(function (answersSingle) {
      answersSingle.addEventListener("click", function () {
        setTimeout(function () {
          console.log("Moving to the next question after clicking an answer");
          step();
          duration = 20; // Reset the timer to 20 seconds
          countDown.innerHTML = `Remaining Time: ${duration} seconds`;
        }, 500);

        let valid = this.getAttribute("valid");
        if (valid == "valid") {
          scoreCount += 20;
          correctCount += 1;
          updateProgressBar();
        } else {
          incorrectCount += 1;
          updateProgressBar();
        }

        score.innerHTML = scoreCount;
        totalScore.innerHTML = scoreCount;

        updateProgressBar();
      });
    });
  }

  function step() {
    count += 1;
    duration = 20; // Reset the timer to 20 seconds
    countDown.innerHTML = `Remaining Time: ${duration} seconds`;

    for (let i = 0; i < qaBox.length; i++) {
      qaBox[i].className = "qa_box";
    }

    if (count < qaBox.length) {
      qaBox[count].className = "qa_box active";
    } else {
      questionsAnswers.style.display = "none";

      next.style.display = "none";
      clearInterval(durationTime);
      countDown.innerHTML = 0;

      let endMessageContainer = document.getElementById("endMessageContainer");
      endMessageContainer.innerHTML = "";
      let messageElement = document.createElement("h2");
      messageElement.innerHTML = `Dear ${playerName},`;

      if (scoreCount >= 60) {
        resultMessage.innerHTML = `Congratulations! You passed the exam.`;
        resultMessage.classList.add("pass");
      } else {
        resultMessage.innerHTML = `Unfortunately, you failed the exam.`;
        resultMessage.classList.add("fail");
      }

      let totalScoreElement = document.createElement("p");
      totalScoreElement.innerHTML = `Your total score is <span>${scoreCount}</span> out of 100.`;

      endMessageContainer.appendChild(messageElement);
      endMessageContainer.appendChild(resultMessage);
      endMessageContainer.appendChild(totalScoreElement);

      let restartButton = document.createElement("button");
      restartButton.innerHTML = "Restart Quiz";
      restartButton.addEventListener("click", function () {
        window.location.reload();
      });
      endMessageContainer.appendChild(restartButton);
      endMessageContainer.style.display = "block";
    }
  }

  function updateProgressBar() {
    const totalQuestions = numberOfQuestions;
    const progressBar = document.getElementById("progress-bar");

    if (progressBar) {
      const correctPercentage = (correctCount / totalQuestions) * 100;
      const greenWidth = Math.min(correctPercentage, 100);

      progressBar.querySelector(".correct").style.width = `${greenWidth}%`;
    }
  }
});
