function dragUser(user, event) {
    event.dataTransfer.setData('Item', user.id);
}

function touchStart(event) {
    var touch = event.targetTouches[0];
    event.target.dataset.dragging = 'true';
    event.target.dataset.startX = touch.clientX;
    event.target.dataset.startY = touch.clientY;
}

function touchMove(event) {
    var touch = event.targetTouches[0];
    var target = event.target;
    if (target.dataset.dragging === 'true') {
        var deltaX = touch.clientX - target.dataset.startX;
        var deltaY = touch.clientY - target.dataset.startY;
        target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
}

function touchEnd(event) {
    var target = event.target;
    if (target.dataset.dragging === 'true') {
        target.style.transform = '';
        delete target.dataset.dragging;
        delete target.dataset.startX;
        delete target.dataset.startY;

        var dropTarget = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        if (dropTarget && dropTarget.ondrop) {
            var fakeEvent = new Event('drop');
            fakeEvent.dataTransfer = {
                getData: function() {
                    return target.id;
                }
            };
            dropTarget.ondrop(fakeEvent);
        }
    }
}

function dropUser(target, event) {
    var item = event.dataTransfer.getData('Item');
    var itemElement = document.getElementById(item);

    if (canDrop(itemElement, target)) {
        target.appendChild(itemElement);
    } else {
        alert('Este objeto no puede ser movido a esta sección.');
    }
}

function canDrop(item, target) {
    var allItems = [
    'espada-corta','hacha-batalla', 'maza', 'daga', 'escudo', 'escudo-torre', 'arco', 'arco-largo', 'anillo', 'brazalete', 'amuleto',
    'cuero1', 'cuero2', 'cuero3', 'cuero4', 'cuero5',
    'placas1', 'placas2', 'placas3', 'placas4', 'placas5',
    'acero1', 'acero2', 'acero3', 'acero4', 'acero5',
    'escamas1', 'escamas2', 'escamas3', 'escamas4', 'escamas5',
    'mithril1', 'mithril2', 'mithril3', 'mithril4', 'mithril5',
    'potion', 'venda', 'antorcha', 'cuerda', 'aceite'

];
    var equippedWeapons = ['espada-corta','hacha-batalla', 'maza', 'daga','arco', 'arco-largo'];
    var equippedArmor = [
    'escudo','escudo-torre', 'anillo', 'brazalete', 'amuleto',
    'cuero1', 'cuero2', 'cuero3', 'cuero4', 'cuero5',
    'placas1', 'placas2', 'placas3', 'placas4', 'placas5',
    'acero1', 'acero2', 'acero3', 'acero4', 'acero5',
    'escamas1', 'escamas2', 'escamas3', 'escamas4', 'escamas5',
    'mithril1', 'mithril2', 'mithril3', 'mithril4', 'mithril5'
];
    var inventory = allItems; // All items can go to inventory

    if (target.id === 'all-items') {
        return true;
    } else if (target.id === 'equipped-weapons' && equippedWeapons.includes(item.id)) {
        return true;
    } else if (target.id === 'equipped-armor' && equippedArmor.includes(item.id)) {
        return true;
    } else if (target.id === 'inventory' && inventory.includes(item.id)) {
        return true;
    }
    return false;
}

function showDescription(item) {
    var descriptionBox = document.getElementById('description-box');
    descriptionBox.textContent = item.getAttribute('data-description');
}

// Añadir eventos táctiles a los elementos
document.querySelectorAll('.item').forEach(item => {
    item.ondragstart = (event) => dragUser(item, event);
    item.ontouchstart = touchStart;
    item.ontouchmove = touchMove;
    item.ontouchend = touchEnd;
    item.onclick = () => showDescription(item);
    item.onmouseover = () => showDescription(item);
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var item = document.getElementById(data);
    var targetContainer;

    if (ev.target.classList.contains("all-items")) {
        // Si el objetivo es el contenedor, añadir el ítem directamente al contenedor
        targetContainer = ev.target;
    } else {
        // Si no, buscar el contenedor más cercano
        targetContainer = ev.target.closest(".all-items");
    }

    if (targetContainer) {
        targetContainer.appendChild(item);
    } else if (ev.target.classList.contains("item")) {
        ev.target.parentNode.insertBefore(item, ev.target.nextSibling);
    }

    // Reaplicar los estilos para el elemento movido
    item.style.margin = "0 auto 10px";
    item.style.width = "90%";
    item.style.maxWidth = "100px";
    item.style.padding = "3px 5px";
    item.style.textAlign = "center";
    item.style.border = "1px solid #aaa";
    item.style.background = "#ddd";
    item.style.cursor = "move";
    item.style.borderRadius = "5px";
}

