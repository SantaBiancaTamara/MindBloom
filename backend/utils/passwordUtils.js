import bcrypt from 'bcrypt'

const salt = 10;

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

