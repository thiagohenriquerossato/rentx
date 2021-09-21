function teste (frase, letra){
  let counter = 0
  frase.forEach(char=> {
    if(char===letra){
      counter++;
    }
  })
  return counter;
}

function vezesLetraAparece(frase, letra) {
  let counter = 0
  for(let i = 0;i<frase.length;i++){
      if(char===frase[i]){
      counter++;
      }
  }
  return counter;
}
// vezesLetraAparece("The Lord of The Rings", "o")

function doubleTheChances(chances) {
  const double=[];
  for(let i = 1;i<chances[0];i++){
    const aux = chances[i]*2
    double.push(aux);
  }
  console.log(double);
}

doubleTheChances(5,2,3,5,8,10)
