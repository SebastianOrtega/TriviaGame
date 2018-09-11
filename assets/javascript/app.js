

let question0 = {
    question: "Which year Die Hard was premier?",
    options: ["1986", "1987", "1988", "1989"],
    correct: "1988",
    gif: "https://media.giphy.com/media/AphxZxXiVklYQ/giphy.gif"
}
let question1 = {
    question: "Who was the director of Leathal Weapon?",
    options: ["Mel Gibson", "Danny Glover", "Richard Donner", "Traci Wolfe"],
    correct: "Richard Donner",
    gif: "https://media.giphy.com/media/3b1JW7LxfsAKs/giphy.gif"
}
let question2 = {
    question: "In Point break who is Johnny Utah?",
    options: ["Gary Busey", "Patrick Swayze", "John C. McGinley", "Keanu Reeves"],
    correct: "Keanu Reeves",
    gif: "https://media.giphy.com/media/aDYXQy3W8XFG8/giphy.gif"
}
let question3 = {
    question: "Who is the main character in Air Force One?",
    options: ["Harrison Ford", "Liam Neeson", "Keanu Reeves", "Mel Gibson"],
    correct: "Harrison Ford",
    gif: "https://media.giphy.com/media/3o7qDGJWZ9ql0OGcjC/giphy.gif"
}
let question4 = {
    question: "Steven Seagal performed in: ",
    options: ["The fugitive", "Under Siege", "Demolition man", "Blade"],
    correct: "Under Siege",
    gif: "https://media.giphy.com/media/O62idzzWt6wIU/giphy.gif"
}
let question5 = {
    question: "In The Last Boy Scout Bruce Willis wroked for which president?",
    options: ["Jimmy Carter", "Gerald Ford", "Ronald Reagan", "Richard Nixon"],
    correct: "Jimmy Carter",
    gif: "https://media.giphy.com/media/42zZWL1gWWnYQegojZ/giphy.gif"
}
let question6 = {
    question: "In the movie Speed stars Keanu Reeves and? ",
    options: ["Jackie Chan", "Chris Tucker", "Steven Seagal", "Sandra Bullock"],
    correct: "Sandra Bullock"
}
let question7 = {
    question: "Which year Assassins with Sylvester Stallone and Antonio Banderas was premier?",
    options: ["1990", "1992", "1995", "1998"],
    correct: "1995",
    gif: "https://media.giphy.com/media/aq6Thivv9V9lu/giphy.gif"

}
let question8 = {
    question: "Who stared Gremlins?",
    options: ["Harrison Ford", "Zach Galligan", "Sean Young", "Rutger Hauer"],
    correct: "Zach Galligan",
    gif: "https://media.giphy.com/media/P0tIioXONXOz6/giphy.gif"
}
let question9 = {
    question: "Which year Ghostbusters was premier?",
    options: ["1984", "1985", "1983", "1986"],
    correct: "1984",
    gif: "https://media.giphy.com/media/26BoCdWySqRcaupWw/giphy.gif"
}

let randomQuestionArray = [];
let randomAnswerArray = [];
let questionNumber = 0;
let correct;
let incorrect;
let unanswered;
let secondTimer;
let questionTimer;
let responseTimer;
let objeto;
let finish = false;

$(document).ready(function () {

    function clear() {
        $(".timeRemaining").empty();
        $(".question").empty();
        $(".list").empty();
        $(".restart").hide();
        $(".boton").hide();
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        totalTimer = 0;
        finish = false;
        randomQuestionArray = [];
        randomAnswerArray = [];
        questionNumber = 0;

        console.log("limpiando campos");

    }

    function createStartButton() {
        // let boton = $("<button>");
        // boton.addClass("btn btn-primary");
        // $(boton).text("Start");
        // $(".boton").append(boton);
        $(".boton").show();
    }

    function randomizeArray(arraySize, array, totalOptions) {
        for (let i = 0; i < arraySize; i++) {

            let newNumber = Math.floor((Math.random() * totalOptions));
            if (!array.includes(newNumber)) {
                array[i] = newNumber;
            } else {
                i--;
            }
        }
        return (array);
    }

    function timer() {
        questionTimer--;
        $(".timeRemaining").html("Time Remaining: " + questionTimer + " Seconds");
        if (questionTimer > 0 && !finish) {
            secondTimer = setTimeout(timer, 1000);
            if (questionTimer < 5) {
                $(".timeRemaining").attr("style", "color:red");
            }
        }
        else {
            $(".timeRemaining").text("");
            clearInterval(secondTimer);
            //if (questionNumber < 4) {
            if (!finish)
                unanswered++;
            startGame();
            //}
        }
    }

    function responseTimerFun() {

        clearInterval(secondTimer);
        responseTimer = setTimeout(startGame, 3000);

    }


    function newQuestion() {

        if (questionNumber < 5) {
            $(".question").empty();
            $(".list").empty();
            objeto = "question" + randomQuestionArray[questionNumber];
            console.log(objeto);
            console.log(eval(objeto).question);
            console.log("Question Number: " + questionNumber);
            $(".list").attr("style", "background-color:rgb(233,235,238);");
            $(".question").text(eval(objeto).question);
            for (let i = 0; i < 4; i++) {
                let p = $("<div>");
                let pd = $("<p>");
                $(p).addClass("answer");
                $(p).attr("data-answer", eval(objeto).options[randomAnswerArray[i]]);
                $(pd).text(eval(objeto).options[randomAnswerArray[i]]);
                $(p).append(pd);
                $(".list").append(p);
            }
            questionNumber++;
        } else {
            finishGame();
            console.log("termino preguntas");
            if (finish)
                clearInterval(secondTimer);

        }
    }


    function startGame() {

        questionTimer = 10;
        $(".timeRemaining").text("Time Remaining: " + questionTimer + " Seconds");
        newQuestion();
        secondTimer = setTimeout(timer, 1000);



    }

    function finishGame() {

        clearInterval(secondTimer);
        finish = true;
        $(".timeRemaining").empty();
        $(".question").empty();
        $(".list").empty();

        let pa = $("<p>");
        $(pa).text("Correct: " + correct);
        $(".question").append(pa);
        let pb = $("<p>");
        $(pb).text("Inorrect: " + incorrect);
        $(".question").append(pb)
        let pc = $("<p>");
        $(pc).text("Unanswered: " + unanswered)
        $(".question").append(pc)
        $(".restart").show();


    }

    clear();
    createStartButton();

    $('.list').on('click', '.answer', function (event) {
        console.log(event.currentTarget.dataset.answer);
        if (event.currentTarget.dataset.answer == eval(objeto).correct) {
            correct++;
            $(".list").empty();
            let image = $("<img>");
            $(image).attr("src", eval(objeto).gif);
            $(image).attr("style", "margin: 0 auto");
            $(".list").append(image);
            responseTimerFun();
        } else {
            incorrect++;
            responseTimerFun();
            $(".list").attr("style", "background-color:red;");

        }
        console.log("Correct : " + correct);
        console.log("Incorrect : " + incorrect);
        console.log("Unanswered : " + unanswered);

    });


    $(".boton").click(function () {
        $(".boton").hide();
        randomizeArray(4, randomAnswerArray, 4);
        randomizeArray(5, randomQuestionArray, 10);
        console.log("Questions: " + randomQuestionArray);
        console.log("Answers: " + randomAnswerArray);
        startGame();

    });

    $(".restart").click(function () {
        $(".boton").hide();
        console.log("restart");
        clear();
        $(".boton").show();



    });












});