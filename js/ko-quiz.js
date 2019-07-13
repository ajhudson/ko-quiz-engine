var viewModel = (function() {
            
    var self = this;
    self.quizTitle = ko.observable("");
    self.questions = ko.observableArray([]);
    self.loaded = ko.observable(false);
    self.idx = ko.observable(0);
    self.answers = ko.observableArray([]);
    self.currentAnswer = ko.observable("");
    self.backButtonEnabled = ko.observable(false);
    self.nextButtonEnabled = ko.observable(true);
    self.hasAnswered = ko.observable(false);
    self.allQuestionsAnswered = ko.observable(false);

    self.currentTitle = ko.computed(function () {
        var currentQuestion = self.questions()[self.idx()];
        var questionText = currentQuestion !== undefined ? currentQuestion.questionText : "";

        return questionText;
    });

    self.currentQuestionNumber = ko.computed(function() {
        return self.idx() + 1;
    });

    self.maxQuestions = ko.computed(function() {
        return self.questions().length;
    });

    self.currentAnswer.subscribe(function(answer) {       
        var idx = self.idx();
        var currentAnswer = self.answers()[idx];
        var correctAnswer = getCorrectAnswer();
        var answeredCorrectly = answer == correctAnswer;

        /*
        if (currentAnswer === undefined) {
            self.answers().push({ index: idx, answer: answer, answeredCorrectly: answeredCorrectly });
        } else {
            self.answers()[idx] = { index: idx, answer: answer, answeredCorrectly: answeredCorrectly };
        }*/

        self.answers().push({ index: idx, answer: answer, answeredCorrectly: answeredCorrectly });

        self.hasAnswered(true);

        var isLastQuestion = self.currentQuestionNumber() === self.questions().length;
        var allQuestionsAnswered = self.answers().length === self.questions().length;

        if (isLastQuestion && allQuestionsAnswered) {
            self.allQuestionsAnswered(true);
        }
    });

    self.backButtonEnabledStatus = ko.computed(function() {
        return self.currentQuestionNumber() > 1 ? true : false;
    });

    self.nextButtonEnabledStatus = ko.computed(function() {
        return self.currentQuestionNumber() < self.maxQuestions() && self.hasAnswered() ? true : false; 
    });

    self.finishButtonEnabledStatus = ko.computed(function() {
        return this.allQuestionsAnswered();
    });

    self.goToNextQuestion = function() {
        self.hasAnswered(hasAnsweredCurrentQuestion());

        var ind = self.idx() + 1;
        self.idx(ind);
    };

    self.goToPreviousQuestion = function() {
        self.hasAnswered(hasAnsweredCurrentQuestion());
        var ind = self.idx() - 1;
        self.idx(ind);
    };

    self.hasAnsweredIndicator = function(c) {
        var ind = self.idx();
        var ans = self.answers()[ind];

        if (ans === undefined) {
            return "";
        }

        return ans.answer == c ? "active" : "";
    };

    self.completeQuiz = function() {
        
        var correctCount = 0;
        
        for (var i = 0; i < self.answers().length; i++) {

            var currentAnswer = self.answers()[i];
            
            if (currentAnswer.answeredCorrectly) {
                correctCount++;
            }
        }

        console.log("You answered " + correctCount + " questions correctly");
    };

    function hasAnsweredCurrentQuestion() {
        var idx = self.idx();
        var q = self.answers()[idx];

        return q !== undefined;
    }

    self.getCorrectAnswer = function() {
        var idx = self.idx();
        var choices = self.questions()[idx].choices;
        var correctChoice = null;

        for (var i = 0; i < choices.length; i++) {
            if (choices[i].isCorrect) {
                correctChoice = choices[i];
                break;
            }
        }
        
        return correctChoice.choice;
    }; 

    return {
        loaded: loaded,
        quizTitle: self.quizTitle,
        questions: self.questions,
        currentTitle: currentTitle,
        currentQuestionNumber: currentQuestionNumber,
        answers: answers,
        currentAnswer: currentAnswer,
        backButtonEnabledStatus: backButtonEnabledStatus,
        nextButtonEnabledStatus: nextButtonEnabledStatus,
        goToPreviousQuestion: goToPreviousQuestion,
        goToNextQuestion: goToNextQuestion,
        hasAnswered: hasAnswered,
        finishButtonEnabledStatus: finishButtonEnabledStatus,
        completeQuiz: completeQuiz,
        getCorrectAnswer: getCorrectAnswer
    }
})();

ajh.quizLoader.createQuiz("http://localhost/ko-quiz/data/mario-data.json", function(quiz) {
    viewModel.quizTitle(quiz.title);
    viewModel.questions(quiz.questions);
    viewModel.loaded(true);

    ko.applyBindings(viewModel);
});