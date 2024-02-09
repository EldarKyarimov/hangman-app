let words = [
    'lion',
    'cow',
    'shark',
    'rabbit',
    'duck',
    'monkey',
    'goat',
    'koala',
    'tiger',
    'penguin',
    'panda',
    'bear',
    'horse',
    'girafee',
    'lizard',
    "zebra"
]

function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

export { randomWord };