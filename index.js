import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */


const fetchColors = ({ name, hex, compName, compHex }) => 
  
  {
   return fetch(COLORS)

    .then((response) => {
      if (!response.ok) {
       throw new Error(`HTTP error, status = ${response.status}`);
      }
      return response.json();
    })

    .then((data) => {

      //create an empty array for appending future results, use "let" because it's block-scoped
      let result = []

      //iterate through data by each element
      data.forEach(element => {

        //since Complimentary colors and hex codes are by themselves arrays, 
        //we first make them their own total element "comp" and then iterate through it later
        //therefore our "element" only has 3 arguments at the moment
        const {name: colorName, hex: colorHex, comp} = element;

          //check if the name in the JSON value includes the passed name
          if (name                                                    //checks it is defined first
            && colorName.toLowerCase().includes(name.toLowerCase())   //case insenstitive 
            && !result.some(item => item.name === colorName)) {       //checks if already in the list to not add duplicates
            result.push(element);                                     //if all passed, adds this element to the result array
          }
          
          //else, we check for hex codes, all similar to above with one exception
          else if (hex 
            && hex.toLowerCase() == colorHex.toLowerCase()            //uses == because hex can be passed as string or value
            && !result.some(item => item.hex === colorHex)) {
            result.push(element);
          } 

          //now we iterate through complimentary parameters, similar logic to above 
        comp.forEach(({ name: compColorName, hex: compColorHex }) => {
          
          if (compName 
            && compColorName.toLowerCase().includes(compName.toLowerCase())
            && !result.some(item => item.name === compColorName)) {
            result.push(element);
          }

          else if (compHex 
            && compHex.toLowerCase() == compColorHex.toLowerCase()
            && !result.some(item => item.hex === compColorHex)) {
            result.push(element);
          }
        }); 

        })
        return (result)
        //log result and its lenght
        //console.log(result);
        //console.log(result.length)
      })

    .catch(error => {
      console.error(error.message);
    });       

};

//tests
fetchColors({hex: 'EFDECD'})
fetchColors({name: 'periwinkle'})
fetchColors({compName: 'white Ice'})
fetchColors({compHex: '627BA5'})
fetchColors({compName: 'Black',})
fetchColors({compHex: 'FFFFFF'})


// Leave this here
export default fetchColors;

