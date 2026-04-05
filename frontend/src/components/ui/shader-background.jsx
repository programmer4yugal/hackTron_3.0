import React, { useEffect, useRef } from "react";

// This component creates a cyberpunk animated background using canvas and WebGL shaders
const ShaderBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Vertex shader
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;
    // Fragment shader (purple neon waves)
    const fsSource = `
      precision mediump float;
      uniform vec2 uResolution;
      uniform float uTime;
      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        float y = 0.5;
        float wave = 0.0;
        for (float i = 1.0; i < 8.0; i += 1.0) {
          wave += 0.04 / i * sin(uv.x * 10.0 * i + uTime * (0.7 + i * 0.15));
        }
        float glow = smoothstep(0.01, 0.02, abs(uv.y - y - wave));
        vec3 color = mix(vec3(0.1,0.05,0.2), vec3(0.8,0.3,1.0), glow);
        gl_FragColor = vec4(color, 1.0);
      }
    `;
    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }
    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    // Set up geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1, 1, -1, -1, 1, 1, 1
      ]),
      gl.STATIC_DRAW
    );
    const aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
    gl.enableVertexAttribArray(aVertexPosition);
    gl.vertexAttribPointer(aVertexPosition, 2, gl.FLOAT, false, 0, 0);
    // Uniforms
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    // Animation loop
    let animationId;
    function render(time) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, time * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Responsive canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};

export default ShaderBackground;