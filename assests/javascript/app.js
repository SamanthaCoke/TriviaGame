var triviaQuestions = [{
    question: "What is the capital of Vermont?",
    answers: ["Austin", "Nashville", "Montepelier", "Pierre"],
    correct: "Montepelier"
},
{
    question: "What is the capital of Washington?",
    answers: ["Chareleston", "Madison", "Cheyenne", "Olympia"],
    correct: "Olympia"
},

{
    question: "What is the capital of Maryland?",
    answers: ["Annapolis", "Augusta", "Springfield", "Boise"],
    correct: "Annapolis"
},

{
    question: "What is the capital of Michigan?",
    answers: ["St. Paul", "Jackson", "Jefferson City", "Lansing"],
    correct: "Lansing"
}]
// {
//     question: "What is the capital of Colorado?",
//     answers: ["Honolulu", "Frankfort", "Denver", "Trenton"],
//     correct: "Denver"
// },
// {
//     question: "What is the capital of Oregon?",
//     answers: ["Salem", "Raleigh", "Columbus", "Santa Fe"],
//     correct: "Salem"
// },
// {
//     question: "What is the capital of California?",
//     answers: ["Sacremento", "Albany", "Jackson", "Boise"],
//     correct: "Sacremento"
// },
// {
//     question: "What is the capital of Alaska?",
//     answers: ["Annapolis", "Juneau", "Little Rock", "Dover"],
//     correct: "Juneau"
// },
// {
//     question: "What is the capital of Connecticut?",
//     answers: ["Tallahhassee", "Phoenix", "Hartford", "Montgomery"],
//     correct: "Hartford"
// },
// {
//     question: "What is the capital of Hawaii?",
//     answers: ["Carson City", "Honolulu", "Des Moines", "Atlanta"],
//     correct: "Honolulu"
// }]


var correct = 0;
var incorrect = 0;


let questionPosition = 0; 
let totalCorrect = 0;

let ci = $("#correct-incorrect");
ci.css('display', 'none')

function makeQuestion () {

    $("#questions").empty();
    let triviaQuestion = triviaQuestions[questionPosition];

    let header = $(`<h2>${triviaQuestion.question}</h2>`)
    let answers = triviaQuestion.answers;
    let divContainer = $(`<div id=${questionPosition}>`)
    let button = $(`<button id='submit' data-question=${questionPosition}>Submit</button>`)
    divContainer.append(header);
    
    for(let j = 0; j < answers.length; j++) {
        let answer = answers[j];
        let radioInput = $(`<input type=radio id='answer-${j+1}-q-${questionPosition + 1}' name='question-${questionPosition+1}' value=${answer}
        />`)
        let label = $("<label for='dewey'>").text(answer)
        divContainer.append(radioInput, label)
    }

    button.click((e)=> {
        e.preventDefault(); 
        let submit = $(e.target);
        let position = submit.data().question;
    
        let question = triviaQuestions[position]
        let correct = question.correct; 
        let input = $(`input[name='question-${questionPosition+1}']:checked`).val();
        if(!input) {
            $("#feedback").text("You have to select and option")
            return; 
        }
        if(correct === input) {
            totalCorrect++; 
            answerCorrect();
            console.log("Yay, you guessed");
        } else {
            console.log("Guessed wrong", correct, input);
            answerIncorrect();
        }
        $("#feedback").empty();

        questionPosition = questionPosition + 1;
        if(questionPosition >= triviaQuestions.length) {
            $("#endGameInfo").text(`Game Over`)
            $("#begin").css('display', 'inline-block')
            console.log("Game OVer, your total is: ", totalCorrect);

            return; 
        } else {
            makeQuestion();
        }
        //
    })

    $("#questions").append(divContainer, button)





}


$("#begin").click((e)=>{
    let target = e.target;
    correct = 0;
    incorrect = 0; 
    totalCorrect = 0;
    questionPosition = 0;
    reset(target);
    makeQuestion();
    

} )
function reset(target) {
    $(target).css('display', 'none')
    $("#endGameInfo").empty();
    $('#correct').text(correct);
    $('#incorrect').text(incorrect);
    $("#correct-incorrect").css('display', 'block')
}

function answerCorrect() {
    correct = correct + 1;
    $('#correct').text(correct);

}

function answerIncorrect() {
    incorrect = incorrect + 1;
    $('#incorrect').text(incorrect);
}
//makeQuestion();








