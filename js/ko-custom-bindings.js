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