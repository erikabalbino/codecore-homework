

document.querySelectorAll('.letter').forEach(node => {

  node.addEventListener('click', () => {

    const {currentTarget} = event;
    let correctLetter = 0;
    currentTarget.style.cursor = 'pointer';
    currentTarget.style.backgroundColor = 'red';
    currentTarget.style.color = 'white';
    let hiddenLetters = document.querySelectorAll('.word > p')

    hiddenLetters.forEach( hidden => {

      if (hidden.innerHTML === currentTarget.innerHTML) {
        hidden.style.visibility = 'visible'
        correctLetter ++;
        console.log(correctLetter);
      }

    })
  });
});
