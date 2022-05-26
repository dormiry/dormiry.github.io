

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


// 'HELLO WORLD' Terminal Animation

// function([string1, string2],target id,[color1,color2])    
consoleText(['hello world!'], 'text',['#212220']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    // } else if (letterCount === words[0].length + 1 && waiting === false) {
    //   waiting = true;
    //   window.setTimeout(function() {
    //     x = -1;
    //     letterCount += x;
    //     waiting = false;
    //   }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

// LOAD-IN SCREEN

// function delay(n) {
//   n = n || 2000;
//   return new Promise((done) => {
//       setTimeout(() => {
//           done();
//       }, n);
//   });
// }

// function pageTransition() {
//   var tl = gsap.timeline();
//   tl.to(".loading-screen", {
//       duration: 1.2,
//       width: "100%",
//       left: "0%",
//       ease: "Expo.easeInOut",
//   });

//   tl.to(".loading-screen", {
//       duration: 1,
//       width: "100%",
//       left: "100%",
//       ease: "Expo.easeInOut",
//       delay: 0.3,
//   });
//   tl.set(".loading-screen", { left: "-100%" });
// }

// function contentAnimation() {
//   var tl = gsap.timeline();
//   tl.from(".animate-this", { duration: 1, y: 30, opacity: 0, stagger: 0.4, delay: 0.2 });
// }

// $(function () {
//   barba.init({
//       sync: true,

//       transitions: [
//           {
//               async leave(data) {
//                   const done = this.async();

//                   pageTransition();
//                   await delay(1000);
//                   done();
//               },

//               async enter(data) {
//                   contentAnimation();
//               },

//               async once(data) {
//                   contentAnimation();
//               },
//           },
//       ],
//   });
// });


// WAYPOINTS

var $aboutMe = $('.about-me');

$aboutMe.waypoint(function(direction) {
  if(direction == 'down') {
    $aboutMe.addClass('about-me__animate');
  } else {
    $aboutMe.removeClass('about-me__animate');
  }
  
}, { offset: '70%'})


var $projectList = $('.list');

$projectList.waypoint(function(direction) {
  if(direction == 'down') {
    console.log('hello');
    $projectList.addClass('project-list__animation');
  } 
}, { offset: '70%'})

