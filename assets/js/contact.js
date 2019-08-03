const wpcf7Elm = document.querySelector(".wpcf7-form");

const nextButton = document.createElement("p")
nextButton.classList.add('next-button')
nextButton.innerHTML = `<input type="button" value="">`
wpcf7Elm.appendChild(nextButton)

const form = document.querySelector(".chat");
const messagesList = document.querySelector(".messages");
let state = 0;
const states = ["yourName", "yourMessage", "yourEmail", "confirm"];
const userMessages = [];
let currentState = states[state % 4];
let confirmBoxes = null
let formSubmitButtons = null
let formResetButtons = null


const textFields = document.querySelectorAll(`.chat-controls input[type="text"]`);
const submitButton = document.querySelector(`.chat-controls input[type="submit"]`);
const buttonButton = document.querySelector(`.chat-controls input[type="button"]`);

let message;
let userName = "";

const typingBubble = document.createElement("div");
typingBubble.classList.add("typingDots");
typingBubble.innerHTML = `<div class="message fromThem typing"><p><span>•</span><span>•</span><span>•</span></p></div>`;

const confirmModalTemplate = document.getElementById("confirmModal");
var confirmModal = confirmModalTemplate.content.cloneNode(true);


textFields.forEach(textField => {
  textField.addEventListener("keyup", function (e) {
    if (textField.value) {
      buttonButton.style.setProperty("--backgroundColor", "rgba(var(--contactColor), 1)");
      buttonButton.removeAttribute("disabled");
    } else {
      buttonButton.style.setProperty("--backgroundColor", "rgba(var(--grey), 1)");
      buttonButton.setAttribute("disabled", "");
    }

    if (e.which == 13) {
      buttonButton.click();
    }
  });

  textField.addEventListener("keydown", function (e) {
    if (e.which == 13) {
      e.preventDefault();
    }
  });
});


form.setAttribute("data-state", states[0]);

function chatPush(origin, message) {
  //instantiate a variable
  let originClass;

  //set the class based on the origin
  if (origin == "me") {
    originClass = "myMessage";
  } else {
    originClass = "fromThem";
  }

  const newBubble = document.createElement("div");
  newBubble.classList.add("message");
  newBubble.classList.add(originClass);
  newBubble.innerHTML = `<p>` + message + `</p>`;
  messagesList.appendChild(newBubble);
}

function saveName() {
  textFields.forEach(field => {
    if (field.name === "yourName") {
      let str = field.value;
      let words = str.split(" ");
      userName = words[0];
      responses[0] = `Hi, ${userName}! What do you want to say to me?`;
    }
  });
}



buttonButton.addEventListener("click", function (e) {
  e.preventDefault();
  buttonButton.style.setProperty("--backgroundColor", "rgba(var(--grey), 1)");

  message = document.querySelector(`#${currentState}`).value;

  if (message) {
    chatPush("me", message);
    showLatestMessage();
    userMessages.push(message);
    saveName();
    textFields.forEach(field => {
      field.setAttribute("disabled", "");
    });

    if (state < 2) {
      addTypingBubble()
      setTimeout(function () {
        removeTypingBubble()
        chatPush("you", responses[(state % 4) - 1]);
        showLatestMessage();
        textFields.forEach(field => {
          field.removeAttribute("disabled");
        });
        textFields[state].focus();
      }, 2500);

      updateState()

    } else {

      updateState()
      addTypingBubble()
      setTimeout(function () {
        removeTypingBubble()
        addConfirmBox()

        formSubmitButtons.forEach(button => {
          button.addEventListener("click", function (e) {
            e.preventDefault();
            textFields.forEach(field => {
              field.removeAttribute("disabled");
            });
            textFields[state].setAttribute("disabled", "")
            submitButton.click();
            formSubmit()
            button.blur()
          });
        })

        formResetButtons.forEach(button => {
          button.addEventListener("click", function (e) {
            e.preventDefault()
            formReset()
            button.blur()
          })
        })
      }, 2500);
    }

    // currentState = states[state % 4];
  }
});

function showLatestMessage() {
  $(".messages").animate({
      scrollTop: $(".messages")[0].scrollHeight
    },
    1000
  );
}

const addTypingBubble = function () {
  setTimeout(function () {
    messagesList.appendChild(typingBubble);
    showLatestMessage();
  }, 700);
}

const removeTypingBubble = function () {
  messagesList.removeChild(typingBubble);
}

const updateState = function () {
  state = (state + 1) % 4;
  form.setAttribute("data-state", states[state % 4]);
  currentState = states[state % 4];
}

const addConfirmBox = function () {
  messagesList.appendChild(confirmModal.cloneNode(true))
  showLatestMessage();
  confirmBoxes = document.querySelectorAll('.modal-window')
  formSubmitButtons = document.querySelectorAll("button.confirm");
  formResetButtons = document.querySelectorAll("button.cancel");

}


const fadeConfirmBox = function () {
  confirmBoxes.forEach(confirmBox => {
    confirmBox.style.opacity = '.4'
    confirmBox.style.pointerEvents = 'none'
  })
}


const formSubmit = function () {
  fadeConfirmBox()
  addTypingBubble()
  setTimeout(function () {
    removeTypingBubble()
    chatPush("you", `Thank you, ${userName}, I'll get back to you soon! ❤️`);
    showLatestMessage()
  }, 2500);
}

const formReset = function () {
  // messagesList.innerHTML = ""
  textFields.forEach(field => {
    field.value = "";
  })
  updateState()
  fadeConfirmBox()
  addTypingBubble()
  setTimeout(function () {
    removeTypingBubble()
    chatPush("you", "Let's try again! What is your name?");
    showLatestMessage()
    textFields[state].focus();
    textFields.forEach(field => {
      field.removeAttribute("disabled");
    })
  }, 2500);

}

chatPush("you", "Hi! Want to get in touch with me? First tell me what your name is!");
let responses = [
  `Okay, ${userName}! What do you want to say to me?`,
  `Got it – and at what email address should I respond to you?`,
  ``
];

buttonButton.setAttribute("disabled", "");




const workItems = document.querySelectorAll('.work-preview-wrapper')

workItems.forEach(workItem => {
  workItem.classList.add('coming-soon')
})