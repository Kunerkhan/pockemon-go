const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
    async signup(email, password) {
        try {
            const candidate = await UserModel.findOne({ email });
            if(candidate)
            {
                throw new Error(`User with ${email} email already registered.`)
            }

            const hashPassword = await bcrypt.hash(password, 3);
            const activationLink = uuid.v4();
            const user = await UserModel.create({ email, password: hashPassword, activationLink });
            await mailService.sendActivationMail(email, activationLink);

            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
             
            return {...tokens, user: userDto};
        } catch(error) {

        }
    }
}

module.exports = new UserService();