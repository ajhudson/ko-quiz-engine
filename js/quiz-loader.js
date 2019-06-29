var ajh = ajh || {}; // declare the namespace

ajh.quizLoader = (function() {
    var Quiz = function(title, questions) {
        this.title = title;
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

    var createQuiz = function(data) {
        var quizQuestions = [];
        var titleToStore = data.title;

            for (q in data.questions) {
                var currentQuestion = data.questions[q];
                var answerToStore = new Answer(currentQuestion.answer);
                var currentChoices = currentQuestion.choices;
                var choicesToStore = [];

                for (c in currentChoices) {
                    var currentChoice = currentChoices[c];
                    choicesToStore.push(new Choice(currentChoice.choice, currentChoice.choicetext));
                }

                quizQuestions.push(new Question(currentQuestion.questionid, currentQuestion.questiontext, choicesToStore, answerToStore));
            }

            var quiz = new Quiz(titleToStore, quizQuestions);

            return quiz;
    };

    var loadData = function(datasourceUrlUrl) {
        return $.getJSON(datasourceUrlUrl, function (response) {});
    };

    return {
        createQuiz: function(url, callback) {
            loadData(url).done(function(data) {
                var quiz = createQuiz(data);
                callback(quiz);
            });
        }
    };
})(ajh);
