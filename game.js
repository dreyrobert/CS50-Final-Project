const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Which one is the most populous city in Brazil?",
        choice1: "São Paulo",
        choice2: "Minas Gerais",
        choice3: "Rio de Janeiro",
        choice4: "Amazonas",
        answers: 1,
    },
    {
        question: "Brazil is located in which continent?",
        choice1: "Europe",
        choice2: "South America",
        choice3: "Asia",
        choice4: "America",
        answers: 2,
    },
    {
        question: "What is the date of the Brazil's Independence?",
        choice1: "September 7th",
        choice2: "May 25th",
        choice3: "July 14th",
        choice4: "Abril 22th",
        answers: 1,
    },
    {
        question: "Which of these countries does not make frontier with Brazil?",
        choice1: "Bolivia",
        choice2: "Argentina",
        choice3: "Colombia",
        choice4: "Chile",
        answers: 4,
    },
    {
        question: "What is the biggest popular festival in Brazil, which mixes samba singing and dance and samba school parades?",
        choice1: "Reveillon",
        choice2: "Halloween",
        choice3: "Carnaval",
        choice4: "Oktoberfest",
        answers: 3,
    },
    {
        question: "Which of these musical styles is not Brazilian?",
        choice1: "Funk carioca",
        choice2: "MPB",
        choice3: "Axé",
        choice4: "R&B",
        answers: 4,
    },
    {
        question: "Which of these is an Afro-Brazilian religion?",
        choice1: "Candomblé",
        choice2: "Catholicism",
        choice3: "Colombia",
        choice4: "Wicca",
        answers: 1,
    },
    {
        question: "What is the food consumed daily by most Brazilians?",
        choice1: "Soup",
        choice2: "Rice with beans",
        choice3: "Pizza",
        choice4: "Hamburguer",
        answers: 2,
    },
    {
        question: "What is the language spoken by Brazilians?",
        choice1: "English",
        choice2: "Portuguese",
        choice3: "Spanish",
        choice4: "Brazillian",
        answers: 2,
    },
    {
        question: "Which of these artists is Brazilian?",
        choice1: "Franco Corelli",
        choice2: "Claudine Longet",
        choice3: "Dua Lipa",
        choice4: "Anitta",
        answers: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question 

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answers ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()