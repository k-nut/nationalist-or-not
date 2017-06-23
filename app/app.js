import getPoliticians from "./api.js"
import { getImageThumbnail } from "./utils.js"
import { Stack, Direction } from "swing";
import Toast from "./toast"
require("./main.css")


const cardify = (stack) => {
    Array.from(document.querySelectorAll('.stack li')).forEach(stack.createCard);
};

document.addEventListener('DOMContentLoaded', () => {
    const stack =  Stack();

    getPoliticians().then(politicians => {
        const cardStack = document.querySelector('.stack');
        politicians.forEach((pol) => {
            const li = document.createElement("li");
            li.style.backgroundImage = `url(${getImageThumbnail(pol)}`;
            li.dataset.nazi = "true";
            li.dataset.name = pol.personLabel.value;
            li.dataset.party = pol.partyLabel.value;
            cardStack.appendChild(li)
        });
        cardify(stack)
    });

    stack.on('throwout', function checkThrow(event) {
        // for some reason the same event is sometimes triggered twice. We can tell that this
        // is the second time because we have set the display to none already.
        if (event.target.style.display === "none"){
            return
        }

        const personInfo = event.target.dataset;
        const isNationalist = personInfo.nazi === "true";
        const expectedDirection = isNationalist ? Direction.RIGHT : Direction.LEFT;
        if (event.throwDirection === expectedDirection) {
            Toast.correct(`JA! ${personInfo.name} is a member of ${personInfo.party}`)
        } else {
            Toast.wrong(`NEIN! ${personInfo.name} is a member of ${personInfo.party}`)
        }
        event.target.style.display = 'none'; // or remove this dom element completely
    });
});
