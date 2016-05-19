module.exports = {
  distanceListFrom: function(countryIndex, haystack){
    return haystack.map(function(element, index, array){
      var minDistX = Math.min(Math.abs(haystack[countryIndex].east - element.west), Math.abs(haystack[countryIndex].west - element.east));
      var minDistY = Math.min(Math.abs(haystack[countryIndex].north - element.south), Math.abs(haystack[countryIndex].south - element.north));
      return Math.sqrt(Math.pow(minDistY, 2) + Math.pow(minDistX, 2));
    });
  },
  getNameList: function(haystack){
    return haystack.map(function(element){
      return element.countryName;
    });
  },
  getCodeList: function(haystack){
    return haystack.map(function(element){
      return element.countryCode;
    });
  },
  getCountryNameIndex: function(countryName, haystack){
    return haystack.findIndex(function(element, index, array){
        return element.countryName == countryName;
    });
  },
  getNameDistanceList: function(countryIndex, haystack){
    var distanceList = this.distanceListFrom(countryIndex, haystack);
    return haystack.map(function(element, index){
      return [element.countryName, distanceList[index]];
    });
  },
  getCountryCodeIndex: function(countryCode, haystack){
    return haystack.findIndex(function(element, index, array){
        return element.countryCode == countryCode;
    });
  },
  getCountryCompareFunction: function(countryIndex, haystack){
    var distanceList = this.distanceListFrom(countryIndex, haystack);
    var that = this;
    return function(a, b){
      if(a.countryName[0] == b.countryName[0]){
        var aIndex = that.getCountryCodeIndex(a.countryCode, haystack);
        var bIndex = that.getCountryCodeIndex(b.countryCode, haystack);
        return distanceList[aIndex] < distanceList[bIndex] ? 1 : (distanceList[aIndex] > distanceList[bIndex] ? -1 : 0);
      }else{
        return a.countryName[0] > b.countryName[0] ? 1 : (a.countryName[0] < b.countryName[0] ? -1 : 0);
      }
    };
  }
};
