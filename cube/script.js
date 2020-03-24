function main() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvas = document.getElementById('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);


  const renderer = new THREE.WebGLRenderer({canvas:canvas});

  const fov = 60;
  const aspect = width/height;  // the canvas default
  const near = 0.1;
  const far = 5000;
  let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 1500, 1500);//0, 0, 100---500, 400, 1500

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('white');
  scene.add(camera);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    camera.add(light);
  }

  
/*=========================================================================================== */

/*Построение кубика */

  function createMyBox(a, b, c){
      
      //грань 1
      let plane = new THREE.PlaneGeometry(100, 100);
      let planeMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        vertexColors: THREE.FaceColors,
      });
      let meshPlane = new THREE.Mesh(plane, planeMat);
      meshPlane.position.x = a;
      meshPlane.position.y = b;
      meshPlane.position.z = c;
      for(let i = 0; i < plane.faces.length; i+=2){
        plane.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
        plane.faces[i+1].color = plane.faces[i].color;
      }
      scene.add(meshPlane);
      
      //грань 2
      let plane2 = new THREE.PlaneGeometry(100, 100);
      let planeMat2 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        vertexColors: THREE.FaceColors,
      });
      let meshPlane2 = new THREE.Mesh(plane2, planeMat2);
      meshPlane2.position.x = a;
      meshPlane2.position.y = b-50;
      meshPlane2.position.z = c-50;
      meshPlane2.rotation.x = 0.5*Math.PI;
      for(let i = 0; i < plane2.faces.length; i+=2){
        plane2.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
        plane2.faces[i+1].color = plane2.faces[i].color;
      }
      scene.add(meshPlane2);
      
      //грань 3
      let plane3 = new THREE.PlaneGeometry(100, 100);
      let planeMat3 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        vertexColors: THREE.FaceColors,
      });
      let meshPlane3 = new THREE.Mesh(plane3, planeMat3);
      meshPlane3.position.x = a;
      meshPlane3.position.y = b;
      meshPlane3.position.z = c-100;
      meshPlane3.rotation.x = Math.PI;
      for(let i = 0; i < plane3.faces.length; i+=2){
        plane3.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
        plane3.faces[i+1].color = plane3.faces[i].color;
      }
      scene.add(meshPlane3);
      
      //грань 4 
      let plane4 = new THREE.PlaneGeometry(100, 100);
      let planeMat4 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        vertexColors: THREE.FaceColors,
      });
      let meshPlane4 = new THREE.Mesh(plane4, planeMat4);
      meshPlane4.position.x = a;
      meshPlane4.position.y = b+50;
      meshPlane4.position.z = c-50;
      meshPlane4.rotation.x = -0.5*Math.PI;
      for(let i = 0; i < plane4.faces.length; i+=2){
        plane4.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
        plane4.faces[i+1].color = plane4.faces[i].color;
      }
      scene.add(meshPlane4);
      
      //грань 5
      let plane5 = new THREE.PlaneGeometry(100, 100);
      let planeMat5 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        vertexColors: THREE.FaceColors,
      });
      let meshPlane5 = new THREE.Mesh(plane5, planeMat5);
      meshPlane5.position.x = a-50;
      meshPlane5.position.y = b;
      meshPlane5.position.z = c-50;
      meshPlane5.rotation.y = -0.5*Math.PI;
      for(let i = 0; i < plane5.faces.length; i+=2){
        plane5.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
        plane5.faces[i+1].color = plane5.faces[i].color;
      }
      scene.add(meshPlane5);
      
      //грань 6
      let plane6 = new THREE.PlaneGeometry(100, 100);
      let planeMat6 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        vertexColors: THREE.FaceColors,
      });
      let meshPlane6 = new THREE.Mesh(plane6, planeMat6);
      meshPlane6.position.x = a+50;
      meshPlane6.position.y = b;
      meshPlane6.position.z = c-50;
      meshPlane6.rotation.y = 0.5*Math.PI;
      for(let i = 0; i < plane6.faces.length; i+=2){
        plane6.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
        plane6.faces[i+1].color = plane6.faces[i].color;
      }
      scene.add(meshPlane6);
      return [meshPlane, meshPlane2, meshPlane3, meshPlane4, meshPlane5, meshPlane6];
  }
  let box = [];//массив всех кубиков
  box[0] = null;
  let planeBox = [];//массив всех граней
  for(let j = 0; j < 5; j++){
    for(let i = 0; i < 5; i++){
      let myBox = createMyBox(0 + i*200, 200 + j*200, 0);
      box.push(myBox);
      myBox.forEach(x => planeBox.push(x));
    }
  }
  
  /*Построение кубика */

  /*=========================================================================================== */

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  class PickHelper {
    constructor() {
      this.raycaster = new THREE.Raycaster();
      this.pickedObject = null;
      this.pickedObjectSavedColor = 0;
    }
    pick(normalizedPosition, scene, camera, time) {
      // restore the color if there is a picked object
      if (this.pickedObject) {
        this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
        this.pickedObject = undefined;
      }
      // cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, camera);
      // get the list of objects the ray intersected
      const intersectedObjects = this.raycaster.intersectObjects(scene.children);
      if (intersectedObjects.length) {
        // pick the first object. It's the closest one
        this.pickedObject = intersectedObjects[0].object;
        // save its color
        this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
        // set its emissive color to flashing red/yellow
        this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
      }
    }
  }

  const pickPosition = {x: 0, y: 0};
  const pickHelper = new PickHelper();
  clearPickPosition();

  function render(time) {
    time *= 0.0003;  // convert to seconds;
    
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    pickHelper.pick(pickPosition, scene, camera, time);

    renderer.render(scene, camera);
    
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function setPickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / canvas.clientWidth ) *  2 - 1;
    pickPosition.y = (pos.y / canvas.clientHeight) * -2 + 1;  // note we flip Y
  }

  function clearPickPosition() {
    // unlike the mouse which always has a position
    // if the user stops touching the screen we want
    // to stop picking. For now we just pick a value
    // unlikely to pick something
    pickPosition.x = -100000;
    pickPosition.y = -100000;
  }
  window.addEventListener('mousemove', setPickPosition);
  window.addEventListener('mouseout', clearPickPosition);
  window.addEventListener('mouseleave', clearPickPosition);

  window.addEventListener('touchstart', (event) => {
    // prevent the window from scrolling
    event.preventDefault();
    setPickPosition(event.touches[0]);
  }, {passive: false});

  window.addEventListener('touchmove', (event) => {
    setPickPosition(event.touches[0]);
  });

  window.addEventListener('touchend', clearPickPosition);


  function onDocumentMouseDown( event ) {
    let vector = new THREE.Vector3(
    ( event.clientX / window.innerWidth ) * 2 - 1,
    - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
    vector.unproject(camera);
    let raycaster = new THREE.Raycaster(
    camera.position, vector.sub( camera.position ).normalize() );
    //let intersects = raycaster.intersectObjects( objectCube );
    let intersects = raycaster.intersectObjects( planeBox );
    if ( intersects.length > 0 ){
      let index = Math.floor( intersects[0].faceIndex / 2 );
      alert(`Цвет грани: ${intersects[0].face.color.getStyle()}
             Номер кубика: ${Math.ceil((planeBox.indexOf(intersects[0].object)+1)/6)}`);
    }
  }
  window.addEventListener('click', onDocumentMouseDown);
 
}

main();


