export function generateRandomNumber() {
    // Math.random() gera um número aleatório entre 0 e 1 (exclusivo)
    // Multiplicando por 1000000 para obter um número entre 0 e 999999
    // Math.floor() arredonda para o número inteiro mais próximo
    return Math.floor(Math.random() * 1000000);
  }
  