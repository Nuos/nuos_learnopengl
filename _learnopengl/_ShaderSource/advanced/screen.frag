#version 330 core
in vec2 TexCoords;
out vec4 color;
uniform sampler2D screenTexture;

const float offset = 1.0f / 300;
void main()
{
   // source-code
   //color = texture(screenTexture, TexCoords);

   // post-processing
   vec2 offsets[9] = vec2[] (
                      vec2(-offset,  offset),
                      vec2(0.0f,     offset),
                      vec2( offset,  offset),
                      vec2(-offset,  0.0f),
                      vec2(0.0f,     0.0f),
                      vec2( offset,  0.0f),
                      vec2(-offset,  -offset),
                      vec2(0.0f,     -offset),
                      vec2( offset,  -offset)
   );

   float kernel[9] = float[] (
                      1,   1,   1,
					  1,  -8,   1,
					  1,   1,   1
   );

   vec3 sampleTex[9];
   for(int i = 0; i < 9; i++) {
       sampleTex[i] = vec3(texture(screenTexture, TexCoords.st + offsets[i]));
   }

   vec3 col = vec3(0.0f);
   for (int i = 0; i < 9; i++) {
      col += sampleTex[i] * kernel[i];
   }

   color = vec4(col, 1.0f);

}