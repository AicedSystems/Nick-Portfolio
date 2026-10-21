// Menu Bar and Header
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar")
const header = document.querySelector(".header")

if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("active");
    menuIcon.classList.toggle("fa-xmark", isOpen);
    menuIcon.setAttribute("aria-expanded", String(isOpen));
    menuIcon.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      menuIcon.classList.remove("fa-xmark");
      menuIcon.setAttribute("aria-expanded", "false");
      menuIcon.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

////////////////STICKY CONTACT AT FOOTER FOR HOME PAGE////////////
const stickyContactCta = document.querySelector(".stickyContactCta");
const homeSection = document.querySelector("#home");

if (stickyContactCta && homeSection) {
  window.addEventListener("scroll", () => {
    const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;

    if (window.scrollY > homeBottom - 120) {
      stickyContactCta.classList.add("active");
    } else {
      stickyContactCta.classList.remove("active");
    }
  });
}

// CAROUSEL SECTION IN SERVICES 
const reviews = [
  {
    quote: "Nick made the entire process seamless.",
    name: "Jessica M.",
    location: "Lancaster"
  },
  {
    quote: "Professional, responsive, and knowledgeable. The best realtor we’ve worked with.",
    name: "Rogelio Diaz",
    location: "Sylmar"
  },
  {
    quote: "Nick helped us sell our home quickly and for top dollar. We couldn’t be happier.",
    name: "Alex Cardenas",
    location: "Palmdale"
  },
  {
    quote: "He went above and beyond for us. Highly recommend Nick to anyone looking to buy or sell.",
    name: "Morales Family",
    location: "Palmdale"
  }
];
const feedbackQuote = document.querySelector(".feedbackQuote");
const feedbackName = document.querySelector(".feedbackName");
const feedbackDots = document.querySelector(".feedbackDots");

let currentReviewIndex = 0;
let reviewTimer;
const reviewDuration = 5000;

function showReview(index) {
  const review = reviews[index];

  feedbackQuote.textContent = review.quote;
  feedbackName.textContent = `${review.name}, ${review.location}`;

  currentReviewIndex = index;

  const dots = document.querySelectorAll(".feedbackDot");

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  if (dots[index]) {
    dots[index].classList.add("active");
  }

  dots.forEach((dot, dotIndex) => {
    dot.setAttribute("aria-pressed", String(dotIndex === index));
  });

  currentReviewIndex = index;
}


function showNextReview() {
  currentReviewIndex++;

  if (currentReviewIndex >= reviews.length) {
    currentReviewIndex = 0;
  }
  showReview(currentReviewIndex)
}

