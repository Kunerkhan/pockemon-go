class UserController {
    async signup(req, res, next) {
        try {

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

        } catch (error) {
            
        }
    }
}

module.exports = new UserController();