const fragmentShader = `
  uniform sampler2D u_texture;
  uniform float u_inner_rad;
  uniform float u_outer_rad;

  varying vec3 vPos;

  vec4 color() {
    vec2 uv = vec2(0);
    uv.x = (length(vPos) - u_inner_rad) / (u_outer_rad - u_inner_rad);
    if (uv.x < 0.0 || uv.x > 1.0) {
      discard;
    }

    vec4 pixel = texture2D(u_texture, uv);
    return pixel;
  }

  void main() {
    gl_FragColor = color();
  }
`;

export default fragmentShader;
