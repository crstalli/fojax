fojax.common = {
    init : function() {
        fojax.models = {};
        fojax.viewModels.instances = {};
        fojax.properties = {};
        fojax.properties.serverSent = {};
    },

    finalize : function() {
        // ko.applyBindings(fojax.viewModels.instances);
    }

};

/* Initialize common and name specific methods */
var UTIL = {
    exec : function(controller, action) {
        var namespace = fojax;
        if (controller !== "" && namespace[controller]
                && typeof namespace[controller][action] === "function") {
            namespace[controller][action]();
        }
    },
    init : function() {
        var bodyEl = $('body'), controller = bodyEl.data("controller");
        UTIL.exec("common", "init");
        UTIL.exec(controller, "init");
        UTIL.exec(controller, "finalize");
        UTIL.exec("common", "finalize");
    }
};

/* Initialize the Page */
$(window).load(UTIL.init);