let util = {
  uuid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  getCardCounts : function(deckId, cardList){
    let count = 0;
    cardList.forEach( card => {
      if(card.deckId === deckId) count++;
    })
    return count > 1 ? `${count} cards` : `${count} card`
  },

  capitalizeFirstLetter : function(str) { //capitalizeFirstLetter
        return str.charAt(0).toUpperCase() + str.slice(1);
  },

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
