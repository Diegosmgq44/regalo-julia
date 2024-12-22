// Respuestas Correctas
const answers = ["A", "M", "E", "R", "I"];
const backgrounds = [
  "linear-gradient(135deg, rgba(34, 139, 34, 0.7) 25%, rgba(220, 20, 60, 0.7) 50%,rgba(255, 223, 186, 0.7) 75%",
  "url('assets/fondo.jpg') no-repeat center center/cover"
]
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
  document.body.style.transition = "opacity 1s ease";
  document.body.style.opacity = 0;

  // Cambiar el fondo de la página al degradado y aplicar la transición de opacidad
  setTimeout(() => {
    document.body.style.background = backgrounds[0]; // Fondo degradado
    document.body.style.opacity = 1; // Volver a mostrar el fondo con una transición suave

    // Después de un segundo, cambiar el fondo a la imagen de fondo.jpg
    setTimeout(() => {
      document.body.style.transition = "background 2s ease"; // Transición suave de fondo
      document.body.style.background = backgrounds[1]; // Fondo con imagen
    }, 1000); // Esperar 1 segundo antes de cambiar a la imagen
  }, 1000); // Primer desvanecimiento de opacidad (1 segundo)

  // Ocultar la pantalla de bienvenida y mostrar la pantalla de introducción
  document.getElementById("start-screen").classList.remove("active");
  document.getElementById("intro-screen").style.display = "block";
  typeIntroText();
  playMusic();
}


function typeIntroText() {
  const introText = document.getElementById('intro-text');
  const story = `
    Prepárate para un emocionante desafío de conocimiento y deducción. 
    Responderás preguntas cuidadosamente seleccionadas, cada una de ellas 
    revelando una letra que te llevará a la palabra secreta final.

    Tu sabrás como debe utilziar las diferentes letras y de donde obtenerlas.
    
    Resuelve cada enigma, y al final... ¡la sorpresa está asegurada! 🎁
    
    ¿Estás lista para demostrar tu ingenio?`;

    let i = 0;
    introText.classList.add('hidden');
  
    // Función para escribir texto con un retraso
    function typeWriter() {
      if (i < story.length) {
        introText.textContent += story.charAt(i);
        i++;
        setTimeout(typeWriter, 50); // Cambiar el 50 por el tiempo que desees entre cada letra
      } else {
        introText.classList.remove('hidden');
        introText.classList.add('visible');
      }
    }
  
    typeWriter();
}


function startQuestions() {
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("question-screen").classList.add("active");
  loadQuestion();
  //playMusic();
}


// Cargar Pregunta
function loadQuestion() {
  const questionTitle = document.getElementById('question-title');
  const questionText = document.getElementById('question-text');
  const input = document.getElementById('answer-input');

  questionTitle.textContent = `Pregunta ${currentQuestion + 1}`;
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
    // Ocultamos la pantalla de la palabra secreta
    document.getElementById("final-screen").classList.remove("active");

    // Mostrar la cuenta atrás
    const countdownElement = document.getElementById("countdown");
    const countdownTimer = document.getElementById("countdown-timer");

    countdownElement.style.opacity = "1";  // Mostrar la cuenta atrás
    
    let countdownValue = 10; // Iniciamos la cuenta atrás en 10 segundos
    const countdownInterval = setInterval(() => {
      countdownTimer.textContent = countdownValue;
      countdownValue--;

      if (countdownValue < 0) {
        clearInterval(countdownInterval);
        countdownElement.style.opacity = "0"; // Ocultamos la cuenta atrás después de que termine

        // Mostrar las imágenes después de la cuenta atrás
        const imagesContainer = document.createElement('div');
        imagesContainer.classList.add('images-container');
        imagesContainer.innerHTML = `
          <h2>¡Correcto! Aquí llega tu regalo... 👀 </h2>
          <div class="image" id="image1">
            <img class="entrada" src="assets/1.png" alt="Entrada 1">
          </div>
          <div class="image" id="image2">
            <img class="entrada" src="assets/2.png" alt="Entrada 2">
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
      }
    }, 1000); // Actualiza cada segundo
  } else {
    alert("Palabra incorrecta. Revisa tus respuestas.");
  }
}





// Música de Fondo
function playMusic() {
  const backgroundMusic = new Howl({
    src: ['assets/navidad.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.4,
  });
  backgroundMusic.play();
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