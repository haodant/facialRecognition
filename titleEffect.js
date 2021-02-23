/*
 ** Using Blotter.js for text effect. https://blotter.js.org/
 */
var text = new Blotter.Text("Bian Lian", {
    family : "'Playfair Display',serif",
    weight: 700,
    size : 80,
    fill: "#00C853",
  });

  var material = new Blotter.RollingDistortMaterial();

  var blotter = new Blotter(material, { texts : text });
  material.uniforms.uSpeed.value = 0;
  material.uniforms.uNoiseDistortVolatility.value = 0;
  material.uniforms.uSineDistortSpread.value = 0;
  material.uniforms.uSineDistortCycleCount.value = 0;
  material.uniforms.uSineDistortAmplitude.value = 0;
  material.uniforms.uRotation.value = 0;

  var scope = blotter.forText(text);

  var titleContainer = document.querySelector(".title");
  var title = document.querySelector(".title h1");

  scope.appendTo(title);

  titleContainer.onmousemove = moveIt;
  titleContainer.onmouseleave = leaveIt;

  function moveIt(e) {
      material.uniforms.uSineDistortSpread.value = e.clientX * 0.0001;
      material.uniforms.uSineDistortCycleCount.value = e.clientX * 0.002;
      material.uniforms.uSineDistortAmplitude.value = 0.05;
      material.uniforms.uDistortPosition.value = [0.62, 0.47];
      material.uniforms.uRotation.value = 175;
  }

  function leaveIt(e) {
    material.uniforms.uSineDistortSpread.value = 0;
    material.uniforms.uSineDistortCycleCount.value = 0;
    material.uniforms.uSineDistortAmplitude.value = 0;
    material.uniforms.uRotation.value = 0;
  }