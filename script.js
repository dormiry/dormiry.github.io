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

const cursor = document.querySelector("#cursor");
const cursorBorder = document.querySelector("#cursor-border");
const cursorPos = { x: 0, y: 0 };
const cursorBorderPos = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
  cursorPos.x = e.clientX;
  cursorPos.y = e.clientY;

  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

requestAnimationFrame(function loop() {
  const easting = 8;
  cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
  cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;
  cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
  requestAnimationFrame(loop);
});

document.querySelectorAll("[data-cursor]").forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    if (item.dataset.cursor === "pointer") {
      cursorBorder.style.setProperty("--size", "30px");
    }
    if (item.dataset.cursor === "pointer2") {
      cursorBorder.style.backgroundColor = "white";
      cursorBorder.style.mixBlendMode = "difference";
      cursorBorder.style.setProperty("--size", "80px");
      cursor.style.opacity = "0";
    }
  });
  item.addEventListener("mouseout", (e) => {
    cursorBorder.style.backgroundColor = "unset";
    cursorBorder.style.mixBlendMode = "unset";
    cursorBorder.style.setProperty("--size", "50px");
    cursor.style.opacity = "1";
  });
});


// Preview Image

// const linkImage = document.querySelector('.link-image');

// function showImgContent(e) {
//   x = e.clientX;
//   y = e.clientY;
//   linkImage.style.transform = `translate3d(${x}px, ${y}px, 0)`;

// }

// document.addEventListener('mousemove', showImgContent);