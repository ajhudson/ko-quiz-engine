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

        if (currentAnswer === undefined) {
            self.answers().push({ index: idx, answer: answer });
        } else {
            self.answers()[idx] = { index: idx, answer: answer };
        }

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
        var ind = self.idx() + 1;
        self.idx(ind);
        self.hasAnswered(hasAnsweredCurrentQuestion());
    };

    self.goToPreviousQuestion = function() {
        var ind = self.idx() - 1;
        self.idx(ind);
        self.hasAnswered(hasAnsweredCurrentQuestion());
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
        alert("quiz is complete");
    };

    function hasAnsweredCurrentQuestion() {
        var idx = self.idx();
        var q = self.answers()[idx];

        return q !== undefined;
    }

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
        completeQuiz: completeQuiz
    }
})();

ajh.quizLoader.createQuiz("http://localhost/ko-quiz/data/mario-data.json", function(quiz) {
    viewModel.quizTitle(quiz.title);
    viewModel.questions(quiz.questions);
    viewModel.loaded(true);

    ko.applyBindings(viewModel);
});