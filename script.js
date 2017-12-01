/* TREEHOUSE TECHDEGREE FULL STACK JAVASCRIPT - PROJECT 2 - PAGINATION & CONTENT FILTER

What the program does:
It enhances the usability of a web page that has too much information; pagination is handled dynamically 
given an HTML list of students of any size. It displays 10 students per page and buttons can be used to 
jump between the lists of 10 students. A search bar lets users find a particular student, an error message 
is displayed if no elements match the search.*/

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

// function to create all pagination
function createPagination (numOfStudents) {
  showFirstTen(numOfStudents);
  // remove previous pagination
  for (let i=ul.children.length-1; i>=0; i--) {
    ul.children[i].remove();
  }
  // define number of pages needed
  const numOfPages = Math.ceil(numOfStudents.length / 10);
  // append pagination links needed
  for (let i=0; i<numOfPages; i++) {
    ul.appendChild(li.cloneNode(true))
  }
  pagination.appendChild(ul);
  // give numbers to links
  for (let i=0; i<numOfPages; i++) {
    document.getElementsByTagName('a')[i].innerText = (i+1).toString();
    // define links functionality
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

// define search feature
function search (numOfStudents) {
  // clear everything
  matchedStudents = [];
  hideAll();
  message.remove();
  // add matched students to empty array
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
  // display message if no matches are found
  if (matchedStudents.length === 0) {
    studentList.appendChild(message);
  }
  // create new pagination
  createPagination(matchedStudents);
}

// define reset feature
function reset () {
  // clear input and message
  input.value = '';
  message.remove();
  // append to page all students
  for (let i=0; i<students.length; i++) {
    students[i].style.display = ''
  }
  // create new pagination
  createPagination(students);
}

// create initial pagination
createPagination(students);
// add all event listeners
resetButton.addEventListener('click', reset);
searchButton.addEventListener('click', search);
window.addEventListener('keydown', function(e) {
  // if enter key is pressed and input is active then search students
  if (e.keyCode === 13 && input == document.activeElement) {
    search();
  }
})
