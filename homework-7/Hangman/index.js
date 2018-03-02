
$(document).ready(function(){

  let j = 0;
  let i = 0;
  let correctLetter = 0;

  document.querySelectorAll('.letter').forEach(node => {

    node.addEventListener('click', () => {
      const {currentTarget} = event;
      let matches = false;
      let hiddenLetters = document.querySelectorAll('.word > p')
      currentTarget.style.cursor = 'pointer';
      currentTarget.style.backgroundColor = 'red';
      currentTarget.style.color = 'white';

      hiddenLetters.forEach( hidden => {
        if (hidden.innerHTML === currentTarget.innerHTML) {
          hidden.style.visibility = 'visible'
          correctLetter++;
          matches = true;
        }
      });

      if (correctLetter >= hiddenLetters.length){
        setTimeout(()=>{
          alert('Congratulations! You Win!')
          location.reload();
        }, 1000);
      }else if (!matches && i < 7) {
        i++;
        document.getElementById("img").src=`./images/${i}.gallows.jpg`;
      };

      if (i >= 7){
        alert('Try again!');
        location.reload();
      }

    });
  });
});
