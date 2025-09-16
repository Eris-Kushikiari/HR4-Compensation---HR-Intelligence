import mongoose, {Document} from "mongoose";
import bcrypt from "bcryptjs"

export type Role = 'user' | 'admin';

export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    role: Role;
    refreshToken?: string | null;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true,},
    password: {type: String, required: true},
    role:{ type: String, enum:['user', 'admin'], default: 'user'},
    refreshToken: { type: String, default: null}
}, {timestamps: true})

UserSchema.pre<IUser>('save', async function(next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.comparePassword = function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
}

export default mongoose.model<IUser>('user', UserSchema);