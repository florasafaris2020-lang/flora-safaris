/* Flora Safaris — site interactions
   - mobile navigation
   - header state on scroll
   - scroll reveals
   - enquiry form -> pre-filled email to the camp inbox
*/
(function () {
  "use strict";

  var CONTACT_EMAIL = "s.lakhani1@aim.com";
  var CONTACT_PHONE = "+254101490036";

  /* ------------------------------------------------------------- header --- */
  var header = document.querySelector(".site-header");

  if (header && !header.classList.contains("site-header--solid")) {
    var solidate = function () {
      header.classList.toggle("is-solid", window.scrollY > 40);
    };
    solidate();
    window.addEventListener("scroll", solidate, { passive: true });
  }

  /* ---------------------------------------------------------------- nav --- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  /* ------------------------------------------------------------- reveal --- */
  var revealables = document.querySelectorAll(".reveal");

  if (revealables.length) {
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );
      revealables.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealables.forEach(function (el) {
        el.classList.add("is-in");
      });
    }
  }

  /* --------------------------------------------------------------- year --- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* --------------------------------------------------------------- form --- */
  var form = document.querySelector("[data-enquiry-form]");

  if (!form) {
    return;
  }

  var status = form.querySelector(".form-status");

  var setStatus = function (message, kind, mailto) {
    if (!status) return;
    status.className = "form-status is-shown is-" + kind;
    status.textContent = message + " ";
    if (mailto) {
      var link = document.createElement("a");
      link.href = mailto;
      link.textContent = "Open the email again";
      status.appendChild(link);
      status.appendChild(document.createTextNode(" or write to " + CONTACT_EMAIL + "."));
    }
  };

  var fieldValue = function (name) {
    var field = form.elements.namedItem(name);
    return field && field.value ? String(field.value).trim() : "";
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    form.querySelectorAll("[aria-invalid]").forEach(function (el) {
      el.removeAttribute("aria-invalid");
    });
    if (status) {
      status.className = "form-status";
      status.textContent = "";
    }

    var name = fieldValue("name");
    var email = fieldValue("email");
    var phone = fieldValue("phone");
    var arrival = fieldValue("arrival");
    var departure = fieldValue("departure");
    var room = fieldValue("room");
    var guests = fieldValue("guests");
    var message = fieldValue("message");

    var problems = [];

    if (!name) {
      problems.push(["name", "Please tell us your name."]);
    }
    if (!email) {
      problems.push(["email", "Please add an email address so we can reply."]);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      problems.push(["email", "That email address doesn't look right."]);
    }

    if (problems.length) {
      problems.forEach(function (problem) {
        var field = form.elements.namedItem(problem[0]);
        if (field) field.setAttribute("aria-invalid", "true");
      });
      if (form.elements.namedItem(problems[0][0])) {
        form.elements.namedItem(problems[0][0]).focus();
      }
      setStatus(problems[0][1], "error", null);
      return;
    }

    var lines = [
      "Hello Flora Safaris,",
      "",
      "I would like to enquire about a stay with Flora Safaris.",
      "",
      "Name: " + name,
      "Email: " + email,
    ];

    if (phone) lines.push("Phone: " + phone);
    if (arrival) lines.push("Arrival: " + arrival);
    if (departure) lines.push("Departure: " + departure);
    if (room) lines.push("Room type: " + room);
    if (guests) lines.push("Guests / occupancy: " + guests);
    if (message) lines.push("", "Message:", message);

    lines.push("", "Sent from the Flora Safaris website.");

    var subject = "Booking enquiry — " + name;
    var mailto =
      "mailto:" +
      CONTACT_EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(lines.join("\r\n"));

    window.location.href = mailto;

    setStatus(
      "Your email is ready to send. If your mail app didn't open, use the link below,",
      "ok",
      mailto
    );

    form.reset();
  });

  /* Pre-select a room when arriving from a "Enquire about…" link. */
  var roomParam = new URLSearchParams(window.location.search).get("room");
  if (roomParam && form.elements.namedItem("room")) {
    var roomField = form.elements.namedItem("room");
    Array.prototype.forEach.call(roomField.options, function (option) {
      if (option.value.toLowerCase() === roomParam.toLowerCase()) {
        roomField.value = option.value;
      }
    });
  }

  /* Departure can never be before arrival. */
  var arrivalField = form.elements.namedItem("arrival");
  var departureField = form.elements.namedItem("departure");

  if (arrivalField && departureField) {
    var today = new Date().toISOString().slice(0, 10);
    arrivalField.min = today;
    arrivalField.addEventListener("change", function () {
      if (arrivalField.value) {
        departureField.min = arrivalField.value;
        if (departureField.value && departureField.value < arrivalField.value) {
          departureField.value = arrivalField.value;
        }
      }
    });
  }

  /* Keep the fallback phone number on hand for the status area. */
  if (status) {
    status.dataset.phone = CONTACT_PHONE;
  }
})();
