export default function isInteractiveElement(node: any): boolean {
    const intElems = ["A", "BUTTON", "INPUT", "TEXTAREA", "VIDEO", "MAP", "OBJECT"];
    if (intElems.indexOf(node.nodeName) >= 0) {
        return true;
    }
    else if (node.nodeName === "BODY") {
        return false;
    }

    return isInteractiveElement(node.parentNode);
}