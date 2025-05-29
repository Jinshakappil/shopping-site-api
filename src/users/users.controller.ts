import { Controller, Post, Request, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Body() payload: any,
  ): Promise<{ message: string; success: boolean }> {
    try {
      const user = await this.usersService.create(payload);
      return { message: 'User registered successfully', success: true };
    } catch (error) {
      return { message: 'Registration failed', success: false };
    }
  }
  @Post('login')
  async login(
    @Body() payload: any,
  ): Promise<
    | { user: string; access_token: string }
    | { message: string; success: boolean }
  > {
    const user: any = await this.usersService.findOne(payload);
    if (!user.success) {
      return { message: 'Invalid credentials', success: false };
    } else {
      const token = await this.authService.generateToken(user);
      let data: any = {
        user,
        ...token,
      };
      return data;
    }
  }

  @Get('test')
  test() {
    return 'Test route works';
  }
}
