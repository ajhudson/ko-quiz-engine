var ajh = ajh || {}; // declare the namespace
ajh.datasource = "data/mario-data.json";

(function() {

    ajh.Quiz = function(questions) {
        this.questions = questions;
    };
    
    var Question = function(id, questionText, choices, answer) {
        this.id = id;
        this.questionText = questionText;
        this.choices = choices;
        this.answer;   
    }

    var Choices = function(choice, choiceText) {
        this.choice = choice;
        this.choiceText = choiceText;
    };

    var Answer = function(index) {
        this.index = index;
    };

    var loadData = function(datasource) {
        console.log('load data from ' + datasource);

        

    };

    $.ajax({
        dataType: "json",
        url: "data/mario-data.json",
        data: null,
        success: function() {
            alert('ok');
        }
    })

})(ajh);

