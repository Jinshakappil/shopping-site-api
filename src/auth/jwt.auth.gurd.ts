// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//     config;
//     key;
//     constructor(config) {
//         super();
//         this.config = config;
//         this.key = null;
//     }

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     /**
//      * JWT Handel requests
//      *
//      * @param err
//      * @param user
//      * @param info
//      * @returns
//      */
//     handleRequest(err, user, info) {
//         /**
//          *
//          * Check user details available or not
//          */
//         if (err || !user) {
//             /**
//              * If user not exists check key is present or not
//              *
//              * if key is same as our key then return user details else throw an Unauthorized Exception
//              */
//             if (this.key === process.env.AUTHENTICATION_KEY) {
//                 return {};
//             } else throw err || new UnauthorizedException();
//         }
//         /**
//          * Return user details
//          */
//         return user ? user : {};
//     }

//     /**
//      * JWT function to get authentication options
//      *
//      * @param context
//      * @returns
//      */
//     getAuthenticateOptions(context: any) {
//         /**
//          * To get key from Headers
//          * */
//         this.key = context.args[0].headers.key;

//         return context;
//     }
// }

// jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
