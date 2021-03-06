$(document).ready(function () {
  var count = 0;
  $(".car").on( "click", function(e) {
    e.preventDefault();
    $('.car').addClass('animated');
    setTimeout(() => { $('.car').removeClass('animated');}, 600);
    count++;
    if (count > 4){
     $(".car").attr('src','/assets/broken_car2.png');
    }
    if (count > 20){
      $(".car").attr('src','/assets/tires.png');
      $(".car").css('width','210px');
      
    }
  
})
  
  

const options = {
  radius: 100, // explosion size
  variation: 10, // randomized variation on each point's angle
  points: 5, // number of points in explosion

}
const inputs = document.querySelectorAll('input, select'); 
const main = document.querySelector('.car');
let clicked = false;

// Event Listeners
inputs.forEach(input => {
  input.addEventListener('change', handleInput);
  input.addEventListener('mousemove', () => {
  });
  // initialize options
  input.dispatchEvent(new Event('change'));
});

document.addEventListener('mousedown', () => clicked = true);
document.addEventListener('mouseup', () => clicked = false);
main.addEventListener('click', e => explode(e, options));

//Car explosion animation
function explode(e, options) {
  const container = document.createElement('div');
  container.classList.add('particles-container');
  container.style.left = e.clientX + "px";
  container.style.top = e.clientY + "px";
  document.body.appendChild(container);
	
  for (let i = 0; i < options.points; i++) {
    const referenceAngle = (360 / options.points) * (i + 1);
    const maxAngle = referenceAngle + parseFloat(options.variation);
    const minAngle = referenceAngle - parseFloat(options.variation);
    
    const angle = randomAngleBetween(minAngle, maxAngle);
    const x = Math.cos(angle) * options.radius;
    const y = Math.sin(angle) * options.radius;
    const popup = document.createElement('div');
    popup.textContent = `${options.character}`;
    popup.classList.add('particle');
    popup.style.top = y + "px";
    popup.style.left = x + "px";
    container.appendChild(popup);
		
      if (i == 0) {
        popup.addEventListener('animationend', () => {
          document.body.removeChild(container);
        });
      }
	}
  }
  
  //Changes angle of particles
  function randomAngleBetween(minAngle, maxAngle) {
	return (Math.random() * (maxAngle - minAngle) + minAngle) / 180 * Math.PI - Math.PI/2;
  }

  //Handles input based on duration
  function handleInput() {
    const option = this.dataset.option;
    options[option] = this.value;
	 if (option == 'duration') {
      document.documentElement.style.setProperty('--duration', `${this.value}s`);
      }
  }


});
