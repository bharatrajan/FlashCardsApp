let util = {
  /**
  * @description - Generates UUID
  * @util
  * @returns UUID as String
  */
  uuid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  /**
  * @description - Calculates number of cards for give deck-id
  * @util
  * @param {string} deckId - Id of deck for which the no. of cards calculated
  * @param {array} cardList - List of all cards
  * @returns count as integer
  */
  getCardCounts : function(deckId, cardList){
    let count = 0;
    cardList.forEach( card => {
      if(card.deckId === deckId) count++;
    })
    return count > 1 ? `${count} cards` : `${count} card`
  },

  /**
  * @description - Capitalize first letter of a given string
  * @util
  * @param {string} str - String whose first letter to be capitalized
  * @returns converted string
  */
  capitalizeFirstLetter : function(str) { //capitalizeFirstLetter
        return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
  * @description - Compress a text with elipsis
  * @util
  * @param {string} str - Input string to be truncated
  * @param {integer} compressToLength - choppable length
  * @returns string whose length is chopped to "compressToLength"
  */
  compressText : function (str, compressToLength ) { //capitalizeFirstLetter
        var localCompressToLength = compressToLength || 15;
            localCompressToLength = localCompressToLength - 3;
        if(str.length > localCompressToLength)
            return str.substring(0, localCompressToLength) + "...";
        else
            return str.toString();
  }

};

export default util;
