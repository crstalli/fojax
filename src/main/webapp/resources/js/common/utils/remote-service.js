fojax.common.utils.remoteService = {

    call : function(uri, type, data, acceptCallback, failCallback) {
        var result = $.ajax({
            type : type,
            url : uri,
            data : data
        });
        result.done(function(data) {
            acceptCallback(data);
        });
        result.fail(function(jqXHR, textStatuses) {
            if (failCallback) {
                failCallback(jqXHR, textStatuses);
            } else {
                alert("Error with request to " + url);
            }
        });
    },

    buildUrl : function(uri, pathId, pathValue) {
        if (pathId) {
            if (pathId in fojax.properties.serverSent.common && !pathValue) {
                uri = uri.replace("<%" + pathId + "%>", this[pathId]);
            } else {
                uri = uri.replace("<%" + pathId + "%>", pathValue);
            }
        }
        return this.rootUri + uri;

    }
/*
 * call : function(uri, type,data, acceptCallback, failCallback){ var result =
 * $.ajax({type:type, url:uri, data: data} ); result.done(function(data){
 * acceptCallback(data); }); result.fail(function(jqXHR, textStatuses){
 * if(failCallback){ failCallback(jqXHR, textStatuses); } else { alert("Error
 * with request to " + url); } }); },
 * 
 * buildUrl : function(uri, pathId, pathValue){ if(pathId){ if(pathId in
 * fojax.properties.serverSent.common && !pathValue){ uri = uri.replace("<%"+pathId+"%>",fojax.viewModels.instances.userViewModel[pathId]); }
 * else { uri = uri.replace("<%"+pathId+"%>",pathValue); } } return
 * fojax.viewModels.instances.userViewModel.rootUri + uri;
 *  }
 */
};
$
        .extend(fojax.common.utils.remoteService,
                new fojax.viewModels.BaseViewModel());