const userService = require("../service/user-service");

class UserController {
    async signup(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.signup(email, password);

            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData)
        } catch (error) {

        }
    }

    async login(req, res, next) {
        try {

        } catch (error) {
            
        }
    }


    async logout(req, res, next) {
        try {

        } catch (error) {
            
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (error) {
            
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(["123", "456"]);
        } catch (error) {
            console.log(error)
        }
    }

    async activateUser(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            
        }
    }
}

module.exports = new UserController();
