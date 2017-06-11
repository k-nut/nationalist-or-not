import getPoliticians from "./api.js"
import {Stack, Direction} from "swing";
import Toast from "./toast"
require("./main.css")

function getImageThumbnail(politician){
    const image = politician.image.value;
    const fileName = _.last(image.split("/"));
    return `https://commons.wikimedia.org/w/thumb.php?width=200&f=${fileName}`
}

document.addEventListener('DOMContentLoaded', function () {
    getPoliticians().then(politicians => {
        const cardStack = document.querySelector('.stack')
        politicians.forEach((pol) => {
            const li = document.createElement("li");
            li.style.backgroundImage = `url(${getImageThumbnail(pol)}`;
            li.dataset.nazi = pol.nationalist.value === "true";
            li.dataset.name = pol.personLabel.value;
            li.dataset.party = pol.partyLabel.value;
            cardStack.appendChild(li)
        });
        cardify()
    });
    const stack =  Stack();


    const cardify = () => {
        Array.from(document.querySelectorAll('.stack li')).forEach(stack.createCard);
    };

    stack.on('throwout', function (e) {
        // for some reason the same event is sometimes triggered twice. We can tell that this
        // is the second time because we have set the display to none already.
        if (e.target.style.display === "none"){
            return
        }

        const personInfo = e.target.dataset;
        const isNationalist = personInfo.nazi === "true";
        const expectedDirection = isNationalist ? Direction.RIGHT : Direction.LEFT;
        if (e.throwDirection === expectedDirection) {
            Toast.correct(`JA! ${personInfo.name} is a member of ${personInfo.party}`)
        } else {
            Toast.wrong(`NEIN! ${personInfo.name} is a member of ${personInfo.party}`)
        }
        e.target.style.display = 'none'; // or remove this dom element completely
    });
});
