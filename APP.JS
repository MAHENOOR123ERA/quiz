 const questions = [
  {
    question: "What is the capital of Pakistan?",
    options: ["Lahore", "Islamabad", "Karachi", "Peshawar"],
    correct: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 1
  },
  {
    question: "Who wrote the national anthem of Pakistan?",
    options: ["Hafeez Jalandhari", "Allama Iqbal", "Ahmed Faraz", "Faiz Ahmed Faiz"],
    correct: 0
  },
  {
    question: "What is H2O commonly known as?",
    options: ["Hydrogen", "Oxygen", "Salt", "Water"],
    correct: 3
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Elephant", "Lion", "Leopard"],
    correct: 2
  },
  {
    question: "What is the boiling point of water?",
    options: ["50°C", "90°C", "100°C", "120°C"],
    correct: 2
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    question: "Which organ pumps blood throughout the human body?",
    options: ["Lungs", "Brain", "Heart", "Liver"],
    correct: 2
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
    correct: 2
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
    correct: 1
  },
  {
    question: "Which language is mostly spoken in Brazil?",
    options: ["Spanish", "French", "Portuguese", "English"],
    correct: 2
  },
  {
    question: "How many players are there in a football team?",
    options: ["9", "10", "11", "12"],
    correct: 2
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    correct: 0
  },
  {
    question: "Which country gifted the Statue of Liberty to the USA?",
    options: ["Germany", "Canada", "France", "Italy"],
    correct: 2
  },
  {
    question: "Which ocean is the largest?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3
  },
  {
    question: "What is the hardest natural substance?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correct: 2
  },
  {
    question: "Which famous scientist developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo", "Stephen Hawking"],
    correct: 1
  },
  {
    question: "Which is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correct: 2
  },
  {
    question: "What is the national fruit of Pakistan?",
    options: ["Apple", "Mango", "Banana", "Peach"],
    correct: 1
  },
  {
    question: "Which Islamic month is for fasting?",
    options: ["Ramadan", "Muharram", "Shaban", "Rabi-ul-Awal"],
    correct: 0
  },
  {
    question: "How many legs does a spider have?",
    options: ["6", "8", "10", "12"],
    correct: 1
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correct: 1
  },
  {
    question: "Which element do humans need to breathe?",
    options: ["Carbon", "Hydrogen", "Nitrogen", "Oxygen"],
    correct: 3
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent Van Gogh", "Michelangelo"],
    correct: 0
  },
  {
    question: "How many bones are there in the human body?",
    options: ["206", "210", "198", "216"],
    correct: 0
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correct: 2
  },
  {
    question: "Which instrument is used to see tiny objects?",
    options: ["Telescope", "Microscope", "Periscope", "Kaleidoscope"],
    correct: 1
  },
  {
    question: "What is the fastest land animal?",
    options: ["Lion", "Horse", "Cheetah", "Leopard"],
    correct: 2
  },
  {
    question: "Which Islamic prophet received the Quran?",
    options: ["Musa (A.S)", "Isa (A.S)", "Ibrahim (A.S)", "Muhammad (PBUH)"],
    correct: 3
  },
  {
    question: "Which country is famous for the Eiffel Tower?",
    options: ["France", "Italy", "Germany", "Spain"],
    correct: 0
  }
];

    let currentUser = null;
    let currentIndex = 0;
    let score = 0;
    let timeLeft = 1800;
    let timerId;

    function register() {
      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.email === email)) return alert('User exists!');
      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registered successfully!');
    }

    function login() {
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) return alert('Invalid credentials');
      currentUser = user;
      startQuiz();
    }

    function startQuiz() {
      document.getElementById('registerDiv').classList.add('hidden');
      document.getElementById('loginDiv').classList.add('hidden');
      document.getElementById('quizDiv').classList.remove('hidden');
      timerId = setInterval(() => {
        if (--timeLeft <= 0) return endQuiz();
        document.getElementById('timer').innerText = `Time Left: ${Math.floor(timeLeft/60)}:${(timeLeft%60).toString().padStart(2, '0')}`;
      }, 1000);
      loadQuestion();
    }

    function loadQuestion() {
      const q = questions[currentIndex];
      document.getElementById('questionText').innerText = q.question;
      document.getElementById('options').innerHTML = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => {
          if (i === q.correct) score++;
          nextQuestion();
        };
        document.getElementById('options').appendChild(btn);
      });
    }

    function nextQuestion() {
      currentIndex++;
      if (currentIndex < questions.length) loadQuestion();
      else endQuiz();
    }

    function endQuiz() {
      clearInterval(timerId);
      document.getElementById('quizDiv').classList.add('hidden');
      document.getElementById('resultDiv').classList.remove('hidden');
      const percent = Math.round((score / questions.length) * 100);
      document.getElementById('resultText').innerText = `Correct: ${score}/30 (${percent}%)`;

      const results = JSON.parse(localStorage.getItem('results') || '[]');
      results.push({ user: currentUser.email, score, percent, date: new Date().toLocaleString() });
      localStorage.setItem('results', JSON.stringify(results));
    }

    function viewAttempts() {
      const results = JSON.parse(localStorage.getItem('results') || '[]');
      const userResults = results.filter(r => r.user === currentUser.email);
      document.getElementById('pastAttempts').innerHTML = userResults.map(r => `<p>${r.date}: ${r.score}/30 (${r.percent}%)</p>`).join('');
    }