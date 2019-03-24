const students = document.getElementsByClassName('student-item');
const page = document.querySelector('.page');
const pagination = document.createElement('div');
const ul = document.createElement('ul');
const li = document.createElement('li');
const anchor = document.createElement('a');
const searchBox = document.createElement('div');
const input = document.createElement('input');
const searchButton = document.createElement('button');
const resetButton = document.createElement('button');
const studentList = document.querySelector('.student-list');
const message = document.createElement('p')
const pageHeader = document.querySelector('.page-header');
let matchedStudents = [];

pagination.classList.add('pagination');
anchor.setAttribute('href', '#');
li.appendChild(anchor);
page.appendChild(pagination);
searchBox.classList.add('student-search');
input.setAttribute('placeholder', 'Search for students...');
searchBox.appendChild(input);
searchButton.id = 'search';
searchButton.innerText = 'Search';
resetButton.id = 'reset';
resetButton.innerText = 'Reset';
searchBox.appendChild(searchButton);
searchBox.appendChild(resetButton);
pageHeader.appendChild(searchBox);
message.innerText = 'Not found!';

// hide all students
function hideAll () {
  for (let i=0; i<students.length; i++) {
    students[i].style.display = 'none'
}}

// highlight pagination links
function setActive (num) {
  // first link
  if (document.querySelector('a')) {
    document.querySelector('a').classList.add('active');
    // other links if clicked
    for (let i=0; i<num; i++) {
      document.getElementsByTagName('a')[i].addEventListener('click', function () {
        for (let i=0; i<num; i++) {
          document.getElementsByTagName('a')[i].classList.remove('active');
        }
        this.classList.add('active');
      })
    }
  }
}

// show only first ten students
function showFirstTen (num) {
  for (let i=0; i<num.length; i++) {
    if (i > 9) {
      num[i].style.display = 'none';
    }
  }
}

function createPagination (numOfStudents) {
  showFirstTen(numOfStudents);
  // remove previous pagination
  for (let i=ul.children.length-1; i>=0; i--) {
    ul.children[i].remove();
  }
  // define number of pages needed
  const numOfPages = Math.ceil(numOfStudents.length / 10);
  // append pagination links
  for (let i=0; i<numOfPages; i++) {
    ul.appendChild(li.cloneNode(true))
  }
  pagination.appendChild(ul);
  for (let i=0; i<numOfPages; i++) {
    document.getElementsByTagName('a')[i].innerText = (i+1).toString();
    document.getElementsByTagName('a')[i].addEventListener('click', function () {
      hideAll()
      // define which students to show
      const bottom = i*10;
      const top = i*10+10;
      for (let i=0; i<numOfStudents.length; i++) {
        if (i >= bottom && i < top) {
          numOfStudents[i].style.display = '';
        }
      }
    })
  }
  setActive(numOfPages);
}

function search (numOfStudents) {
  matchedStudents = [];
  hideAll();
  message.remove();
  for (let i=0; i<students.length; i++) {
    if (students[i].innerText.includes(input.value.toLowerCase())) {
      matchedStudents.push(students[i]);
    }
  }
  // show matched students
  for (let i=0; i<students.length; i++) {
    for (let e=0; e<matchedStudents.length; e++) {
      if (students[i] === matchedStudents[e]) {
        students[i].style.display = '';
      }
    }
  }
  if (matchedStudents.length === 0) {
    studentList.appendChild(message);
  }
  createPagination(matchedStudents);
}

function reset () {
  input.value = '';
  message.remove();
  for (let i=0; i<students.length; i++) {
    students[i].style.display = ''
  }
  createPagination(students);
}

createPagination(students);
resetButton.addEventListener('click', reset);
searchButton.addEventListener('click', search);
window.addEventListener('keydown', function(e) {
  if (e.keyCode === 13 && input == document.activeElement) {
    search();
  }
})
