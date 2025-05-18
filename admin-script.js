document.addEventListener("DOMContentLoaded", () => {
    const categoryScreen = document.getElementById("category-screen");
    const optionsScreen = document.getElementById("options-screen");
    const categoryTitle = document.getElementById("category-title");
    const backBtn = document.getElementById("back-btn");
    const setQuestionsScreen = document.getElementById("set-questions-screen");
    const addQuestionScreen = document.getElementById("add-question-screen");
    const optionButtons = document.querySelector(".option-buttons");
    const confirmationMsg = document.getElementById("confirm-msg");

    const setNumberOfQuestionsBtn = document.querySelector(".set-btn");
    const addQuestionBtn = document.querySelector(".add-btn");

    document.querySelectorAll(".category-btn").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            categoryTitle.textContent = category;
            categoryScreen.classList.add("hidden");
            optionsScreen.classList.remove("hidden");
            backBtn.classList.remove("hidden");
        });
    });

    setNumberOfQuestionsBtn.addEventListener("click", () => {
        setQuestionsScreen.classList.remove("hidden");
        optionButtons.classList.add("hidden");
        categoryScreen.classList.add("hidden");
        optionsScreen.classList.add("hidden"); 
    });

    addQuestionBtn.addEventListener("click", () => {
        addQuestionScreen.classList.remove("hidden");
        optionButtons.classList.add("hidden");
        optionsScreen.classList.add("hidden");
        categoryScreen.classList.add("hidden");
        setQuestionsScreen.classList.add("hidden");
    });

    backBtn.addEventListener("click", () => {
        categoryScreen.classList.remove("hidden");
        optionsScreen.classList.add("hidden");
        setQuestionsScreen.classList.add("hidden");
        optionButtons.classList.remove("hidden");
        addQuestionScreen.classList.add("hidden");
        confirmationMsg.textContent = "";
        backBtn.classList.add("hidden");
    });

    const numberForm = document.getElementById("number-form");
    const numberInput = document.getElementById("number-of-questions");

    numberForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const numberOfQuestions = parseInt(numberInput.value);
        confirmationMsg.textContent = `Number ${numberOfQuestions} has been saved successfully!`;

        numberForm.reset();
    });

    const addQuestionsForm = document.getElementById("add-question");
    const QuestionInput = document.getElementById("question");
    const optionOne = document.getElementById("option-1");
    const optionTwo = document.getElementById("option-2");
    const optionThree = document.getElementById("option-3");
    const optionFour = document.getElementById("option-4");
    const correctAnswer = document.getElementById("correct-answer");

    addQuestionsForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const question = QuestionInput.value;
        const option1 = optionOne.value;
        const option2 = optionTwo.value;
        const option3 = optionThree.value;
        const option4 = optionFour.value;
        const correct = correctAnswer.value;

        confirmationMsg.textContent = `Your question has been saved successfully!`;

        addQuestionsForm.reset();
    });
});
