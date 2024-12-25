// Respuestas Correctas
const answers = ["A", "M", "E", "R", "I"];

let userAnswers = [];
let currentQuestion = 0;
const questions = [
  { letter: 'A', question: '¿En que provincia se encuentran Pola de Lena y Avilés?', answer: 'Asturias' },
  { letter: 'M', question: '¿Cúal es la capital de España?', answer: 'Madrid' },
  { letter: 'E', question: '¿En que idioma hablan los habitantes de nuestro último viaje?', answer: 'Euskera' },
  { letter: 'R', question: 'Cerca de Murias, llegando a una cascada, hicimos una preciosa...', answer: 'Ruta' },
  { letter: 'I', question: '¿Qué monumento histórico es Santa Cristina de Lena?', answer: 'Iglesia' },
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

let isProcessing = false; // Variable de control para evitar clics repetidos

function submitAnswer() {
  // Si ya estamos procesando, no hacemos nada
  if (isProcessing) return;

  const input = document.getElementById('answer-input');
  const answer = input.value.trim().toLowerCase();
  const button = document.querySelector('button'); // Obtener el botón de responder

  // Deshabilitar el botón para evitar múltiples clics
  button.disabled = true;
  isProcessing = true; // Marcamos que estamos procesando

  if (answer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
    showFeedback('correct'); // Mostrar el feedback de "Correcto"
    currentQuestion++;
    setTimeout(() => {
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showFinalScreen();
      }
      // Habilitar el botón después de un retraso y desbloquear la capacidad de responder
      button.disabled = false;
      isProcessing = false;
    }, 2000); // Espera antes de avanzar
  } else {
    showFeedback('incorrect'); // Mostrar el feedback de "Incorrecto"
    setTimeout(() => {
      // Habilitar el botón después de un retraso y desbloquear la capacidad de responder
      button.disabled = false;
      isProcessing = false;
    }, 2000); // Espera antes de habilitar el botón nuevamente
  }
}

// Mostrar Feedback
function showFeedback(type) {
  const feedback = document.querySelector('.feedback');
  
  // Configurar texto y clase según tipo
  feedback.textContent = type === 'correct' ? '¡Correcto!' : '¡Incorrecto!';
  feedback.className = `feedback ${type} show`;
  
  // Mostrar y ocultar después de 2 segundos
  setTimeout(() => {
    feedback.classList.remove('show');
  }, 2000);
}


// Mostrar Pantalla Final
function showFinalScreen() {
  document.getElementById("question-screen").classList.remove("active");
  document.getElementById("final-screen").classList.add("active");
}

function showHint() {
  const hintText = document.getElementById("hint-text");
  hintText.classList.add("visible");
  hintText.classList.remove("hidden");

  // Opcional: Desactivar el botón después de mostrar la pista
  const hintButton = document.getElementById("hint-button");
  hintButton.disabled = true;
  hintButton.style.opacity = 0.5; // Cambiar la apariencia para indicar que está desactivado
  hintButton.style.cursor = "not-allowed";
}

window.addEventListener('DOMContentLoaded', () => {
  const backgroundVideo = document.getElementById('background-video');
  backgroundVideo.pause(); // Pausamos el video
  backgroundVideo.currentTime = 0; // Reiniciamos al inicio
});

let tiempoReproduceVideo = 8;
function checkSecretWord() {
  const input = document.getElementById("secret-word").value.toUpperCase();
  if (input.toLowerCase() === "ameri") {
    playMusic("assets/false.mp3", 9000, 1500);
    document.getElementById("final-screen").classList.remove("active");
    document.getElementById("countdown-screen").classList.add("active");

    let countdown = 10;
    const countdownElement = document.getElementById("countdown");
    const backgroundVideo = document.getElementById("background-video");

    // Pausamos el video al inicio
    backgroundVideo.pause();
    backgroundVideo.currentTime = 0; // Reinicia el video al comienzo

    // Función de cuenta atrás
    const countdownInterval = setInterval(() => {
      countdownElement.textContent = countdown;

      // Cuando falten 5 segundos, reproducimos el video y comenzamos a mostrarlo
      if (countdown === tiempoReproduceVideo) {
        backgroundVideo.play(); // Inicia la reproducción
      }

      if (countdown <= tiempoReproduceVideo) {
        const opacity = (tiempoReproduceVideo - countdown) / tiempoReproduceVideo; // Incrementa de 0 a 1 en 5 pasos
        backgroundVideo.style.opacity = opacity.toString();
      }

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
    showFailMessage(); // Muestra el mensaje de fallo
  }
}




let lastVolume = 0.15; // Guarda el último volumen usado
function playMusic(value, fadeOutDuration = 1500, fadeInDuration = 1500) {
  // Detener la música actual con un fade out (si existe)
  const currentMusic = Howler._howls[0]; 
  if (currentMusic) {
    lastVolume = currentMusic.volume(); // Guardamos el volumen actual
    currentMusic.fade(currentMusic.volume(), 0, fadeOutDuration); // Fade out de la música actual
    setTimeout(() => {
      currentMusic.stop(); // Detenemos completamente la música actual
    }, fadeOutDuration); // Esperamos que el fade out termine
  }

  // Esperar el fade out y luego reproducir la nueva música
  setTimeout(() => {
    const newMusic = new Howl({
      src: [value],
      autoplay: true,
      loop: true,
      volume: lastVolume, // Comenzamos con el volumen anterior
    });

    newMusic.play();
    newMusic.fade(0, lastVolume, fadeInDuration); // Fade in para la nueva música con el volumen guardado
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
      spread: 120,         // Aumenta la dispersión para que el confeti cubra más área
      startVelocity: 65,    // Aumenta la velocidad de inicio para que el confeti salte más
      elementCount: 100,    // Aumenta el número de piezas de confeti
      decay: 0.94,         // Hace que el confeti se quede flotando más tiempo antes de caer
      origin: { y: 0.9 },  // Mantiene el origen en la parte baja de la pantalla
      colors: ['#ffcc00', '#ff6f00', '#ff4081', '#2196f3', '#4caf50'],  // Colores variados
      shapes: ['square', 'circle'],  // Forma del confeti (puedes elegir entre cuadrado, círculo, etc.)
      gravity: 0.7,         // Controla la gravedad para hacer que el confeti caiga más lento
    });
    
  }