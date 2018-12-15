var firstgif = document.querySelectorAll('.secondgif_item');
var secondgif = document.querySelectorAll('.firstgif_item');
var thirdgif = document.querySelectorAll('.thirdgif_item');
var fourthgif = document.querySelectorAll('.fourthgif_item');
var firsttext = document.querySelectorAll('.firsttext_item');
var secondtext = document.querySelectorAll('.secondtext_item');
var thirdtext = document.querySelectorAll('.thirdtext_item');

var counter = 0;
var intervalId = null;

function finish() {
  clearInterval(intervalId);
  counter = 0;
  intervalIId = setInterval(test, 100);

  function test() {
    counter++;
    if (counter == 7) finished();
    else {
      firstgif[counter].style.display = "none";
      thirdtext[counter].style.display = "none";
      fourthgif[counter].style.display = "none";
      thirdgif[counter].style.display = "none";
      secondgif[counter].style.display = "none";
      firsttext[counter].style.display = "none";
      secondtext[counter].style.display = "none";
    }
  }
}

function cascada() {
  counter++;
  if (counter == 7) finish();
  else {
    console.log('coucou');
    thirdtext[counter].style.display = "flex";
    secondtext[counter].style.display = "flex";
    firsttext[counter].style.display = "flex";
    firstgif[counter].style.display = "block";
    fourthgif[counter].style.display = "block";
    thirdgif[counter].style.display = "block";
    secondgif[counter].style.display = "block";
  }
}

function start() {
  skullBite()
  intervalId = setInterval(cascada, 100);

}

function finished() {
  clearInterval(intervalIId);
  counter = 0;
}



function skullBite() {
  var target = new THREE.Vector3();
  target.copy(point);
  TweenMax.to(jaw.rotation, .2, {
    x: 0.5
  });
  TweenMax.to(jaw.rotation, .1, {
    x: 0,
    delay: .2
  });
  TweenMax.to(wrapper.position, .2, {
    x: target.x,
    y: target.y,
    z: target.z,
    repeat: 1,
    yoyo: true
  });

}
