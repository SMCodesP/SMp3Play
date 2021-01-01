export default function isInteractiveElement(node: EventTarget | null): boolean {
    var intElems = [
        //-- Must be uppercase
        "A", "BUTTON", "INPUT", "TEXTAREA", "VIDEO", "MAP", "OBJECT"
    ];
    if (intElems.indexOf (node.nodeName) >= 0) {
        return true;
    }
    else if (node.nodeName === "BODY") {
        return false;
    }

    return isInteractiveElement(node.parentNode);
}