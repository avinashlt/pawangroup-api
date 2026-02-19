import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: Partial<User>;
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: Partial<User>;
        token: string;
    }>;
    validateUser(userId: string): Promise<User | null>;
    getProfile(userId: string): Promise<Partial<User>>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;
    private generateToken;
    private sanitizeUser;
}
