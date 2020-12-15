var createElementByText = (textHTML) => {
    let template = document.createElement('template');
    textHTML = textHTML.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = textHTML;
    return template.content.firstChild;
}