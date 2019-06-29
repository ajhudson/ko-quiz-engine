var ajh = ajh || {}; // declare the namespace
ajh.datasource = "data/mario-data.json";

(function() {

    var Quiz = function(title, questions) {
        this.this = title;
        this.questions = questions;
    };
    
    var Question = function(id, questionText, choices, answer) {
        this.id = id;
        this.questionText = questionText;
        this.choices = choices;
        this.answer = answer;   
    }

    var Choice = function(choice, choiceText) {
        this.choice = choice;
        this.choiceText = choiceText;
    };

    var Answer = function(index) {
        this.index = index;
    };

    var loadData = function() {
        $.getJSON("http://localhost/ko-quiz/data/mario-data.json", function (response) { 

            var quizQuestions = [];

            for (q in response.questions) {
                var currentQuestion = response.questions[q];
                var answerToStore = new Answer(currentQuestion.answer);
                var currentChoices = currentQuestion.choices;
                var choicesToStore = [];

                for (c in currentChoices) {
                    var currentChoice = currentChoices[c];
                    choicesToStore.push(new Choice(currentChoice.choice, currentChoice.choicetext));
                }

                quizQuestions.push(new Question(currentQuestion.questionid, currentQuestion.questiontext, choicesToStore, answerToStore));
            }

            var quiz = new Quiz(response.title, quizQuestions);

            console.log(quiz);
        });
    };

    loadData();

    
})(ajh);

