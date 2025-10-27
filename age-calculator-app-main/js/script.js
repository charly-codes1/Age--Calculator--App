 function calculateAge() {
     const day = document.getElementById("day");
     const month = document.getElementById("month");
     const year = document.getElementById("year");

     const inputs = [day, month, year];
     const errors = document.querySelectorAll("small");

     let hasError = false;

     // Reset errors
     inputs.forEach((input, index) => {
         input.classList.remove("error");
         errors[index].classList.remove("active");
     });

     const d = parseInt(day.value);
     const m = parseInt(month.value);
     const y = parseInt(year.value);

     const today = new Date();
     const currentYear = today.getFullYear();

     // Validation
     if (!d || !m || !y) {
         showError("All fields are required");
         return;
     }
     if (d < 1 || d > 31) {
         setError(day, errors[0], "Must be a valid day");
         hasError = true;
     }
     if (m < 1 || m > 12) {
         setError(month, errors[1], "Must be a valid month");
         hasError = true;
     }
     if (y > currentYear) {
         setError(year, errors[2], "Must be in the past");
         hasError = true;
     }

     const isValidDate = validateDate(y, m, d);
     if (!isValidDate) {
         setError(day, errors[0], "Must be a valid date");
         hasError = true;
     }

     if (hasError) return;

     // Calculate age
     const birthDate = new Date(y, m - 1, d);
     let years = today.getFullYear() - birthDate.getFullYear();
     let months = today.getMonth() - birthDate.getMonth();
     let days = today.getDate() - birthDate.getDate();

     if (days < 0) {
         months--;
         days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
     }

     if (months < 0) {
         years--;
         months += 12;
     }

     animateNumber("years", years);
     animateNumber("months", months);
     animateNumber("days", days);
 }

 function setError(input, errorElement, message) {
     input.classList.add("error");
     errorElement.innerText = message;
     errorElement.classList.add("active");
 }

 function showError(message) {
     const errors = document.querySelectorAll("small");
     const inputs = document.querySelectorAll("input");
     inputs.forEach((input, index) => {
         input.classList.add("error");
         errors[index].innerText = message;
         errors[index].classList.add("active");
     });
 }

 function validateDate(year, month, day) {
     const date = new Date(year, month - 1, day);
     return date.getFullYear() === year &&
         date.getMonth() === month - 1 &&
         date.getDate() === day;
 }

 function animateNumber(id, finalValue) {
     const el = document.getElementById(id);
     let current = 0;
     const increment = Math.ceil(finalValue / 40);
     const interval = setInterval(() => {
         current += increment;
         if (current >= finalValue) {
             current = finalValue;
             clearInterval(interval);
         }
         el.innerText = current;
     }, 20);
 }