function createDots() {
  reviews.forEach((review, index) => {
    const dot = document.createElement("button");

    dot.classList.add("feedbackDot");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show review ${index + 1}`);
    dot.setAttribute("aria-pressed", "false");

    dot.addEventListener("click", () => {
      showReview(index);
      resetTimer();
    });
    feedbackDots.appendChild(dot);
  });
};

function startTimer() {
  reviewTimer = setInterval(showNextReview, reviewDuration);
}

function resetTimer() {
  clearInterval(reviewTimer);
  startTimer();
}

if (feedbackQuote && feedbackName && feedbackDots) {
  
  createDots();
  showReview(0);
  startTimer();
}

// PSEUDO CODE FOR FAQ ACCORDION
const faqItems = document.querySelectorAll(".faqItem");

faqItems.forEach((item) => {
  const question = item.querySelector(".faqQuestion");
  const icon = question.querySelector("i");
  const answer = item.querySelector(".faqAnswer");

  // 3. Add a click event to each faqQuestion
  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");

      const faqQuestion = faq.querySelector(".faqQuestion");
      const faqAnswer = faq.querySelector(".faqAnswer");
      faqQuestion.setAttribute("aria-expanded", "false");
      faqAnswer.setAttribute("aria-hidden", "true");

      const faqIcon = faq.querySelector(".faqQuestion i");
      faqIcon.classList.remove("fa-minus");
      faqIcon.classList.add("fa-plus");
    });
    if (!isActive) {
      item.classList.add("active");
      question.setAttribute("aria-expanded", "true");
      answer.setAttribute("aria-hidden", "false");

      icon.classList.remove("fa-plus");
      icon.classList.add("fa-minus");
    }
  });
});


// ///////////CALENDAR LOGIC ///////////////

const timeButtons = document.querySelectorAll(".timeGrid button");
const bookAppointmentBtn = document.querySelector(".bookAppointmentBtn");
const appointmentMessage = document.querySelector(".appointmentMessage");

const calendarMonthLabel = document.querySelector(".calendarMonthLabel");
const calendarDates = document.querySelector(".calendarDates");
const prevMonthBtn = document.querySelector(".prevMonthBtn");
const nextMonthBtn = document.querySelector(".nextMonthBtn");

const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const interestInput = document.querySelector("#interest");
const messageSubmitBtn = document.querySelector(".messageSubmitBtn");
 
let selectedDate = null;
let selectedTime = null;
let appointmentConfirmed = false;
const today = new Date();
today.setHours(0, 0, 0, 0);
const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
let currentMonthDate = new Date(currentMonthStart);



function updateSubmitButton() {
  if (!messageSubmitBtn || !fullNameInput || !emailInput || !phoneInput || !interestInput) {
    return;
  }

  const hasContactInfo =
    fullNameInput.value.trim() &&
    emailInput.value.trim() &&
    phoneInput.value.trim() &&
    interestInput.value;

  const isTourRequest = intent === "tour";

  if (isTourRequest) {
    messageSubmitBtn.innerHTML = appointmentConfirmed
      ? 'Send Consultation Request <i class="fa-regular fa-paper-plane" aria-hidden="true"></i>'
      : "Select a Preferred Date & Time";

    messageSubmitBtn.disabled = !(hasContactInfo && appointmentConfirmed);
  } else {
    messageSubmitBtn.innerHTML = 'Send Message <i class="fa-regular fa-paper-plane"></i>';
    messageSubmitBtn.disabled = !hasContactInfo;
  }

  messageSubmitBtn.classList.toggle("ready", !messageSubmitBtn.disabled);
}

if (fullNameInput && emailInput && phoneInput && interestInput) {
  [fullNameInput, emailInput, phoneInput, interestInput].forEach((input) => {
    input.addEventListener("input", updateSubmitButton);
    input.addEventListener("change", updateSubmitButton);
  });
}
function resetAppointmentSelection() {
  selectedDate = null;
  selectedTime = null;
  appointmentConfirmed = false;

  timeButtons.forEach((button) => {
    button.classList.remove("selectedTime");
    button.setAttribute("aria-pressed", "false");
  });

  appointmentMessage.textContent = "";
  appointmentMessage.classList.remove("error", "success");
}

if (
  calendarMonthLabel &&
  calendarDates &&
  prevMonthBtn &&
  nextMonthBtn &&
  timeButtons.length &&
  bookAppointmentBtn &&
  appointmentMessage
) {
  function renderCalendar() {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();

    const monthName = currentMonthDate.toLocaleDateString("default", {
      month: "long"
    });

    calendarMonthLabel.textContent = `${monthName} ${year}`;
    prevMonthBtn.disabled = currentMonthDate <= currentMonthStart;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    calendarDates.innerHTML = "";

    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptySpace = document.createElement("span");
      emptySpace.classList.add("emptyDate");
      calendarDates.appendChild(emptySpace);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
      const dayButton = document.createElement("button");

      dayButton.type = "button";
      dayButton.textContent = day;
      dayButton.setAttribute("aria-pressed", "false");

      const dateForButton = new Date(year, month, day);
      const isPastDate = dateForButton < today;
      dayButton.disabled = isPastDate;
      dayButton.setAttribute(
        "aria-label",
        `${dateForButton.toLocaleDateString("default", { month: "long", day: "numeric", year: "numeric" })}${isPastDate ? ", unavailable" : ""}`
      );

      dayButton.addEventListener("click", () => {
        const allDateButtons = calendarDates.querySelectorAll("button");

        allDateButtons.forEach((button) => {
          button.classList.remove("selectedDate");
          button.setAttribute("aria-pressed", "false");
        });

        dayButton.classList.add("selectedDate");
        dayButton.setAttribute("aria-pressed", "true");

        selectedDate = {
          day: day,
          month: currentMonthDate.getMonth(),
          year: currentMonthDate.getFullYear()
        };

        

        selectedTime = null;
        appointmentConfirmed = false;

        updateSubmitButton();
        

        timeButtons.forEach((button) => {
          button.classList.remove("selectedTime");
        });

        appointmentMessage.textContent = "";
        appointmentMessage.classList.remove("error", "success");


      });

      calendarDates.appendChild(dayButton);
    }
  }

  timeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!selectedDate) {
        appointmentMessage.textContent = "Please select a date first.";
        appointmentMessage.classList.add("error");
        appointmentMessage.classList.remove("success");
        return;
      }

      timeButtons.forEach((time) => {
        time.classList.remove("selectedTime");
        time.setAttribute("aria-pressed", "false");
      });

      button.classList.add("selectedTime");
      button.setAttribute("aria-pressed", "true");
      selectedTime = button.textContent.trim();
      appointmentConfirmed = false;

      appointmentMessage.textContent = "";
      appointmentMessage.classList.remove("error", "success");

      updateSubmitButton();
    
    });
  });

  bookAppointmentBtn.addEventListener("click", () => {
    if (!selectedDate || !selectedTime) {
        appointmentMessage.textContent = "Please select a preferred date and time.";
      appointmentMessage.classList.add("error");
      appointmentMessage.classList.remove("success");
      return;
    }
    
    appointmentConfirmed = true;

    updateSubmitButton();

    const appointmentDate = new Date(
      selectedDate.year,
      selectedDate.month,
      selectedDate.day
    ).toLocaleDateString("default", { month: "long", day: "numeric", year: "numeric" });

    appointmentMessage.textContent =
      `Preferred date and time selected: ${appointmentDate} at ${selectedTime}. Complete the form to send your request.`;

    appointmentMessage.classList.add("success");
    appointmentMessage.classList.remove("error");
  });

  prevMonthBtn.addEventListener("click", () => {
    if (currentMonthDate <= currentMonthStart) {
      return;
    }

    currentMonthDate.setDate(1);
    currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
    resetAppointmentSelection();
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentMonthDate.setDate(1);
    currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
    resetAppointmentSelection();
    renderCalendar();
  });

  renderCalendar();
}


////////////////////// CONTACT FORM SECTION////////////
const contactForm = document.querySelector(".contactForm");
const formMessage = document.querySelector(".formMessage");

function submitContactRequest(contactData, messageElement, formElement) {
  const submitButton = formElement.querySelector('button[type="submit"]');
  const originalButtonHTML = submitButton ? submitButton.innerHTML : "";

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="buttonSpinner" aria-hidden="true"></span><span>Sending...</span>';
  }

  fetch("https://agentarmijo-api.onrender.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contactData)
  })
  .then((response) => {
    return response.json().then((data) => {
      if (response.ok) {
        messageElement.textContent = data.message;
        messageElement.classList.add("success");
        messageElement.classList.remove("error");
        formElement.reset();
      } else {
        messageElement.textContent = data.message;
        messageElement.classList.add("error");
        messageElement.classList.remove("success");
      }
    });
  })
  .catch(() => {
    messageElement.textContent = "Something went wrong. Please try again.";
    messageElement.classList.add("error");
    messageElement.classList.remove("success");
  })
  .finally(() => {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonHTML;
    }

    if (formElement === contactForm) {
      resetAppointmentSelection();
      updateSubmitButton();
    }
  });
}

function setFormMessage(messageElement, message, type) {
  messageElement.textContent = message;
  messageElement.classList.add(type);
  messageElement.classList.remove(type === "error" ? "success" : "error");
}

function validateContactData(contactData, messageElement) {
  const allowedInterests = ["buying", "selling", "investing", "general"];

  if (!contactData.fullName || !contactData.email || !contactData.phone || !contactData.interest) {
    setFormMessage(messageElement, "Please fill out your name, email, phone number, and interest please.", "error");
    return false;
  }

  if (!allowedInterests.includes(contactData.interest)) {
    setFormMessage(messageElement, "Please Select Interest", "error");
    return false;
  }

  if (!contactData.email.includes("@")) {
    setFormMessage(messageElement, "Please enter a valid email address", "error");
    return false;
  }

  let phoneDigits = "";
  const digits = "0123456789";
  const allowedCharacters = "() -";

  for (const character of contactData.phone) {
    if (digits.includes(character)) {
      phoneDigits = phoneDigits + character;
    } else if (allowedCharacters.includes(character)) {
      // Intentionally allow common phone separators.
    } else {
      setFormMessage(messageElement, "Please Enter a Valid Phone Number", "error");
      return false;
    }
  }

  if (phoneDigits.length !== 10) {
    setFormMessage(messageElement, "Please Enter a Valid Phone Number", "error");
    return false;
  }

  if (contactData.message && contactData.message.length > 1000) {
    setFormMessage(messageElement, "Message Too Long", "error");
    return false;
  }

  return true;
}

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.querySelector("#fullName").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const interest = document.querySelector("#interest").value;
    const message = document.querySelector("#message").value.trim();
    

    const allowedInterests = ["buying", "selling", "investing", "general"];
    

    if (!fullName || !email || !phone || !interest) {
      formMessage.textContent = "Please fill out your name, email, phone number, and interest please.";
      formMessage.classList.add("error");
      formMessage.classList.remove("success");
      return;
    } 
    
    if (intent == "tour" && (!selectedDate || !selectedTime || !appointmentConfirmed)) {
      formMessage.textContent =
      "Please Select a Preferred Tour Date and Time"
      
      formMessage.classList.add("error");
      formMessage.classList.remove("success");
      return;  
    }

    if (!allowedInterests.includes(interest)) {
      formMessage.textContent = "Please Select Interest";
      formMessage.classList.add("error");
      formMessage.classList.remove("success");
      return;
    }
    const preferredDate = selectedDate
    ? `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2,"0")}-${String(selectedDate.day).padStart(2,"0")}`
    :"";
    const preferredTime = selectedTime || "";
    
    if (!email.includes("@")) {
      formMessage.textContent = "Please enter a valid email address"
      formMessage.classList.add("error");
      formMessage.classList.remove("success");
      return;
    }

    let phoneDigits = "";
    const digits = "0123456789";
    const allowedCharacters = "() -";

    for (const character of phone) {
      if (digits.includes(character)) {
        phoneDigits = phoneDigits + character;
      }
      else if (allowedCharacters.includes(character)) {
        // intntionally empty to run next piece and to allow characters
      } else {
        formMessage.textContent = "Please Enter a Valid Phone Number";
          formMessage.classList.add("error");
          formMessage.classList.remove("success");
          return;
      }
    }
        if (phoneDigits.length !== 10) {
          formMessage.textContent = "Please Enter a Valid Phone Number";
          formMessage.classList.add("error");
          formMessage.classList.remove("success");
          return
      }

      if (message && message.length > 1000) {
        formMessage.textContent = "Message Too Long";
          formMessage.classList.add("error");
          formMessage.classList.remove("success");
          return
      }

    const contactData = {
      fullName,
      email,
      phone,
      interest,
      message,
      listingId:  listingId || "",
      intent: intent || "",
      listingPrice: selectedListing ? selectedListing.price : "",
      listingCity: selectedListing ? selectedListing.city : "",
      listingAddress: selectedListing ? selectedListing.address : "",

      preferredDate,
      preferredTime
    };

    submitContactRequest(
      contactData,
      formMessage,
      contactForm
    );
  });
  }
  // Modal
const modal = document.querySelector("#contactModal");
const modalForm = document.querySelector(".modalForm");
const modalFormMessage = document.querySelector(".modalFormMessage");

const openModalBtns = document.querySelectorAll("[data-open-modal]");
const closeModalBtns = document.querySelectorAll("[data-close-modal]");
let lastContactModalTrigger = null;

function setContactModalState(isOpen, trigger = null) {
  if (!modal) return;

  modal.classList.toggle("active", isOpen);
  modal.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen) {
    lastContactModalTrigger = trigger || document.activeElement;
    modal.querySelector(".modalClose").focus();
  } else if (lastContactModalTrigger) {
    lastContactModalTrigger.focus();
    lastContactModalTrigger = null;
  }
}

if (modal) {

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      setContactModalState(true, btn);
    });
  });
  
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setContactModalState(false);
    });
  });
}
  if (modalForm && modalFormMessage) {
    modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      const fullName = modalForm
      .querySelector('[name="fullName"]')
      .value
      .trim();
      
      const phone = modalForm
      .querySelector('[name="phone"]')
      .value
      .trim();
      
      const email = modalForm
      .querySelector('[name="email"]')
      .value
      .trim();
      
      const interest = modalForm
      .querySelector('[name="interest"]')
      .value
      .trim();
      
      const message = modalForm
      .querySelector('[name="message"]')
      .value
      .trim();
      const modalContactData = {
        fullName,
        phone,
        email,
        interest,
        message,
      
        listingId: "",
        intent: "",
        listingPrice: "",
        listingCity: "",
        listingAddress: ""
      };
      

      if (!validateContactData(modalContactData, modalFormMessage)) {
        return;
      }

      submitContactRequest(
        modalContactData,
        modalFormMessage,
        modalForm
      );
    });
  }




// >>>>>>>>>>MODAL FOR LISTINGS PAGE>>>>>>>>>>

// Listings are temporarily disabled during the brokerage transition.
// To reactivate, restore approved data and markup from the ignored private archive,
// then set this flag to true before validating cards, gallery, and contact flows.
const listingsEnabled = false;

const listingData = {};

const listingCards = listingsEnabled ? document.querySelectorAll(".listingCardButton") : [];
const modalImage = document.querySelector(".listingModalImage");

const modalStatus = document.querySelector(".listingModalStatus");
const modalPrice = document.querySelector(".listingModalPrice");
const modalAddress = document.querySelector(".listingModalAddress");
const modalBeds = document.querySelector(".modalBeds");
const modalBaths = document.querySelector(".modalBaths");
const modalSqft = document.querySelector(".modalSqft");
const modalYear = document.querySelector(".modalYear");
const modalDescription = document.querySelector(".listingModalDescription");
const modalHighlights = document.querySelector(".listingModalHighlights");

const listingModal = listingsEnabled ? document.querySelector("#listingModal") : null;
const closeListingModalBtns = document.querySelectorAll("[data-close-listing-modal]");

const modalImageWrap = document.querySelector(".listingModalImageWrap")
const galleryPrev = document.querySelector(".galleryPrev");
const galleryNext = document.querySelector(".galleryNext");
const galleryCurrent = document.querySelector(".galleryCurrent");
const galleryTotal = document.querySelector(".galleryTotal");

const descriptionToggleBtn = document.querySelector(".descriptionToggleBtn");
const descriptionToggleText = document.querySelector(".descriptionToggleBtn span");
let lastListingModalTrigger = null;

function setListingModalState(isOpen, trigger = null) {
  if (!listingModal) return;

  listingModal.classList.toggle("active", isOpen);
  listingModal.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen) {
    lastListingModalTrigger = trigger || document.activeElement;
    listingModal.querySelector(".listingModalClose").focus();
  } else if (lastListingModalTrigger) {
    lastListingModalTrigger.focus();
    lastListingModalTrigger = null;
  }
}


if (listingModal) {

  listingCards.forEach((card) => {
    card.addEventListener("click", () => {
      const listingId = card.dataset.listingId;
      const listing = listingData[listingId];

      if (!listing) {
        return;
      }

      activeListing = listing;
      activeListingId = listingId;
      currentImageIndex = 0;


      modalPrice.textContent = listing.price;
      modalAddress.textContent = `${listing.address}, ${listing.city}`;
      modalBeds.textContent = listing.beds;
      modalBaths.textContent = listing.baths;
      modalSqft.textContent = listing.sqft;
      modalYear.textContent = listing.year;
      modalStatus.textContent = listing.status;

      descriptionExpanded = false;
      activeDescription = listing.description;

      activeShortDescription =
        listing.description.length > 150
          ? `${listing.description.slice(0, 150)}...`
          : listing.description

      modalDescription.textContent = activeShortDescription;

      descriptionToggleBtn.hidden = listing.description.length <= 150;
      descriptionToggleText.textContent = "Read More";
      descriptionToggleBtn.classList.remove("expanded");
      descriptionToggleBtn.setAttribute("aria-expanded", "false");

      modalHighlights.innerHTML = "";

      listing.highlights.forEach((highlight) => {
        const li = document.createElement("li");
        li.textContent = highlight;
        modalHighlights.appendChild(li);
      });

      updateGalleryImage();
      modalImage.alt = listing.address;

      setListingModalState(true, card);

    });
  });

  let currentImageIndex = 0;
  let activeListing = null;

  let descriptionExpanded = false;
  let activeDescription = "";
  let activeShortDescription = "";

  let touchStartX = 0;
  let touchEndX = 0;

  if (descriptionToggleBtn) {
    descriptionToggleBtn.addEventListener("click", () => {
      descriptionExpanded = !descriptionExpanded;

      if (descriptionExpanded) {
        modalDescription.textContent = activeDescription;
        descriptionToggleText.textContent = "Show Less";
        descriptionToggleBtn.classList.add("expanded");
        descriptionToggleBtn.setAttribute("aria-expanded", "true");
      }
      else {
        modalDescription.textContent = activeShortDescription;
        descriptionToggleText.textContent = "Read More"
        descriptionToggleBtn.classList.remove("expanded");
        descriptionToggleBtn.setAttribute("aria-expanded", "false");
      };
    });
  }

  closeListingModalBtns.forEach((button) => {
    button.addEventListener("click", () => {
      setListingModalState(false);
    });


  });


  function updateGalleryImage() {
    if (!activeListing) {
      return;
    }

    modalImage.src = activeListing.images[currentImageIndex];
    galleryCurrent.textContent = currentImageIndex + 1;
    galleryTotal.textContent = activeListing.images.length;
  }

  function showNextImage() {
    if (!activeListing) {
      return;
    }

    currentImageIndex = currentImageIndex + 1;

    if (currentImageIndex >= activeListing.images.length) {
      currentImageIndex = 0;
    }

    updateGalleryImage();
  }

  function showPrevImage() {
    if (!activeListing) {
      return;
    }

    currentImageIndex = currentImageIndex - 1;

    if (currentImageIndex < 0) {
      currentImageIndex = activeListing.images.length - 1;
    }

    updateGalleryImage();
  }

  galleryNext.addEventListener("click", showNextImage);
  galleryPrev.addEventListener("click", showPrevImage);

  modalImageWrap.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });


  modalImageWrap.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;

    const swipeDistance = touchStartX - touchEndX;
    const minimumSwipeDistance = 50;
    if (swipeDistance > minimumSwipeDistance) {
      showNextImage();
    }

    if (swipeDistance < -minimumSwipeDistance) {
      showPrevImage();
    }
  });


  const listingInterestBtn = document.querySelector(".listingInterestBtn");
  const listingTourBtn = document.querySelector(".listingTourBtn");

  let activeListingId = null;


  listingInterestBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (!activeListing || !activeListingId) {
      return;
    }

    const encodedListingId = encodeURIComponent(activeListingId);

    window.location.href =
      `contact.html?listing=${encodedListingId}&intent=interest#requestInformationSection`;
  });

  listingTourBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (!activeListing || !activeListingId) {
      return;
    }
    const encodedListingId = encodeURIComponent(activeListingId);

    window.location.href =
      `contact.html?listing=${encodedListingId}&intent=tour#calendarSection`;
  });
}

