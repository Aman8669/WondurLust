const User = require("../model/user");

module.exports.signup = async(req,res)=>{
    try{let {email, username, password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "Welcome to Wonderlust");
        res.redirect("/listing");
    })
    
}catch(err){
    req.flash("error", err.message);
    res.redirect("/signup");
}

};

module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req,res)=>{
        req.flash("success", "Welcome Back To Wonderlust");
        let redirectUrl = res.locals.redirectUrl || "/listing";
        res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listing");
    })
};