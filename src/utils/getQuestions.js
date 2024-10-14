const getQuestions = (lang, theme) => {
  console.log('getQuestions called with:', lang, theme);
  const questions = {
    colors: {
      es: [
        {
          question: '¿De qué color es el cielo en un día soleado?',
          options: ['Azul', 'Verde', 'Rojo'],
          answer: 'Azul',
          audioFile: 'sol',
        },
        {
          question: '¿Qué color tiene un limón?',
          options: ['Amarillo', 'Morado', 'Naranja'],
          answer: 'Amarillo',
          audioFile: 'limon',
        },
        {
          question: '¿De qué color es el pasto?',
          options: ['Verde', 'Azul', 'Marrón'],
          answer: 'Verde',
          audioFile: 'pasto',
        },
      ],
      en: [
        {
          question: 'What color is the sky on a sunny day?',
          options: ['Blue', 'Green', 'Red'],
          answer: 'Blue',
          audioFile: 'sol',
        },
        {
          question: 'What color is a lemmon?',
          options: ['Yellow', 'Purple', 'Orange'],
          answer: 'Yellow',
          audioFile: 'limon',
        },
        {
          question: 'What color is grass?',
          options: ['Green', 'Blue', 'Brown'],
          answer: 'Green',
          audioFile: 'pasto',
        },
      ],
      pt: [
        {
          question: 'Qual é a cor é o céu em um dia ensolarado?',
          options: ['Azul', 'Verde', 'Vermelho'],
          answer: 'Azul',
          audioFile: 'sol',
        },
        {
          question: 'Qual é a cor de um limão?',
          options: ['Amarelo', 'Roxo', 'Laranja'],
          answer: 'Amarelo',
          audioFile: 'limon',
        },
        {
          question: 'De que cor é a grama?',
          options: ['Verde', 'Azul', 'Marrom'],
          answer: 'Verde',
          audioFile: 'pasto',
        },
      ],
    },
    numbers: {
      es: [
        {
          question: '¿Cuántas patas tiene un perro?',
          options: ['4', '2', '6'],
          answer: '4',
          audioFile: 'perro',
        },
        {
          question: '¿Cuántos dedos tienes en una mano?',
          options: ['5', '3', '4'],
          answer: '5',
          audioFile: 'mano',
        },
        {
          question: '¿Cuántos lados tiene un triángulo?',
          options: ['3', '4', '5'],
          answer: '3',
          audioFile: 'triangulo',
        },
      ],
      en: [
        {
          question: 'How many legs does a dog have?',
          options: ['4', '2', '6'],
          answer: '4',
          audioFile: 'perro',
        },
        {
          question: 'How many fingers do you have on one hand?',
          options: ['5', '3', '4'],
          answer: '5',
          audioFile: 'mano',
        },
        {
          question: 'How many sides does a triangle have?',
          options: ['3', '4', '5'],
          answer: '3',
          audioFile: 'triangulo',
        },
      ],
      pt: [
        {
          question: 'Quantas patas tem um cachorro?',
          options: ['4', '2', '6'],
          answer: '4',
          audioFile: 'perro',
        },
        {
          question: 'Quantos dedos você tem em uma mão?',
          options: ['5', '3', '4'],
          answer: '5',
          audioFile: 'mano',
        },
        {
          question: 'Quantos lados tem um triângulo?',
          options: ['3', '4', '5'],
          answer: '3',
          audioFile: 'triangulo',
        },
      ],
    },
    animals: {
      es: [
        {
          question: '¿Qué animal hace queso?',
          options: ['Vaca', 'Perro', 'Conejo'],
          answer: 'Vaca',
          audioFile: 'queso',
        },
        {
          question: '¿Cuál de estos animales puede volar?',
          options: ['Pájaro', 'Perro', 'Conejo'],
          answer: 'Pájaro',
          audioFile: 'volar',
        },
        {
          question: '¿Qué animal tiene una trompa larga?',
          options: ['Elefante', 'León', 'Jirafa'],
          answer: 'Elefante',
          audioFile: 'trompa',
        },
      ],
      en: [
        {
          question: 'Which animal makes cheese?',
          options: ['Cow', 'Dog', 'Rabbit'],
          answer: 'Cow',
          audioFile: 'queso',
        },
        {
          question: 'Which of these animals can fly?',
          options: ['Bird', 'Dog', 'Rabbit'],
          answer: 'Bird',
          audioFile: 'volar',
        },
        {
          question: 'Which animal has a long trunk?',
          options: ['Elephant', 'Lion', 'Giraffe'],
          answer: 'Elephant',
          audioFile: 'trompa',
        },
      ],
      pt: [
        {
          question: 'Que animal faz queijo?',
          options: ['Vaca', 'Cachorro', 'Coelho'],
          answer: 'Vaca',
          audioFile: 'queso',
        },
        {
          question: 'Qual destes animais pode voar?',
          options: ['Pássaro', 'Cachorro', 'Coelho'],
          answer: 'Pássaro',
          audioFile: 'volar',
        },
        {
          question: 'Que animal tem uma tromba longa?',
          options: ['Elefante', 'Leão', 'Girafa'],
          answer: 'Elefante',
          audioFile: 'trompa',
        },
      ],
    },
  };

  return questions[theme]?.[lang] || [];
};

export default getQuestions;
