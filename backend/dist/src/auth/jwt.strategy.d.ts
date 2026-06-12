import { Strategy } from 'passport-jwt';
import { PrismaService } from "../prisma.service";
export type Payload = {
    sub: string;
};
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(payload: Payload): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
export {};