function trapFocus(event, dialog) {
  const focusableElements = dialog.querySelectorAll(
    'a[href], button:not([disabled]), input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  const focusable = Array.from(focusableElements).filter((element) => element.offsetParent !== null);

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

document.addEventListener("keydown", (event) => {
  if (listingModal && listingModal.classList.contains("active")) {
    if (event.key === "Escape") {
      setListingModalState(false);
    } else if (event.key === "Tab") {
      trapFocus(event, listingModal);
    }
    return;
  }

  if (modal && modal.classList.contains("active")) {
    if (event.key === "Escape") {
      setContactModalState(false);
    } else if (event.key === "Tab") {
      trapFocus(event, modal);
    }
  }
});

const contactFormHeading = document.querySelector(".contactFormHeading");
const selectedPropertyPreview = document.querySelector(".selectedPropertyPreview");
const selectedPropertyImage = document.querySelector(".selectedPropertyImage");
const selectedPropertyAddress = document.querySelector(".selectedPropertyAddress");
const selectedPropertyCity = document.querySelector(".selectedPropertyCity");
const selectedPropertyBeds = document.querySelector(".selectedPropertyBeds");
const selectedPropertyBaths = document.querySelector(".selectedPropertyBaths");
const selectedPropertySqft = document.querySelector(".selectedPropertySqft");
const selectedPropertyPrice = document.querySelector(".selectedPropertyPrice");

const tourCalendarSection = document.querySelector(".tourCalendarSection");
const listingIdInput = document.querySelector(".listingIdInput");
const intentInput = document.querySelector(".intentInput");

const contactHero = document.querySelector(".contactHero");
const openCalendarBtn = document.querySelector(".openCalendarBtn");

const params = new URLSearchParams(window.location.search);

const requestedListingId = params.get("listing");
const intent = params.get("intent");

const selectedListing = listingsEnabled && requestedListingId ? listingData[requestedListingId] : null;
const listingId = selectedListing ? requestedListingId : "";

if (listingIdInput) {
  listingIdInput.value = listingId || "";
}
if (intentInput) {
  intentInput.value = intent || "";
}
if (contactFormHeading) {
  

  if (!listingId || !selectedListing) {
    selectedPropertyPreview.hidden = true;
    tourCalendarSection.hidden = true;
    contactFormHeading.textContent = "Send Me a Message";
  }
  
  else {
    
    selectedPropertyPreview.hidden = false;
    selectedPropertyImage.src = selectedListing.images[0];
    selectedPropertyImage.alt = selectedListing.address;
    selectedPropertyAddress.textContent = selectedListing.address;
    selectedPropertyCity.textContent = selectedListing.city;
    selectedPropertyBeds.textContent = `${selectedListing.beds} Beds`;
    selectedPropertyBaths.textContent = `${selectedListing.baths} Baths`;
    selectedPropertySqft.textContent = `${selectedListing.sqft} Sq Ft`;
    selectedPropertyPrice.textContent = selectedListing.price;
    
    if (contactHero && selectedListing.images.length > 0) {
      contactHero.style.backgroundImage =
      `url("${selectedListing.heroImage || selectedListing.images[0]}")`;
      
      contactHero.style.backgroundPosition =
      selectedListing.heroPosition || "center center";
      
      contactHero.style.backgroundSize =
      selectedListing.heroSize || "cover";
    }
    
    if (intent === "tour") {
      contactFormHeading.textContent = "Schedule a Private Tour";
      tourCalendarSection.hidden = false;
      if (openCalendarBtn) openCalendarBtn.setAttribute("aria-expanded", "true");
    }
    else {
      contactFormHeading.textContent = "Request Information";
      tourCalendarSection.hidden = true;
    }
  }
  if (openCalendarBtn && tourCalendarSection) {
    openCalendarBtn.addEventListener("click", () => {
      tourCalendarSection.hidden = !tourCalendarSection.hidden;
      openCalendarBtn.setAttribute("aria-expanded", String(!tourCalendarSection.hidden));
    });
  }
}
    




///////////////?REVIEWS SECTION//////////////
const featuredReviews = [
  {
    quote: "“Nick made the entire process stress free and helped us find the perfect home for our family. He truly cares about his clients!”",
    name: "Diaz Family",
    location: "Sylmar, CA",
    rating: 5,
    image: "assets/images/clients/happyclient3.webp",
  },
  {
    quote: "“Professional, responsive, and knowledgeable. The best realtor we’ve worked with.”",
    name: "Lopez Family",
    location: "Palmdale, CA",
    rating: 5,
    image: "assets/images/clients/happyclient2.webp",
  },
  {
    quote: "“Nick helped us sell our home quickly and for top dollar. We couldn’t be happier.”",
    name: "Cardenas Family",
    location: "Palmdale, CA",
    rating: 5,
    image: "assets/images/clients/happyclient1.webp",
  }
]

const featuredReviewImg = document.querySelector(".featuredReviewImg");
const featuredReviewQuote = document.querySelector(".featuredReviewQuote");
const featuredReviewName = document.querySelector(".featuredReviewName");
const featuredReviewLocation = document.querySelector(".featuredReviewLocation");
const featuredReviewRating = document.querySelector(".featuredReviewRating");
const featuredReviewDots = document.querySelector(".featuredReviewDots");

if (featuredReviewImg && featuredReviewQuote && featuredReviewName) {
  let currentFeaturedReviewIndex = 0;
  let featuredReviewTimer;
  const featuredReviewDuration = 7000;

  function showFeaturedReview(index) {
    const featuredReview = featuredReviews[index];

    featuredReviewImg.src = featuredReview.image;
    featuredReviewImg.alt = `${featuredReview.name} review`

    featuredReviewQuote.textContent = featuredReview.quote;
    featuredReviewName.textContent = featuredReview.name;
    featuredReviewLocation.textContent = featuredReview.location;

    featuredReviewRating.innerHTML = "";
    for (let i = 0; i < featuredReview.rating; i++) {
      const star = document.createElement("i");
      star.classList.add("fa-solid", "fa-star");
      featuredReviewRating.appendChild(star);
    }
    currentFeaturedReviewIndex = index;
    const dots = featuredReviewDots.querySelectorAll(".featuredReviewDot")

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }
  function showNextFeaturedReview() {
    currentFeaturedReviewIndex++;

    if (currentFeaturedReviewIndex >= featuredReviews.length) {
      currentFeaturedReviewIndex = 0;
    }
    showFeaturedReview(currentFeaturedReviewIndex);
  }
  function showPrevFeaturedReview() {
    currentFeaturedReviewIndex--;

    if (currentFeaturedReviewIndex < 0) {
      currentFeaturedReviewIndex = featuredReviews.length - 1;
    }
    showFeaturedReview(currentFeaturedReviewIndex);
  }
  function createReviewDots() {
    featuredReviewDots.innerHTML = "";

    featuredReviews.forEach((featuredReview, index) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.classList.add("featuredReviewDot")

      dot.addEventListener("click", () => {
        showFeaturedReview(index);
        resetFeatureReviewTimer();
      });
      featuredReviewDots.appendChild(dot);
    });
  }
  function startFeatureReviewTimer() {
    featuredReviewTimer = setInterval(showNextFeaturedReview, featuredReviewDuration);
  }
  function resetFeatureReviewTimer() {
    clearInterval(featuredReviewTimer);
    startFeatureReviewTimer();
  }

  createReviewDots();
  showFeaturedReview(0);
  startFeatureReviewTimer();


}
updateSubmitButton();
