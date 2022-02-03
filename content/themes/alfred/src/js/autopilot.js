(function(o) {
    var b = "https://api.autopilothq.com/anywhere/",
        t = "faf7285945114c04ab5bc2540991fc20fc47c24f6a714fad9a2197f2b1f4a045",
        a = window.AutopilotAnywhere = {
            _runQueue: [],
            run: function() {
                this._runQueue.push(arguments);
            }
        },
        c = encodeURIComponent,
        s = "SCRIPT",
        d = document,
        l = d.getElementsByTagName(s)[0],
        p = "t=" + c(d.title || "") + "&u=" + c(d.location.href || "") + "&r=" + c(d.referrer || ""),
        j = "text/javascript",
        z, y;
    if (!window.Autopilot) window.Autopilot = a;
    if (o.app) p = "devmode=true&" + p;
    z = function(src, asy) {
        var e = d.createElement(s);
        e.src = src;
        e.type = j;
        e.async = asy;
        l.parentNode.insertBefore(e, l);
    };
    y = function() {
        z(b + t + '?' + p, true);
    };
    if (window.attachEvent) {
        window.attachEvent("onload", y);
    } else {
        window.addEventListener("load", y, false);
    }
})({});