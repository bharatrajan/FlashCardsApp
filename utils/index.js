let util = {
  uuid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  capitalizeFirstLetter : function(str) { //capitalizeFirstLetter
        return str.charAt(0).toUpperCase() + str.slice(1);
  }

};

export default util;
