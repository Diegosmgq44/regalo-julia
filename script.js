// Respuestas Correctas
const answers = ["A", "M", "E", "R", "I"];

let userAnswers = [];
let currentQuestion = 0;
const questions = [
  { letter: 'A', question: '¿En que provincia se encuentran Pola de Lena y Avilés?', answer: 'a' },
  { letter: 'M', question: '¿Qué género canta?', answer: 'a' },
  { letter: 'E', question: 'Nombre de su álbum más famoso.', answer: 'a' },
  { letter: 'R', question: 'Nombre de su grupo.', answer: 'a' },
  { letter: 'I', question: '¿Qué instrumento toca?', answer: 'a' },
];

function startGame() {
  // Establecer transición de opacidad para el desvanecimiento inicial
  document.body.style.transition = "opacity 1s ease-in-out";
  document.body.style.opacity = 0;
  // Ocultar la pantalla de bienvenida y mostrar la pantalla de introducción
  document.getElementById("start-screen").classList.remove("active");
  document.getElementById("intro-screen").classList.add("active");

  document.body.style.opacity = 1;
  playMusic("assets/navidad.mp3", 0, 1500);
}


function startQuestions() {
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("question-screen").classList.add("active");
  loadQuestion();
}


// Cargar Pregunta
function loadQuestion() {
  const questionTitle = document.getElementById('question-title');
  const questionText = document.getElementById('question-text');
  const input = document.getElementById('answer-input');

  questionTitle.textContent = `Pregunta nº ${currentQuestion + 1}`;
  questionText.textContent = questions[currentQuestion].question;
  input.value = '';
}

function submitAnswer() {
  const input = document.getElementById('answer-input');
  const answer = input.value.trim().toLowerCase();

  if (answer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showFinalScreen();
    }
  } else {
    showFailMessage();  // Muestra el mensaje de fallo
  }
}

// Mostrar Mensaje de Fallo (cuando falla una respuesta)
function showFailMessage() {
  const failMessage = document.getElementById("fail-message");
  failMessage.classList.add("active");
  failMessage.style.display = "flex";

  setTimeout(() => {
    failMessage.classList.remove("active");
    failMessage.style.display = "none";
  }, 2000); // Desaparece después de 2 segundos
  
}

// Mostrar Pantalla Final
function showFinalScreen() {
  document.getElementById("question-screen").classList.remove("active");
  document.getElementById("final-screen").classList.add("active");
}

function checkSecretWord() {
  const input = document.getElementById("secret-word").value.toUpperCase();
  if (input.toLowerCase() === "ameri") {
    playMusic("assets/duki.mp3", 10000, 1500);
    // Ocultamos la pantalla de la palabra secreta
    document.getElementById("final-screen").classList.remove("active");
    // Mostramos la cuenta atrás
    document.getElementById("countdown-screen").classList.add("active");

    let countdown = 10;
    const countdownElement = document.getElementById("countdown");

    // Función de cuenta atrás
    const countdownInterval = setInterval(() => {
      countdownElement.textContent = countdown;
      countdown--;

      if (countdown < 0) {
        clearInterval(countdownInterval);
        // Ocultamos la cuenta atrás y mostramos el "duki-screen"
        document.getElementById("countdown-screen").classList.remove("active");
        document.getElementById("duki-screen").classList.add("active");

        // Aseguramos que las imágenes se muestren con un pequeño retraso
        const image1 = document.getElementById("image1");
        const image2 = document.getElementById("image2");

        setTimeout(() => {
          image1.classList.remove('hidden');
          image2.classList.remove('hidden');
        }, 500); // Un retraso de 500ms para animación

        launchConfetti(); // Lanza el confeti como celebración
      }
    }, 1000); // Cuenta regresiva cada 1 segundo
  } else {
    alert("Palabra incorrecta. Revisa tus respuestas.");
  }
}


function playMusic(value, fadeOutDuration = 1500, fadeInDuration = 1500) {
  // Detener la música actual con un fade out
  const currentMusic = Howler._howls[0]; // Asumimos que solo hay una pista
  if (currentMusic) {
    currentMusic.fade(currentMusic.volume(), 0, fadeOutDuration); // Fade out de la música actual
  }

  // Esperar el fade out y luego reproducir la nueva música
  setTimeout(() => {
    const newMusic = new Howl({
      src: [value],
      autoplay: true,
      loop: true,
      volume: 0.6, // Comenzamos con volumen en 0
    });

    newMusic.play();
    newMusic.fade(0, 0.4, fadeInDuration); // Fade in para la nueva música
  }, fadeOutDuration);
}


document.addEventListener("DOMContentLoaded", function() {
    // Configuración del efecto de nieve usando particles.js
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 100, // Número de copos de nieve
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff" // Color de los copos
        },
        "shape": {
          "type": "circle", // Forma de los copos
          "stroke": {
            "width": 0,
            "color": "#ffffff"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1
          }
        },
        "size": {
          "value": 5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "size_min": 0.1
          }
        },
        "line_linked": {
          "enable": false
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "bottom",
          "random": true,
          "straight": false,
          "out_mode": "out"
        }
      },
      "retina_detect": true
    });
  });

  function launchConfetti() {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.7 }
    });
  }