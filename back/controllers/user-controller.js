const ApiError = require("../exceptions/api-error");
const userService = require("../service/user-service");
const { validationResult } = require("express-validator");

class UserController {
    async signup(req, res, next) {
        try {
            const validationErrors = validationResult(req);

            if(!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error",validationErrors.array()));
            }

            const { email, password } = req.body;
            const userData = await userService.signup(email, password);

            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData)
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }


    async logout(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(["123", "456"]);
        } catch (error) {
            next(error);
        }
    }

    async activateUser(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
