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
  typeIntroText();
  playMusic("assets/navidad.mp3", 0, 1500);
}


function typeIntroText() {
  const introText = document.getElementById('intro-text');
  const story = `
    Prepárate para un emocionante desafío de conocimiento y deducción. 
    Responderás preguntas cuidadosamente seleccionadas, cada una de ellas 
    revelando una letra que te llevará a la palabra secreta final.

    Tu sabrás como debe utilizar las diferentes letras y de donde obtenerlas.
    
    Resuelve cada enigma, y al final... ¡la sorpresa está asegurada! 🎁
    
    ¿Estás lista para demostrar tu ingenio?`;

    document.body.style.opacity = 1;
    //Mostrar el texto de introducción letra por letra
    let i = 0;
    const interval = setInterval(() => {
      introText.textContent += story[i];
      i++;
      if (i >= story.length) {
        clearInterval(interval);
      }
    }, 30);    

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

    // Mostrar directamente las imágenes
    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('images-container');
    imagesContainer.innerHTML = `
      <h1 class="images-title">¡Correcto! Aquí llega tu regalo... 👀 </h1>
        <div class="images">
          <div class="image" id="image1">
            <img class="entrada" src="assets/1.png" alt="Entrada 1">
          </div>
          <div class="image" id="image2">
            <img class="entrada" src="assets/2.png" alt="Entrada 2">
          </div>
        </div>
    `;
    document.body.appendChild(imagesContainer);

    // Asegurarnos de que las imágenes se añadan correctamente
    const image1 = document.getElementById("image1");
    const image2 = document.getElementById("image2");

    setTimeout(() => {
      image1.classList.add('show');
      image2.classList.add('show');
    }, 500); // Un poco de retraso para la animación

    launchConfetti(); // Lanza el confeti como celebración
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