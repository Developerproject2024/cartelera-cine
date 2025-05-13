module.exports = {
  // Extensiones de los módulos que Jest puede manejar
  moduleFileExtensions: ['js', 'json', 'ts'],

  // Directorio raíz donde se encuentran tus pruebas
  rootDir: 'test',

  // Expresión regular que indica los archivos de prueba
  testRegex: '.*\\.spec\\.ts$',

  // Configuración de transformadores para TypeScript
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // Archivos que se incluirán para la cobertura
  collectCoverageFrom: [
    '**/*.(t|j)s', // Incluye todos los archivos .ts y .js
    '!**/node_modules/**', // Excluye node_modules
    '!**/test/**', // Excluye los archivos de prueba si no los quieres en la cobertura
  ],

  // Directorio donde se guardarán los resultados de la cobertura
  coverageDirectory: '../coverage',

  // Entorno de prueba
  testEnvironment: 'node',

  // Opciones de cobertura adicionales
  coverageReporters: ['text', 'lcov', 'json', 'html'], // Puedes elegir otros formatos de reporte

  // Configuración adicional para que Jest muestre la cobertura de manera más legible
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
