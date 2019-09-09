const pagination = document.createElement('div');
pagination.classList.add('pagination');
const page = document.querySelector('.page');
page.appendChild(pagination);

const studentItems = document.querySelectorAll('.student-item'),
ul = document.createElement('ul'),
li = document.createElement('li'),
anchor = document.createElement('a'),
searchBox = document.createElement('div'),
input = document.createElement('input'),
searchButton = document.createElement('button'),
resetButton = document.createElement('button'),
message = document.createElement('p');

anchor.setAttribute('href', '#');
li.appendChild(anchor);
searchBox.classList.add('student-search');
input.setAttribute('placeholder', 'Search for students...');
searchBox.appendChild(input);
searchButton.id = 'search';
searchButton.innerText = 'Search';
resetButton.id = 'reset';
resetButton.innerText = 'Reset';
searchBox.appendChild(searchButton);
searchBox.appendChild(resetButton);
document.querySelector('.page-header').appendChild(searchBox);
message.innerText = 'Not found!';

const setDisplay = (students, val) => Array.from(students).forEach(student => student.style.display = val);

const createPagination = students => {
  students.forEach((student, i) => student.style.display = i > 9 ? 'none' : '')
  Array.from(ul.children).forEach(el => el.remove()); // remove previous pagination
  const pagesNeeded = Math.ceil(students.length / 10);
  for (let i = 0; i < pagesNeeded; i++) {
    ul.appendChild(li.cloneNode(true))
  }
  pagination.appendChild(ul);
  for (let i = 0; i < pagesNeeded; i++) {
    document.querySelectorAll('a')[i].innerText = (i+1).toString();
    document.querySelectorAll('a')[i].addEventListener('click', () => {
      setDisplay(studentItems, 'none');
      const bottom = i * 10;
      const top = i * 10 + 10;
      Array.from(students).forEach((student, i) => student.style.display = i >= bottom && i < top ? '' : 'none');
    })
  }
  // highlight page selectors
  if (document.querySelector('a')) {
    document.querySelector('a').classList.add('active');
    document.querySelectorAll('a').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        el.classList.add('active');
      });
    })
  };
}

const search = () => {
  setDisplay(studentItems, 'none');
  let matchedStudents = [];
  message.remove();
  Array.from(studentItems).forEach(student => {
    if (student.innerText.includes(input.value.toLowerCase())) {
      matchedStudents.push(student);
    }
  });
  setDisplay(matchedStudents, '');
  if (matchedStudents.length === 0) {
    document.querySelector('.student-list').appendChild(message);
  }
  createPagination(matchedStudents);
}

const reset = () => {
  input.value = '';
  message.remove();
  setDisplay(studentItems, '');
  createPagination(studentItems);
}

createPagination(studentItems);

resetButton.addEventListener('click', reset);
searchButton.addEventListener('click', search);
window.addEventListener('keydown', e => {
  if (e.keyCode === 13 && input == document.activeElement) {
    search();
  }
})
