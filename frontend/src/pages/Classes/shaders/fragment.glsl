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
vec2 matcap(vec3 eye, vec3 normal) {
  vec3 reflected = reflect(eye, normal);
  float m = 2.8284271247461903 * sqrt(reflected.z + 1.0);
  return reflected.xy / m + 0.5;
}
vec3 normals(vec3 pos) {
  vec3 fdx = dFdx(pos);
  vec3 fdy = dFdy(pos);
  return normalize(cross(fdx, fdy));
}

void main() {

 // Prevent texture flipping while rotating
  vec2 muv = matcap(vEye, normalize(vNormal));
  vec4 c = texture2D(matcaps, muv);

  vec4 image = texture2D(tate, vUv);
  float dotSize = 1.;
  vec2 st = vUv * uResolution.xy / dotSize;
  vec2 grid = floor(st);
  vec2 f = fract(st);
  float d = length(f - 0.5);
  float mask = smoothstep(0.5, 0.45, d / 1.3);

  vec4 halftoneImage = image * mask;

  float vignette = smoothstep(0.8, 0.5, distance(vUv, vec2(0.5)));
  halftoneImage *= vignette - .1;
  gl_FragColor = vec4(c.rgb, 1.0);
  gl_FragColor = halftoneImage;
}