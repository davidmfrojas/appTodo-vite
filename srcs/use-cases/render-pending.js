
let element;

/**
 * Actualiza el contador de pendientes
 * @param {String} elementId 
 * @param {Number} count 
 */
export const renderPending = (elementId, count) =>{
    if(!element)
        element = document.querySelector(elementId);
    if(!element) throw new Error(`Element ${htmlElementId} not found`);

    element.innerHTML = count.toString();

}