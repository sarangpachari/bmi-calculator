document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.querySelector(".bmi-submit input");
  const resultSpan = document.querySelector(".bmi-result span");
  const resultArea = document.querySelector(".resultArea");

  calculateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const age = parseInt(document.getElementById("age").value);
    const gender = document.querySelector('input[name="gender"]:checked');

    if (!height || !weight || !age || !gender) {
      alert("Please fill in all fields.");
      return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    resultSpan.textContent = bmi;
    resultArea.style.display = "block";

    let bmiCategory = "";
    if (bmi < 18.5) {
      bmiCategory = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      bmiCategory = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      bmiCategory = "Overweight";
    } else {
      bmiCategory = "Obesity";
    }

    resultArea.innerHTML = `<h3>BMI Category: ${bmiCategory}</h3>`;
    const message = new SpeechSynthesisUtterance();

    // set the text to be spoken
    if (bmi < 18.5) {
      message.text = `You are ${bmiCategory},Please focus on your diet`;
    } else if (bmi >= 18.5 && bmi < 24.9) {
      message.text = `You are ${bmiCategory},Please maintain your current diet`;
    } else if (bmi >= 25 && bmi < 29.9) {
      message.text = `You are ${bmiCategory},Please balance your current diet`;
    } else {
      message.text = `You are ${bmiCategory},Please balance more on your current diet`;
    }
    

    // create an instance of the speech synthesis object
    const speechSynthesis = window.speechSynthesis;

    // start speaking
    speechSynthesis.speak(message);
  });
});
