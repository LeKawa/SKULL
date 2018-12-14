var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 10, 1000);
camera.position.z = 100;
camera.position.y = 10;
var renderer = new THREE.WebGLRenderer({alpha: true});



// scene.background = new THREE.Color(0x29BF12, 0);
renderer.setClearColor( 0xffffff, 0);



THREE.ImageUtils.crossOrigin = '*';
var wrapper = new THREE.Object3D;
var textureloader = new THREE.TextureLoader();
var normalEye = textureloader.load('https://s3-us-west-2.amazonaws.com/interaktiv-codepen-assets/Eye_N.jpg');
var normal = textureloader.load('https://s3-us-west-2.amazonaws.com/interaktiv-codepen-assets/Eye_D2.jpg');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var light = new THREE.DirectionalLight(0xfffffff, 1.0);
light.position.set(100, 100, 100);
scene.add(light);
var light2 = new THREE.DirectionalLight(0xffffff, 1.0);
light2.position.set(-100, 100, -100);
scene.add(light2);
var right_eye;
var left_eye;
var skull;
var jaw;
var timer;
var loader = new THREE.BufferGeometryLoader();
loader.load('https://s3-us-west-2.amazonaws.com/interaktiv-codepen-assets/head.json', function(geometry) {
  var material = new THREE.MeshLambertMaterial({

    color: 0xFFFC31
  });
  skull = new THREE.Mesh(geometry, material);
  wrapper.add(skull);
});
loader.load('https://s3-us-west-2.amazonaws.com/interaktiv-codepen-assets/jaw.json', function(geometry) {
  var material = new THREE.MeshLambertMaterial({
    color: 0xFFFC31
  });
  geometry.computeBoundingBox();
  var geodepth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
  jaw = new THREE.Mesh(geometry, material);
  jaw.geometry.translate(0, 0, geodepth / 2);
  jaw.position.z = -geodepth / 2;
  wrapper.add(jaw);
});
loader.load(
  // resource URL

  'https://s3-us-west-2.amazonaws.com/interaktiv-codepen-assets/eyeball.json',
  // Function when resource is loaded
  function(geometry) {
    geometry.center();
    var mat = new THREE.MeshPhongMaterial({
      map: normal,
      color: 0xf2f2f2,
      normalMap: normalEye,
      specular: 0xffffff,
      shininess: 100
    });
    left_eye = new THREE.Mesh(geometry, mat);
    left_eye.position.x = -5.2;
    left_eye.position.y = 3.4;
    left_eye.position.z = 1.65;
    wrapper.add(left_eye);
    right_eye = new THREE.Mesh(geometry, mat);
    right_eye.position.x = 5.2;
    right_eye.position.y = 3.4;
    right_eye.position.z = 1.65;
    wrapper.add(right_eye);
  });
scene.add(wrapper);
var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
var material = new THREE.MeshBasicMaterial({
  color: 0xDEC348,
  visible: false
});
var hiddenPlane = new THREE.Mesh(planeGeometry, material);
hiddenPlane.position.set(0, 0, 50);
scene.add(hiddenPlane);
var mouse = new THREE.Vector2(0, 0);
var point = new THREE.Vector3(0, 0, 0);
var raycaster = new THREE.Raycaster();
camera.lookAt(scene.position);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('resize', onWindowResize, false);


function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObject(hiddenPlane);
  if (intersects.length > 0) {
    point = intersects[0].point;
  }
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  if (right_eye && left_eye) {
    right_eye.lookAt(point);
    left_eye.lookAt(point);
    wrapper.lookAt(point);
  }
  renderer.render(scene, camera);
}
animate();
