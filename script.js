// LETTER WRAP ROLL
const letterWrapClass = 'letter-wrap';
const letterWrapElements = document.getElementsByClassName(letterWrapClass);

[...letterWrapElements].forEach(el => {
  letterWrap(el, letterWrapClass);
  letterAnimation(el, letterWrapClass);
});


function letterWrap(el, cls) {
  const words = el.textContent.split(' ');
  const letters = [];
    
  cls = cls || 'letter-wrap'
    
  words.forEach(word => {
    let html = '';
    for (var letter in word) {
      html += `
        <span class="${cls}__char">
          <span class="${cls}__char-inner" data-letter="${word[letter]}">
            ${word[letter]}
          </span>
        </span>
      `;
    };
        
    let wrappedWords = `<span class="${cls}__word">${html}</span>`;
    letters.push(wrappedWords);
  });
    
  return el.innerHTML = letters.join(' ');
}

function letterAnimation(el, cls) {
  const tl = new TimelineMax({ paused: true });
  const characters = el.querySelectorAll(`.${cls}__char-inner`);
  const duration = el.hasAttribute('data-duration') ? el.dataset.duration : 0.3;
  const stagger = el.hasAttribute('data-stagger') ? el.dataset.stagger : 0.03;
    
  el.animation = tl.staggerTo(characters, duration, {
    y: '-100%',
    ease: Power4.easeOut
  }, stagger);
        
  el.addEventListener('mouseenter', (event) => event.currentTarget.animation.play());
  el.addEventListener('mouseout', (event) => el.animation.reverse());
}


// CURSOR

// var cursor = $(".cursor"),
//     follower = $(".cursor-follower");

// var posX = 0,
//     posY = 0;

// var mouseX = 0,
//     mouseY = 0;

// TweenMax.to({}, 0.016, {
//   repeat: -1,
//   onRepeat: function() {
//     posX += (mouseX - posX) / 9;
//     posY += (mouseY - posY) / 9;
    
//     TweenMax.set(follower, {
//         css: {    
//         left: posX - 12,
//         top: posY - 12
//         }
//     });
    
//     TweenMax.set(cursor, {
//         css: {    
//         left: mouseX,
//         top: mouseY
//         }
//     });
//   }
// });

// $(document).on("mousemove", function(e) {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
// });

// $(".link").on("mouseenter", function() {
//     cursor.addClass("active");
//     follower.addClass("active");
// });
// $(".link").on("mouseleave", function() {
//     cursor.removeClass("active");
//     follower.removeClass("active");
// });
