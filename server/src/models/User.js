import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        profilePic: {
            type: String,
            default: ""
        },
        joinDate: {
            type: Date,
            default: Date.now
        },
        role: {
            type: String,
            enum: ["user", "admin"], default: "user"
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = function (entered) {
    return bcrypt.compare(entered, this.password);
}
const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;


// export default mongoose.model("User", userSchema);

// export default mongoose.model("User", userSchema);
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//     {
//         username: { type: String, required: true, trim: true },
//         email: { type: String, required: true, unique: true, lowercase: true, index: true },
//         password: { type: String, required: true, minlength: 6 },
//         profilePic: { type: String, default: "" },
//         joinDate: { type: Date, default: Date.now },
//         role: { type: String, enum: ["user", "admin"], default: "user" }
//     },
//     { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// userSchema.methods.matchPassword = function (entered) {
//     return bcrypt.compare(entered, this.password);
// };
// const User = mongoose.models.User || mongoose.model("User", userSchema)
// export default User;
