$(document).ready(function () {

    let question0 = {
        question: "Which year Die Hard was premier?",
        options: ["1986", "1987", "1988", "1989"],
        correct: "1988",
        gif: "https://media.giphy.com/media/8AQ4X9rxxMHQc/giphy.gif"
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
    let totalTimer;
    let objeto;

    function clear() {
        $(".timeRemaining").empty();
        $(".question").empty();
        $(".options").empty();
        $(".restart").empty();
        $(".boton").empty();
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        totalTimer = 0;
        console.log("limpiando campos");

    }

    function createStartButton() {
        let boton = $("<button>");
        boton.addClass("btn btn-primary");
        $(boton).text("Start");
        $(".boton").append(boton);
    }

    function randomizeArray(arraySize, array) {
        for (let i = 0; i < arraySize; i++) {

            let newNumber = Math.floor((Math.random() * arraySize));
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
        totalTimer++;
        console.log(totalTimer);
        $(".timeRemaining").html("Time Remaining: " + questionTimer + " Seconds");
        if (questionTimer > 0) {
            secondTimer = setTimeout(timer, 1000);
            if (questionTimer < 5) {
                $(".timeRemaining").attr("style", "color:red");
            }
        }
        else {
            clearInterval(secondTimer);
        }
    }

    function newQuestion() {
        questionNumber++;
        objeto = "question" + randomQuestionArray[questionNumber];
        console.log(objeto);
        console.log(eval(objeto).question);
        $(".question").text(eval(objeto).question);
        for (let i = 0; i < 4; i++) {
            let p = $("<p>");
            $(p).text(eval(objeto).options[randomAnswerArray[i]]);
            $(".options").append(p);
        }
    }


    function startGame() {

        questionTimer = 30;
        $(".timeRemaining").text("Time Remaining: " + questionTimer + " Seconds");
        newQuestion();
        //secondTimer = setTimeout(timer, 1000);
        //objeto = "question" + randomQuestionArray[0];
        // console.log(objeto);
        // console.log(eval(objeto).question);


    }





    clear();
    createStartButton();



    $(".boton").click(function () {
        $(".boton").empty();
        randomizeArray(4, randomAnswerArray);
        randomizeArray(5, randomQuestionArray);
        console.log(randomQuestionArray);
        console.log(randomAnswerArray);
        startGame();

    });











});