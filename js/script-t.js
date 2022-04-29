// =====================================================
// Handle Button Effect
// =====================================================
const toolButtons = document.querySelectorAll('.tool-button');
toolButtons.forEach((button) => {
  button.addEventListener('mousedown', makeBounceEffect);
});

function makeBounceEffect(event) {
  event.target.classList.add('active');
  setTimeout(() => {
    event.target.classList.remove('active');
  }, 200);
}
// =====================================================
// Run Treadmill
// =====================================================
const treadmill = new TreadmillHandler();
treadmill.run();
