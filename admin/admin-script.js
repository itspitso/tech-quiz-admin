import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { 
    getFirestore, 
    collection, 
    doc, 
    getDoc, 
    updateDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDXboWWLo5RNaAMq_aFgU3ihOX5Pj-CmVY",
    authDomain: "tech-quiz-app-4d17a.firebaseapp.com",
    projectId: "tech-quiz-app-4d17a",
    storageBucket: "tech-quiz-app-4d17a.firebasestorage.app",
    messagingSenderId: "230205186325",
    appId: "1:230205186325:web:6da85abe3d5d8c1e92491c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

    numberForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const numberOfQuestions = parseInt(numberInput.value);
        const category = categoryTitle.textContent;

        if (isNaN(numberOfQuestions)) {
            confirmationMsg.textContent = "Please enter a valid number.";
            return;
        }

        try {
        const categoryRef = doc(db, "categories", category);
        await updateDoc(categoryRef, {
            numberOfQuestions: numberOfQuestions
        });

        confirmationMsg.textContent = `Number ${numberOfQuestions} has been saved successfully!`;
        numberForm.reset();

        } catch (error) {
            console.error("Error saving number of questions: ", error);
            confirmationMsg.textContent = "Failed to save. Please try again.";
        }
        numberForm.reset();
    });

    const addQuestionsForm = document.getElementById("add-question");
    const QuestionInput = document.getElementById("question");
    const optionOne = document.getElementById("option-1");
    const optionTwo = document.getElementById("option-2");
    const optionThree = document.getElementById("option-3");
    const optionFour = document.getElementById("option-4");
    const correctAnswer = document.getElementById("correct-answer");

    addQuestionsForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const category = categoryTitle.textContent.trim();
        const newQuestion = {
            question: QuestionInput.value.trim(),
            options: {
                1: optionOne.value.trim(),
                2: optionTwo.value.trim(),
                3: optionThree.value.trim(),
                4: optionFour.value.trim()
            },
            correct: correctAnswer.value.trim()
        };

        try {
            const docRef = doc(db, "categories", category);
            const docSnap = await getDoc(docRef);
            let updatedQuestions = [];

            if (docSnap.exists()) {
                const existingData = docSnap.data();
                updatedQuestions = existingData.questions || [];
                updatedQuestions.push(newQuestion);
                await updateDoc(docRef, {
                    questions: updatedQuestions
                });

                confirmationMsg.textContent = "Your question has been saved successfully!";
                addQuestionsForm.reset();
            } else {
                confirmationMsg.textContent = `Category '${category}' does not exist.`;
            }
        } catch (error) {
            console.error("Error saving question:", error);
            confirmationMsg.textContent = "An error occurred while saving the question.";
        }
    });
});
