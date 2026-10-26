// The page is generated when the site is rebuilt (on each push). This script keeps it
// correct in between: it moves sessions that have taken place since then to "Past sessions",
// shows the times of upcoming sessions in the visitor's time zone, and filters past sessions.
(function () {
  var upcoming = document.getElementById("upcoming-list");
  var pastList = document.getElementById("past-list");
  var today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Paris" }); // YYYY-MM-DD

  function season(date) {
    var y = +date.slice(0, 4), m = +date.slice(5, 7);
    return m < 8 ? y - 1 : y;
  }

  function seasonList(y) {
    var group = pastList.querySelector('.season[data-season="' + y + '"]');
    if (!group) {
      group = document.createElement("div");
      group.className = "season";
      group.dataset.season = y;
      group.innerHTML = '<h3 class="season-h">' + y + "–" + (y + 1) + '</h3><div class="talks"></div>';
      pastList.insertBefore(group, pastList.firstElementChild);
    }
    return group.querySelector(".talks");
  }

  // Sessions now over: move them to the top of their season in "Past sessions".
  Array.prototype.slice.call(upcoming.querySelectorAll(".talk")).forEach(function (talk) {
    if (talk.dataset.date >= today) return;
    talk.classList.remove("next");
    var label = talk.querySelector(".label");
    if (label) label.remove();
    talk.querySelector(".abstract") && talk.querySelector(".abstract").removeAttribute("open");
    var list = seasonList(season(talk.dataset.date));
    list.insertBefore(talk, list.firstElementChild);
  });
  var first = upcoming.querySelector(".talk");
  if (first && !first.classList.contains("next")) {
    first.classList.add("next");
    var p = document.createElement("p");
    p.className = "label";
    p.textContent = "Next session";
    first.querySelector(".what").prepend(p);
  }
  document.getElementById("upcoming-empty").hidden = !!first;

  // Times of upcoming sessions in the visitor's time zone, when it differs from Paris.
  upcoming.querySelectorAll(".talk").forEach(function (talk) {
    var m = /^(\d+):(\d+)-(\d+):(\d+) UTC([+-]\d+)$/.exec(talk.dataset.time.trim());
    if (!m) return;
    var offset = +m[5];
    var d = talk.dataset.date.split("-");
    function at(h, min) {
      return new Date(Date.UTC(+d[0], +d[1] - 1, +d[2], +h - offset, +min));
    }
    var a = at(m[1], m[2]), b = at(m[3], m[4]);
    if (-a.getTimezoneOffset() / 60 === offset) return;
    var fmt = { hour: "2-digit", minute: "2-digit" };
    var el = talk.querySelector(".localtime");
    el.textContent = a.toLocaleTimeString([], fmt) + "–" + b.toLocaleTimeString([], fmt) + " your time";
    if (a.toDateString() !== new Date(talk.dataset.date + "T12:00:00").toDateString()) {
      el.textContent += " (" + a.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" }) + ")";
    }
    el.hidden = false;
  });

  // Search in past sessions.
  var search = document.getElementById("search");
  var noMatch = document.getElementById("search-empty");
  search.addEventListener("input", function () {
    var words = search.value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/\s+/).filter(Boolean);
    var any = false;
    pastList.querySelectorAll(".season").forEach(function (group) {
      var shown = 0;
      group.querySelectorAll(".talk").forEach(function (talk) {
        var text = talk.textContent.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
        var ok = words.every(function (w) { return text.indexOf(w) !== -1; });
        talk.hidden = !ok;
        if (ok) shown++;
      });
      group.hidden = shown === 0;
      if (shown) any = true;
    });
    noMatch.hidden = any;
  });
})();
