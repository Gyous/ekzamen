function shuffle(arr) {
  let a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const questionsArea = document.getElementById('questionsArea');

fetch('questions.json')
  .then(response => {
    if (!response.ok) throw new Error('Ошибка загрузки файла с вопросами');
    return response.json();
  })
  .then(data => {
    const shuffledQuestions = shuffle(data);
    questionsArea.innerHTML = ''; // очистить "загрузка..."

    shuffledQuestions.forEach((q, idx) => {
      // Создаём блок вопроса
      const questionBlock = document.createElement('div');
      questionBlock.className = 'question-block';

      // Вопрос
      const questionText = document.createElement('div');
      questionText.className = 'question-text';
      questionText.textContent = `${idx + 1}. ${q.question}`;
      questionBlock.appendChild(questionText);

      // Варианты ответов (без перемешивания)
      const ul = document.createElement('ul');
      ul.className = 'options';
      q.options.forEach(opt => {
        const li = document.createElement('li');
        li.textContent = opt;
        ul.appendChild(li);
      });
      questionBlock.appendChild(ul);

      // Кнопка показать ответ
      const btn = document.createElement('button');
      btn.textContent = 'Показать ответ';
      questionBlock.appendChild(btn);

      // Блок для правильного ответа
      const answerDiv = document.createElement('div');
      answerDiv.className = 'answer';
      answerDiv.style.display = 'none';
      answerDiv.innerHTML = `Правильный ответ: <br> ${q.options[q.answer - 1]}`;
      questionBlock.appendChild(answerDiv);

      btn.addEventListener('click', () => {
        answerDiv.style.display = 'block';
        btn.disabled = true;
      });

      questionsArea.appendChild(questionBlock);
    });
  })
  .catch(err => {
    questionsArea.textContent = 'Не удалось загрузить вопросы: ' + err.message;
  });