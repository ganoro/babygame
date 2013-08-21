/**
 * Configuration toolkit 
 */
var Configuration = (function () {

    var edition = 'full';
    var gender = 'female';
    var user_name = '';
    var progress = 0;
    var is_sound = "true";

    // constructor
    var cls = function () {
        gender = localStorage.getItem('baby.gender');
        if (gender == null) {
            gender = "female"
        }
        user_name = localStorage.getItem('baby.user_name');
        if (user_name == null) {
            user_name = "";
        }
        progress = localStorage.getItem('baby.progress');
        if (progress == null) {
            progress = "";
        }
        is_sound = localStorage.getItem('baby.is_sound');
        if (is_sound == null) {
            is_sound = "true";
        }

        return cls;
    };

    cls.storeConfig = function() {
        localStorage.setItem('baby.gender', gender);
        localStorage.setItem('baby.user_name', user_name);
        localStorage.setItem('baby.progress', progress);
        localStorage.setItem('baby.is_sound', is_sound);
    };
        
    cls.isSound = function() {
        return is_sound == "true";
    };

    cls.toggleSound = function() {
        is_sound = is_sound == "true" ? is_sound = "false" : is_sound = "true";
        cls.storeConfig();
        return cls.isSound();
    }

    cls.isFree = function() {
        return edition == "free";
    };
    
    cls.isFemale = function() {
        return gender == 'female';
    };
    
    cls.setFemale = function() {
        gender = "female";
        cls.storeConfig();
    };
    
    cls.setMale = function() {
        gender = "male";
        cls.storeConfig();
    };
    
    cls.setUserName = function(name) {
        user_name = name;                      
        cls.storeConfig();
    };
    
    cls.getUserName = function() {
        return user_name;
    };
    
    cls.getGroup = function() {
        var group = localStorage.getItem('baby.group');
        if (group == null || typeof(group) === "undefined") {
            group = Math.floor(3 * Math.random());
            localStorage.setItem('baby.group', group);
        }
        return group;
    };
    
    cls.getFirstLogin = function() {
        var first_login = localStorage.getItem('baby.first_login');
        if (first_login == null || typeof(first_login) === "undefined") {
            first_login = (new Date()).toString();
            localStorage.setItem('baby.first_login', first_login);
        }
        return first_login;
    };
   
    cls.increment = function() {
        progress++;
        storeConfig();
    };
   
    cls.getProgress = function() {
       return progress;
    }

    return cls;
})();

