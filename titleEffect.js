/*
 ** Using Blotter.js for text effect. https://blotter.js.org/
 */
var text = new Blotter.Text("Bian Lian", {
    family : "'Playfair Display', Proxima Nova, Futura",
    weight: 700,
    size : 100,
    fill: "#00C853",
  });

  var material = new Blotter.RollingDistortMaterial();

  var blotter = new Blotter(material, { texts : text });

  function animateText() {
    material.uniforms.uSpeed.value = 0.08;
    material.uniforms.uSineDistortSpread.value = 0.6;
    material.uniforms.uSineDistortCycleCount.value = 2;
    material.uniforms.uSineDistortAmplitude.value = 0.13;
    material.uniforms.uNoiseDistortAmplitude.value = 0;
    material.uniforms.uDistortPosition.value = [0.62, 0.47];
    material.uniforms.uRotation.value = 170;
  }
  animateText();


  var scope = blotter.forText(text);

  var titleContainer = document.querySelector(".title");
  var title = document.querySelector(".title a");

  scope.appendTo(title);

  titleContainer.onmousemove = moveIt;
  titleContainer.onmouseleave = animateText;

  function moveIt() {
      material.uniforms.uSineDistortSpread.value = 0;
      material.uniforms.uSineDistortCycleCount.value = 0;
      material.uniforms.uSineDistortAmplitude.value = 0;
      material.uniforms.uRotation.value = 0;
  }
