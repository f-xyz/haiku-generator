const randomInt = (max) => Math.floor(Math.random() * max);
const randomItem = (list) => list[randomInt(list.length)];

module.exports = {
    randomInt,
    randomItem
};