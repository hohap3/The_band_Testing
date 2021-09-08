
const ticketBtns = document.querySelectorAll('.tour-ticket-btn');

const modal = document.querySelector('.modal');

const modalSecondClose = document.querySelector('.modal-second-close-btn');

const modalClose = document.querySelector('.modal-close-btn');

const modalContainer = document.querySelector('.form-container');

for (let value of ticketBtns) {
  value.addEventListener('click',() => {
    modal.classList.add('open');
  })
}

// Đóng modal
function closeModal() {
  modal.classList.remove('open');
}

modalSecondClose.addEventListener('click',closeModal);

modalClose.addEventListener('click',closeModal);

modal.addEventListener('click',closeModal);

modalContainer.onclick = (e) => {
  e.stopPropagation();
}