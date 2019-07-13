ko.bindingHandlers.bootstrapModal = {
    init: function(el, valueAccessor, allBindings, viewModel, bindingContext) {
        var args = valueAccessor();
        var modalTarget = args.modaltarget;
        var okCallback = args.okcallback;
        var cancelCallback = args.cancelCallback;
        var modalEl = $("#" + modalTarget);

        
        $(el).on("click", function() {
            modalEl.modal("show");
        });

        // to be invoked when modal is either cancelled or closed
        modalEl.find("button.close[data-dismiss='modal']").on("click", function() {

            if (typeof cancelCallback === "function") {
                cancelCallback();
            }

            modalEl.modal("hide");
        });
        
        // to be invoked when ok is clicked
        modalEl.find("button.btn.btn-primary[data-ok='modal']").on("click", function() {
            
            var doClose = true;
            
            if (typeof okCallback === "function") {
                doClose = okCallback();
            }

            if (doClose) {
                modalEl.modal("hide");
            }
        });
    }
};

ko.bindingHandlers.answerQuestion = {
    init: function(el, valueAccessor, allBindings, viewModel, bindingContext) {
        $(el).css("cursor", "pointer");

        $(el).on("click", function() {
            var chosenAnswer = valueAccessor();
            bindingContext.$parent.currentAnswer(chosenAnswer);

            $(this).parent().find("li.list-group-item").each(function (el) {
                $(this).removeClass("active");
            });

            $(this).addClass("active");
        });
    }
};

ko.bindingHandlers.markQuestion = {
    init: function(el, valueAccessor, allBindings, viewModel, bindingContext) {
        
        $(el).on("click", function() {
            var currentAnswer = ko.unwrap(valueAccessor());
            var correctAnswer = viewModel.getCorrectAnswer();
            var answeredCorrectly = currentAnswer == correctAnswer;
            var msgEl = answeredCorrectly ? $("#correct-message") : $("#wrong-message");

            var afterAnimate = function() {
                setTimeout(function() {
                    msgEl.hide();
                    viewModel.goToNextQuestion();
                }, 1000);
            };

            msgEl.css({ opacity: "0.0" });
            msgEl.show();
            msgEl.animate({ opacity: "1.0" }, 750, "swing", afterAnimate);
        });
    }
};