(function() { 
 return angular.module("mobbr.config", [])

.constant("lightboxUrl", "http://mobbr.dev:9000/#")

.constant("uiUrl", "http://mobbr.dev:9001")

.constant("apiUrl", "http://api.mobbr.dev")

.constant("environment", "development")

; 

})();