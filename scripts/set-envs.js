
const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environments.ts';

const envFileContent = `
  export const environment = {
    maptiler_key: "${ process.env['MAPTILER_KEY'] }",
    otra: "PROPIEDAD",
  }
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync( targetPath, envFileContent );
