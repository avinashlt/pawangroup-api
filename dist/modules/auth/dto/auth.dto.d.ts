export declare class LoginDto {
    username: string;
    password: string;
}
export declare class RegisterDto {
    username: string;
    name: string;
    email: string;
    password: string;
    role?: string;
    phone?: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
export declare class UserResponseDto {
    _id: string;
    username: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
}
export declare class AuthResponseDto {
    user: UserResponseDto;
    token: string;
}
