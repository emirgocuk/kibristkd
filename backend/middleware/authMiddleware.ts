import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../entities/user.js';

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                console.error('JWT_SECRET is not defined');
                return res.status(500).json({ message: 'Sunucu yapılandırma hatası.' });
            }

            const decoded = jwt.verify(token, secret) as { id: number; role: UserRole };
            (req as any).user = decoded;
            return next();
        } catch (error) {
            console.error('Token doğrulama hatası', error);
            return res.status(401).json({ message: 'Yetkisiz işlem, token geçersiz.' });
        }
    }

    return res.status(401).json({ message: 'Yetkisiz işlem, token bulunamadı.' });
};

export const authorize = (...roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = (req as any).user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ message: 'Bu işlemi yapmak için yetkiniz yok.' });
        }
        next();
    };
};
