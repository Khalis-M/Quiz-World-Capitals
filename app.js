const NbQuestions = document.getElementById('NbQuestions');

const questionTitle = document.getElementById('questionTitle');
const btn = document.querySelectorAll(".btn")
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');

const confirmButton = document.getElementById('confirmButton');
const welcomeScreen = document.getElementById('welcomeScreen');
const questionScreen = document.getElementById('questionScreen');
const resultScreen = document.getElementById('resultScreen');

const totalQuestions = document.getElementById("totalQuestions");
const totalCorrectAnswers = document.getElementById("totalCorrectAnswers");

resultScreen.classList.add("hidden");
questionScreen.classList.add("hidden");

class Quiz {
    constructor() {
        this.questions = [];
        this.nbCorrectAnswers = 0;
        this.currentIndex = 0;
    }

    addQuestion(question) {
        this.questions.push(question);
    }

    handleAnswerClick = (e) => {
        const selectedAnswer = e.target.id;
    
        if (selectedAnswer.includes(this.questions[this.currentIndex].correctAnswer)) {
            this.nbCorrectAnswers++;
            e.target.style.color = "green";
        } else {
            e.target.style.color = "red";
        }
    
        this.currentIndex++;
        answer1.removeEventListener('click', this.handleAnswerClick);
        answer2.removeEventListener('click', this.handleAnswerClick);
        answer3.removeEventListener('click', this.handleAnswerClick);
    
        setTimeout(() => {this.seeCurrentQuestion();}, 1000);
    };

    seeCurrentQuestion() {
        if (this.currentIndex < this.questions.length) {
            questionScreen.style.display = "block";
            let title = this.questions[this.currentIndex].title;
            let answers = this.questions[this.currentIndex].answers;     
            questionTitle.textContent = `${title}`;
            answer1.textContent = `${answers[0]}`;
            answer2.textContent = `${answers[1]}`;
            answer3.textContent = `${answers[2]}`;
            btn.forEach((item) => {
                item.style.color = "black";
            });

            answer1.addEventListener('click', this.handleAnswerClick);
            answer2.addEventListener('click', this.handleAnswerClick);
            answer3.addEventListener('click', this.handleAnswerClick);
        } else {
            questionScreen.style.display = "none";
            resultScreen.style.display = "block";
            totalCorrectAnswers.textContent = ` ${this.nbCorrectAnswers} `;
            totalQuestions.textContent = ` ${this.questions.length} `; 
        }
    }
}

class Question {
    constructor(title, answers, correctAnswer) {
        this.title = title;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
}




let q1 = new Question("What is the capital of the United States ?", ["Los Angeles","Washington","New York"], "2");
let q2 = new Question("What is the capital of France ?",["Lyon","Marseille","Paris"], "3")
let q3 = new Question("What is the capital of the United Kingdom ?", ["Londres","Birmingham","Edinburgh"], "1");
let quiz = new Quiz();
quiz.addQuestion(q1);
quiz.addQuestion(q2);
quiz.addQuestion(q3);

NbQuestions.textContent = `${quiz.questions.length} `;
confirmButton.addEventListener("click", (e) => {
    welcomeScreen.classList.add("hidden");
    questionScreen.style.display = "block";
    quiz.seeCurrentQuestion();
})