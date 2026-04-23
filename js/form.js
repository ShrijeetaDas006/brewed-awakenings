// ════════════════════════════════════════
// form.js — Reservation form validation
// ════════════════════════════════════════

(function () {
  "use strict";

  const submitBtn = document.getElementById("submitBtn");
  const formMessage = document.getElementById("formMessage");

  // Input references
  const fields = {
    name:   document.getElementById("name"),
    phone:  document.getElementById("phone"),
    date:   document.getElementById("date"),
    time:   document.getElementById("time"),
    guests: document.getElementById("guests"),
  };

  // Error span references
  const errors = {
    name:   document.getElementById("nameError"),
    phone:  document.getElementById("phoneError"),
    date:   document.getElementById("dateError"),
    time:   document.getElementById("timeError"),
    guests: document.getElementById("guestsError"),
  };

  /**
   * Set today as the min date for date picker
   */
  function setMinDate() {
    if (!fields.date) return;
    const today = new Date().toISOString().split("T")[0];
    fields.date.setAttribute("min", today);
  }

  /**
   * Show an error for a specific field
   * @param {string} fieldName
   * @param {string} message
   */
  function showError(fieldName, message) {
    if (errors[fieldName]) errors[fieldName].textContent = message;
    if (fields[fieldName]) fields[fieldName].classList.add("error");
  }

  /**
   * Clear error for a specific field
   * @param {string} fieldName
   */
  function clearError(fieldName) {
    if (errors[fieldName]) errors[fieldName].textContent = "";
    if (fields[fieldName]) fields[fieldName].classList.remove("error");
  }

  /**
   * Validate phone number (Indian format)
   * @param {string} phone
   * @returns {boolean}
   */
  function isValidPhone(phone) {
    const cleaned = phone.replace(/\s+/g, "");
    return /^(\+91|91)?[6-9]\d{9}$/.test(cleaned);
  }

  /**
   * Validates all form fields
   * @returns {boolean} true if all valid
   */
  function validateForm() {
    let isValid = true;

    // Clear all errors first
    Object.keys(errors).forEach(clearError);

    // Name validation
    const nameVal = fields.name.value.trim();
    if (!nameVal) {
      showError("name", "Please enter your name.");
      isValid = false;
    } else if (nameVal.length < 2) {
      showError("name", "Name must be at least 2 characters.");
      isValid = false;
    }

    // Phone validation
    const phoneVal = fields.phone.value.trim();
    if (!phoneVal) {
      showError("phone", "Please enter your phone number.");
      isValid = false;
    } else if (!isValidPhone(phoneVal)) {
      showError("phone", "Enter a valid 10-digit Indian mobile number.");
      isValid = false;
    }

    // Date validation
    const dateVal = fields.date.value;
    if (!dateVal) {
      showError("date", "Please select a date.");
      isValid = false;
    } else {
      const selected = new Date(dateVal);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        showError("date", "Date cannot be in the past.");
        isValid = false;
      }
    }

    // Time validation
    if (!fields.time.value) {
      showError("time", "Please select a time.");
      isValid = false;
    }

    // Guests validation
    if (!fields.guests.value) {
      showError("guests", "Please select your party size.");
      isValid = false;
    }

    return isValid;
  }

  /**
   * Show global form message
   * @param {string} type - 'success' | 'error'
   * @param {string} message
   */
  function showMessage(type, message) {
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = message;
    formMessage.classList.remove("hidden");
    formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /**
   * Reset all form inputs
   */
  function resetForm() {
    Object.values(fields).forEach((field) => {
      if (field) field.value = "";
    });
    document.getElementById("requests").value = "";
    Object.keys(errors).forEach(clearError);
  }

  /**
   * Simulate async form submission
   * @returns {Promise}
   */
  function simulateSubmit() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1200);
    });
  }

  /**
   * Handle form submission
   */
  async function handleSubmit() {
    if (!validateForm()) return;

    // Disable button while submitting
    submitBtn.disabled = true;
    submitBtn.textContent = "Confirming…";

    try {
      await simulateSubmit();

      showMessage(
        "success",
        `🎉 Reservation confirmed for ${fields.name.value.trim()}! We'll send a WhatsApp confirmation to ${fields.phone.value.trim()} shortly.`
      );

      resetForm();
    } catch {
      showMessage("error", "Something went wrong. Please call us at +91 98765 43210.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Confirm Reservation →";
    }
  }

  // Attach submit handler
  if (submitBtn) {
    submitBtn.addEventListener("click", handleSubmit);
  }

  // Clear field error on input
  Object.keys(fields).forEach((key) => {
    if (fields[key]) {
      fields[key].addEventListener("input", () => clearError(key));
      fields[key].addEventListener("change", () => clearError(key));
    }
  });

  setMinDate();
})();
