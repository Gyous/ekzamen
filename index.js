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
    questionsArea.innerHTML = '';

    shuffledQuestions.forEach((q, idx) => {
      const questionBlock = document.createElement('div');
      questionBlock.className = 'question-block';

      const questionText = document.createElement('div');
      questionText.className = 'question-text';
      questionText.textContent = `${idx + 1}. ${q.question}`;
      questionBlock.appendChild(questionText);

      const ul = document.createElement('ul');
      ul.className = 'options';
      q.options.forEach(opt => {
        const li = document.createElement('li');
        li.textContent = opt;
        ul.appendChild(li);
      });
      questionBlock.appendChild(ul);

      questionsArea.appendChild(questionBlock);
    });
  })
  .catch(err => {
    questionsArea.textContent = 'Не удалось загрузить вопросы: ' + err.message;
  });
