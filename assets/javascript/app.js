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
        //console.log("limpiando campos");
    }

    function createStartButton() {
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
        //console.log("QuestionTimer: " + questionTimer);
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
            if (!finish)
                unanswered++;
            startGame();
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
            //console.log(objeto);
            //console.log(eval(objeto).question);
            //console.log("Question Number: " + questionNumber);
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
            //console.log("termino preguntas");
            if (finish) {
                clearInterval(secondTimer);
            }
        }
    }


    function startGame() {

        questionTimer = 30;
        $(".timeRemaining").text("Time Remaining: " + questionTimer + " Seconds");
        newQuestion();
        if (!finish) {
            secondTimer = setTimeout(timer, 1000);
        }
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
        $(pb).text("Incorrect: " + incorrect);
        $(".question").append(pb)
        let pc = $("<p>");
        $(pc).text("Unanswered: " + unanswered)
        $(".question").append(pc)
        $(".restart").show();
    }

    clear();
    createStartButton();

    $('.list').on('click', '.answer', function (event) {
        //console.log(event.currentTarget.dataset.answer);
        if (event.currentTarget.dataset.answer == eval(objeto).correct) {
            correct++;
            $(".list").empty();
            let image = $("<img>");
            $(image).attr("src", eval(objeto).gif);
            $(image).attr("style", "margin: 0 auto");
            $(image).addClass("img-fluid");
            $(".list").append(image);
            responseTimerFun();
        } else {
            incorrect++;
            responseTimerFun();
            $(".list").attr("style", "background-color:red;");

        }
        //console.log("Correct : " + correct);
        //console.log("Incorrect : " + incorrect);
        //console.log("Unanswered : " + unanswered);
    });


    $(".boton").click(function () {
        $(".boton").hide();
        randomizeArray(4, randomAnswerArray, 4);
        randomizeArray(5, randomQuestionArray, 10);
        //console.log("Questions: " + randomQuestionArray);
        //console.log("Answers: " + randomAnswerArray);
        startGame();

    });

    $(".restart").click(function () {
        $(".boton").hide();
        //console.log("restart");
        clear();
        $(".boton").show();
    });

});