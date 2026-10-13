
      (function () {
        "use strict";
        var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        /* ============ FLIGHT BOARD ============ */
        var mode = "airport";
        var flights = [
          { code: "DL 248",  from: "Atlanta",    land: 13 * 60 + 58, dest: "Midtown Manhattan",   pax: 3 },
          { code: "UA 1109", from: "Chicago",    land: 14 * 60 + 6,  dest: "Midtown Manhattan", pax: 1 },
          { code: "AA 742",  from: "Dallas",     land: 14 * 60 + 18, dest: "Midtown Manhattan",   pax: 4 },
          { code: "B6 915",  from: "Boston",     land: 14 * 60 + 27, dest: "Brooklyn",     pax: 2 },
          { code: "DL 1173", from: "Detroit",    land: 14 * 60 + 35, dest: "Midtown Manhattan",   pax: 5, you: true },
          { code: "WN 2084", from: "Nashville",  land: 14 * 60 + 44, dest: "Midtown Manhattan",   pax: 2 },
          { code: "AS 331",  from: "Seattle",    land: 14 * 60 + 59, dest: "Queens",       pax: 1 },
          { code: "UA 1560", from: "Denver",     land: 15 * 60 + 12, dest: "Midtown Manhattan",   pax: 3 },
          { code: "F9 664",  from: "Orlando",    land: 15 * 60 + 38, dest: "Midtown Manhattan",   pax: 2 },
          { code: "DL 902",  from: "Minneapolis",land: 16 * 60 + 5,  dest: "Midtown Manhattan",   pax: 4 }
        ];
        var gigs = [
          { code: "Yankee Stadium", from: "The Bronx",        land: 21 * 60 + 54, dest: "Midtown Manhattan", pax: 2 },
          { code: "Barclays · Nets", from: "Brooklyn",        land: 22 * 60 + 6,  dest: "Brooklyn",          pax: 4 },
          { code: "Radio City Live", from: "Rockefeller Ctr", land: 22 * 60 + 18, dest: "Midtown Manhattan", pax: 3 },
          { code: "MSG · Aria Vale", from: "Madison Sq. Garden", land: 22 * 60 + 30, dest: "Midtown Manhattan", pax: 6, you: true },
          { code: "Beacon Theatre",  from: "Upper West Side", land: 22 * 60 + 44, dest: "Midtown Manhattan",   pax: 2 },
          { code: "Forest Hills Fest", from: "Queens",        land: 23 * 60 + 4,  dest: "Queens",              pax: 3 }
        ];
        var MODES = {
          airport: {
            title: "JFK · Arrivals",
            th: ["Flight", "From", "Lands", "To"],
            winLabel: "Arrival window",
            winSuffix: "around your landing",
            ref: 14 * 60 + 35,
            data: null, // filled below
            peopleNoun: "travelers",
            groupNoun: "flights",
            base: 72,
            heroH1: 'You just landed.<br />So did <span class="hl">your ride-share.</span>',
            lede: "Landpool groups <strong>PNR-verified passengers</strong> from flights landing at the same airport, at the same time, heading the same way — into one car, one meeting point, and <strong>one fare split four ways</strong>.",
            hp1: "Verified flight, real passenger",
            note: "Matching runs across <b>every flight</b> landing inside the window — not just yours. A wider window means a bigger pool and a cheaper seat. Delays slide you into the next group automatically.",
            chip: "PNR-verified",
            appName: "JFK → Midtown rideshare",
            trip: "POOL W7 · 4 RIDERS · ETA MEET 14:52 · ZONE C",
            demoLede: "A simulated Landpool chat: four verified passengers, three different flights, one destination — and not a single phone number exchanged.",
            calcLede: "Airport rides are priced for one passenger and priced like it. Pool four verified travelers and the same seat costs less than the airport coffee run. Try it:",
            step1T: "Verify with your PNR",
            step1B: "Scan your boarding pass or forward the booking email. The PNR proves you're a real passenger on a real flight — and it's deleted the moment it's checked.",
            step2B: "Every flight landing within ±45 minutes of yours joins one matching pool. Three flights dumping 400 people at once is a feature, not chaos.",
            step5B: "One pinned meeting point per terminal — “Zone C, Pillar 4.” The group books one Uber or Lyft together and the fare splits in the app. Done.",
            splitCol: "Flight",
            meet: {
              title: "Meeting point · Zone C, Pillar 4",
              body: "Uber booked for 14:52 · the driver never joins this chat · drop-offs in route order",
              fareLabel: "Solo fare $72 → your share",
              fare: "$19"
            }
          },
          concert: {
            title: "NYC · Events tonight",
            th: ["Event", "Venue", "Ends", "To"],
            winLabel: "Exit window",
            winSuffix: "around the encore",
            ref: 22 * 60 + 30,
            data: null, // filled below
            peopleNoun: "fans",
            groupNoun: "events",
            base: 58,
            heroH1: 'The encore ends.<br />Your <span class="hl">ride-share</span> begins.',
            lede: "Landpool groups <strong>ticket-verified fans</strong> from concerts, games and festivals ending at the same time, heading the same way — into one car, one venue pickup zone, and <strong>one fare split four ways</strong>.",
            hp1: "Verified ticket, real fan",
            note: "Matching runs across <b>every event</b> ending inside the window — not just your show. A wider window means a bigger pool and a cheaper seat. Overtime or a long encore slides you into the next group automatically.",
            chip: "Ticket-verified",
            appName: "MSG → Midtown rideshare",
            trip: "POOL E9 · 4 FANS · MEET 22:47 · GATE B PICKUP",
            demoLede: "A simulated Landpool chat: four verified fans, three different venues, one destination — and not a single phone number exchanged.",
            calcLede: "Event-night rides are surge-priced for one passenger and priced like it. Pool four verified fans leaving the same venues and the same seat costs less than the merch line. Try it:",
            step1T: "Verify with your ticket",
            step1B: "Scan your event ticket — concert, game or festival. Your seat proves you're really at the venue tonight, and the stub is deleted the moment it's checked.",
            step2B: "Every show, game and festival ending within ±45 minutes of yours joins one matching pool. Three venues emptying onto the same avenue is a feature, not chaos.",
            step5B: "One pinned pickup zone per venue — “Gate B, 7th Ave exit.” The group books one Uber or Lyft together and the fare splits in the app. Done.",
            splitCol: "Event",
            meet: {
              title: "Pickup zone · Gate B, 7th Ave exit",
              body: "Uber booked for 22:47 · the driver never joins this chat · drop-offs in route order",
              fareLabel: "Solo fare $58 → your share",
              fare: "$16"
            }
          }
        };
        MODES.airport.data = flights;
        MODES.concert.data = gigs;
        function fmt(mins) {
          var h = Math.floor(mins / 60), m = mins % 60;
          return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
        }
        var boardBody = document.getElementById("boardBody");
        var winRange = document.getElementById("windowRange");
        var winOut = document.getElementById("windowOut");
        var poolSummary = document.getElementById("poolSummary");

        function renderBoard() {
          var cfg = MODES[mode];
          var w = parseInt(winRange.value, 10);
          winOut.textContent = "±" + w + " min " + cfg.winSuffix;
          var html = "", poolPax = 0, poolGroups = 0;
          cfg.data.forEach(function (f) {
            var inWin = Math.abs(f.land - cfg.ref) <= w;
            if (inWin && f.dest === "Midtown Manhattan") { poolPax += f.pax; poolGroups++; }
            html += "<tr" + (inWin ? ' class="in-window"' : "") + ">" +
              "<td>" + f.code + (f.you ? " ★" : "") + "</td>" +
              "<td>" + f.from + "</td>" +
              "<td>" + fmt(f.land) + "</td>" +
              '<td class="hide-s">' + f.dest + "</td>" +
              "<td>" + (inWin ? '<span class="st-landed">POOLING</span>' : '<span class="st-enroute">—</span>') + "</td></tr>";
          });
          boardBody.innerHTML = html;
          var cars = Math.max(1, Math.ceil(poolPax / 4));
          poolSummary.innerHTML = "<span>Midtown-bound pool: <b>" + poolPax + " " + cfg.peopleNoun + "</b> from " + poolGroups + " " + cfg.groupNoun + "</span>" +
            "<span><b>" + cars + (cars === 1 ? " car" : " cars") + "</b> · ~$" + Math.max(9, Math.round(cfg.base * (1 + 0.08 * Math.min(poolPax, 4) - 0.08) / Math.min(poolPax, 4))) + "/seat</span>";
        }
        winRange.addEventListener("input", renderBoard);
        renderBoard();

        /* ============ MODE SWITCH ============ */
        function setMode(m) {
          mode = m;
          var cfg = MODES[mode];
          document.getElementById("modeAirportBtn").setAttribute("aria-pressed", m === "airport" ? "true" : "false");
          document.getElementById("modeConcertBtn").setAttribute("aria-pressed", m === "concert" ? "true" : "false");
          document.getElementById("heroH1").innerHTML = cfg.heroH1;
          document.getElementById("heroLede").innerHTML = cfg.lede;
          document.getElementById("hp1Text").textContent = cfg.hp1;
          document.getElementById("boardTitle").textContent = cfg.title;
          document.getElementById("thCode").textContent = cfg.th[0];
          document.getElementById("thFrom").textContent = cfg.th[1];
          document.getElementById("thLand").textContent = cfg.th[2];
          document.getElementById("thDest").textContent = cfg.th[3];
          document.getElementById("windowLabel").textContent = cfg.winLabel;
          document.getElementById("boardNote").innerHTML = cfg.note;
          document.getElementById("verifyChip").textContent = cfg.chip;
          document.getElementById("appName").textContent = cfg.appName;
          document.getElementById("tripLine").textContent = cfg.trip;
          document.getElementById("demoLede").textContent = cfg.demoLede;
          document.getElementById("calcLede").textContent = cfg.calcLede;
          document.getElementById("step1Title").textContent = cfg.step1T;
          document.getElementById("step1Body").textContent = cfg.step1B;
          document.getElementById("step2Body").textContent = cfg.step2B;
          document.getElementById("step5Body").textContent = cfg.step5B;
          document.getElementById("splitColHead").textContent = cfg.splitCol;
          document.getElementById("callBar").hidden = true;
          renderBoard();
          renderCalc();
          playChat();
        }
        document.getElementById("modeAirportBtn").addEventListener("click", function () { setMode("airport"); });
        document.getElementById("modeConcertBtn").addEventListener("click", function () { setMode("concert"); });
        document.querySelectorAll("[data-setmode]").forEach(function (b) {
          b.addEventListener("click", function () {
            setMode(b.getAttribute("data-setmode"));
            document.getElementById("top").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
          });
        });

        /* ============ FARE CALCULATOR ============ */
        var fareRange = document.getElementById("fareRange");
        var fareOut = document.getElementById("fareOut");
        var soloOut = document.getElementById("soloOut");
        var sharedOut = document.getElementById("sharedOut");
        var saveOut = document.getElementById("saveOut");
        var splitBody = document.getElementById("splitBody");
        var barSolo = document.getElementById("barSolo"), barShared = document.getElementById("barShared");
        var barSoloVal = document.getElementById("barSoloVal"), barSharedVal = document.getElementById("barSharedVal");
        var riders = 4;
        var people = [
          { name: "You", flight: "DL 1173", event: "MSG · Aria Vale" },
          { name: "Priya S.", flight: "AA 742", event: "Radio City Live" },
          { name: "Marcus T.", flight: "DL 248", event: "Beacon Theatre" },
          { name: "Ana R.", flight: "WN 2084", event: "MSG · Aria Vale" }
        ];
        var segBtns = document.querySelectorAll("#riderSeg button");
        segBtns.forEach(function (b) {
          b.addEventListener("click", function () {
            segBtns.forEach(function (x) { x.removeAttribute("aria-pressed"); });
            b.setAttribute("aria-pressed", "true");
            riders = parseInt(b.getAttribute("data-riders"), 10);
            renderCalc();
          });
        });
        function money(n) { return "$" + n.toFixed(n % 1 === 0 ? 0 : 2); }
        function renderCalc() {
          var solo = parseInt(fareRange.value, 10);
          fareOut.textContent = "$" + solo;
          var total = solo * (1 + 0.08 * (riders - 1));
          var per = total / riders;
          soloOut.textContent = money(solo);
          sharedOut.textContent = money(Math.round(per));
          var saved = solo - per;
          var pct = Math.round((saved / solo) * 100);
          saveOut.textContent = riders === 1 ? "Add riders to start saving" : "You save " + money(Math.round(saved)) + " (" + pct + "%) vs riding solo";
          var rows = "";
          for (var i = 0; i < riders; i++) {
            rows += "<tr><td>" + people[i].name + "</td><td>" + people[i][mode === "airport" ? "flight" : "event"] + '</td><td class="r">' + money(Math.round(per * 100) / 100) + "</td></tr>";
          }
          splitBody.innerHTML = rows;
          barSolo.style.width = "100%";
          barShared.style.width = Math.max(6, (per / solo) * 100) + "%";
          barSoloVal.textContent = money(solo);
          barSharedVal.textContent = money(Math.round(per));
        }
        fareRange.addEventListener("input", renderCalc);
        renderCalc();

        /* ============ CHAT DEMO ============ */
        var chatLog = document.getElementById("chatLog");
        var typing = document.getElementById("typing");
        var scripts = {
          airport: [
            { t: "sys", text: "Pool W7 formed · 4 verified travelers → Midtown Manhattan" },
            { t: "sys", text: "Priya S. accepted your invite · AA 742 · landed 14:18", amber: true },
            { t: "msg", who: "Priya S.", color: "#b0562f", text: "Hi everyone! Just grabbed my bag. Where are we meeting?", time: "14:41" },
            { t: "msg", who: "Marcus T.", color: "#2f5fb0", text: "Zone C worked great last time. Pillar 4, by the ride-service sign?", time: "14:42" },
            { t: "msg", who: "Ana R.", color: "#7a3f9e", text: "Perfect. I'm on WN 2084, landing 14:44 — 5 min behind you all", time: "14:42" },
            { t: "msg", me: true, who: "You", text: "Works for me! One hand bag only, fits under the seat.", time: "14:43" },
            { t: "msg", who: "Priya S.", color: "#b0562f", text: "Same here. Calling the group once I clear the doors — number stays hidden, right?", time: "14:44" },
            { t: "sys", text: "Voice call started · numbers hidden · ends with trip" },
            { t: "meet" }
          ],
          concert: [
            { t: "sys", text: "Pool E9 formed · 4 verified ticket-holders → Midtown Manhattan" },
            { t: "sys", text: "Priya S. accepted your invite · Radio City Live · ended 22:18", amber: true },
            { t: "msg", who: "Priya S.", color: "#b0562f", text: "That encore!! Just hit the concourse. Where's our pickup zone?", time: "22:36" },
            { t: "msg", who: "Marcus T.", color: "#2f5fb0", text: "Gate B, 7th Ave exit — the official rideshare zone. I'm already walking there.", time: "22:37" },
            { t: "msg", who: "Ana R.", color: "#7a3f9e", text: "Same pool, different show — Beacon Theatre let out 22:44, I'm 4 min behind you all", time: "22:38" },
            { t: "msg", me: true, who: "You", text: "Perfect. One Uber for the four of us, split in the app like always.", time: "22:39" },
            { t: "msg", who: "Priya S.", color: "#b0562f", text: "Calling the group when I reach the doors — number stays hidden, right?", time: "22:40" },
            { t: "sys", text: "Voice call started · numbers hidden · ends with trip" },
            { t: "meet" }
          ]
        };
        function currentScript() { return scripts[mode]; }
        var timers = [];
        function clearTimers() { timers.forEach(clearTimeout); timers = []; }
        function bubble(item) {
          var d = document.createElement("div");
          if (item.t === "sys") {
            d.className = "sys" + (item.amber ? " amber" : "");
            d.textContent = item.text;
          } else if (item.t === "meet") {
            d.className = "meet-card";
            var m = MODES[mode].meet;
            d.innerHTML = '<div class="mc-t"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0d5c4d" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>' + m.title + '</div>' +
              "<p>" + m.body + "</p>" +
              '<div class="fare"><span>' + m.fareLabel + '</span><b>' + m.fare + '</b></div>';
          } else {
            d.className = "msg " + (item.me ? "me" : "them");
            d.innerHTML = '<span class="who" style="color:' + (item.me ? "#0d7a67" : item.color) + '">' + item.who + '</span>' + item.text + '<span class="time">' + item.time + " ✓✓</span>";
          }
          chatLog.appendChild(d);
          chatLog.scrollTop = chatLog.scrollHeight;
        }
        function playChat() {
          clearTimers();
          chatLog.innerHTML = "";
          if (reduced) { currentScript().forEach(bubble); return; }
          var delay = 350;
          currentScript().forEach(function (item, i) {
            if (item.t === "msg" && !item.me) {
              timers.push(setTimeout(function () { typing.style.display = "flex"; chatLog.scrollTop = chatLog.scrollHeight; }, delay));
              delay += 750;
              timers.push(setTimeout(function () { typing.style.display = "none"; bubble(item); }, delay));
              delay += 550;
            } else {
              timers.push(setTimeout(function () { bubble(item); }, delay));
              delay += item.t === "sys" ? 700 : 600;
            }
          });
        }
        document.getElementById("replayBtn").addEventListener("click", playChat);
        playChat();

        /* send your own message */
        document.getElementById("chatForm").addEventListener("submit", function (e) {
          e.preventDefault();
          var input = document.getElementById("chatText");
          var text = input.value.trim();
          if (!text) return;
          var now = new Date();
          var hh = now.getHours(), mm = now.getMinutes();
          bubble({ t: "msg", me: true, who: "You", text: text.replace(/</g, "&lt;"), time: (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm });
          input.value = "";
        });

        /* masked call */
        var callBar = document.getElementById("callBar");
        document.getElementById("callBtn").addEventListener("click", function () {
          callBar.hidden = false;
          callBar.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
        });
        document.getElementById("endCall").addEventListener("click", function () { callBar.hidden = true; });

        /* ============ JOIN FORM → mailto ============ */
        document.getElementById("joinForm").addEventListener("submit", function (e) {
          e.preventDefault();
          var name = document.getElementById("jName").value.trim();
          var email = document.getElementById("jEmail").value.trim();
          var airport = document.getElementById("jAirport").value;
          var subject = encodeURIComponent("Landpool pilot invite — " + airport);
          var body = encodeURIComponent("Hi Landpool team,\n\nI'd like a pilot invite.\n\nName: " + name + "\nEmail: " + email + "\nAirport I fly into most: " + airport + "\n\nThanks!");
          window.location.href = "mailto:hello@landpool.app?subject=" + subject + "&body=" + body;
        });
      })();
    