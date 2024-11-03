uniform float velocity;
uniform float direction;

uniform float time;
varying vec2 vUv;

varying vec3 vEye;
varying vec3 vPosition;
varying vec3 vNormal;
varying float test;

uniform bool uisMobile;

#define PI 3.14159265359
#define HALF_PI 1.57079632679

#define easeCircOut(a) (sqrt(1.0 - pow((a) - 1.0, 2.0)))
#define easeCircIn(a) (1.0 - cos((a)*PI*0.5))

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, s, -s, c);
    return m * v;
}
// mat4 rotationMatrix(vec3 axis, float angle) {
//     axis = normalize(axis);
//     float s = sin(angle);
//     float c = cos(angle);
//     float oc = 1.0 - c;

//     return mat4(oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s, 0.0, oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, 0.0, oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c, 0.0, 0.0, 0.0, 0.0, 1.0);
// }

// vec3 rotate(vec3 v, vec3 axis, float angle) {
//     mat4 m = rotationMatrix(axis, angle);
//     return (m * vec4(v, 1.0)).xyz;
// }
// float qinticInOut(float t) {
//     return t < 0.5 ? +16.0 * pow(t, 5.0) : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
// }

void main() {
    vUv = uv;
    vec3 pos = position;
    float distanceFromCenter = abs(modelMatrix * vec4(pos, 1.0)).x;

    if(uisMobile == true)
        pos.y *= 1. + pow(distanceFromCenter, 2.) * 2.;
    else
        pos.y *= 1. + pow(distanceFromCenter, 2.) * .3;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vPosition = position;

}