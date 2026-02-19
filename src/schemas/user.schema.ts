import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ description: 'Username for login' })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({ description: 'Full name of the user' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'User role', enum: ['supervisor', 'admin'] })
  @Prop({ required: true, enum: ['supervisor', 'admin'] })
  role: string;

  @ApiProperty({ description: 'Email address' })
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'Phone number', required: false })
  @Prop()
  phone?: string;

  @ApiProperty({ description: 'Whether the user is active' })
  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
