const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
    async signup(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`User with ${email} email already registered.`)
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async activate(activationLink) {
        try {
            const user = await UserModel.findOne({ activationLink });

            if (!user) {
                throw ApiError.BadRequest("Invalid activation link");
            }

            user.isActivated = true;
            await user.save();
        } catch (error) {
            console.log(error);
        }
    }
    
    async login(email, password) {
        const user = await UserModel.findOne({ email });

        if(!user) {
            throw ApiError.BadRequest(`User with ${email} was not found.`);
        }

        const isPassSimilar = await bcrypt.compare(password, user.password);
        if(!isPassSimilar) {
            throw ApiError.BadRequest("Incorect password.");
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();
