export declare class CreateGuardDto {
    name: string;
    employeeId: string;
    phone: string;
    photo?: string;
    assignedSite: string;
    shift: string;
    status?: string;
    email?: string;
    dateOfJoining?: Date;
    emergencyContact?: string;
    address?: string;
}
declare const UpdateGuardDto_base: import("@nestjs/common").Type<Partial<CreateGuardDto>>;
export declare class UpdateGuardDto extends UpdateGuardDto_base {
}
export declare class GuardFilterDto {
    status?: string;
    shift?: string;
    assignedSite?: string;
    search?: string;
}
export declare class GuardResponseDto {
    _id: string;
    name: string;
    employeeId: string;
    phone: string;
    photo?: string;
    assignedSite: string;
    shift: string;
    status: string;
    email?: string;
    dateOfJoining?: Date;
    emergencyContact?: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
}
export {};
