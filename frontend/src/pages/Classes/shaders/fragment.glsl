varying vec2 vUv;
varying vec3 vEye;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float velocity;
uniform sampler2D tate;
uniform sampler2D matcaps;
uniform sampler2D tDiffuse;

uniform vec2 uResolution;

varying float test;

float PI = 3.141592653589793238;


void main() {


  vec4 image = texture2D(tate, vUv);
  float vignette = smoothstep(0.8, 0.5, distance(vUv, vec2(0.5)));
  image *= vignette - .3;
  gl_FragColor = image;

}