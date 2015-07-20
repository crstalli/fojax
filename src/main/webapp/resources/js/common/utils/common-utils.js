fojax.utils.common.getRouteArray = function(route) {
    var loc = route || '/';
    if (loc.length >= 1) {
        if (loc.lastIndexOf('/') == loc.length - 1) {
            loc = loc.substring(0, loc.length - 1);
        }
    }
    var locs = [ '' ];
    if (loc.length > 1) {
        locs = locs.concat(loc.split('/'));
    }
    return locs;
}